import { CreateTableInput } from 'aws-sdk/clients/dynamodb'
import to from 'await-to-js'
import AWS from 'aws-sdk'
import { getDynamoDBOptions } from '../src/util'

const ddb = new AWS.DynamoDB(getDynamoDBOptions())

const param: CreateTableInput = {
  TableName: 'ServerlessExample-UserActions',
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'userId', AttributeType: 'S' },
    { AttributeName: 'seq', AttributeType: 'N' },
    { AttributeName: 'ts', AttributeType: 'N' },
  ],
  KeySchema: [
    { AttributeName: 'userId', KeyType: 'HASH' },
    { AttributeName: 'seq', KeyType: 'RANGE' },
  ],
  GlobalSecondaryIndexes: [{
    Projection: { ProjectionType: 'ALL' },
    IndexName: 'IndexUserIdTs',
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },
      { AttributeName: 'ts', KeyType: 'RANGE' },
    ],
  }],
  StreamSpecification: {
    StreamEnabled: false
  },
}

const run = async () => {
  const [err] = await to(ddb.createTable(param).promise())
  if (err) console.log("Error", err)
  else console.log("Table Created: " + param.TableName)
}

if (require.main === module) run()
