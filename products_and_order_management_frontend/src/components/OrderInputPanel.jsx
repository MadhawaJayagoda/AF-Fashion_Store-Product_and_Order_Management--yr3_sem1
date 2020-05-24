import React, {Component} from 'react';

class OrderInputPanel extends Component {
    render() {
        let{orderProductName, orderType, orderPartyName, orderProductCategory, orderProductUnitPrice,
            orderQuantity, orderDiscountAllowed, orderPaymentStatus, orderDescription, onFormSubmit, onChangeForm} = this.props;
        return (
            <div className="card-body mx-4 my-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label >Ordered Product Name</label>
                        <input className="form-control" id="productName" name="order_productName" placeholder="Enter Product Name" value={orderProductName} onChange={onChangeForm}/>
                    </div>
                    <div className="form-group">
                        <label >Ordered party type</label>
                        <select className="form-control form-control-sm" id="order_party_type" value={orderType} name="order_type"
                                onChange={onChangeForm} placeholder="Customer or Supplier" aria-describedby="partyTypeHelper" >
                            <option hidden>Please select whether Customer or Supplier </option>
                            <option>Supplier</option>
                            <option>Customer</option>
                        </select>
                        <small id="partyTypeHelper" className="form-text text-muted">Whether it is an Order placed by Customer or Order given to Supplier</small>
                    </div>
                    <div className="form-group">
                        <label >Party Name</label>
                        <input className="form-control" id="partyName" value={orderPartyName} name="partyName" onChange={onChangeForm} placeholder="Customer or Supplier Name" />
                    </div>
                    <div className="form-group">
                        <label >Ordered Product Category</label>
                        <select className="form-control form-control-sm" name="order_productCategory" value={orderProductCategory} onChange={onChangeForm}>
                            <option hidden>Please select a Category </option>
                            <option>Apparel</option>
                            <option>Footwear</option>
                            <option>Accessories</option>
                            <option>Sportswear</option>
                            <option>Formal Wear</option>
                            <option>Watches & Jewelry</option>
                            <option>Cosmetics</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Product unit price</label>
                        <input className="form-control" id="productUnitPrice" name="productUnitPrice" value={orderProductUnitPrice} onChange={onChangeForm} placeholder="Enter product unit price" />
                    </div>
                    <div className="form-group">
                        <label >Ordered quantity</label>
                        <input className="form-control" id="order_quantity" name="order_quantity" value={orderQuantity} onChange={onChangeForm} placeholder="Enter ordered quantity" />
                    </div>
                    <div className="form-group">
                        <label >Ordered Discount allowed</label>
                        <input className="form-control" id="order_discount" name="order_discount" value={orderDiscountAllowed} onChange={onChangeForm} placeholder="Enter discount given to the order" />
                    </div>
                    <div className="form-group">
                        <label >Ordered Payment status</label>
                        <select className="form-control form-control-sm" name="order_paymentStatus" value={orderPaymentStatus} onChange={onChangeForm}>
                            <option hidden>Please select the payment status </option>
                            <option>Paid</option>
                            <option>Not paid</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Ordered Description</label>
                        <textarea className="form-control" id="order_description" rows="3" name="order_description" value={orderDescription} onChange={onChangeForm} placeholder="Order description or summary"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add order</button>
                </form>
            </div>
        );
    }
}

export default OrderInputPanel;