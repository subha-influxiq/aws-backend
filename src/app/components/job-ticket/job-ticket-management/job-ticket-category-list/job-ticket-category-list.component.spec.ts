import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTicketCategoryListComponent } from './job-ticket-category-list.component';

describe('JobTicketCategoryListComponent', () => {
  let component: JobTicketCategoryListComponent;
  let fixture: ComponentFixture<JobTicketCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTicketCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTicketCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
