// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ProductGroupDto } from './product-group.dto';

// import { MessageDto } from '@app/message/shared/message';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IPagedResultDtoOfProductGroupDto {
    totalCount: number | undefined;
    items: ProductGroupDto[] | undefined;
}

export class PagedResultDtoOfProductGroupDto implements IPagedResultDtoOfProductGroupDto {

    totalCount: number | undefined;
    items: ProductGroupDto[] | undefined;

    static fromJS(data: any): PagedResultDtoOfProductGroupDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfProductGroupDto();
        result.init(data);
        return result;
    }

    constructor(data?: IPagedResultDtoOfProductGroupDto) {
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
                    this.items.push(ProductGroupDto.fromJS(item));
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

    clone(): PagedResultDtoOfProductGroupDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfProductGroupDto();
        result.init(json);
        return result;
    }
}
