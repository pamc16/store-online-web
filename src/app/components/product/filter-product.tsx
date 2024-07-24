import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import React, { useState } from 'react';
import './filter-product.css';

interface ProductFilterProps {
	products: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products }) => {
	const [searchValue, setSearchValue] = useState('');
	const [options, setOptions] = useState<{ value: string }[]>([]);

	const handleSearch = (value: string) => {
		setSearchValue(value);

		const filteredProducts = products.filter((product) =>
			product.toLowerCase().includes(value.toLowerCase()),
		);

		const filteredOptions = filteredProducts.map((product) => ({
			value: product,
		}));

		setOptions(filteredOptions);
	};

	return (
		<AutoComplete
			className='search-container'
			onChange={handleSearch}
			options={options}
			value={searchValue}
		>
			<Input
				onChange={(e) => handleSearch(e.target.value)}
				placeholder='Buscar productos'
				prefix={<SearchOutlined />}
			/>
		</AutoComplete>
	);
};

export default ProductFilter;
