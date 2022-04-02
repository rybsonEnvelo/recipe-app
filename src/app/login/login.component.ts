import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '../shared/enums/State';
import { Role } from '../shared/enums/Role';
import { AuthResponse } from '../shared/interfaces/AuthResponse';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loginButton!: ElementRef;
  @ViewChild('registerButton') registerButton!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  loginForm!: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';
  registerSubscription!: Subscription;
  loginSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.registerSubscription = this.authService.registerUserState.subscribe({
      next: (state) => this.displayRegisterState(state),
    });
    this.loginSubscription = this.authService.loginUserState.subscribe({
      next: (state) => this.displayLoginState(state),
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.authService.regex)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  clearErrors() {
    this.successMsg = '';
    this.errorMsg = '';
  }

  // register
  onRegister() {
    this.clearErrors();
    this.authService.registerUserState.next({ state: State.LOADING });

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
      this.clearErrors();
    }, 2500);
  }

  //login
  onLogin() {
    this.authService.loginUserState.next({ state: State.LOADING });

    this.authService.loginUser({
      email: this.loginForm!.get('email')!.value,
      password: this.loginForm!.get('password')!.value,
    });
  }

  displayLoginState(response: AuthResponse) {
    const loginButton = this.loginButton.nativeElement as HTMLButtonElement;

    switch (response.state) {
      case State.LOADING:
        loginButton.classList.add('loading');
        break;
      case State.ERROR:
        loginButton.classList.remove('loading');
        this.displayLoginError(response.errorCode!!);
        break;
    }
  }

  displayLoginError(errorCode: number) {
    switch (errorCode) {
      case 0:
        this.errorMsg = 'Brak połączenia z serwerem';
        break;
      case 400:
        this.errorMsg = 'Konto nie istnieje';
        break;
    }
  }
}
