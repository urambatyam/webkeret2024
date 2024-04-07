import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanacsComponent } from './tanacs.component';

describe('TanacsComponent', () => {
  let component: TanacsComponent;
  let fixture: ComponentFixture<TanacsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TanacsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TanacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
