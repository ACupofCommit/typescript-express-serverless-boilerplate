'use strict'

import { createServer, proxy } from  'aws-serverless-express'
import { APIGatewayProxyHandler } from 'aws-lambda'
import app from './app'

const server = createServer(app)
export const index: APIGatewayProxyHandler = (event, context) => {
  proxy(server, event, context)
}
