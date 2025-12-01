import { Routes } from '@angular/router';
import { AdminDashboard } from '../admin-dashboard/admin-dashboard'; 
import { CreatePost } from '../create-post/create-post';
import { PostList } from '../post-list-page/post-list-page';
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboard,
  children: [
      {
        path: '',           // /admin → shows PostList
        component: PostList
      },
      {
        path: 'create-post', // /admin/create-post
        component: CreatePost
      }
    ]
  }
];