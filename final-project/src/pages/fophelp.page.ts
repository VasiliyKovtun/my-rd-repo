import { Page } from '@playwright/test';
import { FophelpBasePage } from './fophelp-base.page';
import { ConfigService } from '../services/config.service';

export class FophelpPage extends FophelpBasePage {
    public constructor(page: Page, configService: ConfigService) {
        super(page, configService);
    }
}
