import { HTTPOptions } from 'aws-sdk'

export const getDynamoDBOptions = (_region?: string, accessKeyId?: string, secretAccessKey?: string, _endpoint?: string) => {
  const region = _region || process.env.AWS_DEFAULT_REGION || 'us-west-2'
  if (!region) throw new Error('process.env.AWS_DEFAULT_REGION is required')

  const endpoint = _endpoint || process.env.DYNAMO_ENDPOINT || getDDEndpoint(region)
  const httpOptions: HTTPOptions = { timeout: 3000 }
  return {apiVersion: '2012-08-10', region, endpoint, accessKeyId, secretAccessKey, httpOptions }
}

const getDDEndpoint = (region: string) => {
  return region.split('-')[0] === 'cn'
    ? `https://dynamodb.${region}.amazonaws.com.cn`
    : `https://dynamodb.${region}.amazonaws.com`
}

export const getWorld = () => {
  return "world"
}
