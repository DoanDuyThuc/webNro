import Image from 'react-bootstrap/Image';
import logo from '../../public/images/logo.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import './MenuNotUser.scss';
import { useEffect, useState } from 'react';
import { GetUserIdService, LoginAccountService, SignInService } from '../../services/AccountService';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, SavePlayer } from '../../redux/slider/userSlice';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

function MenuNotUser({ setLogin, login }) {
    const { Formik } = formik;
    const dispatch = useDispatch();

    const schemaLogin = yup.object().shape({
        username: yup.string().required('vui lòng Không được để trống'),
        password: yup.string().required('vui lòng Không được để trống'),
    });

    const schemaSignIn = yup.object().shape({
        username: yup.string().required('vui lòng Không được để trống'),
        password: yup.string().required('vui lòng Không được để trống'),
        enterPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
    });

    const [FormLogin, setFormLogin] = useState(false);
    const [FormSignIn, setFormSignIn] = useState(false);

    const handleCloseLogin = () => {
        setLogin(false)
        setFormLogin(false);
    }
    const handleShowLogin = () => {
        setFormLogin(true);
        setLogin(true)
    }

    const handleCloseSignIn = () => setFormSignIn(false);
    const handleShowSignIn = () => setFormSignIn(true);

    return (
        <>
            <div className='MenuNotUser'>
                <Button onClick={handleShowLogin} variant="outline-primary">Đăng Nhập</Button>
                <Button onClick={handleShowSignIn} variant="outline-primary">Đăng Ký</Button>
            </div>

            {/* /modal form Login */}
            <Modal className='ModalForm' show={login ? login : FormLogin} onHide={handleCloseLogin}>
                <div className='ModalContent'>
                    <Image width={'70%'} src={logo} alt='logo' />
                    <Formik
                        validationSchema={schemaLogin}
                        onSubmit={async (values) => {
                            const dataUser = await LoginAccountService(values.username, values.password);
                            if (dataUser?.message) {
                                toast(`🐉 ${dataUser?.message}`, {
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
                            if (dataUser?.accset_Token) {
                                dispatch(signIn(dataUser));
                                if (dataUser?.id) {
                                    const dataPlayer = await GetUserIdService(dataUser?.accset_Token, dataUser?.id);
                                    dispatch(SavePlayer(dataPlayer));
                                    handleCloseLogin();
                                }
                            }
                        }}
                        initialValues={{
                            username: '',
                            password: '',
                        }}

                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (

                            <Form className='ModalForm_valid' noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="UserNameLogin">
                                    <Form.Control
                                        value={values.username}
                                        onChange={handleChange} name='username'
                                        type="text"
                                        placeholder="Nhập tên đăng nhập"
                                        isValid={touched.username && !errors.username}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="username" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="PassWordLogin">
                                    <Form.Control
                                        value={values.password}
                                        onChange={handleChange}
                                        name='password'
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        isValid={touched.password && !errors.password}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="password" component="div" />
                                </Form.Group>

                                <div className='ModalForm_valid_button'>
                                    <Button variant="primary" type="submit">
                                        Đăng nhập
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>

            {/* /modal form Login */}
            <Modal className='ModalForm' show={FormSignIn} onHide={handleCloseSignIn}>
                <div className='ModalContent'>
                    <Image width={'70%'} src={logo} alt='logo' />
                    <Formik
                        validationSchema={schemaSignIn}
                        onSubmit={async (values) => {
                            const dataUser = await SignInService(values);
                            if (dataUser?.message) {
                                toast(`🐉 ${dataUser?.message}`, {
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
                            handleCloseSignIn();
                        }}
                        initialValues={{
                            username: '',
                            password: '',
                            enterPassword: '',
                        }}

                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (

                            <Form className='ModalForm_valid' noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="UserNameSignIn">
                                    <Form.Control
                                        value={values.username}
                                        onChange={handleChange} name='username'
                                        type="text"
                                        placeholder="Nhập tên đăng nhập"
                                        isValid={touched.username && !errors.username}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="username" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="PasswordSignIn">
                                    <Form.Control
                                        value={values.password}
                                        onChange={handleChange}
                                        name='password'
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        isValid={touched.password && !errors.password}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="password" component="div" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="enterPasswordSignIn">
                                    <Form.Control
                                        value={values.enterPassword}
                                        onChange={handleChange}
                                        name='enterPassword'
                                        type="Password"
                                        placeholder="Nhập mật khẩu"
                                        isValid={touched.enterPassword && !errors.enterPassword}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="enterPassword" component="div" />
                                </Form.Group>

                                <div className='ModalForm_valid_button'>
                                    <Button variant="primary" type="submit">
                                        Đăng Ký
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>

    );
}

export default MenuNotUser;