import {inject, ValueOrPromise} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './testdb.datasource.json';

export class TestdbDataSource extends juggler.DataSource {
  static dataSourceName = 'memorydb';

  constructor(
    @inject('datasources.config.memorydb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}

export const testdb: TestdbDataSource = new TestdbDataSource();
