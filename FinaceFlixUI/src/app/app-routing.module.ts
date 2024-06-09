import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateAccountComponent } from './components/create-account/create-account.component';

import { CoursesComponent } from './components/course-feature/courses/courses.component';
import { VideosComponent } from './components/video-feature/videos/videos.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { CategoryComponent } from './components/category-feature/category/category.component';
import { AddCategoryComponent } from './components/category-feature/add-category/add-category.component';
import { EditCategoryComponent } from './components/category-feature/edit-category/edit-category.component';
import { AddCourseComponent } from './components/course-feature/add-course/add-course.component';
import { EditCourseComponent } from './components/course-feature/edit-course/edit-course.component';
import { AddVideoComponent } from './components/video-feature/add-video/add-video.component';
import { EditVideoComponent } from './components/video-feature/edit-video/edit-video.component';
import { VideoListComponent } from './components/video-feature/video-list/video-list.component';

const routes: Routes = [

//Not Authenticated
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{path:'login',component:LoginComponent,pathMatch:'full'},
{path:'create-account',component:CreateAccountComponent,pathMatch:'full'},

//Autheticated
{path:'',component:HomeComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'home',component:HomeComponent,pathMatch:'full', canActivate: [AuthGuard]},


//Category
{path:'categories',component:CategoryComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'category/add',component:AddCategoryComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'category/edit/:id',component:EditCategoryComponent,pathMatch:'full', canActivate: [AuthGuard]},


//Course
{path:'courses',component:CoursesComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'course/add',component:AddCourseComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'course/edit/:id',component:EditCourseComponent,pathMatch:'full', canActivate: [AuthGuard]},


// Video
{path:'videos',component:VideosComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'video/add',component:AddVideoComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'video/edit',component:EditVideoComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'video/list',component:VideoListComponent,pathMatch:'full', canActivate: [AuthGuard]},

//Certificates
{path:'certificates',component:CertificatesComponent,pathMatch:'full', canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
