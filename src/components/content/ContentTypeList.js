import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { Tag } from "primereact/tag";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingCard from "../../components/shared/LoadingCard";

export default function ContentTypeList(props) {
  const [globalFilter, setGlobalFilter] = useState("");

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const nameBodyTemplate = (rowData) => {
    return <React.Fragment>{rowData?.contentTypeName}</React.Fragment>;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="job_vacancy__action_btn">
          {rowData?.isActive === "Y" ? (
            <Tag
              className="mr-2"
              severity="success"
              value="Active"
              rounded
              fontSize="1rem"
            ></Tag>
          ) : (
            <Tag
              className="mr-2"
              severity="danger"
              value="In-Active"
              rounded
              fontSize="1rem"
            ></Tag>
          )}
        </div>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => {
            props.setContentTypePageOptions(3);
            props.setContentTypeDataById(rowData);
          }}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="button-demo">
          <Button
            onClick={() => props.setContentTypePageOptions(1)}
            icon="pi pi-times"
            className="p-button-rounded p-button-danger p-button-outlined"
          />
        </div>
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="p-text-bold table-heading-style">
          List of Content Type name
        </div>
      </React.Fragment>
    );
  };
  const renderHeader = () => {
    return (
      <>
        <div className="table-header">
          <span className="p-input-icon-left">
            <InputText
              type="search"
              className="form-control text-center text-field"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search by Content Type name"
            />
          </span>
        </div>
      </>
    );
  };
  const header = renderHeader();
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
                      right={rightToolbarTemplate}
                      left={leftToolbarTemplate}
                    ></Toolbar>
                    {props.loading ? (
                      <LoadingCard count={1} />
                    ) : (
                      <DataTable
                        header={header}
                        value={props.contentTypeList?.data}
                        className="p-datatable-customers p-datatable-responsive-demo"
                        dataKey="id"
                        rowHover
                        globalFilter={globalFilter}
                        paginator
                        rows={10}
                        emptyMessage="No Content Type found"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                      >
                        <Column
                          field="Index"
                          header="SN"
                          body={onIndexTemplate}
                        />

                        <Column
                          sortField="contentTypeName"
                          filterField="contentTypeName"
                          header="Content Type Name"
                          body={nameBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField="isActive"
                          header="Content Type Status"
                          body={statusBodyTemplate}
                          sortable
                        />
                        <Column
                          field="action"
                          header="Edit"
                          body={actionBodyTemplate}
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
  );
}
