import { KeycloakService, KeycloakConfig } from 'keycloak-angular';
import { environment } from '../../environments/environment';

/**
 * @author Supun Sameera
 * @version 1.0
 * @since 2018-09-06
 */

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                await keycloak.init({
                    config: {
                        url: environment.authUrl,
                        realm: environment.authRealm,
                        clientId: environment.authClientId
                    } as KeycloakConfig,
                    initOptions: {
                        onLoad: 'login-required',
                        checkLoginIframe: false
                    },
                    bearerExcludedUrls: [
                        '/assets',
                    ]
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}
