import { ValidatorService } from './../../services/validator/validator.service';
import { AuthenticateService } from '../../services/authenticate/authenticate.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AlertService } from 'src/app/services/alert/alert.service';
import { phrases } from 'src/app/shared/phrases/phrases';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticateService,
    private alertService: AlertService,
    private validatorService: ValidatorService
  ) {}

  user: LoginRequest = new LoginRequest();

  @ViewChild('emailInput') emailInputElement!: ElementRef;
  @ViewChild('senhaInput') senhaInputElement!: ElementRef;

  ngOnInit(): void {

    this.emailInputElement.nativeElement.focus();

  }

  onSubmit() {
    if (this.formValidator()) {
      this.authenticationService.login(this.user).subscribe(
        (result) => {
          localStorage.setItem('token', result.token);
          this.alertService.showSuccessAlert(
            phrases.loginSucess,
            phrases.sucess
          );

          setTimeout(() => {
            window.location.href = '/home';
          }, 1000);
        },
        (error) => {
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
        }
      );
    }
  }

  private formValidator(): boolean {
    if (!this.user.senha && !this.user.email) {
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.loginErrorEmailPasswordNull,
        phrases.requiredFields
      );
      return false;
    } else if (!this.validatorService.isEmail(this.user.email)) {
      this.emailInputElement.nativeElement.value = '';
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writeValidEmail,
        phrases.invalidEmail
      );
      return false;
    } else if (!this.user.senha) {
      this.senhaInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writePassword,
        phrases.requiredField
      );
      return false;
    } else if (!this.user.email) {
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writeEmail,
        phrases.requiredField
      );

      return false;
    }

    return true;
  }
}
