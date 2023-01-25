import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sellerService from '../../store/services/sellerService'
import { useHistory } from 'react-router-dom'

const NoMatch = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [loginSuccessful, setLoginSuccessful] = useState(false)

  const history = useHistory()

  useEffect(() => {
    // For Login Check
    let userId = sellerService.getEmployeeId()
    if (userId != null) {
      setAuthenticated(true)
      setLoginSuccessful(true)
    } else {
      setAuthenticated(false)
      setLoginSuccessful(false)
      history.push('/SellerLogin')
    }
  }, [])

  return (
    <section id='wrapper' className='error-page'>
      <div className='error-box'>
        <div className='error-body text-center'>
          <h1>404</h1>
          <h3 className='text-uppercase'>Page Not Found !</h3>
          <p className='text-muted m-t-30 m-b-30'>
            YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
          </p>
          <Link to='/SellerHome'>
            <a className='btn btn-info btn-rounded waves-effect waves-light m-b-40'>
              Back to home
            </a>
          </Link>
        </div>
        <footer className='footer text-center'>
          2021 © SaRa Lifestyle Ltd.
        </footer>
      </div>
    </section>
  )
}

export default NoMatch
