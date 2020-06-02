import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import { fromColorDBToHex } from './../utils.js';


export class FetchSupplier extends Component {
    static displayName = FetchSupplier.name;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            suppliers: []
        };
        this.renderSupplierTable = this.renderSupplierTable.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this);  
    }
    componentDidMount() {
        this.populateSuppliers();
    }

    async populateSuppliers() {
        const token = await authService.getAccessToken();
        const response = await fetch('supplier', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        let response_data = await response.json();
        //<MDBBtn color="purple" size="sm">Button</MDBBtn>


        //this.setState({ data, rows: data, loading: false });
        this.setState({supplier:response_data});
        this.setState({ loading: false });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSupplierTable(this.state.supplier);

        return (
            <div>

                <h1 id="tabelLabel">Suppliers</h1>
                <p>This component demonstrates fetching data from the server.</p>

                {contents}
            </div>
        );
    }
    renderSupplierTable(suppliers) {
        //TypeError: Cannot read property 'products' of undefined
        //<MDBDataTableV5 striped bordered small data={products} exportToCSV proSelect />
        console.log(this);


        const columns = [
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'update',
                sort: 'asc',
                width: 100
            }
        ];


        const rows = suppliers.map(supplier => ({
            name: supplier.name,
            update: <button type="button" className="btn-primary" onClick={(id) => this.handleUpdate(supplier.name)}>Update</button>
        }));

        const data = {
            columns, rows
        };

        return (
            <>
                <p>
                    <button type="button" className="btn-primary"><Link to="/addsupplier">Add supplier</Link></button>

                </p>

                <MDBDataTable
                    striped
                    responsive
                    small
                    hover
                    data={data}
                />

            </>




        );
    }
    handleUpdate(name) {
        console.log(this);
        this.props.history.push('updatesupplier/' + name);
    }
}
