import { Model } from 'objection'
import * as Knex from 'knex'

Model.knex(
  Knex.default.knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './adventure-works.db',
    },
  }),
)

export class Product extends Model {
  static tableName = 'Product'
  static idColumn = 'ProductID'
}

export class SalesOrderDetail extends Model {
  static tableName = 'SalesOrderDetail'
  static idColumn = 'SalesOrderDetailID'
}

export class SalesOrderHeader extends Model {
  static tableName = 'SalesOrderHeader'
  static idColumn = 'SalesOrderID'

  static relationMappings = {
    details: {
      relation: Model.HasManyRelation,
      modelClass: SalesOrderDetail,
      join: {
        from: 'SalesOrderHeader.SalesOrderID',
        to: 'SalesOrderDetail.SalesOrderID',
      },
    },
  }
}

export class Customer extends Model {
  static tableName = 'Customer'
  static idColumn = 'CustomerID'

  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: SalesOrderHeader,
      join: {
        from: 'Customer.CustomerID',
        to: 'SalesOrderHeader.CustomerID',
      },
    },
  }
}
