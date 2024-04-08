import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReszletekComponent } from './reszletek.component';

describe('ReszletekComponent', () => {
  let component: ReszletekComponent;
  let fixture: ComponentFixture<ReszletekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReszletekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
