import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkdetailsComponent } from './homeworkdetails.component';

describe('HomeworkdetailsComponent', () => {
  let component: HomeworkdetailsComponent;
  let fixture: ComponentFixture<HomeworkdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeworkdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeworkdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
