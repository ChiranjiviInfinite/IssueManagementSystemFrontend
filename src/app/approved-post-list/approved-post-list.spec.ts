import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPostList } from './approved-post-list';

describe('ApprovedPostList', () => {
  let component: ApprovedPostList;
  let fixture: ComponentFixture<ApprovedPostList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedPostList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPostList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
