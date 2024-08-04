
import * as formik from 'formik';
import * as yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import traidat from '../../public/images/traidat.png';
import AdminRose from '../../public/images/adminRose.png';
import './PostForumPage.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PostForumService } from '../../services/AccountService';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';


function PostForumPage() {

    const user = useSelector(state => state.user);
    const navigate = useNavigate()

    const { Formik } = formik;

    const schema = yup.object().shape({
        title: yup.string().required('Required'),
        content: yup.string().required('Required'),
    });

    const fetchPostForum = async (newData) => {
        const response = await PostForumService(newData.formData);
        return response;
    }

    //mutations
    const mutations = useMutation(fetchPostForum, {
        onSuccess: (data) => {
            toast(`🐉 ${data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/forum')
        },
        onError: (error) => {
            navigate('/user/postForum')
            console.log(error);
        }
    })


    return (

        <div className='PostForumPage'>
            <h4>ĐỔI MẬT KHẨU</h4>
            <Formik
                validationSchema={schema}
                onSubmit={async (values) => {

                    try {
                        mutations.mutate({
                            formData: values
                        });
                    } catch (error) {
                        console.log(error);

                    }

                }}
                initialValues={{
                    name: user?.player.name,
                    title: '',
                    content: '',
                    accountId: user?.user.id,
                    avatar: user?.player.gender
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form className='PostForumPage__Form' noValidate onSubmit={handleSubmit}>
                        {/* trường ẩn */}
                        <Form.Group className='mb-4' controlId="name">
                            <Form.Control
                                value={values.name}
                                name='name'
                                type="hidden"
                            />
                            <formik.ErrorMessage className='errorMForm' name="title" component="div" />
                        </Form.Group>
                        <Form.Group className='mb-4' controlId="accountId">
                            <Form.Control
                                value={values.accountId}
                                name='accountId'
                                type="hidden"
                            />
                            <formik.ErrorMessage className='errorMForm' name="accountId" component="div" />
                        </Form.Group>
                        <Form.Group className='mb-4' controlId="avatar">
                            <Form.Control
                                value={values.avatar}
                                name='avatar'
                                type="hidden"
                            />
                            <formik.ErrorMessage className='errorMForm' name="avatar" component="div" />
                        </Form.Group>

                        {/* hiện */}
                        <Form.Group className='mb-4' controlId="title">
                            <Form.Control
                                value={values.title}
                                onChange={handleChange} name='title'
                                type="text"
                                placeholder="Nhập Tiêu Đề Bài Viết"
                                isValid={touched.title && !errors.title}
                            />
                            <formik.ErrorMessage className='errorMForm' name="title" component="div" />
                        </Form.Group>
                        <Form.Group className='mb-4' controlId="content">
                            <Form.Control
                                value={values.content}
                                onChange={handleChange} name='content'
                                as="textarea"
                                placeholder="Nhập Nội Dung Bài Viết"
                                isValid={touched.content && !errors.content}
                            />
                            <formik.ErrorMessage className='errorMForm' name="content" component="div" />
                        </Form.Group>
                        <div className='PostForumPage__Form__button'>
                            <Button variant="primary" type="submit">
                                Đăng Bài Viết
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PostForumPage;