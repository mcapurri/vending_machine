import React from 'react';
import { TextField, IconButton, useMediaQuery } from '@mui/material';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { Form, Formik } from 'formik';
import { CartItem } from '../../Utils/API/products';
import { Container } from './style';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  products: CartItem[];
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
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  products: CartItem[];
}) => {
  const matches = useMediaQuery('(max-width:576px)');

  const dataFiltered = filterData(searchQuery, products);

  const initialValues = {};
  const schema = {};
  const onSubmit: () => void = () => {};

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      <Container>
        <Form style={{ display: 'flex', justifySelf: 'flex-end' }}>
          <TextField
            id="search-bar"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
            }}
            label="Enter the product to find"
            variant="outlined"
            placeholder="Search..."
            size={matches ? 'small' : 'medium'}
            value={searchQuery}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: 'black' }} />
          </IconButton>
        </Form>
        {searchQuery &&
          dataFiltered.map((item) => (
            <div
              className="text"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 5,
                justifyContent: 'normal',
                fontSize: 20,
                color: 'blue',
                margin: 1,
                width: '250px',
                borderColor: 'green',
                borderWidth: '10px',
              }}
              key={item._id}
            >
              {item.productName}
            </div>
          ))}
      </Container>
    </Formik>
  );

  //   <Search
  //   id="search-bar"
  //   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchQuery(e.target.value);
  //   }}
  //   // label="Enter the product to find"
  //   // variant="outlined"
  //   placeholder="Search..."
  //   // size={matches ? 'small' : 'medium'}
  //   // value={searchQuery}
  // >
  //   <SearchIconWrapper>
  //     <SearchIcon />
  //   </SearchIconWrapper>
  //   <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
  // </Search>
};
export default SearchBar;
