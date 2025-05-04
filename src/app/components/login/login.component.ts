import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';

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
export class LoginComponent {
  loginForm = new FormBuilder().nonNullable.group({
    username: "",
    password: "",
  });

  readonly authenticationService = inject(AuthenticationService);
  readonly router = inject(Router);

  login() {
    this.authenticationService.login(this.loginForm.get("username")?.value as string, this.loginForm.get("password")?.value as string).subscribe({
      next: (res) => {
        this.router.navigate(["/home"]);
      }
    });
  }
}
