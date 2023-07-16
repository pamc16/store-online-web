import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./filter-product.css";

interface ProductFilterProps {
  products: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products }) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const handleSearch = (value: string) => {
    setSearchValue(value);

    const filteredProducts = products.filter((product) =>
      product.toLowerCase().includes(value.toLowerCase())
    );

    const filteredOptions = filteredProducts.map((product) => ({
      value: product,
    }));

    setOptions(filteredOptions);
  };

  return (
    <AutoComplete
      value={searchValue}
      options={options}
      onChange={handleSearch}
      className="search-container"
    >
      <Input
        prefix={<SearchOutlined />}
        placeholder="Buscar productos"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </AutoComplete>
  );
};

export default ProductFilter;
