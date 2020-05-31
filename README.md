# aws-serverless-typescript-express

## Install dependencies

```
$ yarn install
```

## Development

```
$ yarn dev
```

And then, open http://localhost:3000/local/

### Integration to DynamoDB

**Create DynamoDB Table:**
```
$ export AWS_ACCESS_KEY_ID=AKXXXXXXXXXXXXXXXXF5
$ export AWS_SECRET_ACCESS_KEY=LQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxVV
$ export AWS_DEFAULT_REGION=us-west-2
$ npx babel-node --config-file ./babel.config.js --extensions ".ts" -- bin/create-dynamodb-table.ts
```

**Create:**

```
$ curl -XPOST "http://localhost:3000/local/users/userA?action=signup"
$ curl -XPOST "http://localhost:3000/local/users/userA?action=purchase"
$ curl -XPOST "http://localhost:3000/local/users/userB?action=comment"
$ curl -XPOST "http://localhost:3000/local/users/userB?action=purchase"
$ curl -XPOST "http://localhost:3000/local/users/userC?action=signup"
$ curl -XPOST "http://localhost:3000/local/users/userC?action=login"
```

**Read:**

```
$ curl -XGET "http://localhost:3000/local/users/userA"
$ curl -XGET "http://localhost:3000/local/users/userB"
$ curl -XGET "http://localhost:3000/local/users/userC"
```

**Update:**

```
$ curl -XGET "http://localhost:3000/local/users/userA"
$ curl -XPUT "http://localhost:3000/local/users/userA?seq=0&action=updatedAction"
$ curl -XGET "http://localhost:3000/local/users/userA"
```

**Delete:**

```
$ curl -XGET "http://localhost:3000/local/users/userA"
$ curl -XDELETE "http://localhost:3000/local/users/userA?seq=0"
$ curl -XGET "http://localhost:3000/local/users/userA"
```

## Test
TODO

## Deployment

```
$ export AWS_ACCESS_KEY_ID=AKXXXXXXXXXXXXXXXXF5
$ export AWS_SECRET_ACCESS_KEY=LQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxVV
$ export AWS_DEFAULT_REGION=us-west-2
$ yarn deploy:dev
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present A Cup of Commit

