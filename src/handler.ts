'use strict'

import * as awsServerlessExpress from  'aws-serverless-express'
import { app } from './app'
import { Context } from 'aws-lambda'

const server = awsServerlessExpress.createServer(app)
export const index = (event, context: Context) => {
  awsServerlessExpress.proxy(server, event, context)
}
