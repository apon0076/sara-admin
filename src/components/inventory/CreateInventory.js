import React from "react";

const CreateInventory = (props) => {
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
                        name="inventoryId"
                        hidden
                        value={props.inventoryId}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Sku</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control single-select"
                        name="productSku"
                        value={props.productSku}
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

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Color</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control single-select"
                        name="colorId"
                        required
                        onChange={props.handleChange2}
                      >
                        <option>Select Color</option>
                        {props.productColors.map((color) => (
                          <option key={color.colorId} value={color.colorId}>
                            {color.colorName}
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
                                  <th>SIZE</th>
                                  <th>QTY</th>
                                  <th>PRICE</th>

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
                                            name="sizeId"
                                            required
                                            value={props.rows[idx].sizeId}
                                            onChange={props.handleChange(idx)}
                                          >
                                            <option>Select Size</option>
                                            {props.productSizes.map((size) => (
                                              <option
                                                key={size.sizeId}
                                                value={size.sizeId}
                                              >
                                                {size.sizeName}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="form-group row">
                                        <div className="col-sm-10">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="quantity"
                                            name="quantity"
                                            value={props.rows[idx].quantity}
                                            onChange={props.handleChange(idx)}
                                          />
                                        </div>
                                      </div>
                                    </td>

                                    <td>
                                      <div className="form-group row">
                                        <div className="col-sm-10">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="price"
                                            name="price"
                                            value={props.rows[idx].price}
                                            onChange={props.handleChange(idx)}
                                          />
                                        </div>
                                      </div>
                                    </td>

                                    <td>
                                      <div className="btn-group">
                                        <button
                                          className="btn btn-success"
                                          onClick={props.handleAddRow}
                                        >
                                          Create
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
                                  <th>SIZE</th>
                                  <th>QTY</th>
                                  <th>PRICE</th>
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
                            onClick={props.checkValidation}
                            style={{ cursor: "pointer" }}
                          >
                            Save
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

export default CreateInventory;
