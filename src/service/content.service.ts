import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentService {
    getContent(): string {
        return 'get content';
    }

    setContent(): string {
        return 'set content';
    }

    updateContent(): string {
        return 'update content';
    }

    deleteContent(): string {
        return 'delete content';
    }
}
