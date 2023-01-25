import { NgModule } from '@angular/core'
import { Route, RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthGuard } from './auth/auth.guard'
import { AuthRoleGuard } from './auth/auth-role.guard'
import { AuthRole } from './auth/auth.service'

export type RouteData = {
  roles?: AuthRole[]
}

export type AppRoute = Route & {
  data?: RouteData
}

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'comptes',
    loadChildren: () => import('./comptes/compte.module').then(mod => mod.CompteModule),
    canLoad: [AuthGuard, AuthRoleGuard],
    data: {
      roles: [AuthRole.Administrator],
    },
  },
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AuthRoleGuard],
    data: {
      roles: [AuthRole.Administrator, AuthRole.Customer],
    },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
