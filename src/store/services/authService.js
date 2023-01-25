import http from '../../utils/httpClient'

class authService {
  signUpAuth = async (data) => {
    return await http
      .post(`/api/Auth/register`, {
        email: data.email,
      })
      .then((response) => {
        /* localStorage.setItem("x-access-token", response.data.token);
                localStorage.setItem(
                  "x-access-token-expiration",
                  Date.now() + 2 * 60 * 60 * 1000
                );
                 */
        return response.data
      })
      .catch((err) => Promise.reject('Registration Failed!'))
  }

  LogInAuth = async (data) => {
    if (data.check === true) {
      localStorage.setItem('admin-remember', 'Y')
    }
    return await http
      .post(`/api/Auth/AdminLogin`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const token = response.data.token
        const employeeId = response.data.user.employeeId
        const roleId = response.data.user.roleId
        // const email = response.data.user.email;
        localStorage.setItem('x-access-roleId', roleId)
        localStorage.setItem('x-access-employeeId', employeeId)
        localStorage.setItem('x-access-token', token)
        localStorage.setItem(
          'x-access-token-expiration',
          Date.now() + 2 * 60 * 60 * 1000 //expires in 2 hours
        )
        //const user = jwt(token);

        return response.data
      })
      .catch((err) => Promise.reject('Authentication Failed!'))
  }

  authenticateUser = async () => {
    return (
      (await localStorage.getItem('x-access-token')) &&
      localStorage.getItem('x-access-token-expiration') > Date.now()
    )
  }

  deauthenticateUser = async () => {
    ;(await localStorage.removeItem('x-access-token')) &&
      localStorage.getItem('x-access-token-expiration')
    window.location = window.location.origin + '/'
  }

  saveToken = async (token) => {
    ;(await localStorage.setItem('x-access-token', token)) &&
      localStorage.getItem('x-access-token-expiration')
  }

  getToken = (async) => {
    return localStorage.getItem('x-access-token')
  }

  retriveToken = (async) => {
    return this.getToken()
  }

  retriveEmployeeId = (async) => {
    return this.getEmployeeId()
  }

  getEmployeeId = (async) => {
    return localStorage.getItem('x-access-employeeId')
  }

  retriveRoleId = (async) => {
    return this.getRoleId()
  }

  getRoleId = (async) => {
    return localStorage.getItem('x-access-roleId')
  }

  createOrUpdateNewAdmin = async (data) => {
    return await http.post('/api/Administrator/CreateOrUpdate', data)
  }

  createToken = async (data) => {
    return await http
      .post('/api/Master/SendToken', {
        userEmail: data.userEmail,
        userContactNo: data.userContactNo,
      })
      .then((response) => {
        const tokenId = response.data.tokenId
        localStorage.setItem('x-access-tokenId', tokenId)
        return response.data
      })
      .catch((err) => Promise.reject('Authorization Failed!', err))
  }

  tokenVerify = async (data) => {
    localStorage.setItem('x-access-tokenCode', data.tokenCode)
    return await http
      .post('/api/Master/CheckTokenValidity', {
        tokenId: data.tokenId,
        tokenCode: data.tokenCode,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject('Authorization Failed!', err))
  }

  getAdmin = async () => {
    return await http.get('/api/Administrator/Get?getAll=Y')
  }

  passwordReset = async (data) => {
    return await http
      .post('/api/Administrator/PasswordReset', {
        email: data.email,
        tokenId: data.tokenId,
        token: data.tokenCode,
        password: data.password,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject('Authorization Failed!', err))
  }
}

export default new authService()
