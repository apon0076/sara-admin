import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const SellerCommissionModal = (props) => {

    let emptySeller = {
        shopId: null,
        sellerId: null,
        shopName: null,
        localCommissionPercentage: null,
        globalCommissionPercentage: null
    };

    const [sellers, setSellers] = useState(null);
    const [discountSummaryId, setDiscountSummaryId] = useState(props.discountSummaryId);
    const [sellerDialog, setSellerDialog] = useState(false);
    const [seller, setSeller] = useState(emptySeller);
    const [selectedSellers, setSelectedSellers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        props.sellers.length > 0 && setSellers(props.sellers)
    }, []);

    const hideDialog = () => {
        setSubmitted(false);
        setSellerDialog(false);
    }

    const saveSeller = () => {
        setSubmitted(true);
        if (seller.shopName.trim()) {
            let _sellers = [...sellers];
            let _seller = { ...seller };
            const index = findIndexById(seller.sellerCommissionId);
            _sellers[index] = _seller;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Seller Updated', life: 3000 });
            setSellers(_sellers);
            setSellerDialog(false);
            setSeller(emptySeller);
        }
    }

    const editSeller = (seller) => {
        setSeller({ ...seller });
        setSellerDialog(true);
    }

    const findIndexById = (sellerCommissionId) => {
        let index = -1;
        for (let i = 0; i < sellers.length; i++) {
            if (sellers[i].sellerCommissionId === sellerCommissionId) {
                index = i;
                break;
            }
        }
        return index;
    }

    const onInputNumberChange = (e, name) => {
        const val = (e.target && e.target.value) || 0;
        let _seller = { ...seller };
        _seller[`${name}`] = val;
        setSeller(_seller);
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success"
                    onClick={confirmSeller}
                    disabled={!selectedSellers || !selectedSellers.length}
                />
            </React.Fragment>
        )
    }

    const confirmSeller = () => {
        props.getSelectedSellers(selectedSellers, discountSummaryId);

    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editSeller(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-mx-0 p-my-1">Manage Sellers</h5>
            <span className="p-input-icon-left">
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const sellerDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveSeller} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={sellers}
                    selection={selectedSellers}
                    onSelectionChange={(e) => setSelectedSellers(e.value)}
                    dataKey="sellerCommissionId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} sellers"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="seller_name" header="Seller Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="shopName" header="Shop Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="localCommissionPercentage" header="Local Commission Percentage" sortable></Column>
                    <Column field="globalCommissionPercentage" header="Global Commission Percentage" sortable></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={sellerDialog} style={{ width: '450px' }} header="Seller Details" modal className="p-fluid" footer={sellerDialogFooter} onHide={hideDialog}>
                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="seller_name">Seller Name</label>
                        <input
                            type="text"
                            id="seller_name"
                            value={seller.seller_name}
                            readOnly
                            className="form-control"
                        />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="shopName">Shop Name</label>
                        <input
                            type="text"
                            id="shopName"
                            value={seller.shopName}
                            readOnly
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="localCommissionPercentage">Local Commission Percentage</label>
                        <input
                            type="number"
                            id="localCommissionPercentage"
                            name="localCommissionPercentage"
                            value={seller.localCommissionPercentage}
                            onChange={(e) => onInputNumberChange(e, 'localCommissionPercentage')}
                            className="form-control"
                        />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="globalCommissionPercentage">Global Commission Percentage</label>
                        <input
                            type="number"
                            id="globalCommissionPercentage"
                            name="globalCommissionPercentage"
                            value={seller.globalCommissionPercentage}
                            onChange={(e) => onInputNumberChange(e, 'globalCommissionPercentage')}
                            className="form-control"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default SellerCommissionModal;