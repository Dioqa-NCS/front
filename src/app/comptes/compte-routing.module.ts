import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { CompteIndexComponent } from './compte-index/compte-index.component'
import { CompteShowComponent } from './compte-show/compte-show.component'
import { CompteListResolver } from './compte-list.resolver'
import { CompteResolver } from './compte.resolver'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':id',
        component: CompteShowComponent,
        resolve: {
          compte: CompteResolver,
        },
      },
      {
        path: '',
        component: CompteIndexComponent,
        resolve: {
          comptes: CompteListResolver,
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteRoutingModule {
}
