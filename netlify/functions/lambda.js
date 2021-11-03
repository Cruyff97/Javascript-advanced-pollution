exports.handler = async event => {
    const API_KEY_CT =  process.env.API_KEY_CT
    const response = await fetch(`endpoint/parameters&API_KEY_CT=${API_KEY_CT}`)
    const data = await response.json() 
    const pass = (body) => {
      return {
        statusCode: 200,
        body: JSON.stringify(body)
      }
    }
  
    return pass(data)
  }
  