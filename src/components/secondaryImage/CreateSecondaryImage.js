import React from "react";

const CreateSecondaryImage = (props) => {
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">{props.name}</div>
                <hr />
                <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Id</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        placeholder="ID"
                        name="imageId"
                        value={props.imageId}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="input-3" className="col-sm-2 col-form-label">
                      SKU
                    </label>

                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        name="productId"
                        onChange={props.handleChange}
                      >
                        <option>Select Sku</option>
                        {props.products.map((product) => (
                          <option
                            key={product.productId}
                            value={product.productId}
                          >
                            {product.productSku}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="input-3" className="col-sm-2 col-form-label">
                      IMAGE
                    </label>

                    <div className="col-sm-10">
                      <input
                        type="file"
                        className="form-control"
                        id="input-8"
                        required
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        multiple
                        onChange={props.fileMultiSelectedHandler}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="input-3" className="col-sm-2 col-form-label">
                      {/* PREVIEW */}
                    </label>

                    {props.multiProductImages.map(function (url, i) {
                      return (
                        <img
                          key={i}
                          src={url}
                          alt="#!"
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="form-footer">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-sm-10">
                        <div className="btn-group">
                          <button
                            className="btn btn-success"
                            onClick={props.saveProductImage}
                            style={{ cursor: "pointer" }}
                          >
                            Create
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={props.clearData}
                            style={{ cursor: "pointer" }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSecondaryImage;
