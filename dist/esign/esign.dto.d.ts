export declare class CreateEsignDto {
    role1Email: string;
    role2Email?: string;
    role3Email?: string;
    title?: string;
    note?: string;
    description?: string;
    role1Name?: string;
    role1Phone?: string;
    role1Widgets?: {
        type: string;
        page: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }[];
}
