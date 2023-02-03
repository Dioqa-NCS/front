import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { SettingCompte } from '../setting.service'

@Component({
  selector: 'app-setting-compte',
  templateUrl: './setting-compte.component.html',
  styleUrls: ['./setting-compte.component.css'],
})
export class SettingCompteComponent implements OnInit {
  settingCompte: SettingCompte | null = null

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.settingCompte = data['settingCompte']
    })
  }
}
