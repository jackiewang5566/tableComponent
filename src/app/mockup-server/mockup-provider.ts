import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpInterceptor, HttpEvent, HTTP_INTERCEPTORS, HttpHandler} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable()
export class MockupBackendInterceptor implements HttpInterceptor {
    constructor() {}

    private _data = require('./api/sample_data.json');
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of (null).pipe(() => {
            if (request.url.endsWith('/sample_data') && request.method === 'GET') {
                return of (new HttpResponse({ status: 200, body: this._data }));
            }
            return next.handle(request);
        }, delay (500));
    }
}

export let MockBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockupBackendInterceptor,
    multi: true
}