

import { useState } from 'react';
import './AdminForumPage.scss';
import { Button, Container, Form, Image, InputGroup, Modal, Pagination, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import parser from 'html-react-parser';
import logo from '../../public/images/logo.png';
import { DeleteAllForumPostService, DeleteforumPostService, EditForumService, GetAllPostService } from '../../services/AccountService';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CKEditor } from '@ckeditor/ckeditor5-react';

function AdminForumPage() {

    const [users, setUsers] = useState([
        { id: 1, name: 'John', title: 'Doe', content: 'john@example.com' },
        { id: 2, name: 'Mary', title: 'Moe', content: 'mary@example.com' },
        { id: 3, name: 'July', title: 'Dooley', content: 'july@example.com' },
        // Thêm nhiều người dùng khác nếu cần
    ]);

    const user = useSelector(state => state.user);
    const queryClient = useQueryClient();
    const { Formik } = formik;

    const schema = yup.object().shape({
        title: yup.string().required('không được để trống'),
        content: yup.string().required('không được để trống'),
    });

    //state
    const [showEditAdmin, setShowEditAdmin] = useState(false);
    const [initialEditAdmin, setInitialEditAdmin] = useState({
        id: '',
        title: '',
        content: '',
    });
    const [selectedForum, setSelectedForums] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchForum, setSearchForum] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // queryes
    const dataForum = useQuery({
        queryKey: ['all-forum', user?.accset_Token, searchForum, page, limit],
        queryFn: async ({ queryKey }) => {
            const [_key, token, searchForum, page, limit] = queryKey;
            const response = await GetAllPostService(token, searchForum, page, limit);
            return response;
        },
        enabled: !!user?.accset_Token,
        onSuccess: (data) => {
            setTotalPages(data?.totalPage);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    //mutations
    const mutationDeleteForum = useMutation({
        mutationFn: async (id) => {
            const response = await DeleteforumPostService(id);
            return response;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries('all-forum');
            const previousForums = queryClient.getQueryData('all-forum');
            queryClient.setQueryData('all-forum', (old) => {
                return old;
            });
            return { previousForums };
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
        },
        onError: (error) => {
            console.log('error', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries('all-forum');
        }
    });


    const mutationUpdateForum = useMutation({
        mutationFn: async (Data) => {
            const response = await EditForumService(Data.id, Data.newData);
            return response;
        },
        onMutate: async (data) => {
            await queryClient.cancelQueries('all-forum');
            const previousForums = queryClient.getQueryData('all-forum');
            queryClient.setQueryData('all-forum', (old) => {
                return old;
            });
            return { previousForums };
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
        },
        onError: (error) => {
            console.log('error', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries('all-forum');
            setShowEditAdmin(false);
        }
    });

    const mutationDeleteAllForum = useMutation({
        mutationFn: async (Data) => {
            const response = await DeleteAllForumPostService(Data.token, Data.data);
            return response;
        },
        onMutate: async () => {
            await queryClient.cancelQueries('all-forum');
            const previousForums = queryClient.getQueryData('all-forum');
            queryClient.setQueryData('all-forum', (old) => {
                return old;
            });
            return { previousForums };
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
        },
        onError: (error) => {
            console.log('error', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries('all-forum');
        }
    })

    // Checkbox logic
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedForums(dataForum?.data?.post.map(forum => forum.id));
        } else {
            setSelectedForums([]);
        }
    };

    const handleSelectForum = (e, forumId) => {
        if (e.target.checked) {
            setSelectedForums([...selectedForum, forumId]);
        } else {
            setSelectedForums(selectedForum.filter(id => id !== forumId));
        }
    };

    const handleSearchForum = () => {
        setSearchForum(searchTerm);
        setPage(1);
    };

    const handleDeleteForum = (id) => {
        mutationDeleteForum.mutate(id);
    }

    //modal
    const handleCloseEditAdmin = () => setShowEditAdmin(false);
    const handleShowEditAdmin = (forum) => {
        setShowEditAdmin(true);
        setInitialEditAdmin({
            id: forum.id,
            title: forum.title,
            content: parser(forum.content),
        });
    };

    const handleDeleteSelected = () => {
        mutationDeleteAllForum.mutateAsync({
            token: user?.accset_Token,
            data: selectedForum
        });
    }

    //pagination
    const handlePageChange = (page) => {
        setPage(page);
    }

    return (

        <>
            <div className='AdminForumPage'>
                <Container className='AdminUserPage__container'>
                    <h2>Quản lý bài viết </h2>
                    <Button style={{ marginBottom: '10px' }} variant="danger"
                        onClick={handleDeleteSelected}
                        disabled={selectedForum.length === 0}>
                        Xóa đã chọn
                    </Button>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type='text'
                            placeholder="Tìm kiếm các bài viết"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchForum()}
                        />
                        <Button
                            onClick={handleSearchForum}
                            variant="success" id="button-addon2">Tìm kiếm</Button>
                    </InputGroup>

                    <Table className='table-dark' striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedForum.length === dataForum?.data?.post.length}
                                    />
                                </th>

                                <th>#</th>
                                <th>Name</th>
                                <th>Tiêu đề</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataForum?.data?.post.length < 1 ? (
                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={9}>Không có dữ liệu</td>
                                </tr>
                            ) : dataForum?.data?.post.map((forums, index) => (
                                <tr key={forums.id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handleSelectForum(e, forums.id)}
                                            checked={selectedForum.includes(forums.id)}
                                            disabled={user?.user.username === forums.username ? true : false}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{forums.name}</td>
                                    <td>{forums.title}</td>

                                    <td style={{ display: 'flex', gap: 10 }} >
                                        <button disabled={user?.user.username === forums.username ? true : false}
                                            onClick={() => handleDeleteForum(forums.id)}
                                            className='btn btn-danger'>Xóa</button>
                                        <button disabled={user?.user.username === forums.username ? true : false}
                                            onClick={() => handleShowEditAdmin(forums)}
                                            className='btn btn-warning'>Sửa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                <div className='ForumDiscuss__panigate'>
                    <Pagination>
                        <Pagination.Prev onClick={() => {
                            if (page > 1) {
                                handlePageChange(page - 1);
                            }
                        }} />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item key={i} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => {
                            if (page < totalPages) {
                                handlePageChange(page + 1);
                            }
                        }} />
                    </Pagination>
                </div>
            </div>

            {/* modal */}
            <Modal Modal className='ModalForm' show={showEditAdmin} onHide={handleCloseEditAdmin} >
                <div className='ModalContent'>
                    <Image width={'70%'} src={logo} alt='logo' />
                    <Formik
                        validationSchema={schema}
                        onSubmit={async (values) => {
                            mutationUpdateForum.mutateAsync({
                                id: values.id,
                                newData: { title: values.title, content: values.content }
                            });

                        }}
                        initialValues={initialEditAdmin}

                    >
                        {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (

                            <Form className='ModalForm_valid' noValidate onSubmit={handleSubmit}>
                                {/* ẩn */}
                                <Form.Group className="mb-3" controlId="Id">
                                    <Form.Control
                                        value={values.id}
                                        onChange={handleChange} name='id'
                                        type='hidden'
                                        placeholder="Nhập tiêu đề"
                                        isValid={touched.id && !errors.id}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="id" component="div" />

                                </Form.Group>
                                {/* hiện */}

                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Control
                                        value={values.title}
                                        onChange={handleChange} name='title'
                                        type='text'
                                        placeholder="sửa title user"
                                        isValid={touched.title && !errors.title}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="title" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Content">

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
                                    <formik.ErrorMessage className='errorMForm' name="content" component="div" />
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

export default AdminForumPage;