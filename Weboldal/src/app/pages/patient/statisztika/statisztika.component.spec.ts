import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisztikaComponent } from './statisztika.component';

describe('StatisztikaComponent', () => {
  let component: StatisztikaComponent;
  let fixture: ComponentFixture<StatisztikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisztikaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisztikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
