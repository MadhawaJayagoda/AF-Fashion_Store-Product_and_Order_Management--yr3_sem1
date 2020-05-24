import React, {Component} from 'react';
import ProductItem from "./ProductItem";

class ProductDeck extends Component {
    render() {
        const {proDeckArr, onClickDelete} = this.props;
        console.log("proDeckArr at proDeckArr component : ", proDeckArr);

        let productItems = proDeckArr.map( proItem => {
            return <ProductItem key={proItem._id}
                                productId={proItem._id}
                                productName={proItem.productName}
                                productBrand={proItem.productBrand}
                                productAverageRating={proItem.product_averageRating}
                                productDiscount={proItem.product_discount}
                                productDescription={proItem.productDescription}
                                dateAdded={proItem.createdDate}
                                imgSrc={proItem.imgSrc}
                                onClickDelete={onClickDelete}
            />
        })

        return (
            <div className="card-deck mt-3">
                {productItems}
            </div>
        );
    }
}

export default ProductDeck;