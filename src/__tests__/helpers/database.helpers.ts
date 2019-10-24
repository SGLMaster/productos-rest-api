import {
  ProductosRepository,
  UserRepository,
  RoleRepository,
  UserRoleRepository,
} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  await new ProductosRepository(testdb).deleteAll();
  await new UserRepository(testdb).deleteAll();
  await new RoleRepository(testdb).deleteAll();
  await new UserRoleRepository(testdb).deleteAll();
}
