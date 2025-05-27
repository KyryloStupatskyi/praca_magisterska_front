import { AppBar, IconButton, TextField, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { Context } from '../../../main'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CloseIcon from '@mui/icons-material/Close'
import FriendListModal from './friend-list-modal.component'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MessagesHeader = observer(() => {
  const { roomsStore, friendsStore } = useContext(Context)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#181818',
        minHeight: '70px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div
            style={{
              width: '30px',
              backgroundColor: '#e9e8e8',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '30%',
            }}
          >
            <PersonIcon sx={{ color: '#212121' }} />
          </div>
          <Typography>{roomsStore.selectedRoom?.title}</Typography>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <TextField
            placeholder="Email friend"
            sx={{ width: '300px' }}
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
            onChange={(event) => setEmail(event.target.value)}
          />
          <IconButton
            sx={{ color: '#E9E8E8' }}
            onClick={() => {
              friendsStore.sendFriendRequest(email)
              setEmail('')
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
        <IconButton sx={{ color: '#E9E8E8' }} onClick={() => handleModalOpen()}>
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          sx={{ color: '#E9E8E8' }}
          onClick={() => roomsStore.setSelectedRoom(null)}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <FriendListModal isOpen={isModalOpen} handleClose={handleModalClose} />
    </AppBar>
  )
})

export default MessagesHeader
