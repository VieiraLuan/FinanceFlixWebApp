import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { FooterLoginComponent } from './components/footer-login/footer-login.component';
import { GenericBackButtonComponent } from './shared/components/generic-back-button/generic-back-button.component';
import { GenericHeaderComponent } from './shared/components/generic-header/generic-header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    HeaderLoginComponent,
    FooterLoginComponent,
    GenericBackButtonComponent,
    GenericHeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
