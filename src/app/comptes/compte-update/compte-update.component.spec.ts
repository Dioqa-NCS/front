import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteUpdateComponent } from './compte-update.component';

describe('CompteUpdateComponent', () => {
  let component: CompteUpdateComponent;
  let fixture: ComponentFixture<CompteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
