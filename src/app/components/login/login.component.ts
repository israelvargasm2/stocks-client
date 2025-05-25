import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = new FormBuilder().nonNullable.group({
    username: "",
    password: "",
  });

  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly headerService = inject(HeaderService);
  private readonly _snackBar  = inject(MatSnackBar);

  isLoading: boolean = false;

  ngOnInit(): void {
    this.headerService.show = false;
  }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.get("username")?.value as string, this.loginForm.get("password")?.value as string).subscribe({
      next: (res) => {
        this.router.navigate(["/dashboard"]);
        this.isLoading = false;
      }, error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 5 * 1000,
            data: "Usuario o contraseña no validos."
          });
        }
        this.isLoading = false;
      }
    });
  }
}
