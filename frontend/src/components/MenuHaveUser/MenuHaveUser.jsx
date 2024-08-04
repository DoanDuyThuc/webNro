import { useDispatch, useSelector } from 'react-redux';
import './MenuHaveUser.scss';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { toast } from 'react-toastify';
import { signOut } from '../../redux/slider/userSlice';
import { ActiveUserService, LogoutService } from '../../services/AccountService';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import traidat from '../../public/images/traidat.png';
import logo from '../../public/images/logo.png';
import { MdVerified } from "react-icons/md";
import { MdDangerous } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useMutation, useQueryClient } from 'react-query';

function MenuHaveUser() {

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();


    const handleLogout = async () => {
        dispatch(signOut());
        const resj = await LogoutService();
        navigate('/');
        toast(`🐉 ${resj?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleVerifyActive = () => {
        if (user?.user?.active === 1) {
            toast(`🐉 ${'tài khoản này đã được kích hoạt rồi !'}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            handleShowActive();
        }
    }

    // modals
    const [showActive, setShowActive] = useState(false);

    const handleCloseActive = () => setShowActive(false);
    const handleShowActive = () => setShowActive(true);

    // fetch data
    const acticeFetch = async (newData) => {
        const resj = await ActiveUserService(newData.token, newData.id);
        return resj;
    };

    //handle Mutations
    const mutation = useMutation(acticeFetch, {
        onSuccess: (data) => {
            toast(`🐉 ${data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            queryClient.invalidateQueries('player');
            handleCloseActive();
        },
        onError: (error) => {
            toast(`🐉 ${error.response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    });

    const handleActiveUser = async () => {
        mutation.mutate({
            token: user?.accset_Token,
            id: user?.user?.id
        });
    }

    return (
        <>
            <div className='MenuHaveUser'>
                <div className='MenuHaveUser_Infor'>
                    {/* <Image src={namec} height={60} width={60} /> */}
                    {(() => {
                        switch (user?.player?.gender) {
                            case 0:
                                return <Image src={traidat} height={60} width={60} />
                            case 1:
                                return <Image src={namec} height={60} width={60} />

                            case 2:
                                return <Image src={xayda} height={60} width={60} />
                            default:
                                return <Image src={logo} height={60} width={60} />
                        }
                    })()}
                    <div className='InforUser'>
                        <span className='InforUserName'>{user?.player?.name}</span>
                        <ul className='InforUserList'>
                            <li className='InforUserListItem'>
                                Coin: {user?.user?.coin}
                            </li>
                            <li className='InforUserListItem'>
                                VND: {user?.user?.vnd}
                            </li>
                            <li className='InforUserListItem'>
                                Tổng Nạp: {user?.user?.tongnap}
                            </li>
                            <li className='InforUserListItem'>
                                {user?.user?.active === 1 ? (
                                    <div className='InforUserListItemVerify'>
                                        <span>Đã Xác Thực</span>
                                        <MdVerified />
                                    </div>
                                ) : (
                                    <div className='InforUserListItemVerify'>
                                        <span>Chưa Xác Thực</span>
                                        <MdDangerous style={{ color: 'red' }} />
                                    </div>
                                )}
                            </li>
                        </ul>

                    </div>
                </div>

                <div className='MenuHaveUser_Select'>
                    <ul className='MenuHaveUser_Select_list'>
                        <li className='MenuHaveUser_Select_item'>
                            <NavLink className='MenuHaveUser_Select_item-text' to='/user/change-password'>Đổi Mật Khẩu</NavLink>
                        </li>
                        <li className='MenuHaveUser_Select_item'>
                            <NavLink className='MenuHaveUser_Select_item-text' to='/user/postForum'>Đăng bài diễn đàn</NavLink>
                        </li>
                        <li className='MenuHaveUser_Select_item'>
                            <span onClick={handleLogout} className='MenuHaveUser_Select_item-text'>Đăng Xuất</span>
                        </li>
                    </ul>
                </div>

                {/* active user */}
                <div className='Active_User'>
                    <span>Hãy kích hoạt tải khoản nay để trải nghiệm hết tính năng của game</span>
                    <Button onClick={handleVerifyActive} variant="primary">Kích Hoạt Tài Khoản</Button>
                </div>
            </div>
            <Modal className='ModalFormHave' show={showActive} onHide={handleCloseActive}>
                <div className='ModalContentHave'>
                    <Image src={logo} width={'70%'} />
                    <div className='ModalContentTitleHave'>
                        <h3>Xác nhận kích hoạt tài khoản</h3>
                        <h4>Sau khi kích hoạt, bạn sẽ mở khóa các tính năng giao dịch</h4>
                        <span>Phí kích hoạt: 20,000 Coin</span>
                        <Button onClick={handleActiveUser} variant="primary">Kích Hoạt Ngay</Button>
                    </div>
                </div>
            </Modal>
        </>

    );
}

export default MenuHaveUser;