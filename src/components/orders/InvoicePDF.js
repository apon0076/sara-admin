import React from "react"
import { Button } from '@progress/kendo-react-buttons'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import { useRef } from 'react'

function InvoicePDF() {
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const handleExportWithFunction = (event) => {
    savePDF(contentArea.current, { paperSize: "A4" });
  }

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <PDFExport ref={pdfExportComponent} paperSize="A4">
            <div ref={contentArea}>
              <Button primary={true} onClick={handleExportWithComponent}>Export with Component</Button>
              <Button onClick={handleExportWithFunction}>Export with Method</Button>
            </div>
          </PDFExport>
        </div>
      </div>
    </div>
  );
}

export default InvoicePDF;