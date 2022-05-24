import { PipeTransform, Injectable } from '@nestjs/common';
import trim from 'lodash/trim';

@Injectable()
export class RemoveEmptyQueryPipe implements PipeTransform {
    constructor() {
        //
    }
    transform(query: Record<string, string>) {
        Object.keys(query).forEach((key) => {
            if (!trim(query[key] as string)) {
                delete query[key];
            }
        });
        return query;
    }
}
