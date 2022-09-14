import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligationHistoryComponent } from './obligation-history.component';

describe('ObligationHistoryComponent', () => {
  let component: ObligationHistoryComponent;
  let fixture: ComponentFixture<ObligationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObligationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObligationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
