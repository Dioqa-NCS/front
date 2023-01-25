import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCompteFormComponent } from './setting-compte-form.component';

describe('SettingCompteFormComponent', () => {
  let component: SettingCompteFormComponent;
  let fixture: ComponentFixture<SettingCompteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCompteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCompteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
