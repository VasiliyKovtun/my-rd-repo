import { AddFavouriteResponseDto, CatFavouriteDto } from '../models/the-cats-api/favourites.dto';

export class TheCatFavouritesApi {
    public async addToFavourites(
        imageId: string,
        subId: string
    ): Promise<[Response, AddFavouriteResponseDto]> {

        const body = JSON.stringify({
            image_id: imageId,
            sub_id: subId
        });

        const response = await fetch(`${process.env.CAT_API_BASE_URL}/favourites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CAT_API_KEY!
            },
            body
        });

        const json: AddFavouriteResponseDto = await response.json();
        return [response, json];
    }

    public async getFavourite(favouriteId: number): Promise<[Response, CatFavouriteDto]> {

        const response = await fetch(`${process.env.CAT_API_BASE_URL}/favourites/${favouriteId}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.CAT_API_KEY!
            }
        });

        const json: CatFavouriteDto = await response.json();
        return [response, json];
    }
}
