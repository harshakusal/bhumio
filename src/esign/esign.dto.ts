export class CreateEsignDto {
  role1Email: string;
  role2Email?: string;
  role3Email?: string;
  title?: string;         // Optional title
  note?: string;          // Optional note
  description?: string;   // Optional description
  role1Name?: string;     // Optional name for Role 1
  role1Phone?: string;    // Optional phone for Role 1
  role1Widgets?: {        // Optional widgets for Role 1
    type: string;
    page: number;
    x: number;
    y: number;
    w: number;
    h: number;
  }[];
}