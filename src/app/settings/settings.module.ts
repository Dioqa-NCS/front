import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatDividerModule } from '@angular/material/divider'
import { ReactiveFormsModule } from '@angular/forms'
import { SettingsRoutingModule } from './settings-routing.module'
import { SettingCompteComponent } from './setting-compte/setting-compte.component'
import { SharedModule } from '../shared/shared.module'
import { SettingCompteFormComponent } from './setting-compte-form/setting-compte-form.component'

@NgModule({
  declarations: [
    SettingCompteComponent,
    SettingCompteFormComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatDividerModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule { }
