import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CategoryComponent } from './components/category/category.component';
import { CoursesComponent } from './components/courses/courses.component';
import { VideosComponent } from './components/videos/videos.component';
import { CertificatesComponent } from './components/certificates/certificates.component';

const routes: Routes = [

//Not Authenticated
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{path:'login',component:LoginComponent,pathMatch:'full'},
{path:'create-account',component:CreateAccountComponent,pathMatch:'full'},

//Autheticated
{path:'',component:HomeComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'home',component:HomeComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'categories',component:CategoryComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'courses',component:CoursesComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'videos',component:VideosComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'certificates',component:CertificatesComponent,pathMatch:'full', canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
