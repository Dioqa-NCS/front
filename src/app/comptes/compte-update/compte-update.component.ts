import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Compte, ComptePatched, CompteService } from '../compte.service'

@Component({
  selector: 'app-compte-update',
  templateUrl: './compte-update.component.html',
  styleUrls: ['./compte-update.component.css'],
})
export class CompteUpdateComponent {
  constructor(
    public compteService: CompteService,
    public dialog: MatDialogRef<CompteUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public compte: Compte,
  ) {
  }

  onSubmit(compte: ComptePatched) {
    this.compteService.updateComptes([{ ...compte, id: this.compte.id }]).subscribe({})
  }
}
