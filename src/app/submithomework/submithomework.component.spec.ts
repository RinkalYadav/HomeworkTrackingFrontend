import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmithomeworkComponent } from './submithomework.component';

describe('SubmithomeworkComponent', () => {
  let component: SubmithomeworkComponent;
  let fixture: ComponentFixture<SubmithomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmithomeworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmithomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
