import AuthPage from '../pages/auth.page'
import HomePage from '../pages/home.page'
import { RoutesEnum } from './enums/routes.enum'

export const authRoutes = [
  {
    route: RoutesEnum.HOME,
    Component: HomePage,
  },
]

export const publicRoutes = [
  {
    route: RoutesEnum.REGISTRATION,
    Component: AuthPage,
  },
  {
    route: RoutesEnum.LOGIN,
    Component: AuthPage,
  },
]
