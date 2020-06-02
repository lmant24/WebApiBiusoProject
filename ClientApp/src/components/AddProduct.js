import React, { Component} from 'react';
import { CompactPicker } from 'react-color';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import authService from './api-authorization/AuthorizeService';
import { fromHexToColorDB } from './../utils.js';

export class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            loading: true,

            code: "",
            color: '#000000',
            material: [{ value: 'Cotone', label: 'Cotone' }],
        };

        this.supplier_list = [];

        this.materials_list = [
            { value: 'Lana', label: 'Lana' },
            { value: 'Cachemire', label: 'Cachemire' },
            { value: 'Seta', label: 'Seta' },
            { value: 'Cotone', label: 'Cotone' },
            { value: "Lino", label: "Lino" },
            { value: 'Acetato', label: 'Acetato' },
            { value: 'Poliestere', label: 'Poliestere' },
            { value: 'Acrilico', label: 'Acrilico' },
            { value: 'Poliammide', label: 'Poliammide' }
        ];

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {

        this.getSuppliers();

    }


    async getSuppliers() {
        const token = await authService.getAccessToken();
        const response = await fetch('supplier', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        let suppliers_response = await response.json();
        //<MDBBtn color="purple" size="sm">Button</MDBBtn>

        this.supplier_list = suppliers_response.map(supplier => ({
            name: supplier.name,
            label: supplier.name
        }));
        this.setState({ loading: false });

        console.log(this);

    }



    render() {
        console.log(this);
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>Add Product</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    handleColorChange = (color, event) => {
        this.setState({ color: color.hex });
    };
    handleMaterialChange = selectedMaterial => {
        this.setState({ material: selectedMaterial });

    };

    async handleSave(event) {
        event.preventDefault();

        const materialNames = !this.state.material ? "" : this.state.material.map(function (item) {
            return item['value'];
        });

        //console.log(document.getElementById("code").value);
        //console.log(document.getElementById("name").value);
        //console.log(document.getElementById("size").value);
        //console.log(document.getElementById("quantity").value);
        //console.log(document.getElementById("price").value);
        //console.log(fromHexToColorDB(this.state.color));
        //console.log(materialNames);
        //console.log(document.getElementById("description").value);
        //console.log(document.getElementById("supplier").value);

        const dressToAdd = {
            Code: document.getElementById("code").value,
            Name: document.getElementById("name").value,
            Size: document.getElementById("size").value,
            Quantity: document.getElementById("quantity").value,
            Price: document.getElementById("price").value,
            Color: fromHexToColorDB(this.state.color),
            Material: materialNames,
            Description: document.getElementById("description").value,
            Supplier: document.getElementById("supplier").value

        }

        const token = await authService.getAccessToken();
        const response = await fetch('inventary/add', {
            method: 'POST',
            body: JSON.stringify(dressToAdd),
            headers: !token ? {} : { 'Accept': 'application/json', 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}` }
        });
        let response_data = await response.json();
        if (response_data) {
            alert('Record added successfully!!');
            this.props.history.push('inventary')
        }
            

    }

    renderCreateForm() {

        console.log(this.supplier_list);
        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Code">Code</label>
                    <div className="col-md-4">
                        <input className="form-control form-control-uppercase" type="text" id="code" required/>
                    </div>
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="name" required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Size">Size</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" id="size" defaultValue={"NULL"} required>
                            <option value="NULL"  disabled>-- Select Size --</option>
                            <option value="XXXS">XXXS</option>
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="XXXL">XXXL</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Quantity">Quantity</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" id="quantity"  min="1" required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Price">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" id="price" name="price" min="1" required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Color">Color</label>
                    <div className="col-md-4">
                        <CompactPicker color={this.state.color} onChange={this.handleColorChange} id="color"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Material">Material</label>
                    <div className="col-md-4">
                        <Select className="basic-multi-select" classNamePrefix="select" options={this.materials_list}
                            isMulti onChange={this.handleMaterialChange} id="material" defaultValue={this.state.material} />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Description">Description</label>
                    <div className="col-md-4">
                        <textarea className="form-control" id="description" rows="3"></textarea>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Supplier">Supplier</label>
                    <div className="col-md-4">
                        <Autocomplete
                            id="supplier"
                            options={this.supplier_list}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params}  variant="outlined" required/>}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

}  