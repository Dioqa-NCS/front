import { TestBed } from '@angular/core/testing';

import { CompteResolverService } from './compte-resolver.service';

describe('CompteResolverService', () => {
  let service: CompteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
