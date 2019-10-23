import {Entity, model, property} from '@loopback/repository';

@model()
export class Productos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'number',
    default: 0,
  })
  cantidad?: number;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
