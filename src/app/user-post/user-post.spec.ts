import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPost } from './user-post';

describe('UserPost', () => {
  let component: UserPost;
  let fixture: ComponentFixture<UserPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
