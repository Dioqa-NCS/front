import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCompteUpdateComponent } from './setting-compte-update.component';

describe('SettingCompteUpdateComponent', () => {
  let component: SettingCompteUpdateComponent;
  let fixture: ComponentFixture<SettingCompteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCompteUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCompteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
