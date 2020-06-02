import React, { Component} from 'react';
import { CompactPicker } from 'react-color';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import authService from './api-authorization/AuthorizeService';
import { fromHexToColorDB, fromColorDBToHex } from './../utils.js';

export class UpdateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            loading: true,
            

            color: ''
            //material

            
        }

       
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
        this.getDressToUpdate();

    }


    async getDressToUpdate() {
        const codeToUpdate = this.props.match.params["code"];
        const sizeToUpdate = this.props.match.params["size"];
        const colorToUpdate = this.props.match.params["color"];

        const token = await authService.getAccessToken();
        const response = await fetch('inventary/get/' + codeToUpdate + '/' + sizeToUpdate + '/' + colorToUpdate, {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`
            },
            
        });
        let response_data = await response.json();
        console.log(response_data);
        this.setState({ oldDress: response_data });
        this.setState({ color: fromColorDBToHex(this.state.oldDress.color) })

        if (this.state.oldDress.material)
            this.setState({
                material: this.state.oldDress.material.map(function (item) {
                    return { value: item, label: item };
                })
            });
        this.setState({
            supplier: { name: this.state.oldDress.supplier, label: this.state.oldDress.supplier }
        });

        this.setState({ loading: false });

        
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
        

        console.log(this);

    }



    render() {
        console.log(this);
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>Update Product</h1>
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

        const dressToUpdate = {
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
        const codeToUpdate = this.props.match.params["code"];
        const sizeToUpdate = this.props.match.params["size"];
        const colorToUpdate = this.props.match.params["color"];

        const token = await authService.getAccessToken();
        const response = await fetch('inventary/update/' + codeToUpdate + '/' + sizeToUpdate + '/' + colorToUpdate, {
            headers: !token ? {} : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'put',
            body: JSON.stringify(dressToUpdate)
        });

        let response_data = await response.json();
        if (response_data) {
            alert('Record update successfully!!');
            this.props.history.goBack();
        }
            

    }

    renderCreateForm() {

        console.log(this);
        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Code">Code</label>
                    <div className="col-md-4">
                        <input className="form-control form-control-uppercase" type="text" id="code" required defaultValue={this.state.oldDress.code}/>
                    </div>
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" id="name" required defaultValue={this.state.oldDress.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Size">Size</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" id="size" required defaultValue={this.state.oldDress.size}>
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
                        <input className="form-control" type="number" id="quantity" min="1" required defaultValue={this.state.oldDress.quantity}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Price">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="number" id="price" name="price" min="1" required defaultValue={this.state.oldDress.price}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Color">Color</label>
                    <div className="col-md-4">
                        <CompactPicker color={this.state.color} onChange={this.handleColorChange} id="color" />
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
                        <textarea className="form-control" id="description" rows="3" defaultValue={this.state.oldDress.description}></textarea>
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
                            renderInput={(params) => <TextField {...params} variant="outlined" required/>}
                            defaultValue={this.state.supplier}
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