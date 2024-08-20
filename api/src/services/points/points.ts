import type {
  QueryResolvers,
  MutationResolvers,
  PointRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { NewNotificationChannelType } from 'src/subscriptions/newNotification'

export const points: QueryResolvers['points'] = () => {
  return db.point.findMany()
}

export const point: QueryResolvers['point'] = ({ id }) => {
  return db.point.findUnique({
    where: { id },
  })
}

export const createPoint: MutationResolvers['createPoint'] = async (
  { input },
  { context }: { context: { pubSub: NewNotificationChannelType } }
) => {
  const point = await db.point.create({
    data: input,
  })

  // Publish a notification to the user
  context.pubSub.publish('newNotification', context.currentUser.id, {
    type: 'points',
    message: `You increased your points by ${input.amount} points`,
    createdAt: new Date(),
  })

  return point
}

export const updatePoint: MutationResolvers['updatePoint'] = ({
  id,
  input,
}) => {
  return db.point.update({
    data: input,
    where: { id },
  })
}

export const deletePoint: MutationResolvers['deletePoint'] = ({ id }) => {
  return db.point.delete({
    where: { id },
  })
}

export const Point: PointRelationResolvers = {
  user: (_obj, { root }) => {
    return db.point.findUnique({ where: { id: root?.id } }).user()
  },
}
