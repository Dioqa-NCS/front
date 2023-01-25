import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatDividerModule } from '@angular/material/divider'
import { SettingsRoutingModule } from './settings-routing.module'
import { SettingCompteComponent } from './setting-compte/setting-compte.component'
import { SharedModule } from '../shared/shared.module';
import { SettingCompteFormComponent } from './setting-compte-form/setting-compte-form.component';
import { SettingCompteUpdateComponent } from './setting-compte-update/setting-compte-update.component'

@NgModule({
  declarations: [
    SettingCompteComponent,
    SettingCompteFormComponent,
    SettingCompteUpdateComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatDividerModule,
    SharedModule,
  ],
})
export class SettingsModule { }
