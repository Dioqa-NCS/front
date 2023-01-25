import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCompteComponent } from './setting-compte.component';

describe('SettingCompteComponent', () => {
  let component: SettingCompteComponent;
  let fixture: ComponentFixture<SettingCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
