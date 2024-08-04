
import * as formik from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ChangePass.scss';
import { ChangePassService } from '../../services/AccountService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePass() {

    const user = useSelector(state => state.user);
    const navigate = useNavigate()

    const { Formik } = formik;

    const schema = yup.object().shape({
        oldPass: yup.string().required('vui lòng Không được để trống'),
        newPass: yup.string().required('vui lòng Không được để trống'),
        EnterNewPass: yup.string().required('vui lòng Không được để trống'),
    });

    return (

        <div className='ChangePass'>
            <h4>ĐỔI MẬT KHẨU</h4>
            <Formik
                validationSchema={schema}
                onSubmit={async (values) => {
                    const resj = await ChangePassService(user?.accset_Token, user?.user?.id, values);
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

                    navigate('/');
                }}
                initialValues={{
                    oldPass: '',
                    newPass: '',
                    EnterNewPass: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form className='Form_ChangePass' noValidate onSubmit={handleSubmit}>
                        <Form.Group className='mb-4' controlId="oldPass">
                            <Form.Control
                                value={values.oldPass}
                                onChange={handleChange} name='oldPass'
                                type="password"
                                placeholder="Nhập Mật Khẩu Hiện Tại"
                                isValid={touched.oldPass && !errors.oldPass}
                            />
                            <formik.ErrorMessage className='errorMForm' name="oldPass" component="div" />
                        </Form.Group>
                        <Form.Group className='mb-4' controlId="newPass">
                            <Form.Control
                                value={values.newPass}
                                onChange={handleChange} name='newPass'
                                type="password"
                                placeholder="Nhập Mật Khẩu Mới"
                                isValid={touched.newPass && !errors.newPass}
                            />
                            <formik.ErrorMessage className='errorMForm' name="newPass" component="div" />
                        </Form.Group>
                        <Form.Group className='mb-4' controlId="EnterNewPass">
                            <Form.Control
                                value={values.EnterNewPass}
                                onChange={handleChange} name='EnterNewPass'
                                type="password"
                                placeholder="Nhập Mật Khẩu Hiện Tại"
                                isValid={touched.EnterNewPass && !errors.EnterNewPass}
                            />
                            <formik.ErrorMessage className='errorMForm' name="EnterNewPass" component="div" />
                        </Form.Group>
                        <div className='From_Change_button'>
                            <Button variant="primary" type="submit">
                                Đổi Mật Khẩu
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ChangePass;