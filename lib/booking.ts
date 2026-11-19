// The one place to set the "book a call" link for the whole website.
// Replace with Rebekah's real Calendly event link when it is ready.
export const BOOKING_URL = "https://calendly.com/theinclusionedit/free-inclusion-call";

// Booking link with the topic filled in as the answer to the first Calendly question
// ("What would you like to talk about?"), so visitors don't have to type it again.
export function bookingLink(topic?: string) {
  return topic ? `${BOOKING_URL}?a1=${encodeURIComponent(topic)}` : BOOKING_URL;
}
