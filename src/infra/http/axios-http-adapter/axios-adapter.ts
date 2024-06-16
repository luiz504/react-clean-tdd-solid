import axios from 'axios'
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '~/data/protocols/http'

export class AxiosHttpAdapter<T, R> implements HttpPostClient<T, R> {
  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    const response = await axios.post(params.url, params.body)

    return {
      statusCode: response.status,
      body: response.data,
    }
  }
}
