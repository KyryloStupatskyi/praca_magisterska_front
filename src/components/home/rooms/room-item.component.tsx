import { Paper, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../../main'
import PersonIcon from '@mui/icons-material/Person'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoomItem = observer(({ room }: any) => {
  const { roomsStore, messagesStore } = useContext(Context)

  return (
    <Paper
      elevation={1}
      sx={{
        width: '100%',
        display: 'flex',
        gap: '15px',
        height: '70px',
        alignItems: 'center',
        marginBottom: '5px',
        padding: '5px',
        cursor: 'pointer',
        backgroundColor:
          roomsStore.selectedRoom?.id == room.id ? '#8774E1' : '#212121',
      }}
      onClick={() => {
        roomsStore.setSelectedRoom(room)
        messagesStore.subscribe(roomsStore.selectedRoom.id)
      }}
    >
      <div
        style={{
          width: '50px',
          height: '85%',
          backgroundColor: '#e9e8e8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
        }}
      >
        <PersonIcon sx={{ color: '#212121' }} />
      </div>
      <Typography sx={{ color: '#fff' }}>{room.title}</Typography>
    </Paper>
  )
})

export default RoomItem
