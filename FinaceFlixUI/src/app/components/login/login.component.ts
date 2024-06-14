import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { phrases } from 'src/app/shared/phrases/phrases';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/dtos/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticateService,
    private alertService: AlertService,
    private router: Router
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      remember: [null],
    });
  }

  private getEmail() {
    return this.form.get('email');
  }

  private getPassword() {
    return this.form.get('password');
  }

  private getRemember() {
    return this.form.get('remember');
  }

  private validateFields(): boolean {
    if (this.getEmail()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.writeValidEmail,
        phrases.invalidEmail
      );
      return false;
    }

    if (this.getPassword()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.writePassword,
        phrases.invalidPassword
      );
      return false;
    }

    return true;
  }

  private redirectToMainMenu() {
    this.router.navigate(['home']);
  }

  protected login() {
    if (this.validateFields() === false || this.form.invalid) {
      return;
    } else {
      this.alertService.showLoadingAlert('Autenticando...');

      const credentials: LoginRequest = {
        email: this.getEmail()!.value,
        senha: this.getPassword()!.value,
      };
      // console.log(credentials);

      this.authenticationService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.nome);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userType', response.tipo);

          this.alertService.showSuccessAlert(
            phrases.loginSucess,
            phrases.sucess
          );
          setTimeout(() => {
            this.alertService.closeAlert();
            this.redirectToMainMenu();
          }, 1000);
        },
        error: (error) => {
          if (error.error.message != null) {
            this.alertService.showErrorAlert(
              error.error.message,
              phrases.loginFailed
            );
          } else {
            this.alertService.showErrorAlert(
              phrases.loginErrorContactSupport,
              phrases.errorPhrase
            );
          }
        },
      });
    }
  }
}
