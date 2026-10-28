// Shared lesson completion store using localStorage.
// A lesson is identified by its canonical ID (e.g. "understanding-your-bias").
// Multiple routes can map to the same canonical ID so completing either marks both.

export const COMPLETION_KEY = "tie_completed_lessons";

export function getCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(COMPLETION_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function markCompleted(canonicalId: string): void {
  if (typeof window === "undefined") return;
  try {
    const set = getCompleted();
    set.add(canonicalId);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify([...set]));
    // Dispatch event so other components on the same page can react
    window.dispatchEvent(new CustomEvent("tie_completion_changed", { detail: { id: canonicalId } }));
  } catch {}
}

export function isCompleted(canonicalId: string): boolean {
  return getCompleted().has(canonicalId);
}
