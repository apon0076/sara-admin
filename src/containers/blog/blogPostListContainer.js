import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as blogPostAction from '../../store/actions/blogPostAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import authenticationService from '../../store/services/authenticationService'
import moment from 'moment'
import 'moment-timezone'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class blogPostListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogPost: null,
      selectedBlogPost: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }
    this.blogCategoryNameTemplate = this.blogCategoryNameTemplate.bind(this)
    this.postTitleTemplate = this.postTitleTemplate.bind(this)
    this.featureImagePathTemplate = this.featureImagePathTemplate.bind(this)
    this.publishDatetimeTemplate = this.publishDatetimeTemplate.bind(this)
    this.metaAuthorTemplate = this.metaAuthorTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
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

    await this.props.getBlogPostRecord()
    this.setState({
      blogPost: this.props.blogs.sort((b, a) =>
        a?.createDate > b?.createDate ? 1 : -1
      ),
    })
  }

  blogCategoryNameTemplate(rowData) {
    return <>{rowData?.blogCategoryName}</>
  }

  postTitleTemplate(rowData) {
    return <>{rowData?.postTitle}</>
  }

  featureImagePathTemplate(rowData) {
    return (
      <>
        <img
          src={baseUrl.concat(rowData?.featureImagePath)}
          className='thumb-md product-image'
          alt='img'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </>
    )
  }

  publishDatetimeTemplate(rowData) {
    return <>{moment(rowData?.createDate).format('Do MMMM, YYYY')}</>
  }

  metaAuthorTemplate(rowData) {
    return <>{rowData?.metaAuthor}</>
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={
            rowData?.isActive === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData?.isActive === 'Y' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        <Link
          to={{
            pathname: `/EditBlogPost`,
            state: { rowData },
          }}
        >
          <Button
            icon='pi pi-pencil'
            className='p-button-rounded p-button-success p-mr-2'
          />
        </Link>
      </React.Fragment>
    )
  }

  onIndexTemplate(rowData, props) {
    return props?.rowIndex + 1
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreateBlogPost'>
          <div className='button-demo'>
            <Button
              icon='pi pi-times'
              className='p-button-rounded p-button-danger p-button-outlined'
            />
          </div>
        </Link>
      </React.Fragment>
    )
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>List of Blog Post</div>
      </React.Fragment>
    )
  }

  renderHeader() {
    return (
      <>
        <div className='table-header'>
          <span className='p-input-icon-left'>
            <InputText
              type='search'
              className='form-control text-center text-field'
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder='Search Here'
            />
          </span>
        </div>
      </>
    )
  }

  render() {
    const header = this.renderHeader()
    return (
      <>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='white-box'>
                  <div className='datatable-doc-demo datatable-responsive-demo'>
                    <div className='card'>
                      <Toolbar
                        className='p-mb-4'
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>
                      {this.props.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state.blogPost}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          selection={this.state.selectedBlogPost}
                          onSelectionChange={(e) =>
                            this.setState({ selectedBlogPost: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No blog post found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          blogPost={this.props?.blogPost}
                          values={this?.values}
                          loading={this.state?.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='postTitle'
                            filterField='postTitle'
                            header='Blog Title'
                            body={this.postTitleTemplate}
                            sortable
                          />
                          <Column
                            sortField='metaAuthor'
                            header='Author'
                            body={this.metaAuthorTemplate}
                            sortable
                          />
                          <Column
                            sortField='publishDatetime'
                            header='Publish Date'
                            body={this.publishDatetimeTemplate}
                            sortable
                          />
                          <Column
                            sortField='blogCategoryName'
                            filterField='blogCategoryName'
                            header='Category'
                            body={this.blogCategoryNameTemplate}
                            sortable
                          />

                          <Column
                            sortField='featureImagePath'
                            header='Feature Image'
                            body={this.featureImagePathTemplate}
                          />
                          <Column
                            sortField='isActive'
                            header='Status'
                            body={this.statusBodyTemplate}
                            sortable
                          />
                          <Column
                            field='action'
                            header='Edit'
                            body={this.actionBodyTemplate}
                          />
                        </DataTable>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogPostReducer.blogs,
  loading: state.blogPostReducer.loading,
  error: state.blogPostReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogPostRecord: () => dispatch(blogPostAction.getBlogPostRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(blogPostListContainer)
