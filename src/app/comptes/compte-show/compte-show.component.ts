import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { Compte } from '../compte.service'
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
export class CompteShowComponent implements OnInit {
  compte: Compte | null = null

  details?: detail[] = []

  expandDetail = true

  hideModifyButton = false

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.compte = data['compte']
      if (this.compte) {
        this.initDetails(this.compte)
      }
    })
  }

  initDetails(compte: Compte) {
    this.details?.push({
      title: 'Informations sur le compte',
      content: `${compte.prenom} ${compte.nom}`,
      break: compte.mail,
    }, {
      title: 'Téléphone',
      content: compte.tel,
    }, {
      title: 'Email de facturation',
      content: compte.mailFacturation ?? compte.mail,
    }, {
      title: 'Ville de facturation',
      content: compte.villeFacturation,
    }, {
      title: 'Adresse de facturation',
      content: compte.adresseFacturation,
    }, {
      title: 'Code postal de facturation',
      content: compte.codePostalFacturation,
    }, {
      title: 'Téléphone de facturation',
      content: compte.telFacturation ?? compte.tel,
    }, {
      title: 'Reduction',
      content: `${compte.reductionPrix} %`,
    })

    if (compte.typeentreprise) {
      this.details?.splice(-1, 0, {
        title: 'Type d\'entreprise',
        content: compte.typeentreprise.nom,
      })
    }
  }

  onModify() {
    this.expandDetail = false
    this.dialog.open(CompteUpdateComponent, {
      data: this.compte,
    })
  }

  onExpandedDetail() {
    this.expandDetail = !this.expandDetail

    if (this.expandDetail) {
      this.hideModifyButton = false
      return
    }
    this.hideModifyButton = true
  }
}
