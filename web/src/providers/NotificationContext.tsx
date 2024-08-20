import React, { useContext, useEffect, useState } from 'react'

import type { TypedDocumentNode } from '@redwoodjs/web'
import { useSubscription } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

interface Notification {
  type: string
  message: string
  createdAt: string
}

const NEW_NOTIFICATION_SUBSCRIPTION: TypedDocumentNode = gql`
  subscription NewNotification($userId: Int!) {
    newNotification(userId: $userId) {
      type
      message
      createdAt
    }
  }
`

interface NotificationContext {
  notifications: Notification[]
  unreadCount: number
  markAllAsRead: () => void
}

export const NotificationContext = React.createContext<NotificationContext>({
  notifications: [],
  unreadCount: 0,
  markAllAsRead: () => {},
})

interface NotificationProviderProps {
  children: React.ReactNode
}

export const useNotifications = () => useContext(NotificationContext)

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { currentUser } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Start the realtime subscription
  const { data } = useSubscription(NEW_NOTIFICATION_SUBSCRIPTION, {
    variables: { userId: currentUser?.id },
    skip: !currentUser?.id,
  })

  useEffect(() => {
    if (data?.newNotification) {
      setNotifications((prev) => [data.newNotification, ...prev])
      setUnreadCount((prev) => prev + 1)
    }
  }, [data])

  const markAllAsRead = () => {
    setUnreadCount(0)
  }

  // Create the context value to use down the tree
  const contextValue: NotificationContext = {
    notifications,
    unreadCount,
    markAllAsRead,
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
