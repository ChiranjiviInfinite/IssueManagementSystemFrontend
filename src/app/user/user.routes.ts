import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth-guard';
import { Dashboard} from '../dashboard/dashboard';
import { ApprovedPostList } from '../approved-post-list/approved-post-list';
import { UserPost } from '../user-post/user-post';
import { CreatePost } from '../create-post/create-post';
export const userRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [

      // Approved Posts (Default)
      {
        path: '',
        component: ApprovedPostList
      },

      //  My Posts
      {
        path: 'user-posts',
        component: UserPost
      },

      //  Create Post
      {
        path: 'create-post',
        component: CreatePost
      }
    ]
  }
];
