import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import baseUrl from '../../utils/baseUrl'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    height: '200px',
    width: '200px',
  },
})

// Create Document Component
const SellerCommissionReport = (props) => (
  <>
    <div className='row'>
      <div className='col-md-12 col-sm-12'>
        <div className='form-group'>
          <label className='control_label'>
            Commission Percentage Information
          </label>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <div className='form-group'>
          <label className='control_label'>Global Commission (%)</label>
          <input
            type='text'
            className={'form-control'}
            placeholder='Product Name'
            value={props.commissionData.globalCommissionPercentage}
            disabled
          />
        </div>
      </div>
      <div className='col-md-6 col-sm-12'>
        <div className='form-group'>
          <label className='control_label'>Local Commission (%)</label>
          <input
            type='text'
            className={'form-control'}
            placeholder='Product Title'
            value={props.commissionData.localCommissionPercentage}
            disabled
          />
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <div className='form-group'>
          <label className='control_label'>Aggrement Document</label>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <div className='form-group'>
          <img
            height={'200px'}
            width={'200px'}
            src={baseUrl.concat(props.commissionData.aggrementDoc)}
          />
        </div>
      </div>
      <div className='col-md-6 col-sm-12'>
        <div className='form-group'>
          <div>
            <label className='control_label'>
              <div>
                Approved:{' '}
                {props.commissionData.isApprove === 'Y' ? (
                  <span className='text-success'>Yes</span>
                ) : (
                  <span className='text-danger'>No</span>
                )}
              </div>
            </label>
          </div>
          <div>
            <label className='control_label'>
              <div>
                Active:{' '}
                {props.commissionData.isActive === 'Y' ? (
                  <span className='text-success'>Yes</span>
                ) : (
                  <span className='text-danger'>No</span>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-12 col-sm-12'>
        <div className='form-group'>
          <label className='control_label'>Commission Percentage Details</label>
          <div className='row'>
            <div className='col-md-12 '>
              <div className='form-group'>
                <textarea
                  rows={3}
                  type='text'
                  className={'form-control'}
                  placeholder='Commission (%) details'
                  value={props.commissionData.details}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </>
  // <Document>
  //   <Page size='A4' style={styles.page}>
  //     <View style={styles.section}>
  //       {props.commissionData === '' ? (
  //         <Text> No Commission Data Found</Text>
  //       ) : (
  //         <>
  //           <Text>
  //             Global Commission (%):{' '}
  //             {props.commissionData.globalCommissionPercentage}(%)
  //           </Text>
  //           <Text>
  //             Local Commission (%):{' '}
  //             {props.commissionData.localCommissionPercentage}
  //             (%)
  //           </Text>

  //           <Text>Aggrement Document</Text>
  //           <Image
  //             style={styles.image}
  //             src={baseUrl.concat(props.commissionData.aggrementDoc)}
  //           />
  //           <Text>Details: {props.commissionData.details}</Text>
  //         </>
  //       )}
  //     </View>
  //   </Page>
  // </Document>
)

export default SellerCommissionReport
