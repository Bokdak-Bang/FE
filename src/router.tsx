import Layout from 'layouts/Layout';
import Home from 'pages/Home';
import Main from 'pages/Main';
import SideBar from 'pages/Main/SideBar';
import Ranking from 'pages/Main/SideBar/Ranking';
import Rating from 'pages/Main/SideBar/Rating';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="main" element={<Outlet />}>
          <Route index element={<Main />} />
        </Route>
      </Route>
    </Routes>
  );
};
