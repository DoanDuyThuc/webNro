
import { useState } from 'react';
import './AdminUserPage.scss';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Container, Table, Form, Button, Image, InputGroup, Pagination } from 'react-bootstrap';
import { DeleteAllUserService, DeleteUserService, GetAllUserService, UpdateUserService } from '../../services/AccountService';
import logo from '../../public/images/logo.png';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import Modal from 'react-bootstrap/Modal';

function AdminUserPage() {
    const user = useSelector(state => state.user);
    const queryClient = useQueryClient();
    const { Formik } = formik;

    const [showEditAdmin, setShowEditAdmin] = useState(false);
    const [initialEditAdmin, setInitialEditAdmin] = useState({
        username: '',
        coin: '',
        vnd: '',
        tongnap: '',
        active: ''
    });
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    //panigate
    const [page, setPageUser] = useState(1);
    const [limit, setLimitUser] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const schema = yup.object().shape({
        username: yup.string().required('không được để trống'),
        coin: yup.number().required('không được để trống'),
        vnd: yup.number().required('không được để trống'),
        tongnap: yup.number().required('không được để trống'),
        active: yup.string().required('không được để trống'),
        is_admin: yup.string().required('không được để trống'),

    });

    // query
    const dataUsers = useQuery({
        queryKey: ['all-users', user?.accset_Token, user?.user.id, searchUser, page, limit],
        queryFn: async ({ queryKey }) => {
            const [, token, userId, search, currentPage, currentLimit] = queryKey;
            const response = await GetAllUserService(token, userId, search, currentPage, currentLimit);
            return response;
        },
        enabled: !!user && !!user?.accset_Token && !!user?.user.id,
        onSuccess: (data) => {
            setTotalPages(data?.totalPage);
        },
        onError: (error) => {
            console.log('error', error);
        }
    });


    //mutations
    const mutationDeleteUser = useMutation({
        mutationFn: async (Data) => {
            const response = await DeleteUserService(Data.token, Data.id, Data.userId);
            return response;
        },
        onMutate: async (Data) => {
            await queryClient.cancelQueries('all-users');
            const previousValue = queryClient.getQueryData('all-users');
            queryClient.setQueryData('all-users', (old) => {
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
        },
        onSettled: () => {
            queryClient.invalidateQueries('all-users');

        },
        onError: (error) => {
            console.log('error', error);
        }
    })

    const mutationDeleteAllUser = useMutation({
        mutationFn: async (Data) => {
            const response = await DeleteAllUserService(Data.token, Data.id, Data.data);
            return response;
        },
        onMutate: async (Data) => {
            await queryClient.cancelQueries('all-users');
            const previousValue = queryClient.getQueryData('all-users');
            queryClient.setQueryData('all-users', (old) => {
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
        },
        onSettled: () => {
            queryClient.invalidateQueries('all-users');
        },
        onError: (error) => {
            console.log('error', error);
        }
    })

    const mutationUpdateUser = useMutation({
        mutationFn: async (Data) => {
            const response = await UpdateUserService(Data.token, Data.id, Data.newData, Data.userId);
            return response;
        },
        onMutate: async (Data) => {
            await queryClient.cancelQueries('all-users');
            const previousValue = queryClient.getQueryData('all-users');
            queryClient.setQueryData('all-users', (old) => {
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

        },
        onSettled: () => {
            queryClient.invalidateQueries('all-users');
            setShowEditAdmin(false);
        },
        onError: (error) => {
            console.log('error', error);
        }
    })

    // Checkbox logic
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const currentUserId = user?.user?.id;
            const filteredUsers = dataUsers?.data?.user?.filter(user => user.id !== currentUserId);
            setSelectedUsers(filteredUsers.map(user => user.id))
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (e, userId) => {
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleDeleteUser = async (userId) => {
        mutationDeleteUser.mutateAsync({
            token: user?.accset_Token,
            id: user?.user.id,
            userId: userId
        })
        setSelectedUsers([]);
    };

    const handleDeleteSelected = async () => {
        mutationDeleteAllUser.mutateAsync({
            token: user?.accset_Token,
            id: user?.user.id,
            data: selectedUsers
        })

        setSelectedUsers([]);
    }

    //modal
    const handleCloseEditAdmin = () => setShowEditAdmin(false);
    const handleShowEditAdmin = (user) => {
        setShowEditAdmin(true);
        setInitialEditAdmin({
            username: user.username,
            coin: user.coin,
            vnd: user.vnd,
            tongnap: user.tongnap,
            active: user.active,
            is_admin: user.is_admin,
            id: user.id
        });
    };

    const handleSearchUser = async () => {
        setSearchUser(searchTerm);
        setPageUser(1);
    };

    //panigate
    const handlePageChange = (page) => {
        setPageUser(page);

    }

    return (

        <>
            <div className='AdminUserPage'>
                <Container className='AdminUserPage__container'>
                    <h2>Quản lý user</h2>
                    <Button style={{ marginBottom: '10px' }} variant="danger"
                        onClick={handleDeleteSelected}
                        disabled={selectedUsers.length === 0}>
                        Xóa đã chọn
                    </Button>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type='text'
                            placeholder="Tìm kiếm user"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchUser()}
                        />
                        <Button onClick={handleSearchUser} variant="success" id="button-addon2">Tìm kiếm</Button>
                    </InputGroup>

                    <Table className='table-dark' striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedUsers.length === dataUsers?.data?.user?.length - 1}
                                    />
                                </th>

                                <th>#</th>
                                <th>Username</th>
                                <th>Coin</th>
                                <th>Vnd</th>
                                <th>Tổng nạp</th>
                                <th>Mở Thành Viên</th>
                                <th>IsAdmin</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUsers?.data?.user?.length < 1 ? (
                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={9}>Không có dữ liệu</td>
                                </tr>
                            ) : dataUsers?.data?.user.map((users, index) => (
                                <tr key={users.id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handleSelectUser(e, users.id)}
                                            checked={selectedUsers.includes(users.id)}
                                            disabled={user?.user.username === users.username ? true : false}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{users.username}</td>
                                    <td>{users.coin}</td>
                                    <td>{users.vnd}</td>
                                    <td>{users.tongnap}</td>
                                    <td>{users.active ? 'Đã Mở' : 'Chưa mở'}</td>
                                    <td>{users.is_admin ? 'Admin' : 'Người chơi'}</td>
                                    <td style={{ display: 'flex', gap: 10 }} >
                                        <button disabled={user?.user.username === users.username ? true : false} onClick={() => handleDeleteUser(users.id)} className='btn btn-danger'>Xóa</button>
                                        <button disabled={user?.user.username === users.username ? true : false} onClick={() => handleShowEditAdmin(users)} className='btn btn-warning'>Sửa</button>
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
            <Modal className='ModalForm' show={showEditAdmin} onHide={handleCloseEditAdmin}>
                <div className='ModalContent'>
                    <Image width={'70%'} src={logo} alt='logo' />
                    <Formik
                        validationSchema={schema}
                        onSubmit={async (values) => {
                            mutationUpdateUser.mutateAsync({
                                token: user?.accset_Token,
                                id: user?.user.id,
                                userId: values.id,
                                newData: {
                                    username: values.username,
                                    coin: values.coin,
                                    vnd: values.vnd,
                                    tongnap: values.tongnap,
                                    active: values.active,
                                    is_admin: values.is_admin,
                                }
                            })
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
                                <Form.Group className="mb-3" controlId="UserName">
                                    <Form.Control
                                        value={values.username}
                                        onChange={handleChange} name='username'
                                        type='text'
                                        placeholder="Sửa tên user"
                                        isValid={touched.username && !errors.username}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="username" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Coin">
                                    <Form.Control
                                        value={values.coin}
                                        onChange={handleChange} name='coin'
                                        type='number'
                                        placeholder="sửa coin user"
                                        isValid={touched.coin && !errors.coin}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="coin" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Vnd">
                                    <Form.Control
                                        value={values.vnd}
                                        onChange={handleChange} name='vnd'
                                        type='number'
                                        placeholder="Sửa vnd user"
                                        isValid={touched.vnd && !errors.vnd}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="vnd" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Tongnap">
                                    <Form.Control
                                        value={values.tongnap}
                                        onChange={handleChange} name='tongnap'
                                        type='number'
                                        placeholder="Sửa tổng số tiền đã nạp"
                                        isValid={touched.tongnap && !errors.tongnap}
                                    />
                                    <formik.ErrorMessage className='errorMForm' name="tongnap" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Active">
                                    <Form.Select
                                        value={values.active}
                                        onChange={(e) => setFieldValue('active', e.target.value)}
                                        name='active'
                                        as={'select'}
                                        placeholder="Nhập tiêu đề"
                                        isValid={touched.active && !errors.active}
                                    >
                                        <option value="0">Chưa kích hoạt</option>
                                        <option value="1">Đã kích hoạt</option>
                                    </Form.Select>
                                    <formik.ErrorMessage className='errorMForm' name="active" component="div" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Active">
                                    <Form.Select
                                        value={values.is_admin}
                                        onChange={(e) => setFieldValue('is_admin', e.target.value)}
                                        name='is_admin'
                                        as={'select'}
                                        placeholder="Nhập tiêu đề"
                                        isValid={touched.is_admin && !errors.is_admin}
                                    >
                                        <option value={true}>Admin</option>
                                        <option value={false}>Người chơi</option>
                                    </Form.Select>
                                    <formik.ErrorMessage className='errorMForm' name="is_admin" component="div" />

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

export default AdminUserPage;