import { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { UserStore } from './store/user.store'
import { CssBaseline } from '@mui/material'
import { RoomsStore } from './store/rooms.store'
import App from './app'
import { FriendsStore } from './store/friends.store'
import { MessagesStore } from './store/messages.store'

export const Context = createContext({
  userStore: {} as UserStore,
  roomsStore: {} as RoomsStore,
  friendsStore: {} as FriendsStore,
  messagesStore: {} as MessagesStore,
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Context.Provider
      value={{
        userStore: new UserStore(),
        roomsStore: new RoomsStore(),
        friendsStore: new FriendsStore(),
        messagesStore: new MessagesStore(),
      }}
    >
      <CssBaseline />
      <App />
    </Context.Provider>
  </BrowserRouter>
)
