import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      loginError: new FormControl(false),
      registering: new FormControl(false),
    });
  }

  public onSubmit(): void {
    this.authService.authenticateUser(this.loginForm.value).subscribe((res) => {
      sessionStorage.setItem('token', res);
      this.router.navigateByUrl('/home');
    });
  }

  public openUserRegistration(event: Event): void {
    event.preventDefault();
    this.registering.setValue(true);
  }

  public cancelUserRegistration(): void {
    this.registering.setValue(false);
  }

  public get loginError(): AbstractControl {
    return this.loginForm.get('loginError');
  }

  public get registering(): AbstractControl {
    return this.loginForm.get('registering');
  }
}
