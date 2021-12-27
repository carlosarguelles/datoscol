const convertToUrlParams = obj => {
  const params = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
  return params
}

const fetchData = async (API, params) => {
  try {
    const api = params ? `${API}?${convertToUrlParams(params)}` : API
    const response = await fetch(api)
    if (response.status == 200) {
      return response.json()
    }
  } catch (e) {
    console.log(e)
  }
}

export default fetchData
