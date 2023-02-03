import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import {
  Compte, ComptePatched, updateComptes,
} from '../compte.service'

@Component({
  selector: 'app-compte-update',
  templateUrl: './compte-update.component.html',
  styleUrls: ['./compte-update.component.css'],
})
export class CompteUpdateComponent {
  updateComptes$: ((comptes: ComptePatched[]) => Observable<Compte[]>) | null = null

  constructor(
    private readonly dialog: MatDialogRef<CompteUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public compte: Compte,
    private readonly toastrService: ToastrService,
  ) {
    this.updateComptes$ = updateComptes()
  }

  onSubmit(compte: ComptePatched) {
    if (this.updateComptes$) {
      this.updateComptes$([{ ...compte, id: this.compte.id }]).subscribe({
        next: () => {
          this.toastrService.success('Les modifications ont été prises en compte.')
          this.dialog.close()
        },
      })
    }
  }
}
