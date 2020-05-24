import React, {Component} from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import OrderItem from "./OrderItem";

class ViewOrderPanel extends Component {
    render() {

        //console.log("All orders : ", this.props.allOrders);

        let orderList = this.props.allOrders.map( item => {
            return <OrderItem  key={item._id}
                               id={item._id}
                               orderType={item.order_type}
                               orderDescription={item.order_description}
                               partyName = {item.partyName}
                               orderProductName= {item.order_productName }
                               orderProductCategory={item.order_productCategory}
                               productUnitPrice={item.productUnitPrice}
                               orderQuantity={item.ordered_quantity}
                               orderDiscount={item.order_discount}
                               orderTotalPayment={item.order_totalPayment}
                               orderPaymentStatus={item.order_paymentStatus ? "Paid" : "Not Paid"}
                               orderPlacementDate={item.order_placementDate}
                               onClickDelete={this.props.onClickDelete}
                               onUpdateValues = {this.props.onUpdateValues}
                               onClickUpdateAPICAll ={this.props.onClickUpdateAPICAll}
            />
        });

        return (
            <div className="container my-5">
                <Accordion>
                    {orderList}
                </Accordion>
            </div>
        );
    }
}

export default ViewOrderPanel;