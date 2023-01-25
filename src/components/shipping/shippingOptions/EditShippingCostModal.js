import React from 'react'
import EditCouponShipping from './Modal/EditCouponShipping'
import EditCouponShippingSellerShippingCost from './Modal/EditCouponShippingSellerShippingCost'
import EditFlatRateFixedRate from './Modal/EditFlatRateFixedRate'
import EditFlatRateOrderWeight from './Modal/EditFlatRateOrderWeight'
import EditFlatRateProductCategory from './Modal/EditFlatRateProductCategory'
import EditFlatRateSellerShippingCost from './Modal/EditFlatRateSellerShippingCost'
import EditFreeShippingFixedRate from './Modal/EditFreeShippingFixedRate'
import EditFreeShippingOrderWeight from './Modal/EditFreeShippingOrderWeight'
import EditFreeShippingProductCategory from './Modal/EditFreeShippingProductCategory'
import EditFreeShippingSellerShippingCost from './Modal/EditFreeShippingSellerShippingCost'

const EditShippingCostModal = (props) => {
  const { data, allCountries, categories, units, shops ,updateShippingCost, sellers } = props

  return (
    <>
      <div className='ps-my-account ps-page--account'>

          <div className='row'>
            <div className='col-md-12'>
              {/* MODAL */}
              <div
                className='modal fade '
                id='editModal'
                tabIndex='-1'
                role='dialog'
                aria-labelledby='exampleModalCenterTitle'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-lg' role='document'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <div className='modal-title' id='exampleModalLongTitle'>
                        <div>
                          <div class='pull-left'>
                            <b>Edit Shipping Cost</b>
                          </div>
                          <div class='pull-right'>
                            <button
                              type='button'
                              className='close'
                              data-dismiss='modal'
                              aria-label='Close'
                            >
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='modal-body'>
                      {data.typeName === 'Flat Rate' && data.optionName === 'Fixed Rate' && (
                        <EditFlatRateFixedRate
                          data={data}
                          allCountries={allCountries}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Flat Rate' && data.optionName === 'Order Weight' && (
                        <EditFlatRateOrderWeight
                          data={data}
                          allCountries={allCountries}
                          units={units}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Flat Rate' && data.optionName === 'Product Category' && (
                        <EditFlatRateProductCategory
                          data={data}
                          allCountries={allCountries}
                          categories={categories}
                          units={units}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Flat Rate' && data.optionName === 'Seller Shipping Cost' && (
                        <EditFlatRateSellerShippingCost
                          data={data}
                          allCountries={allCountries}
                          sellers={sellers}
                          units={units}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Free Shipping' && data.optionName === 'Fixed Rate' && (
                        <EditFreeShippingFixedRate
                          data={data}
                          allCountries={allCountries}
                          categories={categories}
                          units={units}
                          shops={shops}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Free Shipping' && data.optionName === 'Order Weight' && (
                        <EditFreeShippingOrderWeight
                          data={data}
                          allCountries={allCountries}
                          categories={categories}
                          units={units}
                          shops={shops}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Free Shipping' && data.optionName === 'Product Category' && (
                        <EditFreeShippingProductCategory
                          data={data}
                          allCountries={allCountries}
                          categories={categories}
                          units={units}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Free Shipping' && data.optionName === 'Seller Shipping Cost' && (
                        <EditFreeShippingSellerShippingCost
                          data={data}
                          allCountries={allCountries}
                          sellers={sellers}
                          units={units}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                      {data.typeName === 'Coupon Shipping' && 
                        data.shippingOptionsId === 99 && (
                          <EditCouponShipping
                            data={data}
                            allCountries={allCountries}
                            categories={categories}
                            units={units}
                            shops={shops}
                            updateShippingCost={updateShippingCost}
                          />
                        )}
                        {data.typeName === 'Coupon Shipping' && data.optionName === 'Seller Shipping Cost' && (
                        <EditCouponShippingSellerShippingCost
                          data={data}
                          allCountries={allCountries}
                          sellers={sellers}
                          units={units}
                          updateShippingCost={updateShippingCost}
                        />
                      )}
                    </div>
                  </div>
                  {/* MODAL END */}
                </div>
              </div>
            </div>
          </div>
   
      </div>
    </>
  )
}

export default EditShippingCostModal
