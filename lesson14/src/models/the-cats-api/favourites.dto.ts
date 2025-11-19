export interface FavouritesImageDto {
    id: string;
    url: string;
}

export interface CatFavouriteDto {
    id: number;
    user_id: string;
    image_id: string;
    sub_id: string;
    created_at: string;
    image: FavouritesImageDto;
}

export interface AddFavouriteResponseDto {
    message: string;
    id: number;
}
