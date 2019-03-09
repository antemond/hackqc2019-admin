const URL = 'https://9o0kewwo4l.execute-api.ca-central-1.amazonaws.com/api/'

class HttpClient {

  async get(endpoint, options) {
    return await this.sendRequest('GET', endpoint, undefined)
  }

  async post(endpoint, body, options) {
    return await this.sendRequest('POST', endpoint, body)
  }

  async sendRequest(method, endpoint, body) {
    const options = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }

    const response = await new Promise((resolve, reject) => {
      fetch(URL + endpoint, options)
        .then((response) => resolve(response))
        .catch(reject)
    })

    return await this.handleResponse(response)
  }

  async handleResponse(response: Response): Promise<any> {
    const json = await this.parseContent(response);

    if (!response.ok) {
      const error = {
        content: {
          status: response.status,
          message: JSON.stringify(json),
        },
      };
      throw error.content;
    }

    return json;
  }

  async parseContent(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch (e) {
      return {};
    }
  }
}

export default new HttpClient()