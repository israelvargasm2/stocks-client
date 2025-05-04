import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return authenticationService.isLoggedIn().pipe(
    map(isLogged => {
      if (!isLogged) {
        router.navigate(["/login"]);
      }
      return isLogged;
    })
  );
};
