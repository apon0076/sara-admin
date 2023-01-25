import React from "react";

const CreateProductImageByColor = (props) => {
  //////debugger;
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
                    {/*  <label className="col-sm-2 col-form-label">Id</label> */}
                    <div className="col-sm-10">
                      <input
                        type="text"
                        disabled
                        className="form-control"
                        placeholder="ID"
                        name="imageId"
                        hidden
                        value={props.imageId}
                        onChange={props.handleChange2}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Sku</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control single-select"
                        name="productId"
                        value={props.productId}
                        required
                        onChange={props.handleChange2}
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

                  {/*  Table Start */}
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table
                              id="example"
                              className="table table-bordered"
                            >
                              <thead>
                                <tr>
                                  <th>SL</th>
                                  <th>COLOR</th>
                                  <th>SELECT</th>
                                  <th>IMAGE</th>

                                  <th>ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                {props.rows.map((item, idx) => (
                                  <tr id="addr0" key={idx}>
                                    <td>{idx}</td>

                                    <td>
                                      <div className="form-group row">
                                        <div className="col-sm-10">
                                          <select
                                            className="form-control single-select"
                                            name="colorId"
                                            required
                                            value={props.rows[idx].colorId}
                                            onChange={props.handleChange(idx)}
                                          >
                                            <option>Select Color</option>
                                            {props.productImgColors.map(
                                              (color) => (
                                                <option
                                                  key={color.colorId}
                                                  value={color.colorId}
                                                >
                                                  {color.colorName}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="col-sm-10">
                                        {
                                          <input
                                            type="file"
                                            className="form-control"
                                            id="input-8"
                                            required
                                            multiple
                                            onChange={
                                              props.fileMultiSelectedHandler
                                            }
                                          />
                                        }
                                      </div>
                                    </td>

                                    <td>
                                      <br />

                                      <div className="form-group row">
                                        {props.multiProductImages.map(function (
                                          url,
                                          i
                                        ) {
                                          return (
                                            <img
                                              key={i}
                                              src={url}
                                              style={{
                                                width: "100px",
                                                height: "100px",
                                              }}
                                              alt="IMG"
                                            />
                                          );
                                        })}
                                      </div>
                                    </td>

                                    <td>
                                      <div className="btn-group">
                                        <button
                                          className="btn btn-success"
                                          onClick={props.handleAddRow}
                                        >
                                          ADD
                                        </button>

                                        <button
                                          className="btn btn-warning"
                                          onClick={(event) => {
                                            props.handleRemoveRow();
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>

                              <tfoot>
                                <tr>
                                  <th>SL</th>
                                  <th>COLOR</th>
                                  <th>SELECT</th>
                                  <th>IMAGE</th>
                                  <th>ACTION</th>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  Table End */}

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

export default CreateProductImageByColor;
