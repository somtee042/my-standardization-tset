import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseCart,
  getTotals,
} from "../../features/cartSlice";
import { fetchProducts } from "../../features/productsSlice";
import styles from "../../styles/addcart.module.css";
import star from "../../assets/stars.svg";
import { MdDeleteOutline } from "react-icons/md";
import { FaAngleRight, FaMinus, FaPlus } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import card from "../../assets/Mastercard - png.svg"
import visa from "../../assets/Visa Inc. - png.svg"
import paystack from "../../assets/Paystack - png.svg"

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.products);
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleIncreaseQuantity = (item) => {
    const product = products.find((product) => product.id === item.id);
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className={styles["cart-wrap"]}>
      <div className={styles["shop_links"]}>
        <nav>
          <a href="#" className={styles["home"]}>
            Home
          </a>
          <FaAngleRight />
          <a href="#" className={styles["home"]}>
            Shop
          </a>
          <FaAngleRight
            style={{
              color: "#BDBDBD",
            }}
          />
          <a href="#" className={styles["shop"]}>
            Shopping Cart
          </a>
        </nav>
      </div>
      <div className={styles["cart-holder"]}>
        <div className={styles["cart-holder-content-1"]}>
          <h3>Shopping Cart</h3>
          <div className={styles["item-container1"]}>
            <div className={styles["item-header"]}>
              <p>Item Details</p>
              <div className={styles["qty-price"]}>
                <p>Quantity</p>
                <p>Price</p>
              </div>
            </div>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className={styles["item-container2"]}>
              <div className={styles["heroCart-Section"]}>
                <div className={styles["hero-item"]}>
                  <img src={item.thumbnail} alt={item.title} />
                  <div className={styles["cart-writeup"]}>
                    <h4>{item.title}</h4>
                    <p>{item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                    <div className={styles["icon-text"]}>
                      <img src={star} alt="Star" />
                      <span className={styles.txt}>
                        {item.reviews?.rating || 0} Reviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles["add-qty"]}>
                  <div className={styles.reduce}>
                    <FaMinus onClick={() => handleDecreaseQuantity(item)} />
                  </div>
                  <input type="number" value={item.cartQuantity} readOnly />
                  <div className={styles.add}>
                    <FaPlus onClick={() => handleIncreaseQuantity(item)} />
                  </div>
                </div>

                <div className={styles["price-qty"]}>
                  <h4>${item.price}</h4>
                  <p>
                    ${item.price} <LiaTimesSolid /> {item.cartQuantity} Item
                  </p>
                </div>
              </div>

              <div className={styles["delete-container"]}>
                <div
                  className={styles["delete"]}
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <MdDeleteOutline />
                  <h4>REMOVE</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles["cart-holder-content-2"]}>
          <div className={styles["summary-content-1"]}>
            <h3>Order Summary</h3>
            <p>{cartTotalQuantity} Items</p>
          </div>
          <div className={styles["summary-content"]}>
            <h4>Delivery Charges</h4>
            <small>
              Add your delivery address to checkout to see delivery charges.
            </small>
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["summary-content"]}>
            <h4
              style={{
                opacity: 0.5,
              }}
            >
              Subtotal
            </h4>
            <p
              style={{
                color: "#3A3C3E",
                opacity: 0.5,
              }}
            >
              ${cartTotalAmount}
            </p>
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["summary-content"]}>
            <h4>Total Amount</h4>
            <p>${cartTotalAmount}</p>
          </div>
          <div className={styles["line"]}></div>
          <div className={styles["summary-content"]}>
            <h4></h4>
            <small>Excluding Delivery Charges</small>
          </div>
          <div className={styles["btn"]}>
            <button>Proceed to Checkout</button>
          </div>
          <div className={styles["pay-img"]}>
            <img src={paystack} alt="" />
            <img src={card} alt="" />
            <img src={visa} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
