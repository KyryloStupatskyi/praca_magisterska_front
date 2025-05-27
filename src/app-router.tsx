import { Route, Routes } from 'react-router'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from './main'
import { authRoutes, publicRoutes } from './common/routes'

const AppRouter = observer(() => {
  const { userStore } = useContext(Context)

  return (
    <Routes>
      {userStore.isAuth &&
        authRoutes.map(({ route, Component }) => (
          <Route key={route} path={route} Component={Component} />
        ))}

      {publicRoutes.map(({ route, Component }) => (
        <Route key={route} path={route} Component={Component} />
      ))}

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
})

export default AppRouter
