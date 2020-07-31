import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';

/**
 * @author Supun Sameera
 * @version 1.0
 * @since 2018-09-06
 */

@Injectable()
export class SecurityAuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router, protected keycloakService: KeycloakService) {
    super(router, keycloakService);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve, reject) => {      
      if (!this.authenticated) {
        this.keycloakService.login();
        return;
      }      
      this.keycloakService.getToken().then((token) => { sessionStorage.setItem('access_token', token); });
      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted: boolean = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        resolve(granted);
      }
    });
  }
}