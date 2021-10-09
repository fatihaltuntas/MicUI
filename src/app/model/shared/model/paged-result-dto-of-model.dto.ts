// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ModelDto } from './model.dto';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IPagedResultDtoOfModelDto {
    totalCount: number | undefined;
    items: ModelDto[] | undefined;
}

export class PagedResultDtoOfModelDto implements IPagedResultDtoOfModelDto {

    totalCount: number | undefined;
    items: ModelDto[] | undefined;

    static fromJS(data: any): PagedResultDtoOfModelDto {
        data = typeof data === 'object' ? data : {};
        const result = new PagedResultDtoOfModelDto();
        result.init(data);
        return result;
    }

    constructor(data?: IPagedResultDtoOfModelDto) {
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
                    this.items.push(ModelDto.fromJS(item));
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

    clone(): PagedResultDtoOfModelDto {
        const json = this.toJSON();
        const result = new PagedResultDtoOfModelDto();
        result.init(json);
        return result;
    }
}
