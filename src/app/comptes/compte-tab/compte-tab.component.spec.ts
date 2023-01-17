import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteTabComponent } from './compte-tab.component';

describe('CompteTabComponent', () => {
  let component: CompteTabComponent;
  let fixture: ComponentFixture<CompteTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
