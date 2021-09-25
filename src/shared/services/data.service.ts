// import 'rxjs/add/operator/finally';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase, HttpRequest } from '@angular/common/http';

import { environment } from 'environments/environment';
import { SwaggerException } from '@shared/service-proxies/service-proxies';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpTypes } from 'core/enums/httpTypes.enum';

const API_BASE_URL = environment.API_URL;

@Injectable()
export class DataService {

    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(
        // private spinnerService: Ng4LoadingSpinnerService,
        @Inject(HttpClient) http: HttpClient,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        this.http = http;
        this.baseUrl = API_BASE_URL;
    }

    /**
     * @input (optional)
     * @return Success
     */
    create(methodName, input = undefined): Observable<any> {
        return this.doHttpRequest(methodName, HttpTypes.POST, input);
    }

    /**
     * @id (optional)
     * @return Success
     */
    delete(methodName): Observable<void> {
        return this.doHttpRequest(methodName, HttpTypes.DELETE);
    }

    /**
     * @input (optional)
     * @return Success
     */
    update(methodName, input: any | null | undefined): Observable<any> {
        return this.doHttpRequest(methodName, HttpTypes.PUT, input);
    }

    /**
     * @id (optional)
     * @return Success
     */
    get(methodName: string, skipCount: number = undefined, maxResultCount: number = undefined,baseUrl:string=""): Observable<any> {
        if (skipCount !== undefined) {
            methodName += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }

        if (maxResultCount !== undefined) {
            methodName += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }

        return this.doHttpRequest(methodName, HttpTypes.GET,null,baseUrl);
    }

    post(methodName, input = undefined): Observable<any> {
        return this.doHttpRequest(methodName, HttpTypes.POST, input);
    }

    doHttpRequest(methodName: string, requestType: string, body = undefined,baseUrl:string=""): Observable<any> {
        let url_ = this.baseUrl ;
        if(baseUrl != null && baseUrl != ""){
            url_=baseUrl;
        }
        url_ = url_+ methodName;
        url_ = url_.replace(/[?&]$/, '');
        const options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        if (body) {
            options_.body = JSON.stringify(body);
        }

        // this.spinnerService.show();

        return this.http.request(requestType, url_, options_).pipe(_observableMergeMap((response_: any) => {
            // this.spinnerService.hide();

            return this.processHttpRequest(response_);
        })).pipe(_observableCatch((response_: any) => {
            // this.spinnerService.hide();

            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processHttpRequest(<any>response_);
                } catch (e) {
                    return <Observable<any>><any>_observableThrow(e);
                }
            } else {
                return <Observable<any>><any>_observableThrow(response_);
            }
        }));
    }

    protected processHttpRequest(response: HttpResponseBase): Observable<any> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        const _headers: any = {};

        if (response.headers) {
            response.headers.keys().forEach(key => {
                _headers[key] = response.headers.get(key);
            });
        };

        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                return _observableOf(resultData200);
            }));
        } else if (status === 401) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException('A server error occurred.', status, _responseText, _headers);
            }));
        } else if (status === 403) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException('A server error occurred.', status, _responseText, _headers);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf<any>(<any>null);
    }
}


function throwException(message: string, status: number, response: string, headers:
    { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined) {
        return _observableThrow(result);
    } else {
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
    }
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next('');
            observer.complete();
        } else {
            const reader = new FileReader();
            reader.onload = function () {
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob);
        }
    });
}
