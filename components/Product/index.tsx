import React from "react";
import { ProductInt } from "../../types/Product";

/**
 * Product Component displays all characteristics of a Product and is called from
 * the Products page
 */
const Product = (props:{ productData: ProductInt }) => {
  
  // *** Constants and variables **
  const { name, price, available, weight, solds } = props.productData;
  
  
  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{price}</td>
      <td className="border px-4 py-2">{available}</td>
      <td className="border px-4 py-2">{weight}</td>
      <td className="border px-4 py-2">{solds}</td>
    </tr>
  );
};

export default Product;
