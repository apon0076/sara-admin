import React from "react";

const SizeChartTable = ({
  variantOption,
  attributesValue,
  unitId,
  sizeChartValueChange,
  unitName,
  sizeGuideTemplateId,
  values,
  loading,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <table className="w-full p-10">
            <tr>
              <th
                className="border-1 p-10 text-center"
                style={{ borderColor: "#ddd" }}
              >
                {sizeGuideTemplateId === 2 ? "BD" : null}
              </th>
              {attributesValue.map(
                (attribute_heading_data, attribute_heading_index) => (
                  <th
                    className="border-1 p-10 text-center"
                    style={{ borderColor: "#ddd" }}
                    key={attribute_heading_index}
                  >
                    {attribute_heading_data.label}
                  </th>
                )
              )}
            </tr>
            {variantOption.map((variant_data, variant_index) => (
              <tr key={variant_index}>
                <th
                  className="border-1 p-10 text-center"
                  style={{ borderColor: "#ddd" }}
                >
                  {variant_data.label}
                </th>
                {attributesValue.map((attribute_data, attribute_index) => (
                  <td
                    key={attribute_index}
                    className="border-1 p-10"
                    style={{ borderColor: "#ddd" }}
                  >
                    <input
                      style={{
                        border: "none",
                        width: "100%",
                        textAlign: "center",
                      }}
                      type="text"
                      defaultValue={
                        loading
                          ? ""
                          : values &&
                            values.find(
                              (data) =>
                                (attribute_data.value === 0
                                  ? data.sizeAttributeName ===
                                    attribute_data.label
                                  : data.sizeAttributeId ===
                                    attribute_data.value) &&
                                data.variantOptionId === variant_data.value &&
                                data.unitId === unitId &&
                                data.sizeGuideTemplateId === sizeGuideTemplateId
                            )?.sizeAttributeValue
                      }
                      onChange={(e) =>
                        sizeChartValueChange(
                          e.target.value,
                          unitId,
                          variant_data.label,
                          variant_data.value,
                          attribute_data.label,
                          attribute_data.value,
                          unitName,
                          sizeGuideTemplateId
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SizeChartTable;
