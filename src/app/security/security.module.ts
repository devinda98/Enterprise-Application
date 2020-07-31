import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './security.init';
import { SecurityAuthGuard } from './security.authguard';


/**
 * @author Supun Sameera
 * @version 1.0
 * @since 2018-09-06
 */

@NgModule({
  imports:
    [
      CommonModule,
      KeycloakAngularModule,
    ],
  providers:
    [
      {
        provide: APP_INITIALIZER,
        useFactory: initializer,
        multi: true,
        deps: [KeycloakService]
      },
      SecurityAuthGuard,
    ],
})
export class SecurityModule { }
