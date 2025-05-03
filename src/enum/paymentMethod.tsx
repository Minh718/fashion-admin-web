import { MdPayment } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import React from "react";
export const paymentMethod = {
  VNPAY: "VNPAY",
  BANK_TRANSFER: "BANK_TRANSFER",
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
};
export const paymentMethodsRender = [
  {
    value: "VNPAY",
    name: (
      <>
        <MdPayment /> VNPAY payment
      </>
    ),
  },
  {
    value: "CASH_ON_DELIVERY",
    name: (
      <>
        <BsCash /> Cash on Delivery (COD)
      </>
    ),
  },
  //  {
  //     value: "BANK_TRANSFER",
  //     name: (
  //         <>
  //             <AccountBalanceIcon /> Bank Transfer
  //         </>
  //     ),
  // },
  // You can add more payment methods here
];
