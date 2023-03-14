import React from "react";
// import data from "../data.json";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: true,
      incdec: false,
      items: this.props.cartItem,
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

  handleRemove = (event) => {
    let id = event.target.id;

    if (id === this.props.cartItem.id) {
      localStorage.removeItem();
    }
  };

  handleInc = (event) => {
    let id = event.target.id;
    let singleItem = this.props.cartItem.filter(
      (single) => String(single.id) === String(id)
    );
    console.log(singleItem[0], "ii");

    singleItem[0].Qty = singleItem[0].Qty + 1;

    this.setState({
      incdec: true,
    });
  };
  handleDec = (event) => {
    let id = event.target.id;
    // var localCart = JSON.parse(localStorage.getItem("localCart"));

    let singleItem = this.props.cartItem.filter(
      (single) => String(single.id) === String(id)
    );
    singleItem[0].Qty = singleItem[0].Qty - 1;
    this.setState({
      incdec: true,
    });
  };

  // handleInc = (event) => {
  //   let id = event.target.id;
  //   console.log(id, "id");
  //   let singleItem = data.products.filter(
  //     (single) => String(single.id) === String(id)
  //   );
  //   console.log(singleItem, "1");
  //   singleItem[0].Qty = singleItem[0].Qty + 1;
  //   this.setState({
  //     incdec: true,
  //   });

  // };

  // handleDec = (event) => {
  //   let id = event.target.id;

  //   let singleItem = data.products.filter(
  //     (single) => String(single.id) === String(id)
  //   );
  //   singleItem[0].Qty = singleItem[0].Qty - 1;
  //   this.setState({
  //     incdec: true,
  //   });
  //   // if (singleItem[0].qty === 0) {
  //   //   this.setState({
  //   //     remove: true,
  //   //   });
  //   // }
  // };

  render() {
    // console.log(this.props.cartItem, "item");
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
            {[...new Set(this.props.cartItem)].map((a) => {
              return (
                <>
                  <div key={a.id} className="cartlist">
                    <img
                      className="cartproductimg"
                      src={`/static/products/${a.sku}_1.jpg`}
                      alt="/"
                    />
                    <p>{a.title}</p>

                    <p className="qty">Quantity:{a.Qty}</p>

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
                    <button id={a.id} onClick={this.handleRemove}>
                      Remove
                    </button>
                  </div>
                </>
              );
            })}
            {/* [...new Set(this.props.info)] */}
            <div className="shoppingsummary">
              <p className="summary">
                SubTotal:$
                {[...new Set(this.props.cartItem)].reduce((acc, cv) => {
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
