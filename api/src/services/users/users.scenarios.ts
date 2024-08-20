import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String9125466',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-08-20T01:34:40.483Z',
      },
    },
    two: {
      data: {
        email: 'String7605374',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-08-20T01:34:40.483Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
