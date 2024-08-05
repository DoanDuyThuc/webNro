
import Image from 'react-bootstrap/esm/Image';
import traidat from '../../public/images/traidat.png';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import logo from '../../public/images/logo.png';
import AdminRose from '../../public/images/adminRose.png';

import { ImReply } from "react-icons/im";
import Button from 'react-bootstrap/Button';
import './CommentForumComponent.scss';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import { GetForumCommentService, ReplyForumCommentService } from '../../services/AccountService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CustomTimeAgo from '../../utils/CustomTimeAgo';

function CommentForumComponent() {

    const params = useParams();
    const { Formik } = formik;
    const queryClient = useQueryClient();
    const user = useSelector(state => state.user);

    const [showComment, setShowComment] = useState(false);

    const schema = yup.object().shape({
        content: yup.string().required('không được để trống'),
    });

    // query
    const dataComment = useQuery({
        queryKey: ['forum_comment', params.id],
        queryFn: async () => {
            return await GetForumCommentService(params.id);
        },
        enabled: !!params.id,
        keepPreviousData: true,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            console.error('Error fetching player data:', error);
        },
    })

    //modal
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);

    // mutations
    const mutationCommentForum = useMutation({
        mutationFn: async (newData) => {
            const response = await ReplyForumCommentService(newData.token, newData.id, newData.newData);
            return response;
        },
        onMutate: async (newData) => {
            await queryClient.cancelQueries('forum_comment');
            const previousValue = queryClient.getQueryData('forum_comment');
            queryClient.setQueryData('forum_detais', (old) => {
                return old;
            });
            return previousValue;
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
            setShowComment(false);
            queryClient.invalidateQueries('forum_comment');
        },
        onError: (error, newData) => {
            console.log(error);
        }
    })


    return (
        <>
            <div className='CommentForum'>
                <div className='CommentForum__ReplyComment' >
                    <Button onClick={handleShowComment} >Bình luận</Button>
                </div>
                {!dataComment?.isLoading ? (
                    dataComment?.data?.post.map((item, index) => (

                        <div key={index} className='CommentForum_Hold'>
                            <div className='CommentForum_Hold__Container'>
                                <div className='CommentForum_Hold__Container__info'>
                                    {(() => {
                                        switch (item.avartar) {
                                            case '0':
                                                return <Image src={traidat} width={50} />
                                            case '1':
                                                return <Image src={namec} width={50} />

                                            case '2':
                                                return <Image src={xayda} width={50} />
                                            default:
                                                return <Image src={AdminRose} width={50} />
                                        }
                                    })()}
                                    <span>{item.name}</span>
                                </div>
                                <div className='CommentForum_Hold__Container__content'>
                                    <span>{CustomTimeAgo(item.createdAt)}</span>
                                    <div className='CommentForum_Hold__Container__content--main'>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '60px', fontSize: '2.6rem' }}><ImReply /></div>
                        </div>
                    ))
                ) : <div>Loading...</div>}
            </div>

            {/* modal */}
            <Modal className='ModalForm' show={showComment} onHide={handleCloseComment}>
                <div className='ModalContent'>
                    <Image width={'70%'} src={logo} alt='logo' />
                    <Formik
                        validationSchema={schema}
                        onSubmit={async (values) => {


                            mutationCommentForum.mutateAsync({
                                token: user?.accset_Token,
                                id: user?.user.id,
                                newData: {
                                    name: user?.player?.name,
                                    content: values.content,
                                    forumId: params.id,
                                    avartar: user?.user.is_admin ? 4 : user?.player.gender
                                }
                            })
                            console.log(values);


                        }}
                        initialValues={{
                            content: '',
                        }}

                    >
                        {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (

                            <Form className='ModalForm_valid' noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="Content">
                                    <Form.Control
                                        value={values.content}
                                        onChange={handleChange} name='content'
                                        as={'textarea'}
                                        placeholder="Nhập tiêu đề"
                                        isValid={touched.content && !errors.content}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="content" component="div" />

                                </Form.Group>

                                <div className='ModalForm_valid_button'>
                                    <Button variant="primary" type="submit">
                                        Trả Lời
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

export default CommentForumComponent;