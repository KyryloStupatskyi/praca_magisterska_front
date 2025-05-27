import { Button, TextField, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router'
import { RoutesEnum } from '../../common/enums/routes.enum'
import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../main'

const AuthForm = observer(() => {
  const { pathname } = useLocation()
  const route = pathname.split('/')[2]

  const { userStore } = useContext(Context)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleAuth = async (email: string, password: string) => {
    let isAuth: boolean

    switch (route) {
      case 'registration':
        isAuth = await userStore.registration(email, password)

        if (isAuth) {
          navigate(RoutesEnum.HOME.replace(':userId', userStore.user.id))
        }

        break
      case 'login':
        isAuth = await userStore.login(email, password)
        if (isAuth) {
          navigate(RoutesEnum.HOME.replace(':userId', userStore.user.id))
        }

        break
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '550px',
        height: '100vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        <Typography sx={{}} variant="h1" fontSize={25} fontWeight={700}>
          {route === 'login'
            ? 'Welcome back to Owner-Chat, please login!'
            : 'Welcome to Owner-Chat, please register!'}
        </Typography>

        <div style={{ width: '400px', marginTop: '' }}>
          <div className="header" style={{ width: '100%' }}>
            <Typography
              sx={{ textAlign: 'center' }}
              variant="h2"
              fontSize={15}
              fontWeight={400}
            >
              Try it for free, no credit card required.
            </Typography>
          </div>

          <div
            className="form"
            style={{
              width: '100%',
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <TextField
              type="email"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="your-email@mail.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              type="password"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="your-password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: '20px' }}
            onClick={() => handleAuth(form.email, form.password)}
          >
            {route == 'login' ? 'Login' : 'Register'}
          </Button>
        </div>
      </div>

      {route === 'login' ? (
        <Typography sx={{ mt: 'auto' }}>
          Don't have an account?{' '}
          <Link to={RoutesEnum.REGISTRATION}>Register</Link>
        </Typography>
      ) : (
        <Typography>
          Already have an account? <Link to={RoutesEnum.LOGIN}>Login</Link>
        </Typography>
      )}
    </div>
  )
})

export default AuthForm
