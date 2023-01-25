import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";

import "react-datepicker/dist/react-datepicker.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";

export const ManageOrder = () => {
  // const dispatch = useDispatch();

  const [dates2, setDates2] = useState(null);

  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  // const isMounted = useRef(false);

  const data = useSelector((state) => state.manageOrder.collections.data);

  useEffect(() => {
    setProducts(data);
  }, [data]);


  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};
    products.forEach((p) => (_expandedRows[`${p.id}`] = true));
    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const amountBodyTemplate = (rowData) => {
    return formatCurrency(rowData.amount);
  };

  const statusOrderBodyTemplate = (rowData) => {
    return (
      <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  };

  // const searchBodyTemplate = () => {
  //   return <Button icon="pi pi-search" />;
  // };

  // const imageBodyTemplate = (rowData) => {
  //   return (
  //     <img
  //       src={`showcase/demo/images/product/${rowData.image}`}
  //       onError={(e) =>
  //         (e.target.src =
  //           "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
  //       }
  //       alt={rowData.image}
  //       className="product-image"
  //     />
  //   );
  // };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable datatable-responsive-demo">
        {/* <h5>Orders for {data.name}</h5> */}
        <DataTable value={data.orders}>
          <Column field="id" header="Id"></Column>
          <Column field="customer" header="Customer"></Column>
          <Column field="date" header="Date"></Column>
          <Column
            field="amount"
            header="Amount"
            body={amountBodyTemplate}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={statusOrderBodyTemplate}
          ></Column>
          {/* <Column
            headerStyle={{ width: "4rem" }}
            body={searchBodyTemplate}
          ></Column> */}
        </DataTable>
      </div>
    );
  };
  //

  //   const paginatorLeft = (
  //     <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  //   );
  //   const paginatorRight = (
  //     <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  //   );

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="white-box">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#!">
                  All
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Pending
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Ready to Ship
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#!">
                  Shipped
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#!">
                  Delivered
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#!">
                  Shipped
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#!">
                  Cancelled
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#!">
                  Returned
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#!">
                  Failed Delivery
                </a>
              </li>
            </ul>
          </div>
          <br />
          <div className="white-box">
            <form>
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Order Number"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Customer"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Product"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Seller SKU"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Payment Type"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Delivery Option"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="usr"
                      placeholder="Fulfilment"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <Calendar
                      id="range"
                      value={dates2}
                      onChange={(e) => setDates2(e.value)}
                      selectionMode="range"
                      readOnlyInput
                      style={{ height: "35px" }}
                      placeholder="mm/dd/yy - mm/dd/yy"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button type="button" className="btn btn-info">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br />
      <div className="white-box">
        <div className="datatable-rowexpansion-demo datatable-responsive-demo">
          <Toast ref={toast} />
          <br />
          <div className="card">
            <DataTable
              value={products}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              onRowExpand={onRowExpand}
              onRowCollapse={onRowCollapse}
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id"
              paginator
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              rows={10}
              rowsPerPageOptions={[10, 20, 50]}
              // header={header}
            >
              <Column expander style={{ width: "3em" }} />
              <Column field="name" header="Name" sortable />
              {/* <Column header="Image" body={imageBodyTemplate} /> */}
              <Column
                field="price"
                header="Price"
                sortable
                body={priceBodyTemplate}
              />
              <Column field="category" header="Category" sortable />
              <Column
                field="rating"
                header="Reviews"
                sortable
                body={ratingBodyTemplate}
              />
              <Column
                field="inventoryStatus"
                header="Status"
                sortable
                body={statusBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};
