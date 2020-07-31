import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})

export class GadgetTracerLogService {

  constructor(protected httpClient: HttpClient, protected keycloakService: KeycloakService) {

  }

}
