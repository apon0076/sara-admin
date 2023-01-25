import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import { ToastContainer } from "react-toastify";

const ReturnPolicy = (props) => {
  const {
    isReturnable,
    setIsReturnable,
    returnDuration,
    setReturnDuration,
    returnPolicy,
    setReturnPolicy
  } = props;

  const handleReturnPolicyChange = (event, editor) => {
    const data = editor.getData();
    setReturnPolicy(data);
  };

  return (
    <>
      <div className="product_variants__section">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <div className="form-group">
              <label className="control_label">Is Returnable ? </label>
              <div className="checkbox checkbox-success">
                <input
                  id="isReturnable"
                  type="checkbox"
                  name="isReturnable"
                  checked={isReturnable}
                  onChange={(e) => setIsReturnable(e.target.checked)}
                />
                <label htmlFor="isReturnable"> &nbsp;Yes</label>
              </div>
            </div>
          </div>
          {isReturnable && (
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label className="control_label">
                  Return Duration (Days){" "}
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
                  type="number"
                  className={"form-control"}
                  placeholder="Enter Return Duration (Days)"
                  name="returnDuration"
                  value={returnDuration || 0}
                  onChange={(e) =>
                    setReturnDuration(e.target.value < 0 ? 0 : e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>

        {isReturnable && (
          <>
            <div className="row">
              <div className="col-md-10 col-sm-12">
                <div className="form-group">
                  <label className="control_label">
                    Return Policy Description{" "}
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
                  <CKEditor
                    editor={ClassicEditor}
                    data={returnPolicy || ""}
                    onChange={handleReturnPolicyChange}
                    className={"form-control"}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default ReturnPolicy;
