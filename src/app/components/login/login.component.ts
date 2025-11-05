import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { HeaderService } from '../header/header.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faG } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm = new FormBuilder().nonNullable.group({
    username: "",
    password: "",
  });

  faG = faG;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly headerService = inject(HeaderService);

  isLoading: boolean = false;

  ngOnInit(): void {
    this.loginForm.get("username")?.disable();
    this.loginForm.get("password")?.disable();
    this.headerService.show = false;
  }

  ngAfterViewInit(): void {
    this.authenticationService.initializeLoginButton((jwt: string) => {
      // Mandar token a NestJS
      this.authenticationService.sendTokenToBackend(jwt).subscribe({
        next: (res) => {
          this.router.navigate(["/dashboard"]);
        }
      });
    });
  }

  login() {
    /*this.isLoading = true;
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
    });*/
  }
}
