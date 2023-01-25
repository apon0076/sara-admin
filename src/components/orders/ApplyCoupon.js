import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkVoucher } from '../../store/actions/voucherAction'
import { CHECK_VOUCHER_RESET } from '../../store/actions/voucherAction'
import { Toast } from 'primereact/toast'

export default function ApplyCoupon(props) {
  const { getVoucher, productSize } = props

  const [voucherCode, setVoucherCode] = useState('')
  const [discountError, setDiscountError] = useState('')

  const dispatch = useDispatch()
  const toast = useRef(null)

  const checkVoucherValidity = useSelector((state) => state.voucherValidity)
  const {
    voucherValidity,
    loading: voucherLoading,
    error: voucherError,
  } = checkVoucherValidity

  useEffect(() => {
    if (
      voucherValidity &&
      voucherValidity.succeed === true &&
      voucherLoading === false
    ) {
      toast.current.show({
        severity: 'info',
        summary: 'Discount Applied!',
        detail: 'Thank you for being with us.',
      })
      dispatch({ type: CHECK_VOUCHER_RESET })
    } else if (
      voucherValidity &&
      voucherValidity.succeed === false &&
      voucherLoading === false
    ) {
      toast.current.show({
        severity: 'error',
        summary: 'Something Went Wrong.',
        detail: 'Please, try again later!',
      })
      dispatch({ type: CHECK_VOUCHER_RESET })
    } else if (voucherLoading === false && voucherError) {
      toast.current.show({
        severity: 'error',
        summary: 'Something Went Wrong.',
        detail: 'Please, try again later!',
      })
      dispatch({ CHECK_VOUCHER_RESET })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, checkVoucherValidity])

  useEffect(() => {
    voucherValidity && getVoucher(voucherValidity)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucherValidity])

  const showApplyCoupon = () => (
    <>
      <p style={{ fontSize: '15px', marginBottom: '10px' }}>
        Apply Coupon/Voucher Code
      </p>
      <div className='row'>
        <div className='col-md-8'>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Enter Code here'
              onChange={(e) => {
                setVoucherCode(e.target.value)
                setDiscountError('')
              }}
              value={voucherCode}
              style={{ height: '40px', backgroundColor: '#fff' }}
            />
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group'>
            <button
              className='btn btn-success'
              onClick={applyDiscountCoupon}
              disabled={productSize === 0}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )

  const applyDiscountCoupon = () => {
    dispatch(checkVoucher(voucherCode))
  }

  return (
    <div style={{ marginTop: '5px' }}>
      <Toast ref={toast}></Toast>
      {/* <label className='control_label'> Got Coupon/Voucher? </label> */}
      {showApplyCoupon()}
      <figure
        className='ps-block__shipping'
        style={{
          borderBottom: 'none',
        }}
      ></figure>
    </div>
  )
}
