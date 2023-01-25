import React from "react";
import FlipMove from "react-flip-move";

function ListItems(props) {
  const advertisingImages = props.advertisingImages;
  const listItems =
    advertisingImages &&
    advertisingImages.map((item, index) => {
      return (
        <div
          className="list"
          style={{ width: "75%", height: "60px", marginTop: "10px" }}
          key={index}
        >
          <p>
            <div className="p-fluid p-formgrid p-grid d-flex align-items-center">
              <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                <input
                  type="text"
                  id={item?.adsImageSeoName}
                  value={item?.adsImageSeoName}
                />
              </div>

              <div className="p-fluid p-col-12 p-md-6 p-lg-3">
                <input type="text" id={item?.adsLink} value={item?.adsLink} />
              </div>

              <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                <img
                  style={{ width: "100px", height: "40px" }}
                  src={item?.adsImageUrl}
                  alt="img"
                />
              </div>

              <div className="p-fluid p-col-12 p-md-6 p-lg-2">
                <input
                  type="number"
                  id={item?.displayOrder}
                  value={item?.displayOrder}
                />
              </div>

              {item?.isActive === "Y" ? (
                <div
                  className="p-fluid p-col-12 p-md-6 p-lg-2 text-align--center"
                  style={{ color: "green" }}
                >
                  Active
                </div>
              ) : (
                <div
                  className="p-fluid p-col-12 p-md-6 p-lg-2 text-align--center"
                  style={{ color: "red" }}
                >
                  Inactive
                </div>
              )}

              <div className="p-fluid p-col-12 p-md-6 p-lg-1">
                <span>
                  <i
                    className="fas fa-trash-alt text-danger"
                    onClick={() => {
                      props.deleteItem(index);
                    }}
                  ></i>
                </span>
              </div>
            </div>
          </p>
        </div>
      );
    });
  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </div>
  );
}

export default ListItems;
