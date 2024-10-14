import { API_AUTH } from "../../constants/routes";
import { ICredentials } from "../../types/credentials.types";

export const submitCredentials = (credentials: ICredentials) => fetch(
  API_AUTH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(credentials)
  }
).then(response => {
  if (response.status === 401) {
    alert("Введен неправильный логин или пароль");
    throw new Error('Unauthorized');
  }
  const token = response.headers.get('Authorization');
  if (token!= null){
    localStorage.setItem('jwtToken', token);
    return token;
  }
})
  .catch((error) => {
    console.error(error);
  });