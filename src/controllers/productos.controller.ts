import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Productos} from '../models';
import {ProductosRepository} from '../repositories';
import {secured, SecuredType} from '../auth';

export class ProductosController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) {}

  @post('/productos', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  @secured(SecuredType.HAS_ROLES, ['ADMIN'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductos',
          }),
        },
      },
    })
    productos: Productos,
  ): Promise<Productos> {
    return this.productosRepository.create({
      ...productos,
      lastModified: new Date(Date.now()).toISOString(),
    });
  }

  @get('/productos/count', {
    responses: {
      '200': {
        description: 'Productos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Productos))
    where?: Where<Productos>,
  ): Promise<Count> {
    return this.productosRepository.count(where);
  }

  @get('/productos', {
    responses: {
      '200': {
        description: 'Array of Productos model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Productos))
    filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.productosRepository.find(filter);
  }

  @patch('/productos', {
    responses: {
      '200': {
        description: 'Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  @secured(SecuredType.HAS_ROLES, ['ADMIN'])
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Productos,
    @param.query.object('where', getWhereSchemaFor(Productos))
    where?: Where<Productos>,
  ): Promise<Count> {
    return this.productosRepository.updateAll(
      {...productos, lastModified: new Date(Date.now()).toISOString()},
      where,
    );
  }

  @get('/productos/{id}', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Productos> {
    return this.productosRepository.findById(id);
  }

  @patch('/productos/{id}', {
    responses: {
      '204': {
        description: 'Productos PATCH success',
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  @secured(SecuredType.HAS_ROLES, ['ADMIN'])
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Productos,
  ): Promise<void> {
    await this.productosRepository.updateById(id, {
      ...productos,
      lastModified: new Date(Date.now()).toISOString(),
    });
  }

  @put('/productos/{id}', {
    responses: {
      '204': {
        description: 'Productos PUT success',
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  @secured(SecuredType.HAS_ROLES, ['ADMIN'])
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productos: Productos,
  ): Promise<void> {
    await this.productosRepository.replaceById(id, {
      ...productos,
      lastModified: new Date(Date.now()).toISOString(),
    });
  }

  @del('/productos/{id}', {
    responses: {
      '204': {
        description: 'Productos DELETE success',
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  @secured(SecuredType.HAS_ROLES, ['ADMIN'])
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productosRepository.deleteById(id);
  }
}
