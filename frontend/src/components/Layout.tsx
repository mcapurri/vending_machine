import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div
      style={{
        padding: "3% 12%",
      }}
    >
      <h1>Vendor Machine</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
