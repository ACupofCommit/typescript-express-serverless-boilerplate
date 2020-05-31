import express, { ErrorRequestHandler } from 'express'
import * as bodyParser from 'body-parser'
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import routerUsers from './users'
import { getWorld } from './util'

const errorHandler: ErrorRequestHandler = (err,req,res,next) => {
  if (res.headersSent) return next(err)

  res.status(500)
  res.send({ message: err.message })
}

const app = express()
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', routerUsers)
app.use('/', (req,res) => res.json({ hello: getWorld() }))
app.use(errorHandler)

export default app
