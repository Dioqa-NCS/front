import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RequestAccountComponent } from './request-account/request-account.component'
import { SignoutComponent } from './signout/signout.component'

const routes: Routes = [
  { path: 'signout', component: SignoutComponent },
  { path: 'request-account', component: RequestAccountComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
