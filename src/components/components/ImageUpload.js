import React from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import baseUrl from "../../utils/baseUrl";

const ImageUpload = ({ imagePath, setImagePath, height, defaultImageUrl }) => {
  const fileChangedHandler = (event) => {
    const imageFile = event.target.files[0];
    //CHECK IF IT'S A IMAGE

    var fileInput = false;
    if (imageFile) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          imageFile,
          1000,
          1000,
          "JPEG",
          100,
          0,
          (uri) => {
            setImagePath(uri);
          },
          "base64",
          1000,
          1000
        );
      } catch (err) {
        toast.current.show({
          severity: "error",
          summary: "Something went wrong!",
        });
      }
    }
  };
  return (
    <div className="relative">
      <div
        className="border-1 rounded-6 p-3 image__upload_section flex items-center justify-center"
        style={{ borderColor: "#ced4da", height: `${height}px` }}
      >
        {imagePath === "" ? (
          <>
            {defaultImageUrl === undefined ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Zm2.8-4.85h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 39V9v30Z" />
              </svg>
            ) : (
              <img
                src={baseUrl.concat(defaultImageUrl)}
                alt="avatar"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </>
        ) : (
          <img
            src={imagePath}
            alt="avatar"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        )}
      </div>
      <div className="image_placeholder_area">
        <div className="image_upload_button">
          <input
            className="input-file"
            accept="image/*"
            id="my-file"
            type="file"
            onChange={fileChangedHandler}
          />
          {imagePath === "" ? (
            <div className="file-dummy">
              <div className="default">Select Image</div>
            </div>
          ) : (
            <div className="file-dummy">
              <div className="default">Select Again</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
