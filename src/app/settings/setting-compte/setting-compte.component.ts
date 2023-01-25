import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-setting-compte',
  templateUrl: './setting-compte.component.html',
  styleUrls: ['./setting-compte.component.css'],
})
export class SettingCompteComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data['settingCompte'])
    })
  }
}
