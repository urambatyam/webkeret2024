import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeresComponent } from './meres.component';

describe('MeresComponent', () => {
  let component: MeresComponent;
  let fixture: ComponentFixture<MeresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
