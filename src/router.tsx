import Layout from 'layouts/Layout';
import Main from 'pages/Main';
import SideBar from 'pages/Main/SideBar';
import Ranking from 'pages/Main/SideBar/Ranking';
import Rating from 'pages/Main/SideBar/Rating';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import SelectType from 'pages/SignUp/SelectType';
import MyPage from 'pages/MyPage';
import Chat from 'pages/Chat';
import Save from 'pages/Save';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<Outlet />}>
          <Route index element={<SelectType />} />
          <Route index path="form" element={<SignUp />} />
        </Route>
        <Route path="mypage" element={<MyPage />} />
        <Route path="chat" element={<Chat />} />
        <Route path="save" element={<Save />} />
      </Route>
    </Routes>
  );
};
