import { createHash } from "crypto";

// Saves a contact in the Mailchimp audience, adds tags and an optional note.
// Needs MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX and MAILCHIMP_AUDIENCE_ID.
// optIn: true marks the person as subscribed even if they were already in the
// audience as non-subscribed (only use it when they have just asked for the newsletter).

export type MailchimpResult = "ok" | "not_configured" | "compliance" | "failed";

type Contact = {
  email: string;
  firstName?: string;
  lastName?: string;
  tags: string[];
  note?: string;
  optIn?: boolean;
};

export async function saveToMailchimp({ email, firstName, lastName, tags, note, optIn }: Contact): Promise<MailchimpResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  const audience = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !server || !audience) {
    console.error("Mailchimp is not configured; contact not saved");
    return "not_configured";
  }
  const base = `https://${server}.api.mailchimp.com/3.0/lists/${audience}/members/${createHash("md5").update(email).digest("hex")}`;
  const headers = {
    Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    "Content-Type": "application/json",
  };
  const mergeFields: Record<string, string> = {};
  if (firstName) mergeFields.FNAME = firstName;
  if (lastName) mergeFields.LNAME = lastName;
  try {
    const member = await fetch(base, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        ...(optIn ? { status: "subscribed" } : {}),
        ...(Object.keys(mergeFields).length ? { merge_fields: mergeFields } : {}),
      }),
    });
    if (!member.ok) {
      const detail = await member.json().catch(() => ({}));
      console.error("Mailchimp member error", member.status, detail?.title, detail?.detail);
      // People who unsubscribed in the past can only rejoin through a Mailchimp form
      return detail?.title === "Member In Compliance State" ? "compliance" : "failed";
    }
    const tagged = await fetch(`${base}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: tags.map((name) => ({ name, status: "active" })) }),
    });
    if (!tagged.ok) console.error("Mailchimp tag error", tagged.status);
    if (note) {
      await fetch(`${base}/notes`, { method: "POST", headers, body: JSON.stringify({ note }) });
    }
    return "ok";
  } catch (err) {
    console.error("Mailchimp request failed", err);
    return "failed";
  }
}
