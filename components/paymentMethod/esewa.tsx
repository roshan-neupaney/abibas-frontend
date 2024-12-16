import React from "react";
import EsewaLogo from "../../public/images/esewa.svg";
import LazyImage from "../lazyImage";
import crypto from "crypto";

interface EsewaProps {
  total_amount: number;
  tax_amount: number;
  delivery_amount: number;
  items_total_price: number;
  id: string;
}

const Esewa = ({
  total_amount,
  tax_amount,
  delivery_amount,
  items_total_price,
  id,
}: EsewaProps) => {
  const uuid = Math.floor(Math.random() * 10 * Date.now()).toString();
  const product_code = process.env.PRODUCT_CODE;
  const key: string = process.env.SECRET_KEY || "";

  const message = `total_amount=${total_amount},transaction_uuid=${uuid},product_code=${product_code}`;
  const hash = crypto.createHmac("sha256", key).update(message).digest("base64");
  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input
          type="hidden"
          id="amount"
          name="amount"
          value={items_total_price}
          required
        />
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value={tax_amount}
          required
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={total_amount}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={uuid}
          required
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value={product_code}
          required
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value={delivery_amount}
          required
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          // value={`https://abibas-frontend.vercel.app/payment/success/${id}`}
          value={`http://localhost:3000/payment/success/${id}`}
          required
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value={`https://abibas-frontend.vercel.app/payment/${id}`}
          // value={`http://localhost:3000/payment/${id}`}
          required
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={hash}
          required
        />
        <label className="flex p-4">
          <input
            value="Submit"
            type="submit"
            name="submitButton"
            className="w-0 h-0 opacity-0"
          />
          <span className="bg-white h-10 w-28 fle">
            <LazyImage
              src={EsewaLogo}
              width={100}
              height={100}
              alt="Esewa Icon"
            />
          </span>
        </label>
      </form>
    </div>
  );
};

export default Esewa;
