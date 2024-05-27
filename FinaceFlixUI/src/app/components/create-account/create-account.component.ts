import { AlertService } from './../../services/alert/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { phrases } from 'src/app/shared/phrases/phrases';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from 'src/app/dtos/UserAccount';
import { UtilsService } from 'src/app/shared/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private accountService: AuthenticateService,
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private router: Router
  ) {}

  form!: FormGroup;
  private pictureBase64!: string;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      picture: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      passwordOne: [null, Validators.required],
      passwordTwo: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }

  private getPicture() {
    return this.form.get('picture');
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.utils
        .convertToBase64(file)
        .then((base64) => {
          this.pictureBase64 = base64.replace(
            /^data:image\/[a-zA-Z]+;base64,/,
            ''
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  private getName() {
    return this.form.get('name');
  }

  private getEmail() {
    return this.form.get('email');
  }

  private getPasswordOne() {
    return this.form.get('passwordOne');
  }

  private getPasswordTwo() {
    return this.form.get('passwordTwo');
  }

  private getRole() {
    return this.form.get('role');
  }

  private validateFields(): boolean {
    if (this.getName()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.writeValidName,
        phrases.invalidName
      );
      return false;
    }

    if (this.getEmail()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.writeValidEmail,
        phrases.invalidEmail
      );
      return false;
    }

    if (this.getPasswordOne()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.writePassword,
        phrases.invalidPassword
      );
      return false;
    }

    if (this.getPasswordTwo()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.writePassword,
        phrases.invalidPassword
      );
      return false;
    }

    if (this.getRole()!.invalid) {
      this.alertService.showWarningAlert(
        phrases.chooseValidRole,
        phrases.warning
      );
      return false;
    }
    if (this.getPasswordOne()?.value !== this.getPasswordTwo()?.value) {
      this.alertService.showInfoAlert(
        phrases.passwordMustMatch,
        phrases.warning
      );
      return false;
    }
    return true;
  }

  protected createAccount() {
    if (this.validateFields() === false || this.form.invalid) {
      return;
    } else {
      this.alertService.showLoadingAlert('Criando conta...');

      // console.log(this.pictureBase64);

      const account: UserAccount = {
        Nome: this.getName()!.value,
        Email: this.getEmail()!.value,
        Senha: this.getPasswordOne()!.value,
        Tipo: this.getRole()!.value,
        FotoBase64: this.pictureBase64,
      };

      this.pictureBase64 = '';

      this.accountService.createAccount(account).subscribe({
        next: (response) => {
          console.log(response.responseBody);

          this.alertService.showSuccessAlert(
            'Conta criada com sucesso!',
            'Sucesso!'
          );

          setTimeout(() => {
            this.redirectToLogin();
          }, 2000);

        },
        error: (error) => {
          console.log(error);
          this.alertService.showErrorAlert(
            'A conta não foi criada com sucesso!',
            'Erro!'
          );
        },
      });

      this.form.reset();
    }
  }
}
