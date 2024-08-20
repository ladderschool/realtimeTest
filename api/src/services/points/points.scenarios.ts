import type { Prisma, Point } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PointCreateArgs>({
  point: {
    one: {
      data: {
        updatedAt: '2024-08-20T01:34:48.492Z',
        reason: 'String',
        amount: 7404615,
        user: {
          create: {
            email: 'String5060228',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-08-20T01:34:48.492Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2024-08-20T01:34:48.492Z',
        reason: 'String',
        amount: 6166707,
        user: {
          create: {
            email: 'String6068528',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-08-20T01:34:48.492Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Point, 'point'>
