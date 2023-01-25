import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import {ToastContainer } from "react-toastify";

const ProductDetails = (props) => {
  const {
    productDescription,
    setProductDescription,
    productSpecification,
    setProductSpecification,
  } = props;

  const [errorProductDescription, setErrorProductDescription] = useState("");
  const [errorProductSpecification, setErrorProductSpecification] =
    useState("");

  const productDescriptionChange = (event, editor) => {
    const data = editor.getData();

    setProductDescription(data);
    setErrorProductDescription(data < 4 ? "required field" : "");
  };

  const productSpecificationChange = (event, editor) => {
    const data = editor.getData();

    setProductSpecification(data);
    setErrorProductSpecification(data < 4 ? "required field" : "");
  };

  return (
    <>
      <div className="product_variants__section">
        <div>
          <h3 className="box-title m-t-20">
            Product Description{" "}
            <span
              aria-hidden="true"
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>
          </h3>
          <div className="row">
            <div className="col-md-12 ">
              <div className="form-group">
                <div
                  className={
                    errorProductDescription.length !== 0
                      ? "errorClass editor"
                      : "editor"
                  }
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={productDescription}
                    onChange={productDescriptionChange}
                    className={
                      productDescription?.length === 0
                        ? "errorClass form-control"
                        : "form-control" && "form-control"
                    }
                  />
                </div>
                <span className="text-danger">{errorProductDescription}</span>
              </div>
            </div>
          </div>
        </div>

        {/* //Product Specification // */}
        <div>
          <h3 className="box-title m-t-20">
            Product Specification{" "}
            <span
              aria-hidden="true"
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>
          </h3>
          <div className="row" style={{ display: "" }}>
            <div className="col-md-12 ">
              <div className="form-group">
                <div
                  className={
                    errorProductSpecification.length !== 0
                      ? "errorClass editor"
                      : "editor"
                  }
                >
                  <CKEditor
                    editor={ClassicEditor}
                    data={productSpecification}
                    onChange={productSpecificationChange}
                  />
                </div>
                <span className="text-danger">{errorProductSpecification}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //Product Description End// */}
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default ProductDetails;
