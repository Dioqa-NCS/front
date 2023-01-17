import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { CompteIndexComponent } from './compte-index/compte-index.component'
import { CompteShowComponent } from './compte-show/compte-show.component'
import { CompteListResolverService } from './compte-list-resolver.service'
import { CompteResolverService } from './compte-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ':id',
        component: CompteShowComponent,
        resolve: {
          compte: CompteResolverService,
        },
      },
      {
        path: '',
        component: CompteIndexComponent,
        resolve: {
          comptes: CompteListResolverService,
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
