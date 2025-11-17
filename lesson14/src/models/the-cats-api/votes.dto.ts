export interface VotesImageDto {
    id: string;
    url: string;
}

export interface CatVotesDto {
    id: number;
    user_id: string;
    image_id: string;
    sub_id: string;
    created_at: string;
    value: number;
    country_code: string;
    image: VotesImageDto;
}

export interface AddVotesResponseDto {
    message: string;
    id: number;
    image_id: string;
    sub_id: string;
    value: number;
    country_code: string;
}
