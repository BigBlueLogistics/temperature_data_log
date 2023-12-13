This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
docker compose build

docker compose up
```

Open [http://localhost:3100](http://localhost:3100) with your browser to see the result.

## API routes

The `app/api` directory is mapped to `/api/\*` and can be accessed on [http://localhost:3100/api/<name>](http://localhost:3100/api/<name>)

## MongoDB connection string

### development

> mongodb://mongo_1:3200,mongo_2:3300/?replicaSet=hawkeye-replset

### staging

> mongodb://mongo_1:5200,mongo_2:5300/?replicaSet=hawkeye-replset

### production

> mongodb://mongo_1:4200,mongo_2:4300/?replicaSet=hawkeye-replset

## Documentation

[https://www.mongodb.com/docs/v4.4/mongo/]()
