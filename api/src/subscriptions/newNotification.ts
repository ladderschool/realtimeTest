import gql from 'graphql-tag'
import type { Notification } from 'types/graphql'

import type { PubSub } from '@redwoodjs/realtime'

import { logger } from 'src/lib/logger'

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

export type NewNotificationChannel = {
  newNotification: [userId: number, payload: Notification]
}

export type NewNotificationChannelType = PubSub<NewNotificationChannel>

const resolvers = {
  newNotification: {
    subscribe: (
      _,
      { userId },
      { pubSub }: { pubSub: NewNotificationChannelType }
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
