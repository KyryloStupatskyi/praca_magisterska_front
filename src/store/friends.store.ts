import { makeAutoObservable } from 'mobx'
import { $auth } from '../common/instance.axios'
import { AxiosError } from 'axios'

export class FriendsStore {
  private _friends
  private _selectedFriend

  constructor() {
    makeAutoObservable(this)
  }

  get friends() {
    return this._friends
  }

  setFriends(friends) {
    this._friends = friends
  }

  get selectedFriend() {
    return this._selectedFriend
  }

  setSelectedFriend(friend) {
    this._selectedFriend = friend
  }

  async sendFriendRequest(friendEmail: string) {
    try {
      const response = await $auth.post('friends/add-friend', {
        friendEmail: friendEmail,
      })

      if (response.status == 200 || response.status == 201) {
        alert('Friend request sent')
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  async getFriendsRequests() {
    try {
      const response = await $auth.get('friends/get-requests')

      if (response.status == 200) {
        this.setFriends(response.data)
        return this._friends
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  async acceptFriendRequest(friendId: number) {
    try {
      const response = await $auth.patch('friends/accept', { friendId })

      if (response.status == 200 || response.status == 201) {
        this._friends = this._friends.filter(
          (friend: any) => friend.reqFromUserId !== friendId
        )
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  async rejectFriendRequest(friendId: number) {
    try {
      const response = await $auth.patch('friends/reject', { friendId })

      if (response.status == 200) {
        this._friends = this._friends.filter(
          (friend: any) => friend.reqFromUserId !== friendId
        )
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }
}
