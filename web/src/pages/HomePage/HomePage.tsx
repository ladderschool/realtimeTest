import { useState } from 'react'

import type {
  CreatePointMutation,
  CreatePointMutationVariables,
} from 'types/graphql'

import type { TypedDocumentNode } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Notifications from 'src/components/Notifications/Notifications'
import NotificationProvider from 'src/providers/NotificationContext'

export const CREATE_POINTS: TypedDocumentNode<
  CreatePointMutation,
  CreatePointMutationVariables
> = gql`
  mutation CreatePointMutation($input: CreatePointInput!) {
    createPoint(input: $input) {
      id
    }
  }
`

const HomePage = () => {
  const { currentUser } = useAuth()
  const [amount, setAmount] = useState(0)
  const [createPoint, { loading }] = useMutation(CREATE_POINTS)

  const increasePoints = () => {
    createPoint({
      variables: {
        input: {
          amount: amount,
          reason: `Test ${amount}`,
          userId: currentUser.id as number,
        },
      },
    })
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <div>
        <h1>Increase your points: {amount}</h1>
        <button
          disabled={loading}
          onClick={() => {
            setAmount(amount + 1)
            increasePoints()
          }}
        >
          Increase points
        </button>
      </div>
      <div>
        <h1>Notifications</h1>
        <NotificationProvider>
          <Notifications />
        </NotificationProvider>
      </div>
    </>
  )
}

export default HomePage
