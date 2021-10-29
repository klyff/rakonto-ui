export interface iSocketConnector {
  [key: string]: {
    progress: number
    finished: boolean
    payload: any
  }
}

export { SocketConnectorContext, SocketConnectorProvider } from './Context'
