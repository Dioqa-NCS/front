import { Injectable } from '@angular/core'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifieReq = req.clone({
      withCredentials: true,
    })
    return next.handle(modifieReq)
  }
}
