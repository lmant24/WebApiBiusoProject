import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';  


export class FetchInventary extends Component {
    static displayName = FetchInventary.name;

    
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dresses : []
            };
        this.renderInventaryTable = this.renderInventaryTable.bind(this)
        //this.onSort = this.onSort.bind(this);
        this.handleDelete = this.handleDelete.bind(this);  
        this.handleUpdate = this.handleUpdate.bind(this);  
    }

    componentDidMount() {
        
       this.populateInventary();
        
    }

    handleUpdate(code, size, color) {
        console.log(this);
        this.props.history.push('updateproduct/' + code + "/" + size + "/" + color);
    }

    handleSell(code, size, color) {
        console.log(this);
        this.props.history.push('sellproduct/' + code + "/" + size + "/" + color);
    }

    async handleDelete(code, size, color) {
        console.log(this.state);
        if (!window.confirm("Do you want to delete product with Id: " + code + " - Size: " + size + " - Color: " + color + "?"))
            return;
        else {

            const token = await authService.getAccessToken();
            const response = await fetch('inventary/delete/' + code + '/' + size + '/' + color , {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
                method: 'delete'
            });
            let response_data = await response.json();
            this.setState(
                {
                    dresses: this.state.dresses.filter((dress) => {
                        return !((dress.code === code) && (dress.size === size) && (dress.color === color)) ; 
                    })
                }); 
            
        }
    }  

    renderInventaryTable(dresses) {
        //TypeError: Cannot read property 'products' of undefined
        //<MDBDataTableV5 striped bordered small data={products} exportToCSV proSelect />
        console.log(this);


        const columns = [
            {
                label: 'Code',
                field: 'code',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Size',
                field: 'size',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Quantity',
                field: 'quantity',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Color',
                field: 'color',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Material',
                field: 'material',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Description',
                field: 'description',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Supplier',
                field: 'supplier',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'sell',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'update',
                sort: 'asc',
                width: 100
            },
            {
                label: '',
                field: 'delete',
                sort: 'asc',
                width: 100
            }

        ];


        const rows = dresses.map(dress => ({
            code: dress.code,
            name: dress.name,
            size: dress.size,
            quantity: dress.quantity,
            price: dress.price + " €",
            color: <button type="button" className={"btn span-" + dress.color}></button>,
            material: !dress.material ? "" : dress.material.join(', '),
            description: dress.description,
            supplier: dress.supplier,
            sell: <button type="button" className="btn-primary" onClick={(id) => this.handleSell(dress.code, dress.size, dress.color)}>Sell</button>,
            update: <button type="button" className="btn-primary" onClick={(id) => this.handleUpdate(dress.code, dress.size, dress.color)}>Update</button>,
            delete: <button type="button" className="btn-primary" onClick={(id) => this.handleDelete(dress.code, dress.size, dress.color)}>Delete</button>
        }));

        const data = {
            columns, rows
        };

        return (
            <>
                <p>
                    <button type="button" className="btn-primary"><Link to="/addproduct">Add product</Link></button>
                    
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

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderInventaryTable(this.state.dresses);

        return (
            <div>
                
                <h1 id="tabelLabel" >Inventary</h1>
                <p>This component demonstrates fetching data from the server.</p>
                
                {contents}
            </div>
        );
    }

    async populateInventary() {
        const token = await authService.getAccessToken();
        const response = await fetch('inventary', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        let response_data = await response.json();
        //<MDBBtn color="purple" size="sm">Button</MDBBtn>
         
            
        //this.setState({ data, rows: data, loading: false });
        this.setState(prevState => {
            let dresses = Object.assign({}, prevState.dresses);  // creating copy of state variable jasper
            dresses = response_data;
            // update the name property, assign a new value
            return { dresses };                                 // return new object jasper object
        })
        
        this.setState({loading: false });
        
        

    }
}
