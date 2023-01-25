import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const SizeChartEditAttribute = ({
  loading,
  editAttributeName,
  setEditAttributeName,
  editAttributeDisplayOrder,
  setEditAttributeDisplayOrder,
  editAttributeIsActive,
  setEditAttributeIsActive,
  setEditModalShow,
  handleAttributeUpdateSubmit,
}) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  );
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-success">
          <div className="panel-wrapper collapse in" aria-expanded="true">
            <form className="form-horizontal">
              <div className="form-body">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      <label className="control_label">
                        Attribute Name
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
                        placeholder="Enter Attribute Name"
                        name="name"
                        className={" form-control"}
                        value={editAttributeName}
                        onChange={(e) => setEditAttributeName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      <label className="control_label">Display Order</label>
                      <input
                        type="number"
                        placeholder="Enter Display Order"
                        name="name"
                        className={" form-control"}
                        value={editAttributeDisplayOrder}
                        onChange={(e) =>
                          setEditAttributeDisplayOrder(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      <label className="control_label">Is Active</label>
                      <div className="checkbox checkbox-success">
                        <input
                          id="contentActive"
                          type="checkbox"
                          name="contentActive"
                          checked={editAttributeIsActive}
                          onChange={(e) =>
                            setEditAttributeIsActive(e.target.checked)
                          }
                        />
                        <label htmlFor="contentActive"> &nbsp;Yes </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-footer ">
                <div className="form-group row">
                  <div className="text-center">
                    {loading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <div className="btn-group text-center">
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={
                            !editAttributeName || !editAttributeDisplayOrder
                          }
                          onClick={(e) => handleAttributeUpdateSubmit(e)}
                        >
                          Update
                        </button>

                        <button
                          onClick={() => setEditModalShow(false)}
                          className="btn btn-danger"
                          style={{ cursor: "pointer" }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartEditAttribute;
