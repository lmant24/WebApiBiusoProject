import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import authService from './api-authorization/AuthorizeService';
import { fromHexToColorDB } from './../utils.js';

export class AddSupplier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            loading: false,
        };
        this.handleSave = this.handleSave.bind(this);

    }

    render() {
        console.log(this);
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>Add Supplier</h1>
            <h3>Supplier</h3>
            <hr />
            {contents}
        </div>;
    }

    renderCreateForm() {

        console.log(this.supplier_list);
        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="name" required />
                    </div>
                </div>
                

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

    async handleSave(event) {
        event.preventDefault();

        const supplierToAdd = {        
            Name: document.getElementById("name").value
        }

        const token = await authService.getAccessToken();
        const response = await fetch('supplier/add', {
            method: 'POST',
            body: JSON.stringify(supplierToAdd),
            headers: !token ? {} : { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        });
        let response_data = await response.json();
        if (response_data) {
            alert('Supplier added successfully!!');
            this.props.history.push('supplier')
        }


    }
}
