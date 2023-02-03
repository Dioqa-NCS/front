import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Observable } from 'rxjs'
import { Compte, fetchCompte } from '../compte.service'
import { CompteUpdateComponent } from '../compte-update/compte-update.component'

interface detail {
  title: string,
  content: string,
  break?: string
}

@Component({
  selector: 'app-compte-show',
  templateUrl: './compte-show.component.html',
  styleUrls: ['./compte-show.component.css'],
})
export class CompteShowComponent {
  compte$ = fetchCompte()

  compte: Compte | null = null

  details?: detail[] = []

  stepDetail = 0

  hideModifyButton = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.compte$({
      $expand: 'typeentreprise($select=nom)',
    }).subscribe(compte => {
      this.compte = compte
      this.initDetails()
    })
  }

  initDetails() {
    if (this.compte) {
      this.details = []
      this.details?.push({
        title: 'Informations sur le compte',
        content: `${this.compte.prenom} ${this.compte.nom}`,
        break: this.compte.mail,
      }, {
        title: 'Téléphone',
        content: this.compte.tel,
      }, {
        title: 'Email de facturation',
        content: this.compte.mailFacturation ?? this.compte.mail,
      }, {
        title: 'Ville de facturation',
        content: this.compte.villeFacturation,
      }, {
        title: 'Adresse de facturation',
        content: this.compte.adresseFacturation,
      }, {
        title: 'Code postal de facturation',
        content: this.compte.codePostalFacturation,
      }, {
        title: 'Téléphone de facturation',
        content: this.compte.telFacturation ?? this.compte.tel,
      }, {
        title: 'Reduction',
        content: `${this.compte.reductionPrix} %`,
      })

      if (this.compte.typeentreprise) {
        this.details?.splice(-1, 0, {
          title: 'Type d\'entreprise',
          content: this.compte.typeentreprise.nom,
        })
      }
    }
  }

  onModify() {
    this.onOpenedDetail(-1)
    this.dialog.open(CompteUpdateComponent, {
      data: this.compte,
    }).afterClosed().subscribe({
      next: () => {
        if (this.compte) {
          this.compte$({
            $expand: 'typeentreprise($select=nom)',
          }).subscribe(compte => {
            this.compte = { ...this.compte, ...compte }
            this.initDetails()
          })
        }
      },
    })
  }

  onClosedDetail() {
    this.hideModifyButton = true
  }

  onOpenedDetail(index: number) {
    this.stepDetail = index
    this.hideModifyButton = false
  }
}
