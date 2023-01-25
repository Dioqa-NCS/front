import { TestBed } from '@angular/core/testing'

import { CompteResolver } from './compte.resolver'

describe('CompteResolverService', () => {
  let service: CompteResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CompteResolver)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
