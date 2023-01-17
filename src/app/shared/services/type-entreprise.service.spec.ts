import { TestBed } from '@angular/core/testing';

import { TypeEntrepriseService } from './type-entreprise.service';

describe('TypeEntrepriseServiceService', () => {
  let service: TypeEntrepriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeEntrepriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
