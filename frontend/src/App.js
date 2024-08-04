import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from './routes';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance, GetUserIdService, RefreshTokenService } from './services/AccountService';
import { refreshToken, SavePlayer } from './redux/slider/userSlice';
import { useQuery } from 'react-query';

function App() {

  const user = useSelector(state => state?.user);
  const dispatch = useDispatch();

  //data fetch
  const fetchPlayer = async (token, id) => {
    const dataPlayer = await GetUserIdService(token, id);
    return dataPlayer;
  };

  const dataPlayer = useQuery(['player', user?.user?.id],
    () => fetchPlayer(user?.accset_Token, user?.user?.id), {
    enabled: !!user?.user?.id && !!user?.accset_Token,
    onSuccess: (data) => {
      dispatch(SavePlayer(data.data)); // Cập nhật Redux store sau khi dữ liệu được lấy thành công
    },
    onError: (error) => {
      console.error('Error fetching player data:', error);
    },
  });

  useEffect(() => {
    if (dataPlayer.data) {
      dispatch(SavePlayer(dataPlayer.data));
    }
  }, [dataPlayer?.data, dispatch]);

  axiosInstance.interceptors.request.use(async (config) => {

    const date = new Date();

    const decoded = jwtDecode(user.accset_Token);


    if (decoded?.exp < date.getTime() / 1000) {
      const data = await RefreshTokenService();
      config.headers['authorization'] = `Bearer ${data?.access_token}`
      dispatch(refreshToken(data?.access_token));
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


  axiosInstance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  }, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  });

  return (
    <section className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          {routes(user).map((route, index) => {

            const Layout = route.isHeaderFooter ? DefaultComponent : React.Fragment;

            return (

              <Route key={index} path={route.path} element={
                <Layout>
                  <route.page />
                </Layout>
              } />
            )
          })}
        </Routes>

      </Router>
    </section>
  );
}

export default App;
