import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { EffectsModule } from '@ngrx/effects'
import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../shared/shared.module'
import { SigninComponent } from './signin/signin.component'
import { RequestAccountComponent } from './request-account/request-account.component'
import { SignoutComponent } from './signout/signout.component'
import { AuthEffects } from './state/auth.effects'

@NgModule({
  declarations: [
    SigninComponent,
    RequestAccountComponent,
    SignoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {
}
