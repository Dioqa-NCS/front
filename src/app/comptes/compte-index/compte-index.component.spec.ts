import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CompteIndexComponent } from './compte-index.component'

describe('CompteIndexComponent', () => {
  let component: CompteIndexComponent
  let fixture: ComponentFixture<CompteIndexComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompteIndexComponent],
    })
      .compileComponents()

    fixture = TestBed.createComponent(CompteIndexComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
