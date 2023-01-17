import { ToastrService } from 'ngx-toastr'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { tap } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class ErrorHttpInterop implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap({
        error: (err) => {
          console.log(err)
          if (!err.status) {
            this.toastrService.error('Aucune connexion internet détectée.')
          }
          if (err.status === 401 && !err.error.message) {
            this.toastrService.error('Non autorisé.')
          }
          if (err.status) {
            this.toastrService.error(err.error.message)
          } else {
            this.toastrService.error('Un problème est survenu. Veuillez contacter l\'administrateur.')
          }
        },
      }),
    )
  }
}
