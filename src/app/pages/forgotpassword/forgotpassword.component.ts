import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  step: number = 1;

  isLoding: boolean = false;
  private router = inject(Router);
  private readonly authService = inject(AuthService);
  verifyEmail = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCode = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });
  rePassword = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  verifyEmailSubmit(): void {
    if (this.verifyEmail.valid) {
      this.isLoding = true;
      this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next: (res) => {
          let emailName = this.verifyEmail.get('email')?.value;
          this.rePassword.get('email')?.patchValue(emailName!);
          if (res.statusMsg === 'success') {
            this.isLoding = false;
            this.step = 2;
          }
        },
        error: (er) => {
          console.log(er);
        },
      });
    } else {
      this.verifyEmail.markAllAsTouched();
    }
  }
  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.isLoding = true;
      this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next: (res) => {
          this.isLoding = false;
          if (res.status === 'Success') {
            this.step = 3;
          }
        },
        error: (er) => {
          console.log(er);
        },
      });
    } else {
      this.verifyCode.markAllAsTouched();
    }
  }
  rePasswordSubmit(): void {
    if (this.rePassword.valid) {
      this.isLoding = true;
      this.authService.setNewPassword(this.rePassword.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this.authService.saveUserData();
          this.router.navigate(['/home']);
        },
        error: (er) => {
          console.log(er);
        },
      });
    } else {
      this.rePassword.markAllAsTouched();
    }
  }
}
