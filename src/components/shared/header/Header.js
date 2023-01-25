import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div>
      <nav className='navbar navbar-default navbar-static-top m-b-0'>
        <div className='navbar-header'>
          <Link
            className='navbar-toggle font-20 hidden-sm hidden-md hidden-lg '
            //href="#"onClick={(e) => {e.preventDefault()}}
            to='#!'
            data-toggle='collapse'
            data-target='.navbar-collapse'
          >
            <i className='fa fa-bars'></i>
          </Link>
          <div className='top-left-part'>
            <Link className='logo' to='/Home'>
              <b>
                <img src='/assets/plugins/images/logo.png' alt='home' />
              </b>
              <span>
                <img
                  src='/assets/plugins/images/Website_Logo_255x64.png'
                  alt='homepage'
                  className='dark-logo'
                  style={{ width: '130px' }}
                />
              </span>
            </Link>
          </div>
          <ul className='nav navbar-top-links navbar-left hidden-xs'>
            <li>
              <Link
                to='#'
                onClick={(e) => {
                  e.preventDefault()
                }}
                className='sidebartoggler font-20 waves-effect waves-light'
              >
                <i className='icon-arrow-left-circle'></i>
              </Link>
            </li>
          </ul>
          <ul className='nav navbar-top-links navbar-right pull-right'>
            <li className='dropdown'>
              <a
                className='dropdown-toggle waves-effect waves-light font-20'
                data-toggle='dropdown'
                href='#!;'
              >
                <i className='icon-speech'></i>
                <span className='badge badge-xs badge-danger'>6</span>
              </a>
              <ul className='dropdown-menu mailbox animated bounceInDown'>
                <li>
                  <div className='drop-title'>You have 4 new messages</div>
                </li>
                <li>
                  <div className='message-center'>
                    <a href='#!;'>
                      <div className='user-img'>
                        <img
                          src='/assets/plugins/images/users/1.jpg'
                          alt='user'
                          className='img-circle'
                        />
                        <span className='profile-status online pull-right'></span>
                      </div>
                      <div className='mail-contnet'>
                        <h5>Pavan kumar</h5>
                        <span className='mail-desc'>
                          Just see the my admin!
                        </span>
                        <span className='time'>9:30 AM</span>
                      </div>
                    </a>
                    <a href='#!;'>
                      <div className='user-img'>
                        <img
                          src='/assets/plugins/images/users/2.jpg'
                          alt='user'
                          className='img-circle'
                        />
                        <span className='profile-status busy pull-right'></span>
                      </div>
                      <div className='mail-contnet'>
                        <h5>Sonu Nigam</h5>
                        <span className='mail-desc'>
                          I've sung a song! See you at
                        </span>
                        <span className='time'>9:10 AM</span>
                      </div>
                    </a>
                    <a href='#!;'>
                      <div className='user-img'>
                        <img
                          src='/assets/plugins/images/users/3.jpg'
                          alt='user'
                          className='img-circle'
                        />
                        <span className='profile-status away pull-right'></span>
                      </div>
                      <div className='mail-contnet'>
                        <h5>Arijit Sinh</h5>
                        <span className='mail-desc'>I am a singer!</span>
                        <span className='time'>9:08 AM</span>
                      </div>
                    </a>
                    <a href='#!;'>
                      <div className='user-img'>
                        <img
                          src='/assets/plugins/images/users/4.jpg'
                          alt='user'
                          className='img-circle'
                        />
                        <span className='profile-status offline pull-right'></span>
                      </div>
                      <div className='mail-contnet'>
                        <h5>Pavan kumar</h5>
                        <span className='mail-desc'>
                          Just see the my admin!
                        </span>
                        <span className='time'>9:02 AM</span>
                      </div>
                    </a>
                  </div>
                </li>
                <li>
                  <a className='text-center' href='#!;'>
                    <strong>See all notifications</strong>
                    <i className='fa fa-angle-right'></i>
                  </a>
                </li>
              </ul>
            </li>
            <li className='dropdown'>
              <a
                className='dropdown-toggle waves-effect waves-light font-20'
                data-toggle='dropdown'
                href='#!;'
              >
                <i className='icon-calender'></i>
                <span className='badge badge-xs badge-danger'>3</span>
              </a>
              <ul className='dropdown-menu dropdown-tasks animated slideInUp'>
                <li>
                  <a href='#!;'>
                    <div>
                      <p>
                        <strong>Task 1</strong>
                        <span className='pull-right text-muted'>
                          40% Complete
                        </span>
                      </p>
                      <div className='progress progress-striped active'>
                        <div
                          className='progress-bar progress-bar-success'
                          role='progressbar'
                          aria-valuenow='40'
                          aria-valuemin='0'
                          aria-valuemax='100'
                          style={{ width: '40%' }}
                        >
                          <span className='sr-only'>
                            40% Complete (success)
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className='divider'></li>
                <li>
                  <a href='#!;'>
                    <div>
                      <p>
                        <strong>Task 2</strong>
                        <span className='pull-right text-muted'>
                          20% Complete
                        </span>
                      </p>
                      <div className='progress progress-striped active'>
                        <div
                          className='progress-bar progress-bar-info'
                          role='progressbar'
                          aria-valuenow='20'
                          aria-valuemin='0'
                          aria-valuemax='100'
                          style={{ width: '20%' }}
                        >
                          <span className='sr-only'>20% Complete</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className='divider'></li>
                <li>
                  <a href='#!;'>
                    <div>
                      <p>
                        <strong>Task 3</strong>
                        <span className='pull-right text-muted'>
                          60% Complete
                        </span>
                      </p>
                      <div className='progress progress-striped active'>
                        <div
                          className='progress-bar progress-bar-warning'
                          role='progressbar'
                          aria-valuenow='60'
                          aria-valuemin='0'
                          aria-valuemax='100'
                          style={{ width: '60%' }}
                        >
                          <span className='sr-only'>
                            60% Complete (warning)
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className='divider'></li>
                <li>
                  <a href='#!;'>
                    <div>
                      <p>
                        <strong>Task 4</strong>
                        <span className='pull-right text-muted'>
                          80% Complete
                        </span>
                      </p>
                      <div className='progress progress-striped active'>
                        <div
                          className='progress-bar progress-bar-danger'
                          role='progressbar'
                          aria-valuenow='80'
                          aria-valuemin='0'
                          aria-valuemax='100'
                          style={{ width: '80%' }}
                        >
                          <span className='sr-only'>80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className='divider'></li>
                <li>
                  <a className='text-center' href='#!;'>
                    <strong>See All Tasks</strong>
                    <i className='fa fa-angle-right'></i>
                  </a>
                </li>
              </ul>
            </li>
            <li className='right-side-toggle'>
              <a
                className='right-side-toggler waves-effect waves-light b-r-0 font-20'
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <i className='icon-settings'></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
