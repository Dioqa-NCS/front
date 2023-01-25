import { TestBed } from '@angular/core/testing'

import { CompteListResolver } from './compte-list.resolver'

describe('CompteResolverService', () => {
  let service: CompteListResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CompteListResolver)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
