import { TestBed } from '@angular/core/testing'

import { CompteListResolverService } from './compte-list-resolver.service'

describe('CompteResolverService', () => {
  let service: CompteListResolverService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CompteListResolverService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
