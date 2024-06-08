import axios from 'axios'
import { HttpPostParams } from '~/data/protocols/http'

export class AxiosHttpAdapter {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios.post(params.url)
  }
}
