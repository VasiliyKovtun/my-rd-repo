import { AddVotesResponseDto, CatVotesDto } from '../models/the-cats-api/votes.dto';

export class TheCatVotesApi {
    public async addVote(imageId: string, subId: string, value = 1): Promise<[Response, AddVotesResponseDto]> {

        const body = JSON.stringify({
            image_id: imageId,
            sub_id: subId,
            value
        });

        const response = await fetch(`${process.env.CAT_API_BASE_URL}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CAT_API_KEY!
            },
            body
        });

        const json: AddVotesResponseDto = await response.json();
        return [response, json];
    }

    public async getVote(voteId: number): Promise<[Response, CatVotesDto]> {

        const response = await fetch(`${process.env.CAT_API_BASE_URL}/votes/${voteId}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.CAT_API_KEY!
            }
        });

        const json: CatVotesDto = await response.json();
        return [response, json];
    }
}
