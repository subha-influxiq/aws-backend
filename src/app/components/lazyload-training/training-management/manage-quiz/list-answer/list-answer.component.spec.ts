import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnswerComponent } from './list-answer.component';

describe('ListAnswerComponent', () => {
  let component: ListAnswerComponent;
  let fixture: ComponentFixture<ListAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
