import { observer } from 'mobx-react-lite'
import AuthForm from '../components/auth/auth-form.component'
import CustomForm from '../components/auth/custom-form.component'

const AuthPage = observer(() => {
  return (
    <div style={{ width: '100vw' }}>
      <div
        style={{
          width: '55%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AuthForm />
      </div>

      <CustomForm />
    </div>
  )
})

export default AuthPage
