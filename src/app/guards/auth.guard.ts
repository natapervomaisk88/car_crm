import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from './auth.service';

export const AuthGuard = () => {
  const cookieService = inject(CookieService); // получаем сервис
  if (cookieService.check('email')) return true;
  return false;
  //return authService.isLoggedIn;
};
