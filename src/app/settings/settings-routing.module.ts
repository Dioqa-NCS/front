import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SettingCompteComponent } from './setting-compte/setting-compte.component'
import { SettingCompteResolver } from './setting-compte.resolver'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'compte',
        component: SettingCompteComponent,
        resolve: {
          settingCompte: SettingCompteResolver,
        },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
