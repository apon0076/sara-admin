/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";
import { Paginator } from "../paginator/Paginator";
import LoadingCard from "../shared/LoadingCard";

export const ProductListTable = ({
  currentLocation,
  product_status,
  product_list,
  setViewDetailsProductId,
  handleItemPerPage,
  handleCurrentPage,
  currentPage,
  setCurrentPage,
  totalPage,
  setTotalPage,
  itemPerPage,
  setItemPerPage,
  totalItems,
  setTotalItems,
  handleInActiveProduct,
  handleActiveProduct,
  currency,
  isApproved,
  setSearchKeyword,
  searchKeyword,
  searchProductList,
  categories,
  setCategory,
  brands,
  setBrandId,
  setStatusCode,
  loading,
  setSearchKeywordApi,
  setCategoryApi,
  setBrandIdApi,
  setStatusCodeApi,
}) => {
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [brandInfo, setBrandInfo] = useState(null);
  const [statusInfo, setStatusInfo] = useState(null);
  const [productImageHoverImage, setProductImageHoverImage] = useState(null);
  const location = useHistory();
  const productStatusArr = [
    { status: "Active", code: "Y" },
    { status: "Inactive", code: "N" },
  ];
  const onCategoryChange = (e) => {
    setCategoryInfo(e.value);
  };
  const onBrandChange = (e) => {
    setBrandInfo(e.value);
  };
  const onStatusChange = (e) => {
    setStatusInfo(e.value);
  };
  useEffect(() => {
    if (categoryInfo !== null) {
      setCategory(categoryInfo.categoryId);
    } else {
      setCategory("");
    }
  }, [categoryInfo, setCategory]);
  useEffect(() => {
    if (brandInfo !== null) {
      setBrandId(brandInfo.brandId);
    } else {
      setBrandId("");
    }
  }, [brandInfo, setBrandId]);
  useEffect(() => {
    if (statusInfo !== null) {
      setStatusCode(statusInfo.code);
    } else {
      setStatusCode("");
    }
  }, [setStatusCode, statusInfo]);
  useEffect(() => {
    setSearchKeywordApi("");
    setCategoryApi("");
    setBrandIdApi("");
    setStatusCodeApi("");
    setSearchKeyword("");
    setCategoryInfo(null);
    setBrandInfo(null);
    setStatusInfo(null);
  }, [
    product_status,
    setBrandIdApi,
    setCategoryApi,
    setSearchKeyword,
    setSearchKeywordApi,
    setStatusCodeApi,
  ]);
  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };
  const imageBodyTemplate = (rowData) => {
    const handleMouseEnter = (data) => {
      setProductImageHoverImage(data.thumbnailImage);
    };
    return (
      <div style={{ position: "relative" }}>
        <img
          onMouseEnter={() => handleMouseEnter(rowData)}
          className="product_list__img"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            cursor: "pointer",
            border: "1px solid #ddd",
            objectFit: "contain",
          }}
          src={baseUrl.concat(rowData.thumbnailImage)}
          alt="IMG"
        />
        <div className="product_list__tooltip">
          <div className="tooltip__img">
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              src={baseUrl.concat(productImageHoverImage)}
              alt="product image"
            />
          </div>
        </div>
        <div className="image_tooltip__indicator"></div>
      </div>
    );
  };
  const detailsBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          label="View Details"
          className="p-button-success"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => setViewDetailsProductId(rowData.productId)}
        />
      </>
    );
  };
  const editBodyTemplate = (rowData) => {
    const handleEditProduct = () => {
      currentLocation === "/manage-products"
        ? location.push({
            pathname: `/EditProduct/${rowData.productId}`,
            state: {
              id: rowData.productId,
              currency: currency,
              isApproved: isApproved,
              currentPage: currentPage,
              itemPerPage: itemPerPage,
            },
          })
        : location.push({
            pathname: `/EditSellerProduct/${rowData.productId}`,
            state: {
              id: rowData.productId,
              currency: currency,
              isApproved: isApproved,
              currentPage: currentPage,
              itemPerPage: itemPerPage,
            },
          });
    };
    return (
      <React.Fragment>
        <span className="p-buttonset verified-button">
          <Button
            onClick={() => handleEditProduct()}
            label="Edit"
            className="p-button-success"
          />
        </span>
      </React.Fragment>
    );
  };
  const productNameTemplate = (rowData) => {
    return (
      <>
        {rowData.productStatus === "Y" && rowData.isApprove === "Y" ? (
          <a
            href={`http://saralifestyle.com/product/${rowData.productId}/${rowData.sku}/`}
            target="_blank"
          >
            {rowData.productName}
          </a>
        ) : (
          rowData.productName
        )}
      </>
    );
  };

  useEffect(() => {
    if (product_list?.headers?.pagination) {
      var paginated_data_to_parse = product_list?.headers?.pagination;
      const paginated_data = JSON.parse(paginated_data_to_parse);
      setCurrentPage(paginated_data.currentPage);
      setTotalPage(paginated_data.totalPages);
      setTotalItems(paginated_data.totalItems);
      setItemPerPage(paginated_data.itemsPerPage);
    }
  }, [
    product_list?.headers?.pagination,
    setCurrentPage,
    setItemPerPage,
    setTotalItems,
    setTotalPage,
  ]);

  const changeStatusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-buttonset verified-button">
          {rowData.productStatus === "Y" ? (
            <Button
              label="Inactive"
              className="p-button-danger"
              onClick={() => handleInActiveProduct(rowData)}
            />
          ) : (
            <Button
              label="Active"
              className="p-button-success"
              onClick={() => handleActiveProduct(rowData)}
            />
          )}
        </span>
      </React.Fragment>
    );
  };

  return (
    <>
      <div
        className="table-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space between",
          padding: "8px 16px 8px 16px",
          borderBottom: "1px solid #ddd",
          borderTop: "1px solid #ddd",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "600", margin: "0" }}>
          {product_status === "pending" ? (
            <span>Pending</span>
          ) : product_status === "approved" ? (
            <span>Approved</span>
          ) : (
            <span>Rejected</span>
          )}{" "}
          Products List
        </p>
        <div style={{ display: "flex" }}>
          <div
            style={{ margin: "0 5px", width: "240px", position: "relative" }}
          >
            <InputText
              style={{
                width: "100%",
              }}
              className="manage_product__search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Keyword"
            />
            {searchKeyword !== "" ? (
              <button
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "8px",
                  borderRadius: "100%",
                  border: "1px solid #ced4da",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setSearchKeyword("");
                  setSearchKeywordApi("");
                }}
              >
                <i className="pi pi-times"></i>
              </button>
            ) : null}
          </div>
          <div
            style={{ margin: "0 5px", width: "175px", position: "relative" }}
          >
            <Dropdown
              style={{
                width: "100%",
              }}
              value={categoryInfo}
              options={categories}
              filter
              onChange={onCategoryChange}
              optionLabel="categoryName"
              placeholder="Select a Category"
            />
            {categoryInfo !== null ? (
              <button
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "8px",
                  borderRadius: "100%",
                  border: "1px solid #ced4da",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setCategoryInfo(null);
                  setCategoryApi("");
                }}
              >
                <i className="pi pi-times"></i>
              </button>
            ) : null}
          </div>
          <div
            style={{ margin: "0 5px", width: "175px", position: "relative" }}
          >
            <Dropdown
              style={{
                width: "100%",
              }}
              value={brandInfo}
              options={brands}
              filter
              showClear
              onChange={onBrandChange}
              optionLabel="brandName"
              placeholder="Select a Brand"
            />
            {brandInfo !== null ? (
              <button
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "8px",
                  borderRadius: "100%",
                  border: "1px solid #ced4da",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setBrandInfo(null);
                  setBrandIdApi("");
                }}
              >
                <i className="pi pi-times"></i>
              </button>
            ) : null}
          </div>

          <div
            style={{ margin: "0 5px", width: "175px", position: "relative" }}
          >
            <Dropdown
              style={{
                width: "100%",
              }}
              value={statusInfo}
              options={productStatusArr}
              onChange={onStatusChange}
              optionLabel="status"
              placeholder="Select a Status"
            />
            {statusInfo !== null ? (
              <button
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "8px",
                  borderRadius: "100%",
                  border: "1px solid #ced4da",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setStatusInfo(null);
                  setStatusCodeApi("");
                }}
              >
                <i className="pi pi-times"></i>
              </button>
            ) : null}
          </div>
          <Button
            onClick={() => searchProductList()}
            style={{ marginLeft: "5px" }}
            label="Search"
          />
        </div>
      </div>
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <DataTable
          className="product_list_table"
          responsiveLayout="scroll"
          value={product_list.data}
        >
          <Column field="Index" header="SN" body={onIndexTemplate} />
          <Column
            field="productName"
            header="Product Name"
            body={productNameTemplate}
            sortable
          />
          <Column field="shopName" header="Shop Name" sortable />
          <Column field="sku" header="Product Style / SKU" sortable />
          <Column field="categoryName" header="Category" sortable />
          <Column field="brandName" header="Brand" sortable />
          <Column
            sortField="thumbnailImage"
            header="Image"
            body={imageBodyTemplate}
          />
          <Column field="maxPrice" header="Price" sortable />
          <Column field="view" header="Details" body={detailsBodyTemplate} />
          {product_status === "approved" ? (
            <Column
              field="action"
              header="Status"
              body={changeStatusBodyTemplate}
            />
          ) : null}
          {(product_status === "pending" || product_status === "rejected") &&
          currentLocation === "/manage-products" ? null : (
            <Column field="Edit" header="Edit" body={editBodyTemplate} />
          )}
        </DataTable>
      )}
      <Paginator
        totalPage={totalPage}
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        totalItems={totalItems}
        items={product_list.data}
        itemsPerPageOptions={[30, 60, 90, 100, 200, 300]}
        handleItemPerPage={handleItemPerPage}
        handleCurrentPage={handleCurrentPage}
      />
    </>
  );
};
