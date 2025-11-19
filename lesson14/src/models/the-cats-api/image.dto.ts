export interface GetImageDto {
    breeds: unknown[];
    id: string;
    url: string;
    width: number;
    height: number;
    sub_id: string | null;
    created_at: string;
    original_filename: string | null;
    breed_ids: string | null;
}
