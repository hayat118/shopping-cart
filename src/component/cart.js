import React from "react";
import data from "../data.json";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: true,
      incdec: false,
    };
  }

  handleTrue = () => {
    this.setState({
      isTrue: !this.state.isTrue,
    });
  };

  handleClose = () => {
    this.setState({
      isTrue: !this.state.isTrue,
    });
  };

  handleInc = (event) => {
    let id = event.target.id;
    let singleItem = data.products.filter(
      (single) => String(single.id) === String(id)
    );
    singleItem[0].Qty = singleItem[0].Qty + 1;
    this.setState({
      incdec: true,
    });
  };

  handleDec = (event) => {
    let id = event.target.id;
    let singleItem = data.products.filter(
      (single) => String(single.id) === String(id)
    );
    singleItem[0].Qty = singleItem[0].Qty - 1;
    this.setState({
      incdec: true,
    });
  };

  render() {
    return (
      <>
        <div className="flex justify">
          <h1>Shopping Cart</h1>
          <figure>
            <img
              className="bagicon"
              onClick={this.handleTrue}
              src={"/static/bag-icon.png"}
              alt="/"
            />
          </figure>
        </div>
        {this.state.isTrue ? (
          ""
        ) : (
          <div className="cartcategory">
            <div className="shoppingsummary">
              <p>Cart Includes</p>
              <button onClick={this.handleClose}>close</button>
            </div>
            {[...new Set(this.props.info)].map((a) => {
              return (
                <div className="cartlist">
                  <img
                    className="cartproductimg"
                    src={`/static/products/${a.sku}_1.jpg`}
                    alt="/"
                  />
                  <p>{a.title}</p>

                  <p>Quantity:{a.Qty}</p>

                  {/* {this.state.incdec === true ? (
                    <p>Quantity:{a.Qty}</p>
                  ) : (
                    <p>Quantity:{a.Qty}</p>
                  )} */}
                  <button id={a.id} onClick={this.handleInc}>
                    +
                  </button>
                  <button id={a.id} onClick={this.handleDec}>
                    -
                  </button>
                  <p>
                    Price:{a.currencyFormat}
                    {a.price}
                  </p>
                </div>
              );
            })}

            <div className="shoppingsummary">
              <p className="summary">
                SubTotal:{" "}
                {[...new Set(this.props.info)].reduce((acc, cv) => {
                  acc = acc + cv.price * cv.Qty;
                  return acc;
                }, 0)}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Cart;
