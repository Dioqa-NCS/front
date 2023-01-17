import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router'
import {
  Observable, skipWhile, take, tap,
} from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap(async authenticated => {
        if (!authenticated) {
          await this.router.navigateByUrl('/')
        }
      }),
    )
  }

  canLoad(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: Route,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.authService.signedin$.pipe(
      skipWhile(value => value === null),
      take(1),
      tap(async authenticated => {
        if (!authenticated) {
          await this.router.navigateByUrl('/')
        }
      }),
    )
  }
}
