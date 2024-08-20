import { useNotifications } from 'src/providers/NotificationContext'

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications()

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.createdAt}>
          <p>{notification.type}</p>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  )
}

export default Notifications
