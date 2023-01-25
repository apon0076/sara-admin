import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const CreateProductAttribute = ({
  categoryId,
  productVariant,
  handleAttributeChanges,
}) => {
  const [attribute, setAttribute] = useState([]);
  const animatedComponents = makeAnimated();


  const handleAttributeChange = (initialAttributeValue, variantName) => {
    var newArray = [];
    for (var i = 0; i < attribute.length; i++) {
      if (attribute[i].filterName !== variantName) newArray.push(attribute[i]);
    }
    if (initialAttributeValue)
      newArray = newArray.concat(initialAttributeValue);
    if (newArray.length === 0) setAttribute([]);
    else setAttribute(newArray);
  };
  useEffect(() => {
    handleAttributeChanges(attribute);
  }, [attribute, handleAttributeChanges]);

  return (
    <div>
      <label
        style={{
          width: "100%",
        }}
        class="control_label"
      >
        Attributes
      </label>
      {categoryId === 1076 ? null : (
        <form>
          <div className="price_and_stock">
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <table className="table mt-30" id="tableImg">
                    <tbody>
                      <tr
                        style={
                          productVariant.filter(
                            (variantData) =>
                              variantData.variantSetupTempleteId === 2
                          ).length > 2
                            ? {
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(3, minmax(0, 1fr))",
                              }
                            : productVariant.filter(
                                (variantData) =>
                                  variantData.variantSetupTempleteId === 2
                              ).length > 1
                            ? {
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(2, minmax(0, 1fr))",
                              }
                            : {
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(1, minmax(0, 1fr))",
                              }
                        }
                      >
                        {productVariant
                          .filter(
                            (variantData) =>
                              variantData.variantSetupTempleteId === 2
                          )
                          .map((variant, index) => {
                            return (
                              <td key={index}>
                                <Select
                                  name={`field${index}`}
                                  placeholder={`Select ${variant.variantName}`}
                                  options={variant.productVariantOptions.map(
                                    (data) => ({
                                      filterName: variant.variantName,
                                      label: data.variantOptionText,
                                      value: data.variantOptionId,
                                    })
                                  )}
                                  components={animatedComponents}
                                  isMulti
                                  isSearchable
                                  onChange={(e) =>
                                    handleAttributeChange(
                                      e,
                                      variant.variantName
                                    )
                                  }
                                />
                              </td>
                            );
                          })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProductAttribute;
