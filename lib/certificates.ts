/* Certificates and CPD record.
   Certificates are saved in this browser when they are earned (a course's final quiz, or the Inclusion
   Foundations programme), so members can download them again from their dashboard.
   When member accounts are connected, save these to the member's account instead. */

export type Certificate = {
  id: string;
  title: string;
  kind: "course" | "programme";
  pathway?: string;
  cpdHours?: number;
  date: string; // ISO date the certificate was earned
};

export const CERTIFICATES_KEY = "tie_certificates";
export const CERT_NAME_KEY = "tie_certificate_name";

export function getCertificates(): Certificate[] {
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    return raw ? (JSON.parse(raw) as Certificate[]) : [];
  } catch {
    return [];
  }
}

export function addCertificate(cert: Omit<Certificate, "date"> & { date?: string }) {
  try {
    const all = getCertificates();
    if (all.some((c) => c.id === cert.id)) return;
    all.push({ ...cert, date: cert.date ?? new Date().toISOString() });
    localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("tie_certificates_changed"));
  } catch {
    /* storage unavailable: the certificate can still be printed on screen */
  }
}

export function getCertificateName(): string {
  try {
    const own = localStorage.getItem(CERT_NAME_KEY);
    if (own) return own;
    const onboarding = localStorage.getItem("onboarding_state");
    return onboarding ? (JSON.parse(onboarding).name as string) || "" : "";
  } catch {
    return "";
  }
}

export function setCertificateName(name: string) {
  try { localStorage.setItem(CERT_NAME_KEY, name); } catch { /* ignore */ }
}

/* "0.75 hrs" or "1 hour" becomes 0.75 or 1 */
export function parseHours(text?: string): number | undefined {
  const m = text?.match(/[\d.]+/);
  return m ? Number(m[0]) : undefined;
}

const longDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const escape = (s: string) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch] as string));

const FONTS = "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Raleway:wght@600;700&family=Lato:wght@400;700&display=swap');";

function openPrintable(html: string) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, "_blank");
  if (w) setTimeout(() => w.print(), 800);
}

/* A4 landscape certificate in the brand template: Linen ground, Playfair name, title, Gold rule, date */
export function openCertificate(cert: Certificate, name: string) {
  const subtitle = cert.kind === "programme" ? "Inclusion Foundations Programme" : `${cert.pathway ? `${escape(cert.pathway)} pathway` : "Impact Platform course"}${cert.cpdHours ? ` · ${cert.cpdHours} CPD ${cert.cpdHours === 1 ? "hour" : "hours"}` : ""}`;
  openPrintable(`<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><title>${escape(cert.title)}: Certificate</title><style>${FONTS}
@page{size:A4 landscape;margin:0}
body{margin:0;background:#FDFAF5;font-family:Lato,sans-serif;color:#1C1C1C;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:297mm;height:210mm;box-sizing:border-box;padding:18mm;display:flex}
.frame{flex:1;border:1.5px solid #C9A84C;padding:16mm 20mm;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;background:#FDFAF5}
.brand{font-family:Raleway,sans-serif;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:11pt;color:#4A6347}
.rule{width:60mm;height:3px;background:#C9A84C;margin:7mm auto}
h1{font-family:'Playfair Display',serif;font-size:30pt;margin:0;color:#1A3220}
.awarded{margin-top:8mm;font-size:12pt;color:#4B5B4E}
.name{font-family:'Playfair Display',serif;font-size:34pt;color:#4A6347;margin:3mm 0 0}
.for{margin-top:7mm;font-size:12pt;color:#4B5B4E}
.title{font-family:Raleway,sans-serif;font-weight:700;font-size:18pt;margin:2mm 0 0;color:#1C1C1C}
.sub{margin-top:2mm;font-size:11pt;color:#4B5B4E}
.foot{margin-top:10mm;display:flex;gap:30mm;font-size:10.5pt;color:#4B5B4E}
.foot b{display:block;font-family:Raleway,sans-serif;color:#1C1C1C;font-size:11pt}
</style></head><body><div class="page"><div class="frame">
<div class="brand">The Inclusion Edit · Impact Platform</div><div class="rule"></div>
<h1>Certificate of Completion</h1>
<div class="awarded">This certificate is awarded to</div>
<div class="name">${escape(name || "Inclusion Editors member")}</div>
<div class="for">for successfully completing</div>
<div class="title">${escape(cert.title)}</div>
<div class="sub">${subtitle}</div>
<div class="foot"><div><b>${longDate(cert.date)}</b>Date completed</div><div><b>The Inclusion Edit</b>Capacity. Capability. Change.</div></div>
</div></div></body></html>`);
}

/* A one-page CPD record listing every certificate, for appraisals and professional body returns */
export function openCpdRecord(certs: Certificate[], name: string) {
  const total = certs.reduce((sum, c) => sum + (c.cpdHours || 0), 0);
  const rows = [...certs].sort((a, b) => a.date.localeCompare(b.date)).map((c) =>
    `<tr><td>${longDate(c.date)}</td><td>${escape(c.title)}</td><td>${c.kind === "programme" ? "Programme" : escape(c.pathway || "Course")}</td><td class="n">${c.cpdHours ?? "None recorded"}</td></tr>`
  ).join("");
  openPrintable(`<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><title>CPD record</title><style>${FONTS}
@page{size:A4;margin:18mm}
body{font-family:Lato,sans-serif;color:#1C1C1C;font-size:11pt}
.brand{font-family:Raleway,sans-serif;font-weight:700;letter-spacing:.2em;text-transform:uppercase;font-size:9pt;color:#4A6347}
h1{font-family:'Playfair Display',serif;font-size:24pt;margin:3mm 0 1mm;color:#1A3220}
.meta{color:#4B5B4E;margin-bottom:8mm}
table{width:100%;border-collapse:collapse}
th{font-family:Raleway,sans-serif;text-align:left;font-size:9pt;letter-spacing:.08em;text-transform:uppercase;color:#4A6347;border-bottom:2px solid #C9A84C;padding:2.5mm 2mm}
td{border-bottom:1px solid #DCE5DE;padding:3mm 2mm;vertical-align:top}
.n{text-align:right;font-variant-numeric:lining-nums}
tfoot td{font-family:Raleway,sans-serif;font-weight:700;border-bottom:none}
</style></head><body>
<div class="brand">The Inclusion Edit · Impact Platform</div>
<h1>CPD record</h1>
<div class="meta">${escape(name || "Inclusion Editors member")} · Printed ${longDate(new Date().toISOString())}</div>
<table><thead><tr><th>Date</th><th>Learning completed</th><th>Pathway</th><th class="n">CPD hours</th></tr></thead>
<tbody>${rows}</tbody><tfoot><tr><td colspan="3">Total CPD hours</td><td class="n">${total}</td></tr></tfoot></table>
</body></html>`);
}
