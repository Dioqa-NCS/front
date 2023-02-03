import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatTableModule } from '@angular/material/table'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CompteRoutingModule } from './compte-routing.module'
import { CompteIndexComponent } from './compte-index/compte-index.component'
import { HomeComponent } from './home/home.component'
import { CompteTabComponent } from './compte-tab/compte-tab.component'
import { SharedModule } from '../shared/shared.module'
import { CompteShowComponent } from './compte-show/compte-show.component'
import { CompteCreateComponent } from './compte-create/compte-create.component'
import { CompteFormComponent } from './compte-form/compte-form.component'
import { CompteUpdateComponent } from './compte-update/compte-update.component'
import { CompteEffects } from './state/compte.effects'
import { compteReducer } from './state/compte.reducer'

@NgModule({
  declarations: [
    CompteIndexComponent,
    HomeComponent,
    CompteTabComponent,
    CompteShowComponent,
    CompteCreateComponent,
    CompteFormComponent,
    CompteUpdateComponent,
  ],
  imports: [
    CommonModule,
    CompteRoutingModule,
    MatTableModule,
    SharedModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    EffectsModule.forFeature([CompteEffects]),
    StoreModule.forFeature('comptes', compteReducer),
  ],
})
export class CompteModule {
}
