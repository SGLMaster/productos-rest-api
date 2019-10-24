import {ProductosRestApiApplication} from '../..';
import {createRestAppClient, Client} from '@loopback/testlab';
import {testdb} from '../helpers/database.helpers';

export async function setupApplication(): Promise<AppWithClient> {
  const app = new ProductosRestApiApplication({
    rest: {
      port: 0,
    },
  });
  await app.boot();
  await app.start();

  // needed so the database injected to the repositories isn't the default
  app.bind('datasources.memorydb').to(testdb);

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: ProductosRestApiApplication;
  client: Client;
}
