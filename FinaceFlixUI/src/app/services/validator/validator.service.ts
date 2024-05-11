import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  public isEmail(text: string): boolean {

    // Expressão regular para validar um endereço de e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Testa se a string corresponde à expressão regular
    return emailRegex.test(text);
  }
}
