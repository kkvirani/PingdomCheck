import axios from 'axios'

export async function fetchChecks() {
  const resp = await axios.get('/api/checks')
  return resp.data
}
