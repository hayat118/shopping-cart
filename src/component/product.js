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
    };
  }

  handleRange = (event) => {
    let range = event.target.value;
    // let incOrder = data.products.sort((a, b) => b.price - a.price);
    // let decOrder = data.products.sort((a, b) => a.price - b.price);

    if (range === "select") {
      this.setState({
        products: data.products,
        // products: incOrder,
      });
    }

    if (range === "Highest to Lowest") {
      this.setState({
        products: data.products.sort((a, b) => b.price - a.price),
        // products: incOrder,
      });
    }

    if (range === "Lowest to Highest") {
      this.setState({
        products: data.products.sort((a, b) => a.price - b.price),
        // products: decOrder,
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
    // console.log(filterSize);
  };

  handleCart = (event) => {
    let id = event.target.id;
    // console.log(id, "id", data.products);
    let productList = data.products.filter((a) => String(a.id) === String(id));
    // console.log(productList, "pro");
    productList[0].Qty = 1;

    this.setState({
      // list: [...this.state.list, ...productList],
      list: this.state.list.concat(productList),
    });
  };

  render() {
    return (
      <>
        {/* <div className="flex justify">
          <h1>Shopping Cart</h1>
          <img className="icon" src="static/bag-icon.png" alt="/" />
        </div> */}
        {/* info={this.state.list} */}

        <div className="cart">
          <Cart info={this.state.list} />
        </div>
        <div className="flex justify">
          <div>
            <p>{this.state.products.length} Products found</p>
          </div>
          <div className="flex">
            <p>Order By : </p>
            <select onChange={(event) => this.handleRange(event)}>
              <option value="select">select</option>
              <option value="Lowest to Highest">Lowest to Highest</option>
              <option value="Highest to Lowest">Highest to Lowest</option>
            </select>
          </div>
        </div>
        <section className=" ">
          <div className="size-btns">
            <p>Sizes:</p>

            {["S", "XS", "M", "X", "L", "XL", "XXL"].map((size) => {
              return (
                <>
                  <button
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
                    <p>{product.title}</p>
                    <p>
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
