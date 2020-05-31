import express, { Router, Response } from 'express'
import * as bodyParser from 'body-parser'
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'

export const app = express()
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', (req,res) => {
  res.json({ hello: 'world' })
})

