import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthState } from '../shared/enums/AuthState';
import { Role } from '../shared/enums/Role';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginButton') loadingButton!: ElementRef;
  @ViewChild('registerButton') registerButton!: ElementRef;
  loginForm!: FormGroup;
  isLoginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.authService.authState.subscribe({
      next: (state) => this.displayAuthState(state),
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
    this.authService.authState.next(AuthState.REGISTER_LOADING);

    this.authService.registerUser({
      id: 0,
      email: this.loginForm!.get('email')!.value,
      password: this.loginForm!.get('password')!.value,
      role: Role.AUTHOR,
    });
  }

  displayAuthState(value: string) {
    // const loadingButton = this.loadingButton.nativeElement as HTMLButtonElement;
    const registerButton = this.registerButton.nativeElement as HTMLButtonElement;
    if (value === AuthState.REGISTER_LOADING) registerButton.classList.add('loading');
    if (value === AuthState.REGISTER_ERROR) registerButton.classList.remove('loading');
    if (value === AuthState.REGISTER_SUCCESS) registerButton.classList.remove('loading');
  }
}
