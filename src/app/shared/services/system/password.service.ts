import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  public generatePassword(): string {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz',
      upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers = '0123456789',
      symbols = '_#$^+=!*()@%&';

    let randPos = 0;

    let randomPassword = '';

    for (let i = 0; i < 3; ++i) {
      randPos = Math.floor(Math.random() * randomPassword.length);
      const randLChar = lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
      randomPassword = [
        randomPassword.slice(0, randPos),
        randLChar,
        randomPassword.slice(randPos),
      ].join('');
    }

    for (let i = 0; i < 3; ++i) {
      randPos = Math.floor(Math.random() * randomPassword.length);
      const randUChar = upperChars.charAt(Math.floor(Math.random() * upperChars.length));
      randomPassword = [
        randomPassword.slice(0, randPos),
        randUChar,
        randomPassword.slice(randPos),
      ].join('');
    }

    const randNum = numbers.charAt(Math.floor(Math.random() * numbers.length));
    randPos = Math.floor(Math.random() * randomPassword.length);
    randomPassword = [
      randomPassword.slice(0, randPos),
      randNum,
      randomPassword.slice(randPos),
    ].join('');

    const randSymbol = symbols.charAt(Math.floor(Math.random() * symbols.length));
    randPos = Math.floor(Math.random() * randomPassword.length);
    randomPassword = [
      randomPassword.slice(0, randPos),
      randSymbol,
      randomPassword.slice(randPos),
    ].join('');

    return randomPassword;
  }
}
