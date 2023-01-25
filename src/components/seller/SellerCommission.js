import React, { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import doc from "../../assets/pdf/40432_35501.pdf"
import { Viewer } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout" // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
// Worker
import { Worker } from '@react-pdf-viewer/core';
const url = doc

export default function SellerCommission() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault()
  })

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

//   function changePage(offset) {
//     setPageNumber((prevPageNumber) => prevPageNumber + offset)
//   }

  

  return (
    <>
      <div className="main">
        <Document onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer
          fileUrl={url}
          plugins={[
            // Register plugins
            defaultLayoutPluginInstance,
          ]}
          
        />
</Worker>
        
      </div>
    </>
  )
}
