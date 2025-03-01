import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading: boolean = false;
  msgError: string = '';
  isSuccess: string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      //send data
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.isSuccess = res.message;

            setTimeout(() => {
              // 1 - save token
              localStorage.setItem('userToken', res.token);
              // 2 - decode token

              this.authService.saveUserData();
              // 3- navigate to home
              this.router.navigate(['/home']);
            }, 500);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.msgError = error.error.message;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
