import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Div } from './style';

export function Layout(): JSX.Element {
  return (
    <Div>
      <h1>Vending Machine</h1>
      <Header />
      <main>
        <Outlet />
      </main>
    </Div>
  );
}
