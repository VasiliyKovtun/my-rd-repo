import { GetImageDto } from '../models/the-cats-api/image.dto';
import * as fs from 'fs';

export class TheCatImageApi {

    public async uploadImage(imagePath: string, subId?: string, breeds?: string[]): Promise<[Response, GetImageDto]> {
        const formData = new FormData();
        const file = fs.readFileSync(imagePath);
        const binaryFile = new File([new Uint8Array(file)], 'Dragon.jpg', { type: 'image/jpeg' });


        formData.append('file', binaryFile);
        subId && formData.append('sub_id', subId);
        breeds && formData.append('breeds', breeds.join(','));

        const response = await fetch (`${process.env.CAT_API_BASE_URL}/images/upload`, {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CAT_API_KEY as string
            },
            body: formData });

        const imageResponse = await response.json();

        return [response, imageResponse];
    }

    public async getImages(): Promise<[Response, GetImageDto[]]> {
        const response = await fetch (`${process.env.CAT_API_BASE_URL}/images`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.CAT_API_KEY as string
            }
        });

        const images = await response.json();

        return [response, images];
    }
}
