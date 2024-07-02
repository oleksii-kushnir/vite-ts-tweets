import { FC } from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';

const Home = lazy(() => import('@/pages/Home/Home'));
const Tweets = lazy(() => import('@/pages/Tweets/Tweets'));

export const App: FC = () => (
  <Routes>
    <Route path='/' element={<SharedLayout />}>
      <Route index element={<Home />} />
      <Route path='tweets' element={<Tweets />} />
      <Route path='*' element={<Home />} />
    </Route>
  </Routes>
);
