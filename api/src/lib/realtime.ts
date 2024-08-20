import Redis from 'ioredis'

import { RedwoodRealtimeOptions } from '@redwoodjs/realtime'

import subscriptions from 'src/subscriptions/**/*.{js,ts}'

import { logger } from './logger'

const publishClient = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 2,
  db: 1,
})
const subscribeClient = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 2,
  db: 1,
})

// Test Redis connection
publishClient.on('connect', () => {
  logger.warn('Redis publish client connected')
})
publishClient.on('error', (err) => {
  logger.warn('Redis publish client error', err)
})
publishClient.on('message', (msg) => {
  logger.warn('Redis publish message', msg)
})

/**
 * Configure RedwoodJS Realtime
 *
 * See https://redwoodjs.com/docs/realtime
 *
 * Realtime supports Live Queries and Subscriptions over GraphQL SSE.
 *
 * Live Queries are GraphQL queries that are automatically re-run when the data they depend on changes.
 *
 * Subscriptions are GraphQL queries that are run when a client subscribes to a channel.
 *
 * Redwood Realtime
 *  - uses a publish/subscribe model to broadcast data to clients.
 *  - uses a store to persist Live Query and Subscription data.
 *  - and enable defer and stream directives to improve latency
 *    for clients by sending data the most important data as soon as it's ready.
 *
 * Redwood Realtime supports in-memory and Redis stores:
 * - In-memory stores are useful for development and testing.
 * - Redis stores are useful for production.
 *
 */
export const realtime: RedwoodRealtimeOptions = {
  subscriptions: {
    subscriptions,
    //store: 'in-memory',
    // if using a Redis store
    store: { redis: { publishClient, subscribeClient } },
  },
  liveQueries: {
    store: 'in-memory',
    // if using a Redis store
    // store: { redis: { publishClient, subscribeClient } },
  },
  // To enable defer and streaming, set to true.
  // enableDeferStream: true,
}
