import React, {Component} from 'react';

class ProductItem extends Component {
    render() {
        //console.log("ProductItem rendered successfully");
        let {productId, productName, productBrand, productAverageRating, productDiscount, productDescription, dateAdded, imgSrc} =this.props;
        dateAdded = new Date(dateAdded).toLocaleString();

        imgSrc = String(imgSrc);
        return (
            <div className="card">
                <img className="card-img-top" src={imgSrc}  alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">
                        <span><b> Average rating  : &nbsp; </b> {productAverageRating} </span><br />
                        <span><b> Brand : &nbsp; </b> {productBrand} </span><br />
                        <span><b> Discount : &nbsp;  {productDiscount}% </b></span><br />
                        <span><b> Product Description : &nbsp;  {productDescription} </b></span><br />
                    </p>
                    <p className="card-text"><small className="text-muted">Date added : {dateAdded}</small></p>
                </div>
                <button className="btn btn-danger" onClick={() => this.props.onClickDelete(productId)}> <i className="fas fa-trash fa-lg" style={{}}/> </button>
            </div>
        );
    }
}

export default ProductItem;