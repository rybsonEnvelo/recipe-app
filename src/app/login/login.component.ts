import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../shared/enums/Role';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.authService.regex)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    console.log('ASd');
  }

  onRegister() {
    this.authService.registerUser({
      id: 0,
      email: this.loginForm!.get('email')!.value,
      password: this.loginForm!.get('password')!.value,
      role: Role.AUTHOR
    });
  }
}
