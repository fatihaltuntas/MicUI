// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ProductItemDto } from './product-item.dto';

// import { MessageDto } from '@app/message/shared/message';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IPagedResultDtoOfProductItemDto {
    totalCount: number | undefined;
    items: ProductItemDto[] | undefined;
}

export class PagedResultDtoOfProductItemDto implements IPagedResultDtoOfProductItemDto {

    totalCount: number | undefined;
    items: ProductItemDto[] | undefined;

    static fromJS(data: any): PagedResultDtoOfProductItemDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfProductItemDto();
        result.init(data);
        return result;
    }

    constructor(data?: IPagedResultDtoOfProductItemDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.totalCount = data['totalCount'];
            if (data['items'] && data['items'].constructor === Array) {
                this.items = [];
                for (const item of data['items']) {
                    this.items.push(ProductItemDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['totalCount'] = this.totalCount;
        if (this.items && this.items.constructor === Array) {
            data['items'] = [];
            for (const item of this.items) {
                data['items'].push(item.toJSON());
            }
        }
        return data;
    }

    clone(): PagedResultDtoOfProductItemDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfProductItemDto();
        result.init(json);
        return result;
    }
}
