import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import * as Icon from 'react-feather'

const ListItems = (props, i) => {
  const items = props?.items
  return (
    <div>
      <table className='table table-bordered' id='tableImg'>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className='row'>
              <td className='col-md-2'>
                <div className='dropdown-demo'>
                  <Dropdown
                    optionLabel='breadcrumbCategory'
                    options={props?.activeBreadcrumbsCategories}
                    filter
                    showClear
                    filterBy='breadcrumbCategory'
                    placeholder={props?.items[index]?.categoryName}
                    className='form-control'
                    onChange={(e) => props?.updateItem(index, e)}
                    disabled
                  />
                </div>
              </td>
              <td className='col-md-2'>
                <div className='dropdown-demo'>
                  <Dropdown
                    optionLabel='variantName'
                    options={props?.variants}
                    filter
                    showClear
                    filterBy='variantName'
                    placeholder={props?.items[index]?.variantName}
                    className='form-control'
                    onChange={(e) => props?.updateItem(index, e)}
                    disabled
                  />
                </div>
              </td>
              <td className='col-md-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Variant Option Text'
                  id='variantOptionName'
                  name='variantOptionName'
                  value={
                    props?.items[index]?.variantOptionName
                      ?.variantOptionName
                  }
                  onChange={(e) => props?.updateItem(index, e)}
                  disabled
                />
              </td>
              <td className='col-md-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Variant Option Value'
                  id='variantOptionValue'
                  name='variantOptionValue'
                  value={props?.items[index]?.variantOptionValue}
                  onChange={(e) => props?.updateItem(index, e)}
                  disabled
                />
              </td>
              <td className='col-md-2'>
                <input
                  type='text'
                  placeholder='Enter Variant Remarks'
                  className='form-control'
                  id='variantRemark'
                  name='variantRemark'
                  value={props?.items[index]?.variantRemark}
                  onChange={(e) => props?.updateItem(index, e)}
                  disabled
                />
              </td>
              <td className='col-md-2'>
                <input
                  type='text'
                  placeholder='Enter Display Order'
                  className='form-control'
                  id='displayOrder'
                  name='displayOrder'
                  value={props?.items[index]?.displayOrder}
                  onChange={(e) => props?.updateItem(index, e)}
                  disabled
                />
              </td>
              <td
                className='col-md-2 text-center'
                style={{ cursor: 'pointer' }}
              >
                <Icon.Trash
                  className='text-light'
                  onClick={() => props?.deleteItem(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListItems
