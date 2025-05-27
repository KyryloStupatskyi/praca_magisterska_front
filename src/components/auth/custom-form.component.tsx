import { Box } from '@mui/material'

const CustomForm = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #1976d2, #90caf9)',
        clipPath: 'polygon(70% 0%, 100% 0%, 100% 100%, 50% 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  )
}

export default CustomForm
