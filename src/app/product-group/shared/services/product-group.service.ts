// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch, skip } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import {PagedResultDtoOfProductGroupDto} from '../model/paged-result-dto-of-product-group.dto';
import * as moment from 'moment';

import { DataService } from '@shared/services/data.service';
import { ProductGroupDto } from '../model/product-group.dto';
import { CreateProductGroupDto } from '../model/create-product-group.dto';


@Injectable()
export class ProductGroupServiceProxy {
    private http: HttpClient;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(private dataService: DataService, @Inject(HttpClient) http: HttpClient) {
        this.http = http;
    }

    create(input: CreateProductGroupDto | null | undefined): Observable<ProductGroupDto> {
        let url_ = "/api/services/app/Message/Create";
        return this.dataService.create(url_, input);
    }


    // createUpload(input: CreateMessageDto | null | undefined): Observable<MessageDto> {
    //     let url_ = "/api/services/app/Message/CreateUpload";
    //     return this.dataService.create(url_, input);
    // }

    // update(input: MessageDto | null | undefined): Observable<MessageDto> {
    //     let url_ = "/api/services/app/Message/Update";
    //     return this.dataService.update(url_, input);
    // }

    // delete(id: number | null | undefined): Observable<void> {
    //     let url_ = "/api/services/app/Message/Delete?";
    //     if (id !== undefined)
    //         url_ += "Id=" + encodeURIComponent("" + id) + "&";

    //     return this.dataService.delete(url_);
    // }

    // get(id: number | null | undefined): Observable<BrandGr> {
    //     let url_ = "/api/services/app/Message/Get?";
    //     if (id !== undefined)
    //         url_ += "Id=" + encodeURIComponent("" + id) + "&";

    //     return this.dataService.get(url_);
    // }



    getAll(keyword: string | undefined,skipCount: number | null | undefined, maxResultCount: number | null | undefined): Observable<PagedResultDtoOfProductGroupDto> {
        let url_ = "api/services/app/ProductGroup/GetAll?";

        var input: any = {};
        input.skipCount = skipCount;
        input.maxResultCount = maxResultCount;
        input.keyword = keyword;
        return this.dataService.post(url_, input);
    }

    // getAllPermissions() {
    //     let url_ = "/api/services/app/Message/GetAllPermissions"

    //     return this.dataService.get(url_);
    // }

    // getUnReadedMessageCount() {
    //     let url_ = "/api/services/app/Message/GetUnReadedMessageCount"

    //     return this.dataService.get(url_);
    // }

    // IsPublisherHaveFreePublication() {
    //     return this.dataService.get("/api/services/app/CustomerSubscription/GetIsPublisherHaveFreePublication");
    // }
}