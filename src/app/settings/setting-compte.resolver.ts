import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { SettingCompte, SettingService } from './setting.service'

@Injectable({
  providedIn: 'root',
})
export class SettingCompteResolver implements Resolve<SettingCompte> {
  constructor(public settingService: SettingService) {
  }

  resolve() {
    return this.settingService.getSettingCompte({
      $expand: 'typeentreprise($select=nom)',
    })
  }
}
