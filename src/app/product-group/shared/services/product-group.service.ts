// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch, skip } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import {PagedResultDtoOfProductGroupDto} from '../model/paged-result-dto-of-product-group.dto';
import * as moment from 'moment';

import { DataService } from '@shared/services/data.service';
import { ProductGroupDto } from '../model/product-group.dto';
import { ProductGroupFilterRequestDto } from '../model/product-group-filter-request.dto';


@Injectable()
export class ProductGroupServiceProxy {
    private http: HttpClient;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(private dataService: DataService, @Inject(HttpClient) http: HttpClient) {
        this.http = http;
    }

    create(input: ProductGroupDto | null | undefined): Observable<ProductGroupDto> {
        let url_ = "api/services/app/ProductGroup/Create";
        return this.dataService.create(url_, input);
    }

    getAll(keyword: string | undefined,skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfProductGroupDto> {
        let url_ = "api/services/app/ProductGroup/GetAll?";

        var input: any = {};
        input.skipCount = skipCount;
        input.maxResultCount = maxResultCount;
        input.keyword = keyword;
        return this.dataService.post(url_, input);
    }

    update(input: ProductGroupDto | null | undefined): Observable<ProductGroupDto> {
        let url_ = "api/services/app/ProductGroup/Update";
        return this.dataService.update(url_, input);
    }

    get(id: number | null | undefined): Observable<ProductGroupDto> {
        let url_ = "api/services/app/ProductGroup/Get?";
        if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";

        return this.dataService.get(url_);
    }

    filter(request : ProductGroupFilterRequestDto): Observable<PagedResultDtoOfProductGroupDto>{
        let url_ = "api/services/app/ProductGroup/Filter?";
        return this.dataService.post(url_,request);
    }
    getProductGroupsByBrandId(brandId:number):any{
        let url_ = "api/services/app/ProductGroup/GetProductGroupsByBrandId?";
        url_ += "brandId=" + encodeURIComponent("" + brandId);
        return this.dataService.get(url_);
    }
}