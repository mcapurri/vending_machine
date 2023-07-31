import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Div } from './style';

export const Layout = () => {
  return (
    <Div>
      <h1>Vendor Machine</h1>
      <Header />
      <main>
        <Outlet />
      </main>
    </Div>
  );
};
