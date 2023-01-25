import "../../../node_modules/primeicons/primeicons.css";
import "../../../node_modules/primereact/resources/themes/saga-blue/theme.css";
import "../../../node_modules/primereact/resources/primereact.css";
import "../../../node_modules/primeflex/primeflex.css";
import authenticationService from "../../store/services/authenticationService";
import adsService from "../../store/services/adsService";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as adsAction from "../../store/actions/adsAction";
import { AdsList } from "../../components/settings/ads/AdsList";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import baseUrl from "../../utils/baseUrl";
import { Link } from "react-router-dom";
//import "../../../node_modules/primereact/components/button/Button.css";

////////////////END/////////////////

class manageReviewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: null,
            selectedCustomers: null,
            globalFilter: null,
            loading: false,
            position: "center",
            orderNo: "",
            productName: "",
            SKU: "",
            sellerSKU: "",
            selectedContent: null,
            selectedStatus: null,
            dateRange: "",
            selectedRating: null
        };

        this.manageReviews = new AdsList();

        this.contents = [
            { name: 'With text', code: 'WT' },
            { name: 'With image/video', code: 'WIV' },
            { name: 'With content', code: 'WC' },
            { name: 'Rating only', code: 'RO' },
        ];


        this.statuses = [
            { name: 'Not replied', code: 'NR' },
            { name: 'Replied', code: 'R' },
            { name: 'Cancelled item', code: 'CI' },
        ];

        this.ratings = [
            { name: '5 star', code: '5' },
            { name: '4 star', code: '4' },
            { name: '3 star', code: '3' },
            { name: '2 star', code: '2' },
            { name: '1 star', code: '1' },
        ];

        this.onContentChange = this.onContentChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);

        //body cells
        this.adsInfoIdTemplate = this.adsInfoIdTemplate.bind(this);
        this.adsNameTemplate = this.adsNameTemplate.bind(this);
        this.adsTypeNameTemplate = this.adsTypeNameTemplate.bind(this);
        this.imageTypeNameTemplate = this.imageTypeNameTemplate.bind(this);
        this.adsLocationNameTemplate = this.adsLocationNameTemplate.bind(this);
        this.adsImageUrlTemplate = this.adsImageUrlTemplate.bind(this);
        this.isActiveTemplate = this.isActiveTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.showWarn = this.showWarn.bind(this);
    }

    componentDidMount = async () => {
        //Begin Temporary Authentication
        let roleId = authenticationService.getRoleId();
        if (roleId === "2") {
            this.setState({
                authenticated: true,
                loginSuccessful: true,
            });
        } else {
            this.setState({
                authenticated: false,
                loginSuccessful: false,
            });
            this.props.history.push("/SellerLogin");
        }
        //End Temporary Authentication

        this.manageReviews
            .getAdsRecord()
            .then((data) => this.setState({ customers: data }));
    };

    showSuccess() {
        this.toast.show({
            severity: "success",
            summary: "Ads Updated",
            detail: "Message Content",
            life: 3000,
        });
    }

    showWarn() {
        this.toast.show({
            severity: "warn",
            summary: "Ads Deleted",
            detail: "Message Content",
            life: 3000,
        });
    }

    onClick(name, position) {
        let state = {
            [`${name}`]: true,
        };

        if (position) {
            state = {
                ...state,
                position,
            };
        }
        this.setState(state);
    }

    adsInfoIdTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Ads Info Id</span>
                {rowData.adsInfoId}
            </React.Fragment>
        );
    }

    adsNameTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Ads Name</span>
                {rowData.adsName}
            </React.Fragment>
        );
    }

    adsTypeNameTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Ads Type</span>
                {rowData.adsTypeName}
            </React.Fragment>
        );
    }

    imageTypeNameTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Image Type</span>
                {rowData.imageTypeName}
            </React.Fragment>
        );
    }

    adsLocationNameTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Location</span>
                {rowData.adsLocationName}
            </React.Fragment>
        );
    }

    adsImageUrlTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Ads Image</span>
                <img
                    src={baseUrl.concat(rowData.adsImageUrl)}
                    className="thumb-md img-circle"
                    alt="img"
                    style={{ verticalAlign: "middle" }}
                />
            </React.Fragment>
        );
    }

    adsLocationNameTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Location</span>
                {rowData.adsLocationName}
            </React.Fragment>
        );
    }

    isActiveTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                <span
                    className={
                        rowData.isActive === null || "Y"
                            ? "p-tag p-tag-primary"
                            : "p-tag p-tag-warning"
                    }
                >
                    {rowData.isActive === null || "Y" ? "ACTIVE" : "INACTIVE"}
                </span>
            </React.Fragment>
        );
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Toast ref={(el) => (this.toast = el)} />
                <span className="p-column-title">Action</span>
                <Button
                    label="Update"
                    icon="pi pi-check"
                    className="p-button-help p-mr-2"
                />
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-warning"
                />
            </React.Fragment>
        );
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#ProductReviews" data-toggle="tab" className="nav-link" aria-current="page" data-toggle="tab">
                            Product Reviews
                            </a>
                    </li>
                    <li className="nav-item">
                        <a href="#SellerReviews" className="nav-link" aria-current="page" data-toggle="tab">
                            Seller Reviews
                            </a>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    rightToolbarTemplate() {
        return (
            <React.Fragment>
                <Link to="/SellerHome">
                    <div className="button-demo">
                        <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger p-button-outlined"
                        />
                    </div>
                </Link>
            </React.Fragment>
        );
    }

    renderProductReviewsHeader() {
        return (
            <>
                <div className="table-header">
                    Product Reviews
          <span className="p-input-icon-left">
                        <InputText
                            type="search"
                            className="form-control text-center"
                            onInput={(e) => this.setState({ globalFilter: e.target.value })}
                            placeholder="Search by ads name"
                        />
                    </span>
                </div>
            </>
        );
    }

    renderSellerReviewsHeader() {
        return (
            <>
                <div className="table-header">
                    Seller Reviews
          <span className="p-input-icon-left">
                        <InputText
                            type="search"
                            className="form-control"
                            onInput={(e) => this.setState({ globalFilter: e.target.value })}
                            placeholder="Search by ads name"
                        />
                    </span>
                </div>
            </>
        );
    }

    onContentChange(e) {
        this.setState({ selectedContent: e.value });
    }

    selectedContentTemplate(option, props) {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    contentOptionTemplate(option) {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }

    onStatusChange(e) {
        this.setState({ selectedStatus: e.value });
    }

    selectedStatusTemplate(option, props) {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    statusOptionTemplate(option) {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }

    render() {
        const productReviewsHeader = this.renderProductReviewsHeader();
        const sellerReviewsHeader = this.renderSellerReviewsHeader();
        return (
            <>
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="white-box">
                                    <div className="datatable-doc-demo datatable-responsive-demo">
                                        <div className="card">
                                            <Toolbar
                                                className="p-mb-4"
                                                right={this.rightToolbarTemplate}
                                                left={this.leftToolbarTemplate}
                                            ></Toolbar>
                                            <div className="card">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <button type="button" className="btn btn-info" style={{ marginRight: "10px" }}>All reviews</button>
                                                        <button type="button" className="btn btn-info" style={{ marginRight: "10px" }}>With image/videos</button>
                                                        <button type="button" className="btn btn-info" style={{ marginRight: "10px" }}>With text</button>
                                                        <button type="button" className="btn btn-info">Lower than 4 stars</button>
                                                    </div>
                                                    <div className="col-md-4" align="right">
                                                        <button type="button" className="btn btn-warning" style={{ marginRight: "10px" }}>Search</button>
                                                        <button type="button" className="btn btn-danger">Clear all</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="p-fluid p-grid">
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <span className="p-float-label">
                                                            <InputText id="orderNo" className="form-control" value={this.state.orderNo} onChange={(e) => this.setState({ orderNo: e.target.value })} />
                                                            <label htmlFor="orderNo">Order Number</label>
                                                        </span>
                                                    </div>
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <span className="p-float-label">
                                                            <InputText id="productName" className="form-control" value={this.state.productName} onChange={(e) => this.setState({ productName: e.target.value })} />
                                                            <label htmlFor="productName">Product Name</label>
                                                        </span>
                                                    </div>
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <span className="p-float-label">
                                                            <InputText id="SKU" className="form-control" value={this.state.SKU} onChange={(e) => this.setState({ SKU: e.target.value })} />
                                                            <label htmlFor="SKU">SKU</label>
                                                        </span>
                                                    </div>
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <span className="p-float-label">
                                                            <InputText id="sellerSKU" className="form-control" value={this.state.sellerSKU} onChange={(e) => this.setState({ sellerSKU: e.target.value })} />
                                                            <label htmlFor="sellerSKU">Seller SKU</label>
                                                        </span>
                                                    </div>
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <Dropdown className="form-control" value={this.state.selectedContent} options={this.contents} onChange={this.onContentChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Content"
                                                            valueTemplate={this.selectedContentTemplate} itemTemplate={this.contentOptionTemplate} />
                                                    </div>
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <Dropdown className="form-control" value={this.state.selectedStatus} options={this.statuses} onChange={this.onStatusChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Status"
                                                            valueTemplate={this.selectedStatusTemplate} itemTemplate={this.statusOptionTemplate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="p-fluid p-grid">
                                                    <div className="p-field p-col-12 p-md-2">
                                                        <Calendar id="dateRange" style={{ height: "38px" }} value={this.state.dateRange} onChange={(e) => this.setState({ dateRange: e.value })} selectionMode="range" readOnlyInput placeholder="Start Date -  End Date" />
                                                    </div>
                                                    <div className="p-field p-col-12 p-md-4">
                                                        <MultiSelect value={this.state.selectedRating} style={{ height: "38px" }} options={this.ratings} onChange={(e) => this.setState({ selectedRating: e.value })} optionLabel="name" placeholder="Select Rating" display="chip" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-content clearfix">
                                                <div className="tab-pane active" id="ProductReviews">
                                                    <DataTable
                                                        ref={(el) => (this.dt = el)}
                                                        value={this.state.customers}
                                                        header={productReviewsHeader}
                                                        className="p-datatable-customers p-datatable-responsive-demo"
                                                        dataKey="id"
                                                        rowHover
                                                        globalFilter={this.state.globalFilter}
                                                        selection={this.state.selectedCustomers}
                                                        onSelectionChange={(e) =>
                                                            this.setState({ selectedCustomers: e.value })
                                                        }
                                                        paginator
                                                        rows={10}
                                                        emptyMessage="No ads found"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                        rowsPerPageOptions={[10, 25, 50]}
                                                        {...this.state}
                                                        ads={this.props.ads}
                                                        loading={this.state.loading}
                                                    >
                                                        <Column
                                                            sortField="adsInfoId"
                                                            filterField="adsInfoId"
                                                            header="Order"
                                                            body={this.adsInfoIdTemplate}
                                                            sortable
                                                        />
                                                        <Column
                                                            sortField="adsTypeName"
                                                            header="Content"
                                                            body={this.adsTypeNameTemplate}
                                                            sortable
                                                        />
                                                        <Column
                                                            sortField="adsName"
                                                            filterField="adsName"
                                                            header="Product"
                                                            body={this.adsNameTemplate}
                                                            sortable
                                                        />
                                                        <Column
                                                            sortField="adsImageUrl"
                                                            header="Rating"
                                                            body={this.adsImageUrlTemplate}
                                                        />
                                                        <Column
                                                            sortField="isActive"
                                                            header="Status"
                                                            body={this.isActiveTemplate}
                                                        />
                                                        <Column
                                                            field="action"
                                                            header="Action"
                                                            body={this.actionBodyTemplate}
                                                        />
                                                    </DataTable>
                                                </div>
                                                <div className="tab-pane" id="SellerReviews">
                                                    <DataTable
                                                        ref={(el) => (this.dt = el)}
                                                        value={this.state.customers}
                                                        header={sellerReviewsHeader}
                                                        className="p-datatable-customers p-datatable-responsive-demo"
                                                        dataKey="id"
                                                        rowHover
                                                        globalFilter={this.state.globalFilter}
                                                        selection={this.state.selectedCustomers}
                                                        onSelectionChange={(e) =>
                                                            this.setState({ selectedCustomers: e.value })
                                                        }
                                                        paginator
                                                        rows={10}
                                                        emptyMessage="No ads found"
                                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                        rowsPerPageOptions={[10, 25, 50]}
                                                        {...this.state}
                                                        ads={this.props.ads}
                                                        loading={this.state.loading}
                                                    >
                                                        <Column
                                                            sortField="adsName"
                                                            filterField="adsName"
                                                            header="Ads Name"
                                                            body={this.adsNameTemplate}
                                                            sortable
                                                        />
                                                        <Column
                                                            sortField="imageTypeName"
                                                            header="Image Type"
                                                            body={this.imageTypeNameTemplate}
                                                            sortable
                                                        />
                                                        <Column
                                                            sortField="isActive"
                                                            header="Status"
                                                            body={this.isActiveTemplate}
                                                        />
                                                        <Column
                                                            field="action"
                                                            header="Action"
                                                            body={this.actionBodyTemplate}
                                                        />
                                                    </DataTable>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

// Making ads  array available in  props
const mapStateToProps = (state) => ({
    ads: state.adsReducer.ads,
    loading: state.adsReducer.loading,
    error: state.adsReducer.error,
    searchId: state.searchId,
    handleChange: state.handleChange,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getAdsRecord: () => dispatch(adsAction.getAdsRecord()),

        getAdsByIdRecord: (index) =>
            dispatch(adsAction.getAdsByIdRecord(index)),

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(manageReviewsContainer);