// Storage adapter for private investigator notes
const STORAGE_KEY = 'masoulen26_e06_private_notes';

export function loadNotes(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function saveNotes(notes: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, notes);
  } catch {
    // Local storage might be blocked or full
  }
}
