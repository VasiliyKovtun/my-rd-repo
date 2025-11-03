import { expect } from 'chai';
import { DogService } from 'src/dog-service';
import { MatchersV3, PactV3, Verifier } from '@pact-foundation/pact';
import { ImageDto } from 'src/models/image.dto';
import * as path from 'path';

describe('The dog api contract test /images', () => {
    let dogService: DogService;
    const apiKey = 'live_FqezAfaSNxE5FfT5cmNoHNT8Wq4JrnDhGGlKnw2pGqlYi5t8c9pGJDTa9Nssz9ob';


    const provider = new PactV3({
        consumer: 'dog-consumer',
        provider: 'dog-provider'
    });

    const expectedResponse = [
        {
            'breeds': [],
            'id': 'neHuCT27X',
            'url': 'https://cdn2.thedogapi.com/images/neHuCT27X.jpg',
            'width': 350,
            'height': 280,
            'sub_id': 'vk',
            'created_at': '2025-11-02T16:01:20.000Z',
            'original_filename': 'korgi.jpg',
            'breed_ids': '110'
        }
    ] as ImageDto[];

    const expectedBody = MatchersV3.like(expectedResponse);


    describe('consumer test', () => {

        it('create contract', () => {
            provider
                .given('dogs exist')
                .uponReceiving('a request for dogs')
                .withRequest({
                    method: 'GET',
                    path: '/images',
                    headers: {
                        'x-api-key': apiKey,
                        accept: '*/*'
                    }
                })
                .willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: expectedBody
                });

            return provider.executeTest(async (mockServer) => {
                dogService = new DogService(mockServer.url);
                const images = await dogService.getDogImages();

                expect(images[0]).to.contain.keys('breeds', 'id', 'url', 'width', 'height', 'sub_id', 'created_at', 'original_filename', 'breed_ids');
                expect(images[0].id).to.be.a('string');
                expect(images[0].url).to.be.a('string');
                expect(images[0].width).to.be.a('number');
                expect(images[0].height).to.be.a('number');
                expect(images[0].sub_id).to.be.a('string');
                expect(images[0].created_at).to.be.a('string');
                expect(images[0].original_filename).to.be.a('string');
                expect(images[0].breed_ids).to.be.a('string');

            });
        });

    });

    describe('provider test', () => {
        it('verify contract', () => {
            return new Verifier({
                providerBaseUrl: 'https://api.thedogapi.com/v1',
                pactUrls: [path.resolve(process.cwd(), 'pacts', 'dog-consumer-dog-provider.json')]
            })
                .verifyProvider()
                .then(() => {
                    console.log('contract verified');
                });
        });
    });
});
