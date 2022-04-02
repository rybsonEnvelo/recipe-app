import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../shared/enums/State';
import { Role } from '../shared/enums/Role';
import { AuthResponse } from '../shared/interfaces/AuthResponse';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loadingButton!: ElementRef;
  @ViewChild('registerButton') registerButton!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  loginForm!: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
    this.authService.registerUserState$.subscribe({
      next: (state) => this.displayRegisterState(state),
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.authService.regex)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
  }

  onRegister() {
    this.clearError();
    this.authService.registerUserState$.next({ state: State.LOADING });

    this.authService.registerUser({
      email: this.loginForm!.get('email')!.value,
      password: this.loginForm!.get('password')!.value,
      role: Role.AUTHOR,
    });
  }

  displayRegisterState(response: AuthResponse) {
    const registerButton = this.registerButton.nativeElement as HTMLButtonElement;

    switch (response.state) {
      case State.LOADING:
        registerButton.classList.add('loading');
        break;
      case State.ERROR:
        registerButton.classList.remove('loading');
        this.displayRegisterError(response.errorCode!!);
        break;
      case State.SUCCESS:
        registerButton.classList.remove('loading');
        this.displayRegisterSuccess();
        this.loginForm.reset();
        this.registerButton.nativeElement.blur();
        break;
    }
  }

  displayRegisterError(errorCode: number) {
    switch (errorCode) {
      case 0:
        this.errorMsg = 'Brak połączenia z serwerem';
        break;
      case 400:
        this.errorMsg = 'Konto pod tym adresem email już istnieje';
        break;
    }
  }

  displayRegisterSuccess() {
    this.successMsg = 'Konto utworzone prawidłowo. Możesz się zalogować';

    setTimeout(() => {
      this.clearError();
    }, 2500);
  }

  clearError() {
    this.successMsg = '';
    this.errorMsg = '';
  }
}
