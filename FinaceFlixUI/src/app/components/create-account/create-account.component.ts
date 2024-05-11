import { ValidatorService } from './../../services/validator/validator.service';
import { AlertService } from './../../services/alert/alert.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserAccount } from 'src/app/models/UserAccount';
import { phrases } from 'src/app/shared/phrases/phrases';
import { AuthenticateService } from 'src/app/services/authenticate/authenticate.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private validatorService: ValidatorService,
    private accountService: AuthenticateService /*Criar serviço de conta*/
  ) {}

  account: UserAccount = new UserAccount();

  @ViewChild('nomeInput') nomeInputElement!: ElementRef;
  @ViewChild('emailInput') emailInputElement!: ElementRef;
  @ViewChild('senhaInput') senhaInputElement!: ElementRef;

  ngOnInit(): void {}

  onSubmit() {
    if (this.formValidator(this.account)) {

      this.accountService.createAccount(this.account).subscribe((result) => {

        this.alertService.showSuccessAlert(
          phrases.accountCreatedSucess,
          phrases.sucess
        );

      });
    }
  }

  private formValidator(data: UserAccount): boolean {
    if (!data.nome) {
      this.nomeInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writeName,
        phrases.requiredField
      );
      return false;
    }

    if (!data.email) {
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writeEmail,
        phrases.requiredField
      );
      return false;
    }

    if (!this.validatorService.isEmail(data.email)) {
      this.emailInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writeValidEmail,
        phrases.invalidEmail
      );
      return false;
    }

    if (!data.senha) {
      this.senhaInputElement.nativeElement.focus();
      this.alertService.showWarningAlert(
        phrases.writePassword,
        phrases.requiredField
      );
      return false;
    }

    if (!data.tipo) {
      this.alertService.showWarningAlert(
        phrases.chooseType,
        phrases.requiredField
      );
      return false;
    }

    /*
    não ta chegando

    fotoUrl!: string;
    */

    return true;
  }
}
