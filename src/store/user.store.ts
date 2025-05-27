import { makeAutoObservable } from 'mobx'
import { $public } from '../common/instance.axios'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'

export class UserStore {
  private _isAuth: boolean = false
  private _user

  constructor() {
    makeAutoObservable(this)
  }

  get isAuth() {
    return this._isAuth
  }

  setIsAuth(isAuth: boolean) {
    this._isAuth = isAuth
  }

  get user() {
    return this._user
  }
  setUser(user) {
    this._user = user
  }

  async registration(email: string, password: string) {
    try {
      const response: AxiosResponse = await $public.post(
        'authentication/registration',
        {
          email,
          password,
        }
      )

      if (response.status === 201 && response.data.accessToken) {
        const token = response.data.accessToken
        const decodedToken = jwtDecode(token)

        localStorage.setItem('accessToken', token)

        if (decodedToken) {
          this.setUser(decodedToken)
          this.setIsAuth(true)
          return true
        }

        return false
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  async login(email: string, password: string) {
    try {
      const response: AxiosResponse = await $public.post(
        'authentication/login',
        {
          email,
          password,
        }
      )

      if (response.status === 201 && response.data.accessToken) {
        const token = response.data.accessToken
        const decodedToken = jwtDecode(token)

        localStorage.setItem('accessToken', token)

        if (decodedToken) {
          this.setUser(decodedToken)
          this.setIsAuth(true)
          return true
        }

        return false
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }

  async checkIsAuth() {
    try {
      const response = await axios.get(
        'http://localhost:3000/authentication/refresh',
        {
          withCredentials: true,
        }
      )

      if (response.data.accessToken) {
        const token = response.data.accessToken
        const decodedToken = jwtDecode(token)

        localStorage.setItem('accessToken', token)

        if (decodedToken) {
          this.setUser(decodedToken)
          this.setIsAuth(true)
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message)
      }
    }
  }
}
