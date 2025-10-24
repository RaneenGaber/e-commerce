import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from '../../../../core/services/auth/auth';
import {RoutePath} from '../../../../core/models/enums/route-path';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatCard,
    MatCardContent,
    MatSnackBarModule
  ],
  templateUrl: './login.html'
})
export class Login {
  isLoading = signal<boolean>(false);
  passwordVisible = signal<boolean>(false);

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['candidate', [Validators.required, Validators.minLength(3)]],
      password: ['Passw0rd!', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    // Validate form
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      this.showSnackBar('Please fill in all required fields correctly', 'error');
      return;
    }

    this.isLoading.set(true);

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.showSnackBar('Login successful! Redirecting...', 'success');
        this.router.navigate([`/${RoutePath.PRODUCT}`]);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.showSnackBar(error.message, 'error');
      }
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible: boolean) => !visible);
  }

  getControl(controlName: string) {
    return this.loginForm.get(controlName);
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.getControl(controlName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);

    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${minLength} characters`;
    }

    return '';
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
