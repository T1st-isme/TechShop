import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@mui/material/Button";
import { MDBInput } from "mdb-react-ui-kit";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState(props.cartItem.quantity);
  const { _id, name, price, img } = props.cartItem;

  const increaseQty = () => {
    setQuantity(quantity + 1);
    props.increaseQty(_id, quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
    props.decreaseQty(_id, quantity - 1);
  };

  return (
    <div>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-b border-gray-200"
      >
        <li key={_id} className="flex py-6 sm:py-10">
          <div className="flex-shrink-0">
            <img
              src={img}
              alt=""
              className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <a
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      href="#"
                      className="font-medium  text-gray-700 hover:text-gray-800"
                    >
                      {name}
                    </a>
                  </h3>
                </div>
                <p
                  style={{ fontSize: "18px" }}
                  className="mt-1 text-sm font-medium text-gray-900"
                >
                  ${price}
                </p>
              </div>
              <div className="flex">
                <Button
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  variant="contained"
                  className=" hover:text-gray-400"
                  onClick={decreaseQty}
                >
                  -
                </Button>

                <div className="w-13">
                  <MDBInput
                    readonly
                    type="number"
                    name="quantity"
                    value={quantity}
                    className="border border-gray-300 p-2  text-center font-semibold w-13"
                  />
                </div>

                <Button
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  variant="contained"
                  className=" hover:text-gray-400"
                  onClick={increaseQty}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  increaseQty: PropTypes.func.isRequired,
  decreaseQty: PropTypes.func.isRequired,
};

export default CartItem;
