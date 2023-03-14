import React from "react";
import data from "../data.json";
import Cart from "../component/cart";

import "../styles/index.css";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      cart: true,
      list: [],
      // storage: getLocaldata(),
    };
  }

  handleRange = (event) => {
    let range = event.target.value;

    if (range === "select") {
      this.setState({
        products: data.products,
      });
    }

    if (range === "Highest to Lowest") {
      this.setState({
        products: data.products.sort((a, b) => b.price - a.price),
      });
    }

    if (range === "Lowest to Highest") {
      this.setState({
        products: data.products.sort((a, b) => a.price - b.price),
      });
    }
  };

  handleSize = (event) => {
    let size = event.target.innerText;

    let filterSize = data.products.filter((fsize) =>
      fsize.availableSizes.includes(size)
    );

    this.setState({
      products: filterSize,
    });
  };

  handleCart = (event) => {
    let id = event.target.id;
    let productList = data.products.filter((a) => String(a.id) === String(id));

    var localCart = JSON.parse(localStorage.getItem("localCart"));

    if (localCart) {
      var index = localCart.findIndex((a) => Number(a.id) === Number(id));
      if (index !== -1) {
        productList[0].Qty = localCart[index]["Qty"] + 1;
        localCart[index]["Qty"] = productList[0].Qty;
        localStorage.setItem("localCart", JSON.stringify(localCart));
      } else {
        productList[0].Qty = 1;
        localCart.push(productList[0]);
        localStorage.setItem("localCart", JSON.stringify(localCart));
      }
    } else {
      productList[0].Qty = 1;
      localStorage.setItem("localCart", JSON.stringify([productList[0]]));
    }

    console.log(productList, "pro");

    this.setState({
      list: this.state.list.concat(localStorage.getItem("localCart")),
    });
  };

  render() {
    return (
      <>
        <div className="cart">
          <Cart
            info={this.state.list}
            cartItem={JSON.parse(localStorage.getItem("localCart"))}
          />
        </div>
        <div className="flex justify ">
          <div>
            <p className="p-number">
              Products found:{this.state.products.length}{" "}
            </p>
          </div>
          <div className="flex flex-r centre">
            <p className="order">Order By : </p>
            <select onChange={(event) => this.handleRange(event)}>
              <option value="select">select</option>
              <option value="Lowest to Highest">Lowest to Highest</option>
              <option value="Highest to Lowest">Highest to Lowest</option>
            </select>
          </div>
        </div>
        <section className="size-box ">
          <div className="size-btns">
            <p>Sizes:</p>

            {["S", "XS", "M", "X", "L", "XL", "XXL"].map((size, i) => {
              return (
                <>
                  <button
                    key={size.i}
                    className="size-btn"
                    onClick={(event) => {
                      this.handleSize(event);
                    }}
                  >
                    {size}
                  </button>
                </>
              );
            })}
          </div>

          <div className="img-box justify">
            {this.state.products.map((product) => {
              return (
                <>
                  <div key={product.id} className="product-info">
                    <img
                      className="product-img"
                      src={`/static/products/${product.sku}_1.jpg`}
                      alt="/"
                    />
                    <p className="title">{product.title}</p>
                    <p className="price">
                      Price:{product.currencyFormat}
                      {product.price}
                    </p>
                    <button
                      id={product.id}
                      onClick={(event) => {
                        this.handleCart(event);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default Product;
