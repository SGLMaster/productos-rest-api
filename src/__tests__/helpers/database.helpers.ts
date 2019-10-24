import {
  ProductosRepository,
  UserRepository,
  RoleRepository,
  UserRoleRepository,
} from '../../repositories';
import {Productos} from '../../models/productos.model';
import {TestdbDataSource} from '../fixtures/datasources/testdb.datasource';

export const testdb = new TestdbDataSource();

export async function givenEmptyDatabase() {
  await new ProductosRepository(testdb).deleteAll();
  await new UserRepository(testdb).deleteAll();
  await new RoleRepository(testdb).deleteAll();
  await new UserRoleRepository(testdb).deleteAll();
}

export function givenProductData(data?: Partial<Productos>) {
  return Object.assign(
    {
      id: 'iphone_x',
      nombre: 'iPhone X',
      desc: 'A smartphone from Apple Inc.',
      cantidad: 10,
      peso: 100,
    },
    data,
  );
}

export async function givenProduct(data?: Partial<Productos>) {
  return new ProductosRepository(testdb).create(givenProductData(data));
}
