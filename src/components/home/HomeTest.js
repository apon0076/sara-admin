import React, { Component, Fragment } from 'react'
import authenticationService from '../../store/services/authenticationService'
import { connect } from 'react-redux'
import { Box, Users } from 'react-feather'
import * as Icon from 'react-feather'
import CountUp from 'react-countup'
import { Chart } from 'react-google-charts'
// import './Home.css'
import { Bar } from 'react-chartjs-2'
import {
  lineOptions,
  buyOption,
  employeeData,
  employeeOptions,
  buyData,
  lineData,
  pieOptions,
  buyselldata,
} from '../../constants/chartDataTest'

import user2 from '../../assets/images/dashboard/user2.jpg'
import user1 from '../../assets/images/dashboard/user1.jpg'
import man from '../../assets/images/dashboard/man.png'
import user from '../../assets/images/dashboard/user.png'
import designer from '../../assets/images/dashboard/designer.jpg'

import * as sellerAction from '../../store/actions/sellerAction'
import * as productAction from '../../store/actions/productAction'
import { VerifiedSeller } from '../../components/seller/VerifiedSeller'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

class HomeTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSellers: null,
      activeProducts: null,
      pendingOrders: null,
      orders: false,
    }
    this.verifiedSellerService = new VerifiedSeller()
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication
    this.verifiedSellerService
      .getVerifiedSeller()
      .then((data) => this.setState({ activeSellers: data }))

    await this.props.getVerifiedProductsRecord()
    this.setState({
      activeProducts: this.props.products,
    })
  }

  render() {
    return (
      <Fragment>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xl-3 col-lg-3 col-md-6'>
                <div className='card o-hidden widget-cards'>
                  <div className='bg-info card-body'>
                    <div
                      className='media static-top-widget d-flex justify-content-between'
                      style={{ display: 'flex' }}
                    >
                      <div className='icons-widgets col-md-4'>
                        <div className='align-self-center text-center'>
                          <Users className='font-warning' />
                        </div>
                      </div>
                      <div className='media-body col-md-8'>
                        <span className='m-0'>Total Revenue</span> <br />
                        <small>(Last 30 Days)</small>
                        <h3 className='mb-0'>
                          {' '}
                          <h5 className='text-white'>
                            ৳
                            <CountUp
                              className='counter'
                              end={
                                this.state.activeSellers &&
                                this.state.activeSellers.length
                              }
                            />{' '}
                            This Month
                          </h5>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6'>
                <div className='card o-hidden  widget-cards'>
                  <div className='bg-secondary card-body'>
                    <div
                      className='media static-top-widget d-flex justify-content-between'
                      style={{ display: 'flex' }}
                    >
                      <div className='icons-widgets col-md-4'>
                        <div className='align-self-center text-center'>
                          <Box className='text-info' />
                        </div>
                      </div>
                      <div className='media-body col-md-8'>
                        <span className='m-0'>Total Order</span>
                        <br />
                        <small>(Last 30 Days)</small>
                        <h3 className='mb-0'>
                          {' '}
                          <h5 className='text-white'>
                            <CountUp className='counter' end={15} /> this Month
                          </h5>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6'>
                <div className='card o-hidden widget-cards'>
                  <div className='bg-primary card-body'>
                    <div
                      className='media static-top-widget d-flex justify-content-between'
                      style={{ display: 'flex' }}
                    >
                      <div className='icons-widgets col-md-4'>
                        <div className='align-self-center text-center'>
                          <Icon.Database className='font-primary' />
                        </div>
                      </div>
                      <div className='media-body col-md-8'>
                        <span className='m-0'>Todays Revenue</span>
                        <br />
                        <br />
                        <h3 className='mb-0'>
                          {' '}
                          <h5 className='text-white'>
                            ৳<CountUp className='counter' end={893} />
                          </h5>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6'>
                <div className='card o-hidden widget-cards'>
                  <div className='bg-danger card-body'>
                    <div
                      className='media static-top-widget d-flex justify-content-between'
                      style={{ display: 'flex' }}
                    >
                      <div className='icons-widgets col-md-4'>
                        <div className='align-self-center text-center'>
                          <Icon.Clipboard className='font-danger' />
                        </div>
                      </div>
                      <div className='media-body col-md-8'>
                        <span className='m-0'>Total Shops</span>
                        <br />
                        <br />
                        <h3 className='mb-0'>
                          {' '}
                          <h5 className='text-white'>
                            <CountUp className='counter' end={456} />
                          </h5>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Buy / Sell</h5>
                  </div>
                  <div className='card-body sell-graph bg-white'>
                    <div style={{ width: '100%', height: 500 }}>
                      <ResponsiveContainer>
                        <LineChart
                          data={buyselldata}
                          margin={{
                            top: 35,
                            right: 30,
                            left: 30,
                            bottom: 25,
                          }}
                        >
                          <CartesianGrid strokeDasharray='3 3' />
                          <XAxis dataKey='name' />
                          <YAxis />
                          <Tooltip />
                          {/* <Legend /> */}
                          <Line
                            type='monotone'
                            dataKey='sell'
                            stroke='#8884d8'
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            type='monotone'
                            dataKey='buy'
                            stroke='#82ca9d'
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Market Value</h5>
                  </div>
                  <div className='card-body bg-white'>
                    <div className='market-chart'>
                      <Bar
                        data={lineData}
                        options={lineOptions}
                        width={778}
                        height={208}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='card height-equal'>
                  <div className='card-header'>
                    <h5>Recent Orders</h5>
                  </div>
                  <div className='card-body bg-white'>
                    <div className='user-status table-responsive products-table'>
                      <table className='table table-bordernone mb-0'>
                        <thead>
                          <tr>
                            <th scope='col'>Tracking Number</th>
                            <th scope='col'>Total</th>
                            <th scope='col'>Order Date</th>
                            <th scope='col'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>KN72GQqD4jJ0</td>
                            <td className='digits'>$72.03</td>
                            <td className='font-primary'>2 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                          <tr>
                            <td>GOfLjR2Up1Mq</td>
                            <td className='digits'>$43.73</td>
                            <td className='font-secondary'>3 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                          <tr>
                            <td>NkLwcRYZnvdL</td>
                            <td className='digits'>$53.06</td>
                            <td className='font-secondary'>4 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                          <tr>
                            <td>SRuB9IoVLuCw</td>
                            <td className='digits'>$161.79</td>
                            <td className='font-primary'>7 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                          <tr>
                            <td>uFezrjgESD4zjm</td>
                            <td className='digits'>$140.33</td>
                            <td className='font-primary'>8 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                          <tr>
                            <td>gESuFezD4rjzjm</td>
                            <td className='digits'>$81.79</td>
                            <td className='font-primary'>8 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                          <tr>
                            <td>SuFgEezrjzjrD4</td>
                            <td className='digits'>$67.92</td>
                            <td className='font-secondary'>9 Days ago</td>
                            <td className='font-info'>Order Received</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card height-equal'>
                  <div className='card-header'>
                    <h5>Empolyee Status</h5>
                  </div>
                  <div className='card-body bg-white'>
                    <div className='user-status table-responsive products-table'>
                      <table className='table table-bordernone mb-0'>
                        <thead>
                          <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Designation</th>
                            <th scope='col'>Skill Level</th>
                            <th scope='col'>Experience</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='bd-t-none u-s-tb'>
                              <div className='align-middle image-sm-size'>
                                <img
                                  className='img-radius align-top m-r-15 rounded-circle blur-up lazyloaded'
                                  src={user2}
                                  alt=''
                                  data-original-title=''
                                  title=''
                                />
                                <div className='d-inline-block'>
                                  <h6>
                                    John Deo{' '}
                                    <span className='text-muted digits'>
                                      (14+ Online)
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>Designer</td>
                            <td>
                              <div className='progress-showcase'>
                                <div className='progress' style={{ height: 8 }}>
                                  <div
                                    className='progress-bar bg-primary'
                                    style={{ width: 30 }}
                                    role='progressbar'
                                    aria-valuenow='50'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className='digits'>2 Year</td>
                          </tr>
                          <tr>
                            <td className='bd-t-none u-s-tb'>
                              <div className='align-middle image-sm-size'>
                                <img
                                  className='img-radius align-top m-r-15 rounded-circle blur-up lazyloaded'
                                  src={user1}
                                  alt=''
                                  data-original-title=''
                                  title=''
                                />
                                <div className='d-inline-block'>
                                  <h6>
                                    Holio Mako{' '}
                                    <span className='text-muted digits'>
                                      (250+ Online)
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>Developer</td>
                            <td>
                              <div className='progress-showcase'>
                                <div className='progress' style={{ height: 8 }}>
                                  <div
                                    className='progress-bar bg-secondary'
                                    style={{ width: 70 }}
                                    role='progressbar'
                                    aria-valuenow='50'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className='digits'>3 Year</td>
                          </tr>
                          <tr>
                            <td className='bd-t-none u-s-tb'>
                              <div className='align-middle image-sm-size'>
                                <img
                                  className='img-radius align-top m-r-15 rounded-circle blur-up lazyloaded'
                                  src={man}
                                  alt=''
                                  data-original-title=''
                                  title=''
                                />
                                <div className='d-inline-block'>
                                  <h6>
                                    Mohsib lara
                                    <span className='text-muted digits'>
                                      (99+ Online)
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>Tester</td>
                            <td>
                              <div className='progress-showcase'>
                                <div className='progress' style={{ height: 8 }}>
                                  <div
                                    className='progress-bar bg-primary'
                                    style={{ width: 60 }}
                                    role='progressbar'
                                    aria-valuenow='50'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className='digits'>5 Month</td>
                          </tr>
                          <tr>
                            <td className='bd-t-none u-s-tb'>
                              <div className='align-middle image-sm-size'>
                                <img
                                  className='img-radius align-top m-r-15 rounded-circle blur-up lazyloaded'
                                  src={user}
                                  alt=''
                                  data-original-title=''
                                  title=''
                                />
                                <div className='d-inline-block'>
                                  <h6>
                                    Hileri Soli{' '}
                                    <span className='text-muted digits'>
                                      (150+ Online)
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>Designer</td>
                            <td>
                              <div className='progress-showcase'>
                                <div className='progress' style={{ height: 8 }}>
                                  <div
                                    className='progress-bar bg-secondary'
                                    style={{ width: 30 }}
                                    role='progressbar'
                                    aria-valuenow='50'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className='digits'>3 Month</td>
                          </tr>
                          <tr>
                            <td className='bd-t-none u-s-tb'>
                              <div className='align-middle image-sm-size'>
                                <img
                                  className='img-radius align-top m-r-15 rounded-circle blur-up lazyloaded'
                                  src={designer}
                                  alt=''
                                  data-original-title=''
                                  title=''
                                />
                                <div className='d-inline-block'>
                                  <h6>
                                    Pusiz bia{' '}
                                    <span className='text-muted digits'>
                                      (14+ Online)
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>Designer</td>
                            <td>
                              <div className='progress-showcase'>
                                <div className='progress' style={{ height: 8 }}>
                                  <div
                                    className='progress-bar bg-primary'
                                    role='progressbar'
                                    style={{ width: 90 }}
                                    aria-valuenow='50'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className='digits'>5 Year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='card height-equal'>
                  <div className='card-header'>
                    <h5>Top Sellers</h5>
                  </div>
                  <div className='card-body bg-white'>
                    <div className='user-status table-responsive products-table'>
                      <table className='table table-bordernone mb-0'>
                        <thead>
                          <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Seller Name</th>
                            <th scope='col'>Shop Name</th>
                            <th scope='col'>Group</th>
                            <th scope='col'>Sold Items</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td className='digits'>Mr. Seller A</td>
                            <td className='font-primary'>Amar Shop</td>
                            <td className='font-info'>Electronics</td>
                            <td className='font-secondary'>205</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td className='digits'>Mr. Seller B</td>
                            <td className='font-primary'>Amar Shop</td>
                            <td className='font-info'>Electronics</td>
                            <td className='font-secondary'>185</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td className='digits'>Mr. Seller C</td>
                            <td className='font-primary'>Amar Shop</td>
                            <td className='font-info'>Electronics</td>
                            <td className='font-secondary'>152</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td className='digits'>Mr. Seller D</td>
                            <td className='font-primary'>Amar Shop</td>
                            <td className='font-info'>Electronics</td>
                            <td className='font-secondary'>95</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td className='digits'>Mr. Seller E</td>
                            <td className='font-primary'>Amar Shop</td>
                            <td className='font-info'>Electronics</td>
                            <td className='font-secondary'>72</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Sales Status</h4>
                </div>
                <div className='card-body bg-white'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='order-graph sm-order-space'>
                        <div className='card-header'>
                          <h5>Sales By Location</h5>
                        </div>

                        <div className='peity-chart-dashboard text-center'>
                          <Chart
                            chartType='PieChart'
                            data={[
                              ['Task', 'Hours per Day'],
                              ['Dhaka', 280],
                              ['Chattogram', 150],
                              ['Rajshahi', 120],
                              ['Barisal', 80],
                              ['Khulna', 70],
                              ['Mymensingh', 50],
                              ['Rangpur', 180],
                              ['Sylhet', 100],
                            ]}
                            options={pieOptions}
                            graph_id='PieChart'
                            width={'100%'}
                            height={'280px'}
                            legend_toggle
                            margin={{
                              top: 35,
                              right: 30,
                              left: 30,
                              bottom: 25,
                            }}
                          />
                        </div>

                        {/* <div className='order-graph-bottom sales-location'>
                          <div className='media'>
                            <div className='order-shape-primary'></div>
                            <div className='media-body'>
                              <h6 className='mb-0 mr-0'>
                                Germany <span className='pull-right'>25%</span>
                              </h6>
                            </div>
                          </div>
                          <div className='media'>
                            <div className='order-shape-secondary'></div>
                            <div className='media-body'>
                              <h6 className='mb-0 mr-0'>
                                Brasil <span className='pull-right'>10%</span>
                              </h6>
                            </div>
                          </div>
                          <div className='media'>
                            <div className='order-shape-danger'></div>
                            <div className='media-body'>
                              <h6 className='mb-0 mr-0'>
                                United Kingdom
                                <span className='pull-right'>34%</span>
                              </h6>
                            </div>
                          </div>
                          <div className='media'>
                            <div className='order-shape-warning'></div>
                            <div className='media-body'>
                              <h6 className='mb-0 mr-0'>
                                Australia<span className='pull-right'>5%</span>
                              </h6>
                            </div>
                          </div>
                          <div className='media'>
                            <div className='order-shape-success'></div>
                            <div className='media-body'>
                              <h6 className='mb-0 mr-0'>
                                Canada <span className='pull-right'>25%</span>
                              </h6>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <div className='col-md-8'>
                      <div className='card'>
                        <div className='card-header'>
                          <h5>Revenue for last month</h5>
                        </div>
                        <div className='card-body sell-graph bg-white'>
                          <div style={{ width: '100%', height: 500 }}>
                            <ResponsiveContainer>
                              <LineChart
                                data={buyselldata}
                                margin={{
                                  top: 35,
                                  right: 30,
                                  left: 30,
                                  bottom: 25,
                                }}
                              >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Line
                                  type='monotone'
                                  dataKey='sell'
                                  stroke='#8834d8'
                                  activeDot={{ r: 8 }}
                                />
                                {/* <Line
                          type='monotone'
                          dataKey='buy'
                          stroke='#82ca9d'
                          activeDot={{ r: 6 }}
                        /> */}
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  products: state.productReducer.verifiedProducts,
})

// Making available in  props
const mapDispatchToProps = (dispatch) => {
  return {
    getVerifiedShopRecord: () => dispatch(sellerAction.getVerifiedShopRecord()),
    getVerifiedProductsRecord: () =>
      dispatch(productAction.getVerifiedProductsRecord()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTest)
