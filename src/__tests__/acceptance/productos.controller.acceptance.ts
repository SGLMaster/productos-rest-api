import {ProductosRestApiApplication} from '../..';
import {Client, expect} from '@loopback/testlab';
import {givenEmptyDatabase, givenProduct} from '../helpers/database.helpers';
import {setupApplication} from './test-helper';

describe('Productos (aceptación)', () => {
  let app: ProductosRestApiApplication;
  let client: Client;

  before(givenEmptyDatabase);
  before(async () => {
    ({app, client} = await setupApplication());
  });
  after(async () => {
    await app.stop();
  });

  it('retorna los detalles de un producto', async () => {
    // arrange
    const product = await givenProduct({
      id: 'iphone_x',
      nombre: 'iPhone X',
      desc: 'A smartphone from Apple Inc.',
      cantidad: 10,
      peso: 100,
    });
    const expected = Object.assign({id: product.id}, product);

    // act
    const response = await client.get('/productos/iphone_x');

    // assert
    expect(response.body).to.containEql(expected);
  });
});
