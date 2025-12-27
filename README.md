# Kafka Test (NestJS producer / consumer + Kafka)

This repository contains a small NestJS example with a producer (HTTP service) and a consumer (Kafka microservice).
The producer exposes an HTTP API that requests user lists via Kafka (request/response) and emits user-created events.
The consumer listens for the request pattern and replies with the user list and also consumes the user-created events.

Key files:
- Producer HTTP controller/service: [`producer.AppController`](producer/src/app.controller.ts), [`producer.AppService`](producer/src/app.service.ts)
- Consumer Kafka handlers: [`consumer.AppController`](consumer/src/app.controller.ts), [`consumer.AppService`](consumer/src/app.service.ts)
- Compose setup: [docker-compose.yml](docker-compose.yml)

Prerequisites
- Docker & docker-compose
- (Optional) Node.js 18+ and npm to run services locally without Docker

Run with docker-compose (recommended)
1. From repository root:
   ```
   docker-compose up --build
   ```
2. This will start Kafka, create the topics, start the producer (HTTP on port 3001) and the consumer microservice.

Run locally (without Docker)
- Start Kafka separately and ensure env vars KAFKA_HOST and KAFKA_PORT point to the broker.
- In each of `producer/` and `consumer/`:
  ```
  npm install
  npm run start:dev
  ```
- Producer listens on port 3001 by default (see [`producer.main`](producer/src/main.ts)).

Testing with curl
- Get all users (producer sends a request to Kafka and awaits consumer reply):
  ```sh
  curl -sS http://localhost:3001/user | jq .
  ```
  Example expected output:
  ```json
  [
    { "id": 1, "name": "Tigran" },
    { "id": 2, "name": "Artur" }
  ]
  ```

- Create a new user (producer emits `user.created` event to Kafka; consumer will process it asynchronously):
  ```sh
  curl -sS -X POST http://localhost:3001/user \
    -H "Content-Type: application/json" \
    -d '{"id":3,"name":"Alice"}' | jq .
  ```
  Expected response:
  ```json
  { "ok": true }
  ```

- After creating a user, re-run the GET (may need to wait a moment for the consumer to process the event):
  ```sh
  curl -sS http://localhost:3001/user | jq .
  ```
  Expected output should include the newly created user once the event is consumed and the reply is returned by the consumer.

Notes and troubleshooting
- Topics are created automatically by the docker-compose kafka-init step; review [docker-compose.yml](docker-compose.yml) if topics fail to exist.
- If you see timeouts on GET /user, ensure the consumer microservice is connected to Kafka and listening for `user.get.all`. See [`consumer.AppController`](consumer/src/app.controller.ts).
- Logs:
  - Producer logs on startup and when receiving HTTP requests (container `nest-producer` / host 3001).
  - Consumer logs when events are processed (container `nest-consumer`).
- If running locally and you have CORS, network or broker address issues, ensure the environment variables `KAFKA_HOST` and `KAFKA_PORT` are correctly set for both services.

References
- Producer entry / HTTP bootstrap: [`producer.main`](producer/src/main.ts)
- Producer controller/service: [`producer.AppController`](producer/src/app.controller.ts), [`producer.AppService`](producer/src/app.service.ts)
- Consumer controller/service: [`consumer.AppController`](consumer/src/app.controller.ts), [`consumer.AppService`](consumer/src/app.service.ts)