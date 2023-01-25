import React from 'react'
import { BiBarcodeReader } from 'react-icons/bi'
import * as Icon from 'react-feather'
import './report.css'

const ReportFilterOptions = (props) => {
  const { handleOptionChange, option, order_filter_tab } = props

  return (
    <div className='option-container'>
      <>
        {/* Button for All */}
        <button
          className={`option_button ${option === 0 ? 'option-active' : ''}`}
          onClick={() => handleOptionChange(0)}
        >
          <Icon.Home
            className={`icon-opt ${option === 0 ? 'icon-active' : ''}`}
          />
          <span className='option-text'>All</span>
        </button>

        {/* Order Date Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 1 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(1)}
          >
            <Icon.Calendar
              className={`icon-opt ${option === 1 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Order Date</span>
          </button>
        )}

        {/* Style/SKU Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 2 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(2)}
          >
            <BiBarcodeReader
              className={`icon-opt ${option === 2 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Style/SKU</span>
          </button>
        )}

        {/* Payment Method Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 3 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(3)}
          >
            <Icon.DollarSign
              className={`icon-opt ${option === 3 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Payment Method</span>
          </button>
        )}

        {/* Payment Status Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 4 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(4)}
          >
            <Icon.CheckCircle
              className={`icon-opt ${option === 4 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Payment Status</span>
          </button>
        )}

        {/* Order Source Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 5 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(5)}
          >
            <Icon.Search
              className={`icon-opt ${option === 5 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Order Source</span>
          </button>
        )}

        {/* Order Status Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 6 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(6)}
          >
            <Icon.Truck
              className={`icon-opt ${option === 6 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Order Status</span>
          </button>
        )}
        
        {/* Order Invoice Print Button*/}
        {order_filter_tab === 'order' && (
          <button
            className={`option_button ${option === 7 ? 'option-active' : ''}`}
            onClick={() => handleOptionChange(7)}
          >
            <Icon.Printer
              className={`icon-opt ${option === 7 ? 'icon-active' : ''}`}
            />
            <span className='option-text'>Multiple Invoice Print</span>
          </button>
        )}
      </>
    </div>
  )
}

export default ReportFilterOptions
