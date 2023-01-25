import React from 'react'
import { Dialog } from "primereact/dialog";
import baseUrl from "../../utils/baseUrl"

export default function ProductDialog(props) {
    const { productDialog, productDialogFooter, hideDialog, product, onInputNumberChange } = props;
    return (
        <div>
            <Dialog
                visible={productDialog}
                style={{ width: "450px" }}
                header="Product Details"
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                {product.thumbnailImage && (
                    <img
                        src={baseUrl.concat(product.thumbnailImage)}
                        alt={product.productName}
                        className="product-image p-d-block p-m-auto p-pb-3"
                        style={{ height: '120px', width: '120px' }}
                    />
                )}
                <div className="form-group">
                    <label className="control_label">
                        Name{" "}
                        <span
                            aria-hidden="true"
                            style={{
                                color: "red",
                                fontWeight: "bold",
                            }}
                        >
                            *
                        </span>
                    </label>
                    <div class="row">
                        <div className="col-md-12 col-sm-12">
                            <input
                                type="text"
                                id="productName"
                                className="form-control"
                                name="productName"
                                value={product.productName}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control_label">
                        Category{" "}
                        <span
                            aria-hidden="true"
                            style={{
                                color: "red",
                                fontWeight: "bold",
                            }}
                        >
                            *
                        </span>
                    </label>
                    <div class="row">
                        <div className="col-md-12 col-sm-12">
                            <input
                                type="text"
                                id="categoryName"
                                className="form-control"
                                name="categoryName"
                                value={product.categoryName}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div class="row">
                        <div className="col-md-6 col-sm-12">
                            <label className="control_label">
                                Price{" "}
                                <span
                                    aria-hidden="true"
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                id="productPrice"
                                className="form-control"
                                name="productPrice"
                                value={product.productPrice}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <label className="control_label">
                                Quantity{" "}
                                <span
                                    aria-hidden="true"
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    *
                                </span>
                            </label>
                            <input
                                type="text"
                                id="quantity"
                                className="form-control"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => onInputNumberChange(e, 'quantity')}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
