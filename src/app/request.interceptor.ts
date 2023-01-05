import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }
  // use when an httpRequest will be performed at mutliple places

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log({ 'request interceptor': request });
    //cannot modify original request, must clone
    const newRequest = request.clone({ headers: new HttpHeaders({ 'token': 'daveFranco' }) });
    //if you want to add the header only to specific methods
    if (request.method === 'POST') {
      return next.handle(newRequest);
    }
    return next.handle(request);// sends the request to the server
  }
}
