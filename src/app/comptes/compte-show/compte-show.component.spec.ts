import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteShowComponent } from './compte-show.component';

describe('CompteShowComponent', () => {
  let component: CompteShowComponent;
  let fixture: ComponentFixture<CompteShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
