import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import DatePicker from 'react-date-picker'

export class SellProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            loading: true,
            startDate: new Date
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSell = this.handleSell.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    handleChangeDate = date => {
        this.setState({
            startDate: date
        });
    };
    componentDidMount() {
        this.getDressToSell();
    }

    async getDressToSell() {
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
        this.setState({ dressToSell: response_data });

        this.setState({ loading: false });


    }


    render() {
        console.log(this);
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderSellForm();
        return <div>
            <h1>Sell Product</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    renderSellForm() {

        console.log(this);
        return (
            <>
                <p>{this.state.oldDress}</p>
                <form onSubmit={this.handleSell} >

                    <div className="form-group row">
                        <label className="control-label col-md-12" htmlFor="Quantity">Date</label>
                        <div className="col-md-4">
                            <DatePicker
                                value={this.state.startDate}
                                onChange={this.handleChangeDate}
                                
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="control-label col-md-12" htmlFor="Quantity">Quantity to sell (MAX: {this.state.dressToSell.quantity})</label>
                        <div className="col-md-4">
                            <input className="form-control" type="number" id="quantity" min="1" max={this.state.dressToSell.quantity} required defaultValue={this.state.dressToSell.quantity} />
                        </div>
                    </div>

                

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Sell</button>
                        <button className="btn" onClick={this.handleCancel}>Cancel</button>
                    </div >
                </form >
            </>
        )
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }
    async handleSell(event) {
        event.preventDefault();

        console.log(this.state.startDate);


        var quantity = document.getElementById("quantity").value;




        const token = await authService.getAccessToken();
        const response = await fetch('inventary/sell/' + quantity + '/' + this.state.startDate.getDate() + '/' + (this.state.startDate.getMonth()+1) + '/' + this.state.startDate.getFullYear(), {
            headers: !token ? {} : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'post',
            body: JSON.stringify(this.state.dressToSell)
        });

        let response_data = await response.json();
        if (response_data) {
            alert('Record sell successfully!!');
            this.props.history.goBack();
        }


    }
}