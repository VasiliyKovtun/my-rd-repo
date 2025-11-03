import { ImageDto } from './models/image.dto';

export class DogService {
    private readonly apiKey = 'live_FqezAfaSNxE5FfT5cmNoHNT8Wq4JrnDhGGlKnw2pGqlYi5t8c9pGJDTa9Nssz9ob';
    public constructor(private baseUrl: string) {}

    public async getDogImages(): Promise<ImageDto[]> {
        const response = await fetch(`${this.baseUrl}/images`, {headers: {'x-api-key': this.apiKey}});
        const responseJson = await response.json();

        return responseJson;
    }
}
