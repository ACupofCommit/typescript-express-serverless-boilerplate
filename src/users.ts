import AWS from 'aws-sdk'
import { Router } from 'express'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { getDynamoDBOptions } from './util'

const ddc = new AWS.DynamoDB.DocumentClient(getDynamoDBOptions())
const router = Router()
const TableName = 'ServerlessExample-UserActions'

// Create
router.post('/:userId', async (req, res) => {
  const { action } = req.query
  const { userId } = req.params
  const previous = await ddc.query({
    TableName: TableName,
    ExpressionAttributeValues: { ":userId": userId },
    KeyConditionExpression: "userId = :userId",
    Limit: 1,
    ScanIndexForward: false,
  }).promise()
  const seq = previous?.Items?.[0] ? previous.Items[0].seq + 1 : 0
  const Item = { userId, seq, ts: new Date().getTime(), action }
  await ddc.put({ TableName, Item }).promise()
  res.status(201).end()
})

// Read
router.get('/', async (req, res) => {
  const param: DocumentClient.ScanInput = { TableName, Limit: 200 }
  const result = await ddc.scan(param).promise()
  res.json(result.Items)
})

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params
  const params: DocumentClient.QueryInput = {
    TableName: TableName,
    ExpressionAttributeValues: { ":userId": userId },
    KeyConditionExpression: "userId = :userId",
    Limit: 200,
  }
  const result = await ddc.query(params).promise()
  res.json(result.Items || null)
})

// Update
router.put('/:userId', async (req, res) => {
  const { action } = req.query
  const seq = Number(req.query.seq)
  const { userId } = req.params
  const r = await ddc.get({ TableName, Key: { userId, seq }}).promise()
  if (typeof r.Item !== 'object') return new Error('Not found userId: ' + userId)

  const updatedItem = { ...r.Item, action }
  await ddc.put({ TableName, Item: updatedItem }).promise()
  res.status(202).end()
})

// Delete
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params
  const seq = Number(req.query.seq)
  const Key = { userId, seq }
  await ddc.delete({ TableName, Key }).promise()
  res.status(202).end()
})

export default router
