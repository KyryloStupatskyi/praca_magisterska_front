import { observer } from 'mobx-react-lite'
import AppRouter from './app-router'
import { useContext, useEffect } from 'react'
import { Context } from './main'

const App = observer(() => {
  const { userStore } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      userStore.checkIsAuth()
    }
  }, [])

  return <AppRouter />
})

export default App
