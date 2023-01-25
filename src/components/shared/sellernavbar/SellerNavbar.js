import React from 'react'
import baseUrl from '../../../utils/baseUrl'
import { Link, NavLink } from 'react-router-dom'
import * as Icon from 'react-feather'

const SellerNavbar = (props) => {
  function removeLocalStorage() {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-access-employeeId')
    localStorage.removeItem('x-access-roleId')
    localStorage.removeItem('x-access-token-expiration')
    localStorage.removeItem('seller-remember')
  }

  return (
    <aside className='sidebar' style={{ overflow: 'visible' }}>
      <div className='scroll-sidebar' style={{ overflow: 'hidden' }}>
        <div className='user-profile'>
          <div className='dropdown user-pro-body'>
            <div className='profile-image'>
              <img
                src={baseUrl.concat(props.sellerProfileById.sellerImageUrl)}
                alt='user-img'
                className='img-circle'
              />
              <Link
                to='#!'
                className='dropdown-toggle u-dropdown text-blue'
                data-toggle='dropdown'
                role='button'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <span className='badge badge-danger'>
                  <i className='fa fa-angle-down'></i>
                </span>
              </Link>
              <ul className='dropdown-menu animated flipInY'>
                <li>
                  <Link to='/SellerProfile'>
                    <i className='fa fa-user'></i> Profile
                  </Link>
                </li>
                <li>
                  <NavLink
                    to={`/EditSellerProfile/${props.sellerProfileById.sellerId} `}
                  >
                    <i className='fa fa-cog'></i> Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/SellerLogin'
                    onClick={() => removeLocalStorage()}
                  >
                    <i className='fa fa-power-off'></i> Logout
                  </NavLink>
                </li>
              </ul>
            </div>
            <p
              className='profile-text m-t-15 font-16'
              style={{ textTransform: 'capitalize' }}
            >
              <Link to='/SellerProfile'>
                {props.sellerProfileById.sellerName}
              </Link>
            </p>
            <p className='mt-5 font-13 text-danger'>
              <Link to='/SellerProfile' style={{ textTransform: 'capitalize' }}>
                {props.shopName}
              </Link>
            </p>
          </div>
        </div>
        <nav className='sidebar-nav'>
          <ul id='side-menu'>
            <li>
              <NavLink to='/SellerHome' aria-expanded='false'>
                <i className='icon-screen-desktop fa-fw'></i>
                <span className='hide-menu'> Dashboard </span>
              </NavLink>
              {/* <a className="active waves-effect" href="/SellerHome" aria-expanded="false"><i className="icon-screen-desktop fa-fw"></i> <span className="hide-menu"> Dashboard </span></a> */}
            </li>
            <li>
              <NavLink to='/createProductSeller' aria-expanded='false'>
                <i className='fa fa-hdd-o fa-fw'></i>
                <span className='hide-menu'> Products</span>
              </NavLink>
            </li>
            <li>
              <a className='waves-effect' href='#!' aria-expanded='false'>
                <i className='icon-basket fa-fw'></i>
                <span className='hide-menu'> Orders </span>
              </a>
              <ul aria-expanded='false' className='collapse'>
                <li>
                  <NavLink to={'/ManageOrder?status=pending'}>
                    Manage Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/CancelSellerOrders?status=cancel_request'}>
                    Cancel Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/ReturnSellerOrders?status=return_request'}>
                    Return Orders
                  </NavLink>
                </li>
              </ul>
            </li>
            {props?.sellerId === 2 ? (
              <li>
                <NavLink to='/seller-order-requisition' aria-expanded='false'>
                  <Icon.Clipboard className='text-dark fa-fw' />{' '}
                  <span className='hide-menu'> Order Requisition</span>
                </NavLink>
              </li>
            ) : (
              <></>
            )}

            <li>
              <NavLink to='/PromotionDetailsList' aria-expanded='false'>
                <i className='fa fa-percent fa-fw'></i>
                <span className='hide-menu'> Promotion</span>
              </NavLink>
            </li>
            <li>
              <a className='waves-effect' href='#!' aria-expanded='false'>
                <i className='fa fa-money  fa-fw'></i>
                <span className='hide-menu'>Seller Commission</span>
              </a>
              <ul aria-expanded='false' className='collapse'>
                <li>
                  <NavLink to='/CommissionPercentageList'>
                    Seller Commission Percentage
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/SellerCommission'>
                    Seller Commission Agreement
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to='/BusinessInformation' aria-expanded='false'>
                <i className='icon-settings fa-fw'></i>
                <span className='hide-menu'> Account &amp; Settings </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default SellerNavbar
