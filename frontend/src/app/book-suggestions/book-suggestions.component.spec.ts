import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSuggestionsComponent } from './book-suggestions.component';

describe('BookSuggestionsComponent', () => {
  let component: BookSuggestionsComponent;
  let fixture: ComponentFixture<BookSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
