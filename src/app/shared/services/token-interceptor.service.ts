import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next): any {
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('thinkbudget-token')
      }
    });
    return next.handle(tokenizedReq);
  }
}
