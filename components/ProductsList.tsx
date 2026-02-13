"use client";

import { GetAllProducts } from "@/api/getAllProducts";

const ProductList = () => {
  const { loading, result } = GetAllProducts();
  console.log("hol");


  console.log(result);

  return (
    <div>from product list</div>
  )
}

export default ProductList;