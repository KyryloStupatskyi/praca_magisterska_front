import { observer } from 'mobx-react-lite'
import { Paper, Typography } from '@mui/material'
import { useContext, useEffect, useRef } from 'react'
import { Context } from '../../../main'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Messages = observer(() => {
  const { userStore, roomsStore, messagesStore } = useContext(Context)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messagesStore.messages.length])

  useEffect(() => {
    if (roomsStore.selectedRoom == undefined) return

    getMessages()
  }, [roomsStore.selectedRoom])

  const getMessages = async () => {
    await messagesStore.getAllRoomMessages(roomsStore.selectedRoom.id)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'auto',
        padding: '10px',
        flex: 1,
        overflowY: 'auto',
      }}
    >
      {messagesStore.messages &&
        messagesStore.messages.map((item) => (
          <Paper
            key={item.id}
            sx={{
              color: '#E7E7E7',
              bgcolor:
                userStore.user.id === item.messageSenderId
                  ? '#212121'
                  : '#8774E1',
              width: '40%',
              alignSelf:
                userStore.user.id === item.messageSenderId
                  ? 'flex-start'
                  : 'flex-end',
              padding: '10px',
              borderRadius: '20px',
            }}
          >
            <Typography>{item.message}</Typography>
          </Paper>
        ))}
      <div ref={messagesEndRef} />
    </div>
  )
})

export default Messages
