import { TextField, Typography } from '@mui/material'
import RoomItem from './room-item.component'
import { observer } from 'mobx-react-lite'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoomsList = observer(({ rooms }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#181818',
        height: '100vh',
        width: '100%',
        padding: '10px',
      }}
    >
      <TextField
        label="Search your friend from list below"
        sx={{
          mb: 3,
        }}
        slotProps={{
          htmlInput: {
            style: {
              color: '#fff',
              backgroundColor: '#282828',
            },
          },
          inputLabel: {
            style: {
              color: '#fff',
            },
          },
        }}
      />
      <div
        style={{
          overflowY: 'auto',
        }}
      >
        {rooms && rooms.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          rooms.map((item: any) => <RoomItem room={item} key={item.id} />)
        ) : (
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <Typography>No rooms available</Typography>
          </div>
        )}
      </div>
    </div>
  )
})

export default RoomsList
