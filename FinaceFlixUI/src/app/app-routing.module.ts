import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [

//Not Authenticated

{ path: '', redirectTo: 'login', pathMatch: 'full' },
{path:'login',component:LoginComponent,pathMatch:'full'},
{path:'create-account',component:CreateAccountComponent,pathMatch:'full'},

//Autheticated

{path:'',component:HomeComponent,pathMatch:'full', canActivate: [AuthGuard]},
{path:'home',component:HomeComponent,pathMatch:'full', canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
