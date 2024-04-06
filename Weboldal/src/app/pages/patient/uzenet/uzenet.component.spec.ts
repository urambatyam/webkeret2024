import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UzenetComponent } from './uzenet.component';

describe('UzenetComponent', () => {
  let component: UzenetComponent;
  let fixture: ComponentFixture<UzenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UzenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UzenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
