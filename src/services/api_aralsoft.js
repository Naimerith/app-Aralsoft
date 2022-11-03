import axios from 'axios';


export const postData = async () => {
  const data = JSON.stringify({
    "empresa": "63",
    "password": "s3cr3t0"
  });

  const config = {
    method: 'post',
    url: 'http://148.102.54.82:8088/cubo/api/login',
    headers: {
      'token': 'a2ca9ff273fd7a4c0b0dadce6d076524c28f6675d262acfa4738c90caa8b8f40',
      'Authorization': 'Bearer a2ca9ff273fd7a4c0b0dadce6d076524c28f6675d262acfa4738c90caa8b8f40',
      'Content-Type': 'application/json'
    },
    data: data
  };

  const response = await axios(config);
  const responseData = await response.data;
  return responseData
}

export const getData = async () => {
  const config = {
    method: 'get',
    url: 'http://148.102.54.82:8088/cubo/api/ventas?empresa=63&periodo=202202',
    headers: {
      'token': 'a2ca9ff273fd7a4c0b0dadce6d076524c28f6675d262acfa4738c90caa8b8f40'
    }
  };

  const response = await axios(config);
  const responseData = await response.data.data;
  return responseData
}
