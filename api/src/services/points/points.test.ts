import type { Point } from '@prisma/client'

import { points, point, createPoint, updatePoint, deletePoint } from './points'
import type { StandardScenario } from './points.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('points', () => {
  scenario('returns all points', async (scenario: StandardScenario) => {
    const result = await points()

    expect(result.length).toEqual(Object.keys(scenario.point).length)
  })

  scenario('returns a single point', async (scenario: StandardScenario) => {
    const result = await point({ id: scenario.point.one.id })

    expect(result).toEqual(scenario.point.one)
  })

  scenario('creates a point', async (scenario: StandardScenario) => {
    const result = await createPoint({
      input: {
        updatedAt: '2024-08-20T01:34:48.471Z',
        reason: 'String',
        amount: 6518791,
        userId: scenario.point.two.userId,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2024-08-20T01:34:48.471Z'))
    expect(result.reason).toEqual('String')
    expect(result.amount).toEqual(6518791)
    expect(result.userId).toEqual(scenario.point.two.userId)
  })

  scenario('updates a point', async (scenario: StandardScenario) => {
    const original = (await point({ id: scenario.point.one.id })) as Point
    const result = await updatePoint({
      id: original.id,
      input: { updatedAt: '2024-08-21T01:34:48.471Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-08-21T01:34:48.471Z'))
  })

  scenario('deletes a point', async (scenario: StandardScenario) => {
    const original = (await deletePoint({ id: scenario.point.one.id })) as Point
    const result = await point({ id: original.id })

    expect(result).toEqual(null)
  })
})
