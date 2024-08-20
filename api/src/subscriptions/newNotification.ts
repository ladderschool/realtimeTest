import { PrismaClient } from '@prisma/client'
import gql from 'graphql-tag'
import type { Notification } from 'types/graphql'

import { RedwoodGraphQLContext } from '@redwoodjs/graphql-server'
import type { PubSub } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

import type {
  Overwrite,
  InferredCurrentUser,
  UndefinedRoles,
} from '../../../.redwood/types/includes/all-currentUser'

export const schema = gql`
  type Notification {
    type: String!
    message: String!
    createdAt: DateTime!
  }

  type Subscription {
    newNotification(userId: Int!): Notification! @requireAuth
  }
`

type NewNotificationChannel = {
  newNotification: [userId: number, payload: Notification]
}

export interface PubSubContext extends RedwoodGraphQLContext {
  pubSub: PubSub<NewNotificationChannel>
  currentUser: Overwrite<UndefinedRoles, InferredCurrentUser>
  db: PrismaClient
}

const resolvers = {
  newNotification: {
    subscribe: (
      _,
      { userId },
      { pubSub }: { pubSub: PubSubContext['pubSub'] }
    ) => {
      // Ensure the user can only subscribe to their own notifications
      if (context.currentUser.id !== userId) {
        throw new Error('Unauthorized')
      }
      logger.warn({ userId }, 'begun subscribing')

      return pubSub.subscribe('newNotification', userId)
    },
    resolve: (payload) => {
      logger.warn({ payload }, 'newNotification subscription resolve')

      return payload
    },
  },
}

export default resolvers
