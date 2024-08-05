

import NotifyAdminDetailsComponent from '../../components/NotifyAdminDetailsComponent/NotifyAdminDetailsComponent';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import AdminRose from '../../public/images/adminRose.png';
import './DiscussForumPage.scss';
import { DeleteforumPostService, EditForumService, GetDetaisPostForumService } from '../../services/AccountService';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Modal from 'react-bootstrap/Modal';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import traidat from '../../public/images/traidat.png';
import logo from '../../public/images/logo.png';
import DiscussDetailsComponent from '../../components/DiscussDetailsComponent/DiscussDetailsComponent';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CommentForumComponent from '../../components/CommentForumComponent/CommentForumComponent';
import CustomTimeAgo from '../../utils/CustomTimeAgo';

function DiscussForumPage() {

    const { id } = useParams();
    const [showEdit, setShowEdit] = useState(false);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { Formik } = formik;

    const dataNotifyAdmin = useQuery({
        queryKey: ['forum_detais', id],
        queryFn: async () => {
            const response = await GetDetaisPostForumService(id);
            return response;
        },
        enabled: !!id,
        keepPreviousData: true,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            console.error('Error fetching player data:', error);
        }
    })

    //modal
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    //mutations
    const mutationEditForum = useMutation(
        async (newData) => {
            const response = await EditForumService(newData.id, newData.newData);
            return response;
        },
        {
            onMutate: async (newData) => {
                await queryClient.cancelQueries('forum_detais');
                const previousData = queryClient.getQueryData('forum_detais');
                queryClient.setQueryData('forum_detais', (old) => {
                    return old;
                });
                return { previousData };
            },
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
                setShowEdit(false);
                queryClient.invalidateQueries('forum_detais');
            },
            onError: (error) => {
                console.error('Error fetching player data:', error)
            }
        }
    )

    const mutationDeleteForum = useMutation({
        mutationFn: async (id) => {
            const response = await DeleteforumPostService(id);
            return response;
        },
        onMutate: async (data) => {
            await queryClient.cancelQueries('forum_discuss');
            const previousData = queryClient.getQueryData('forum_discuss');
            queryClient.setQueryData('forum_discuss', (old) => {
                return old;
            });
            return { previousData };
        },
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
            queryClient.invalidateQueries('forum_discuss');
            navigate('/forum');
        },
        onError: (error) => {
            console.error('Error fetching player data:', error)
        }
    })

    const handleDeleteForum = async () => {
        mutationDeleteForum.mutateAsync(id);
    }

    return (

        <>
            <div className='DiscussForumPage'>
                <div className='DiscussForumPage__container'>
                    <div className='DiscussForumPage__container__info'>
                        {(() => {
                            switch (dataNotifyAdmin?.data?.post.avartar) {
                                case '0':
                                    return <Image src={traidat} height={60} width={60} />
                                case '1':
                                    return <Image src={namec} height={60} width={60} />

                                case '2':
                                    return <Image src={xayda} height={60} width={60} />
                                default:
                                    return <Image src={AdminRose} height={60} width={60} />
                            }
                        })()}
                        <span>{dataNotifyAdmin?.data?.post.name}</span>
                    </div>
                    <div className='DiscussForumPage__container__content'>
                        <div className='DiscussForumPage__container__content__Top'>
                            <div className='DiscussForumPage__container__content__Top__left'>
                                <h5>{dataNotifyAdmin?.data?.post.title}</h5>
                                <span>{CustomTimeAgo(dataNotifyAdmin?.data?.post.createdAt)}</span>
                            </div>
                            {dataNotifyAdmin?.data?.post.accountId === user?.user?.id && (
                                <div className='DiscussForumPage__container__content__Top__right'>
                                    <Button onClick={handleShowEdit}  >Chỉnh sửa</Button>
                                    <Button onClick={handleDeleteForum} variant="danger"  >Xóa Bài</Button>
                                </div>
                            )}
                        </div>
                        <DiscussDetailsComponent content={parse(parse(String(dataNotifyAdmin?.data?.post.content)))} />
                    </div>
                </div>
                {/* comment */}
                <div className='CommentForumComponent'>
                    <CommentForumComponent />

                </div>
            </div>
            {/* modal */}
            <Modal className='ModalForm' show={showEdit} onHide={handleCloseEdit}>
                <div className='ModalContent'>
                    <Image width={'70%'} src={logo} alt='logo' />
                    <Formik
                        onSubmit={async (values) => {
                            mutationEditForum.mutateAsync({
                                id: id,
                                newData: values
                            });

                        }}
                        initialValues={{
                            title: dataNotifyAdmin?.data?.post.title,
                            content: parse(String(dataNotifyAdmin?.data?.post.content)),
                        }}

                    >
                        {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (

                            <Form className='ModalForm_valid' noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Control
                                        value={values.title}
                                        onChange={handleChange} name='title'
                                        type="text"
                                        placeholder="Nhập tiêu đề"
                                        isValid={touched.title && !errors.title}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="title" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="PassWordLogin">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={values.content}
                                        config={{
                                            toolbar: {
                                                items: [
                                                    'heading',
                                                    '|',
                                                    'bold',
                                                    'italic',
                                                    'link',
                                                    '|',
                                                    'bulletedList',
                                                    'numberedList',
                                                    '|',
                                                    'blockQuote',
                                                    'insertTable',
                                                    '|',
                                                    'undo',
                                                    'redo'
                                                ]
                                            },
                                            // Các cấu hình khác của CKEditor
                                        }}
                                        onChange={(e, editor) => {
                                            const data = editor.getData();
                                            setFieldValue('content', data);
                                        }}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="password" component="div" />
                                </Form.Group>

                                <div className='ModalForm_valid_button'>
                                    <Button variant="primary" type="submit">
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal >
        </>

    );
}

export default DiscussForumPage;