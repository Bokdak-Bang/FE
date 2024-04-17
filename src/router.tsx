import Layout from 'layouts/Layout';
import Home from 'pages/Home';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

// import { Layout } from '@/layouts/Layout';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
        </Route>
        {/* <Route path="/insurance" element={<Outlet />}>
          <Route index element={<Insurance />} />
          <Route path="guest" element={<GuestInsurance />} />
        </Route> */}
      </Route>
    </Routes>
  );
};
