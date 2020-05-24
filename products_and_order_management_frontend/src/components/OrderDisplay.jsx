import React, {Component} from 'react';
import OrderItem from './OrderItem';
import OrderInputPanel from "./OrderInputPanel";
import ViewOrderPanel from "./ViewOrderPanel";

class OrderDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            orderUpdateDisplay:{},
            currentOrder:{
                order_productName: "",
                order_type : "",
                partyName : "",
                order_productCategory : "",
                productUnitPrice : 0,
                order_quantity : 0,
                order_discount : 0,
                order_paymentStatus : "",
                order_description : ""
            },
            addNewOrder : true,
            viewOrder : false
        };

        this.callAPIGetAllOrders = this.callAPIGetAllOrders.bind(this);
        /*this.handleOnClickButton = this.handleOnClickButton.bind(this);*/
        this.handleFormChange = this.handleFormChange.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.switchTabAddOrder = this.switchTabAddOrder.bind(this);
        this.switchTabViewOrders = this.switchTabViewOrders.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.updateOrderAPICal = this.updateOrderAPICal.bind(this);
    }

    async callAPIGetAllOrders(){
        const url = "http://localhost:3000/order";
        await fetch(url).then( res => res.json()).then(data => { this.setState({ orders: data })}).catch( err => {
            console.log({ Err_message: err})});
    };

    componentWillMount() {
        this.callAPIGetAllOrders();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log(this.state);
    }

    handleFormChange = (e) => {
        e.preventDefault();
        let formValues = {...this.state.currentOrder};
        let att_name = e.target.name;
        let value = e.target.value;

        formValues[att_name] = value;

        this.setState({
            currentOrder : formValues
        })

    };

    async addOrder(e){
        e.preventDefault();
        let newOrder = this.state.currentOrder;
        console.log(newOrder);
        if(newOrder !== ""){
            const url = "http://localhost:3000/order";
            const requestOptions = {
                method : 'POST',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify(newOrder)
            };
            await fetch(url, requestOptions).then(res => res.json()).then( data => {
                console.log(data)}).catch( err => {
                console.log({ Err_message : err})} );
        }
        this.callAPIGetAllOrders();
        this.setState({
            currentOrder:{
                order_productName: "",
                order_type : "",
                partyName : "",
                order_productCategory : "",
                productUnitPrice : 0,
                order_quantity : 0,
                order_discount : 0,
                order_paymentStatus : "",
                order_description : ""
            }
        });
        //console.log("Add order finished, clear fields");
    };

    async deleteOrder(orderId){
        console.log(orderId);
        orderId = orderId.toString();
        const url = "http://localhost:3000/order/"+ orderId;
        const requestOptions = {
            method : 'DELETE'
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then( data => {
                console.log(data)
            })
            .catch( err => {
                console.log({ Err_message : err})}
            );
        this.callAPIGetAllOrders();
    }

    updateOrder(orderId, property, value){
        console.log("update order : ", orderId, "Property : ", property, "Value : ", value );
        let orders = [...this.state.orders];
        let updateOrderItem = orders.filter( order => {
            return order._id == orderId;
        });
        console.log("Updating order object : ", updateOrderItem);

        updateOrderItem[property] = value;
        console.log("Updated order object ,, updateOrderItem:", updateOrderItem[0]);

        orders.find( item => {
            if( item._id == orderId){
                item[property] = value;
            }
        });
        this.setState({
            orders : orders,
            orderUpdateDisplay : updateOrderItem[0]
        });
    }

    async updateOrderAPICal(orderId){
        //console.log("Update API call", orderId);
        let updatedOrder = this.state.orderUpdateDisplay;
        if(updatedOrder != "" && updatedOrder !== null){
            const url = "http://localhost:3000/order/" + orderId;
            const requestOptions = {
                method : 'PUT',
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify(updatedOrder)
            };
            await fetch(url, requestOptions)
                .then(res => res.json())
                .then( data => {
                    console.log(data)
                })
                .catch( err => {
                    console.log({ Err_message : err})}
                );
            this.callAPIGetAllOrders();
        }
    }

    switchTabAddOrder(){
        this.setState({
            addNewOrder : true,
            viewOrder : false
        });
    }
    switchTabViewOrders(){
        this.setState({
            viewOrder : true,
            addNewOrder : false
        });
    }

    render(){
        //console.log("OrderDisplay rendered successfully");
        return (
            <div className="card">
                <div className="card-header text-center">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button className="btn btn-info" onClick={this.switchTabAddOrder}>Add new order</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-info" onClick={this.switchTabViewOrders} style={{marginLeft: "5px"}}>View Orders</button>
                        </li>
                    </ul>
                </div>
                { this.state.addNewOrder ?
                <OrderInputPanel orderProductName={this.state.currentOrder.order_productName}
                                 orderType={this.state.currentOrder.order_type}
                                 orderPartyName={this.state.currentOrder.partyName}
                                 orderProductCategory={this.state.currentOrder.order_productCategory}
                                 orderProductUnitPrice={this.state.currentOrder.productUnitPrice}
                                 orderQuantity={this.state.currentOrder.order_quantity}
                                 orderDiscountAllowed={this.state.currentOrder.order_discount}
                                 orderPaymentStatus={this.state.currentOrder.order_paymentStatus}
                                 orderDescription={this.state.currentOrder.order_description}
                                 onFormSubmit={this.addOrder}
                                 onChangeForm={this.handleFormChange}
                /> : <ViewOrderPanel allOrders={this.state.orders}
                                     onClickDelete={this.deleteOrder}
                                     onUpdateValues={this.updateOrder}
                                     onClickUpdateAPICAll = {this.updateOrderAPICal}   />}
                {/*<button onClick={this.handleOnClickButton}> Click Me</button>*/}
                <OrderItem />
            </div>
        );
    }
}

export default OrderDisplay;