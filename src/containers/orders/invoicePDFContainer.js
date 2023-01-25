import React, { Component } from 'react'
import InvoicePDF from '../../components/orders/invoicePDF'

export default class invoicePDFContainer extends Component {
    render() {
        return (
            <div id="wrapper">
                <InvoicePDF />
            </div>
        )
    }
}
