import React, { useEffect, useRef, useState } from 'react';
import { TextField, IconButton, useMediaQuery, Button } from '@mui/material';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { Form, Formik } from 'formik';
import { CartItem } from '../../Utils/API/products';
import { Container, SearchInput, ProductsContainer, Product } from './style';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  products: CartItem[];
  setSearchedItem: React.Dispatch<React.SetStateAction<CartItem | null>>;
}

const filterData = (query: string, data: CartItem[]): CartItem[] => {
  if (!query) {
    return data;
  }
  return data.filter((item) => item.productName.toLowerCase().includes(query));
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  products,
  setSearchedItem,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  products: CartItem[];
  setSearchedItem: React.Dispatch<React.SetStateAction<CartItem | null>>;
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const productsContainerRef = useRef<HTMLDivElement | null>(null);

  const matches = useMediaQuery('(max-width:576px)');

  const filteredProducts = products
    ? filterData(
        searchQuery,
        products.map((product) => product)
      )
    : [];

  const initialValues = {};
  const schema = {};
  const onSubmit: () => void = () => {};

  const handleProductClick = (item: CartItem): void => {
    setSearchedItem(item);
  };
  const handleSearchInputChange = (newValue: string): void => {
    setSearchQuery(newValue);
    if (!newValue) {
      setSearchedItem(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        productsContainerRef.current &&
        !productsContainerRef.current.contains(event.target as Node)
      ) {
        setSearchQuery('');
        setSearchedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchQuery]);

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      <Container>
        <Form style={{ display: 'flex', justifySelf: 'flex-end' }}>
          {!showSearchInput && (
            <IconButton
              onClick={() => {
                setShowSearchInput(true);
              }}
            >
              <SearchIcon style={{ fill: 'black' }} />
            </IconButton>
          )}
          {showSearchInput && (
            <SearchInput ref={searchInputRef}>
              <TextField
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearchInputChange(e.target.value)}
                value={searchQuery}
                size={matches ? 'small' : 'medium'}
              />
              <IconButton
                onClick={() => {
                  setShowSearchInput(false);
                  setSearchQuery('');
                }}
              >
                <SearchIcon style={{ fill: 'darkgreen' }} />
              </IconButton>
            </SearchInput>
          )}
        </Form>
        <ProductsContainer ref={productsContainerRef}>
          {searchQuery &&
            filteredProducts.map((item) => (
              <Product key={item._id}>
                <Button onClick={() => handleProductClick(item)}>{item.productName}</Button>
              </Product>
            ))}
        </ProductsContainer>
      </Container>
    </Formik>
  );
};
export default SearchBar;
