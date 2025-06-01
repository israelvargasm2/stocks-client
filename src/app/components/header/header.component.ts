import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    private readonly authenticationService = inject(AuthenticationService);
    public readonly headerService = inject(HeaderService);

    logout() {
      this.authenticationService.logout();
    }

    getUser() {
      return localStorage.getItem("user");
    }
}
