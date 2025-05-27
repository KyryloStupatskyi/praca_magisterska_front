import { AxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
import { $auth } from '../common/instance.axios'

export class RoomsStore {
  private _rooms
  private _selectedRoom

  constructor() {
    makeAutoObservable(this)
  }

  get rooms() {
    return this._rooms
  }

  setRooms(rooms) {
    this._rooms = rooms
  }

  get selectedRoom() {
    return this._selectedRoom
  }

  setSelectedRoom(room) {
    this._selectedRoom = room
  }

  async fetchRooms() {
    try {
      const response = await $auth.get('rooms')

      if (response.status == 200 && response.data.length > 0) {
        this.setRooms(response.data)
        return this._rooms
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }
}
