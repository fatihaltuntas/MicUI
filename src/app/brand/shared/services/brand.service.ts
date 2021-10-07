// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch, skip } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import {PagedResultDtoOfBrandDto} from '../model/paged-result-dto-of-brand.dto';
import * as moment from 'moment';

import { DataService } from '@shared/services/data.service';
import { BrandDto } from '../model/brand.dto';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';


@Injectable()
export class BrandServiceProxy {
    private http: HttpClient;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(private dataService: DataService, @Inject(HttpClient) http: HttpClient) {
        this.http = http;
    }

    create(input: BrandDto | null | undefined): Observable<BrandDto> {
        let url_ = "api/services/app/Brand/Create";
        return this.dataService.create(url_, input);
    }

    getAll(keyword: string | undefined,skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfBrandDto> {
        let url_ = "api/services/app/Brand/GetAll?";

        var input: any = {};
        input.skipCount = skipCount;
        input.maxResultCount = maxResultCount;
        input.keyword = keyword;
        return this.dataService.post(url_, input);
    }

    update(input: BrandDto | null | undefined): Observable<BrandDto> {
        let url_ = "api/services/app/Brand/Update";
        return this.dataService.update(url_, input);
    }

    get(id: number | null | undefined): Observable<BrandDto> {
        let url_ = "api/services/app/Brand/Get?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";

        return this.dataService.get(url_);
    }

    filter(request : ProductGroupFilterRequestDto): any{
        let url_ = "api/services/app/Brand/Filter?";
        return this.dataService.post(url_,request);
    }
}