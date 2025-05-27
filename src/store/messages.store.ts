import { makeAutoObservable } from 'mobx'
import { $auth } from '../common/instance.axios'
import { socket } from '../common/instance.wss'

export class MessagesStore {
  private roomMessages: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get messages() {
    return this.roomMessages
  }

  setMessages(messages: any[]) {
    this.roomMessages = messages
  }

  addMessageOne(newMessage: any) {
    if (!Array.isArray(this.roomMessages)) {
      this.roomMessages = []
    }
    this.roomMessages.push(newMessage)
  }

  async getAllRoomMessages(roomId: number) {
    const response = await $auth.get('messages', {
      params: {
        roomId,
      },
    })

    if (response.status === 200 && response.data) {
      this.setMessages(response.data)
    }
  }

  // Lonpolling method

  async subscribe(roomId: number) {
    const response = await $auth.get('longpolling', {
      params: { roomId },
    })

    if (response.status === 200 && response.data.timeout === true) {
      this.subscribe(roomId)
    } else if (response.status === 200 && response.data.message) {
      this.addMessageOne(response.data.message)
      this.subscribe(roomId)
    }
  }

  async sendMessage(message: string, roomId: number) {
    await $auth.post('longpolling', { roomId, message })
  }

  // EventSource

  // async sendMessage(message: string, roomId: number) {
  //   await $auth.post('event-source', { roomId, message })
  // }

  // async subscribe(roomId: number) {
  //   const token = localStorage.getItem('accessToken')
  //   const eventSource = new EventSource(
  //     `http://localhost:3000/event-source?roomId=${roomId}&token=${token}`
  //   )

  //   eventSource.onmessage = (event) => {
  //     const message = JSON.parse(event.data)
  //     this.addMessageOne(message)
  //   }
  // }

  // WebSockets

  // async subscribe(roomId: number) {
  //   socket.emit('join-room', {
  //     roomId,
  //   })

  //   socket.on('recieve-message', (data) => {
  //     this.addMessageOne(data.message)
  //   })

  //   socket.on('user-joined', (data) => {
  //     console.log(`:user ${data.user} joined room`)
  //   })
  // }

  // async sendMessage(message: string, roomId: number) {
  //   socket.emit('send-message', {
  //     message,
  //     roomId,
  //   })
  // }
}
