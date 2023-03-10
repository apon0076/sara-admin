import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { ProductService } from '../../../store/services/demoProductService';

class ImportOrExportContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            selectedProducts: [],
            importedData: [],
            selectedImportedData: [],
            importedCols: [{ field: '', header: 'Header' }]
        };

        this.importCSV = this.importCSV.bind(this);
        this.importExcel = this.importExcel.bind(this);
        this.onImportSelectionChange = this.onImportSelectionChange.bind(this);
        this.clear = this.clear.bind(this);

        this.exportCSV = this.exportCSV.bind(this);
        this.exportPdf = this.exportPdf.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this.productService = new ProductService();

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    }

    componentDidMount() {
        this.productService.getProducts().then(data => this.setState({ products: data }));
    }

    importCSV(e) {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            const data = csv.split('\n');

            // Prepare DataTable
            const cols = data[0].replace(/['"]+/g, '').split(',');
            data.shift();

            let importedCols = cols.map(col => ({ field: col, header: this.toCapitalize(col.replace(/['"]+/g, '')) }));
            let importedData = data.map(d => {
                d = d.split(',');
                return cols.reduce((obj, c, i) => {
                    obj[c] = d[i].replace(/['"]+/g, '');
                    return obj;
                }, {});
            });

            this.setState({
                importedCols,
                importedData
            });
        };

        reader.readAsText(file, 'UTF-8');
    }

    importExcel(e) {
        const file = e.files[0];

        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = xlsx.read(e.target.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols = data[0];
                data.shift();

                let importedCols = cols.map(col => ({ field: col, header: this.toCapitalize(col) }));
                let importedData = data.map(d => {
                    return cols.reduce((obj, c, i) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                this.setState({
                    importedCols,
                    importedData
                });
            };

            reader.readAsArrayBuffer(file);
        });
    }

    exportCSV(selectionOnly) {
        this.dt.exportCSV({ selectionOnly });
    }

    exportPdf() {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(this.exportColumns, this.state.products);
                doc.save('products.pdf');
            })
        })
    }

    exportExcel() {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.state.products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'products');
        });
    }

    saveAsExcelFile(buffer, fileName) {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    toCapitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    clear() {
        this.setState({
            importedData: [],
            selectedImportedData: [],
            importedCols: [{ field: '', header: 'Header' }]
        });
    }

    onImportSelectionChange(e) {
        this.setState({ selectedImportedData: e.value }, () => {
            const detail = this.state.selectedImportedData.map(d => Object.values(d)[0]).join(', ');
            this.toast.show({ severity: 'info', summary: 'Data Selected', detail, life: 3000 });
        });
    }

    onSelectionChange(e) {
        this.setState({ selectedProducts: e.value });
    }

    render() {

        const header = (
            <div className="p-d-flex p-ai-center export-buttons">
                <Button type="button" icon="pi pi-file" onClick={() => this.exportCSV(false)} className="p-mr-2" data-pr-tooltip="CSV" />
                <Button type="button" icon="pi pi-file-excel" onClick={this.exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" onClick={this.exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" />
                <Button type="button" icon="pi pi-filter" onClick={() => this.exportCSV(true)} className="p-button-info p-ml-auto" data-pr-tooltip="Selection Only" />
            </div>
        );

        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="white-box">
                                <div className="card">
                                    <h5>Import</h5>

                                    <Toast ref={(el) => this.toast = el} />

                                    <div className="p-d-flex p-ai-center p-py-2">
                                        <FileUpload chooseOptions={{ label: 'CSV', icon: 'pi pi-file' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" className="p-mr-2" onUpload={this.importCSV} />
                                        <FileUpload chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php"
                                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="p-mr-2" onUpload={this.importExcel} />
                                        <Button type="button" label="Clear" icon="pi pi-times" onClick={this.clear} className="p-button-info p-ml-auto" />
                                    </div>

                                    <DataTable value={this.state.importedData} emptyMessage="No data" paginator rows={10} alwaysShowPaginator={false} responsiveLayout="scroll"
                                        selectionMode="multiple" selection={this.state.selectedImportedData} onSelectionChange={this.onImportSelectionChange}>
                                        {
                                            this.state.importedCols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                                        }
                                    </DataTable>
                                </div>

                                <div className="card">
                                    <h5>Export</h5>

                                    <Tooltip target=".export-buttons>button" position="bottom" />

                                    <DataTable ref={(el) => { this.dt = el; }} value={this.state.products} header={header} dataKey="id" responsiveLayout="scroll"
                                        selectionMode="multiple" selection={this.state.selectedProducts} onSelectionChange={this.onSelectionChange}>
                                        {
                                            this.cols.map((col, index) => <Column key={index} field={col.field} header={col.header} />)
                                        }
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImportOrExportContainer;