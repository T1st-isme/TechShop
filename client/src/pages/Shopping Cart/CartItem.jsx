import PropTypes from "prop-types";
import { useState } from "react";
import Button from "@mui/material/Button";
import { MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import {
  MinusCircleIcon as MinusIcon,
  PlusCircleIcon as PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { TextField } from "@mui/material";

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
                <MinusIcon
                  style={{ height: "120px", width: "120px" }}
                  color="blue"
                  variant="contained"
                  className=" hover:text-gray-400"
                  onClick={decreaseQty}
                />

                <div className="relative w-auto" style={{ top: "40px" }}>
                  <MDBInput
                    readOnly
                    type="number"
                    name="quantity"
                    value={quantity}
                    className="border border-gray-300 p-2  text-center font-semibold w-13"
                  />
                </div>

                <PlusIcon
                  style={{ height: "120px", width: "120px" }}
                  color="blue"
                  variant="contained"
                  className=" hover:text-gray-400"
                  onClick={increaseQty}
                />

                <div className="absolute top-36 left-0">
                  <TrashIcon
                    style={{ height: "50px", width: "50px" }}
                    color="red"
                    variant="contained"
                    className=" hover:text-gray-400"
                    onClick={() => props.onRemoveCartItem(_id)}
                  />
                </div>
              </div>
              {/* Tổng tiền 1 sp */}
              <div
                style={{ fontSize: "22px" }}
                className="relative left-64 top-10 text-right text-sm font-medium text-gray-900"
              >
                {(price * quantity).toFixed(0)}.000đ
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
