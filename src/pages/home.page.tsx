import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { TextField } from '@mui/material'
import RoomsList from '../components/home/rooms/rooms-list.component'
import Messages from '../components/home/messages/messages.component'
import MessagesHeader from '../components/home/messages/messages-header.component'

const HomePage = observer(() => {
  const { roomsStore, messagesStore } = useContext(Context)

  const [rooms, setRooms] = useState()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await roomsStore.fetchRooms()

      if (rooms) {
        setRooms(roomsStore.rooms)
      }
      setLoading(false)
    }

    getRooms()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div
      className="homePage"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        maxHeight: '100vh',
        maxWidth: '100vw',
      }}
    >
      <div className="rooms" style={{ width: '30%' }}>
        <RoomsList rooms={rooms} />
      </div>
      <div
        className="messages"
        style={{
          width: '70%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MessagesHeader />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            flex: 1,
            backgroundImage: 'url("/images/22.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
          }}
        >
          <Messages />

          <TextField
            fullWidth
            value={message}
            sx={{
              borderRadius: '50px',
              alignSelf: 'flex-end',
              padding: '15px',
              '& .MuiInputBase-input': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
            placeholder="Message"
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                messagesStore.sendMessage(message, roomsStore.selectedRoom.id)
                setMessage('')
              }
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default HomePage
