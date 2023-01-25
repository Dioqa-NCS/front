import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr'
import { Compte, ComptePatched, CompteService } from '../compte.service'

@Component({
  selector: 'app-compte-update',
  templateUrl: './compte-update.component.html',
  styleUrls: ['./compte-update.component.css'],
})
export class CompteUpdateComponent {
  constructor(
    private readonly compteService: CompteService,
    private readonly dialog: MatDialogRef<CompteUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public compte: Compte,
    private readonly toastrService: ToastrService,
  ) {
  }

  onSubmit(compte: ComptePatched) {
    this.compteService.updateComptes([{ ...compte, id: this.compte.id }]).subscribe({
      next: () => {
        this.compteService.getCompte(this.compte.id, {
          $expand: 'typeentreprise($select=nom)',
        }).subscribe(compteFind => {
          this.toastrService.success('Les modifications ont été prises en compte.')
          this.dialog.close(compteFind)
        })
      },
    })
  }
}
