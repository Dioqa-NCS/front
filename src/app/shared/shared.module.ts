import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask,
} from 'ngx-mask'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { InputComponent } from './input/input.component'
import { InputSelectComponent } from './input-select/input-select.component'
import { TabComponent } from './tab/tab.component'

const maskConfigFunction: () => Partial<IConfig> = () => ({
  validation: false,
})

@NgModule({
  declarations: [
    InputComponent,
    InputSelectComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    InputComponent,
    InputSelectComponent,
    TabComponent,
  ],
  providers: [provideNgxMask(maskConfigFunction)],
})
export class SharedModule {
}
