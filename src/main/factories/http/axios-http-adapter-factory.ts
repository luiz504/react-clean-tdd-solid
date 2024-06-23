import { AxiosHttpAdapter } from '~/infra/http/axios-http-adapter/axios-adapter'

export const makeAxiosHttpAdapter = () => {
  return new AxiosHttpAdapter()
}
