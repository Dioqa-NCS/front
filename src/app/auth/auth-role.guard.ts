import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlSegment, UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { AppRoute } from '../app-routing.module'

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {
  }

  canLoad(
    route: AppRoute,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    segments: UrlSegment[],
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!route.data?.roles) {
      throw new Error('Il manque la propriété roles dans data')
    }

    return this.authService.hasRole(route.data['roles'])
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const dataRoute = route as AppRoute

    if (!dataRoute.data?.roles) {
      throw new Error('Il manque la propriété roles dans data')
    }

    return this.authService.hasRole(route.data['roles'])
  }
}
