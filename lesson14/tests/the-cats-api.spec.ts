import { describe, expect, test } from 'vitest';
import { TheCatImageApi } from '../src/the-cat-api/images.api';
import { TheCatFavouritesApi } from '../src/the-cat-api/favourites.api';
import { TheCatVotesApi } from '../src/the-cat-api/votes.api';
import { GetImageDto } from '../src/models/the-cats-api/image.dto';


describe('The Cat API test', () => {
    const catApi = new TheCatImageApi();
    let uploadedImageJson: GetImageDto;
    const favoriteApi = new TheCatFavouritesApi();
    let favouriteId: number;

    describe('Upload and fetch images', () => {
        test('Upload image', async () => {
            const [response, json] = await catApi.uploadImage('./artifacts/Dragon.jpg', 'VASKO');

            expect(response.ok).toBeTruthy();
            expect(json).toBeDefined();
            expect(json.id).toBeDefined();

            uploadedImageJson = json;
        });

        test('Check that uploaded image exists', async () => {
            const [response, images] = await catApi.getImages();

            expect(response.ok).toBeTruthy();
            expect(images).toBeDefined();
            expect(images.length).toBeGreaterThan(0);

            const uploadedImage = images.find(image => image.id === uploadedImageJson.id);

            expect(uploadedImage).toBeDefined();
            expect(uploadedImage?.id).toBe(uploadedImageJson.id);
            expect(uploadedImage?.url).toBe(uploadedImageJson.url);
            expect(uploadedImage?.original_filename).toBe(uploadedImageJson.original_filename);
            expect(uploadedImage?.sub_id).toBe(uploadedImageJson.sub_id);
        });
    });

    describe('Add and check Favourites', () => {

        test('Add to favourites', async () => {
            const [response, json] = await favoriteApi.addToFavourites(
                uploadedImageJson.id,
                uploadedImageJson.sub_id!
            );

            expect(response.ok).toBeTruthy();

            expect(json.id).toBeDefined();
            expect(json.message).toBe('SUCCESS');

            favouriteId = json.id;
        });

        test('Get favourite by id', async () => {
            const [response, json] = await favoriteApi.getFavourite(favouriteId);

            expect(response.ok).toBeTruthy();

            expect(json.image_id).toBe(uploadedImageJson.id);
            expect(json.sub_id).toBe(uploadedImageJson.sub_id);
            expect(json.image.url).toBe(uploadedImageJson.url);
        });
    });

    describe('Add and check Votes', () => {

        const votesApi = new TheCatVotesApi();
        let voteId: number;

        test('Add vote to image', async () => {
            const [response, json] = await votesApi.addVote(
                uploadedImageJson.id,
                uploadedImageJson.sub_id!,
                1 // like
            );

            expect(response.ok).toBeTruthy();
            expect(json.id).toBeDefined();
            expect(json.image_id).toBe(uploadedImageJson.id);
            expect(json.sub_id).toBe(uploadedImageJson.sub_id);
            expect(json.value).toBe(1);
            voteId = json.id;
        });

        test('Get vote by id', async () => {
            const [response, json] = await votesApi.getVote(voteId);
            expect(response.ok).toBeTruthy();
            expect(json).toBeDefined();

            expect(json.image_id).toBe(uploadedImageJson.id);
            expect(json.sub_id).toBe(uploadedImageJson.sub_id);
            expect(json.value).toBe(1);

            expect(json.image.id).toBe(uploadedImageJson.id);
            expect(json.image.url).toBe(uploadedImageJson.url);
        });
    });
});
