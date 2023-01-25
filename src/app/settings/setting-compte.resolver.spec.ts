import { TestBed } from '@angular/core/testing';

import { SettingCompteResolver } from './setting-compte.resolver';

describe('SettingCompteResolver', () => {
  let resolver: SettingCompteResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SettingCompteResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
