

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';


import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';


const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    return authService.checkAuthentication().pipe(
      tap(isAuthenticated => {
        // console.log('Authenticated:', isAuthenticated)
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };


//CanMatch:Podamos entrar a una ruta que tenga cierto match con el url
//CanActivate:que pueda activar una ruta en particular

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // console.log('CanActivate');
  // console.log({ route, state });

  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  // console.log('CanMatch');
  // console.log({ route, segments });

  return checkAuthStatus();
};
