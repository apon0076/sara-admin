import React from 'react'
import LoaderGif from '../../assets/images/Loading.gif'

export default function PageLoading() {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <img src={LoaderGif} />
      </div>
    </div>
  )
}
