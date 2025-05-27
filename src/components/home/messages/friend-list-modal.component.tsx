import { Box, IconButton, Modal, Paper, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import { useContext, useEffect } from 'react'

const FriendListModal = observer(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ isOpen, handleClose }: any) => {
    const { friendsStore } = useContext(Context)

    useEffect(() => {
      const fetchFriendRequests = async () => {
        await friendsStore.getFriendsRequests()
      }

      fetchFriendRequests()
    }, [])

    return (
      <Modal open={isOpen} onClose={() => handleClose()}>
        <Box
          width={400}
          height={400}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: '#1e1e1e',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {friendsStore.friends ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            friendsStore.friends.map((item: any) => (
              <Paper
                key={item.id}
                sx={{
                  padding: '10px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ textDecoration: 'underline' }}>
                  Friend request from {item.requester.email}
                </Typography>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <IconButton
                    sx={{ bgcolor: 'green' }}
                    onClick={() => (
                      friendsStore.acceptFriendRequest(item.reqFromUserId),
                      handleClose()
                    )}
                  >
                    <CheckIcon />
                  </IconButton>

                  <IconButton
                    sx={{ bgcolor: 'red' }}
                    onClick={() => (
                      friendsStore.rejectFriendRequest(item.reqFromUserId),
                      handleClose()
                    )}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Paper>
            ))
          ) : (
            <div style={{ color: '#fff', textAlign: 'center' }}>
              <Typography>No friend requests available</Typography>
            </div>
          )}
        </Box>
      </Modal>
    )
  }
)

export default FriendListModal
