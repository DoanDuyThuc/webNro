
import { Button, Container, Form, InputGroup, Pagination, Table } from 'react-bootstrap';
import './AdminForumCommentPage.scss';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';
import { DeleteCommentService, GetAllCommentService } from '../../services/AccountService';


function AdminForumCommentPage() {

    const user = useSelector(state => state.user);

    const queryClient = useQueryClient();
    const { Formik } = formik;

    const comments = [
        {
            id: 1,
            username: 'admin',
            content: 'Bài viết hay quá',
            date: '2021-09-10'
        },
        {
            id: 2,
            username: 'admin',
            content: 'Bài viết hay quá',
            date: '2021-09-10'
        }
    ]

    //usetState
    const [selectedComments, setSelectedComments] = useState([]);
    const [searchComment, setSearchComment] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPageComment] = useState(1);
    const [limit, setLimitComment] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    //query
    const dataComments = useQuery({
        queryKey: ['all-comments', searchComment, page, limit],
        queryFn: async ({ queryKey }) => {
            const [_key, searchComment, page, limit] = queryKey;
            const response = await GetAllCommentService(searchComment, page, limit);
            return response;
        },
        onSuccess: (data) => {
            setTotalPages(data.totalPages);
        },
        onError: (error) => {
            console.log(error)
        }
    });

    // mutations
    const mutationDeleteComment = useMutation({
        mutationFn: async (Data) => {
            const response = await DeleteCommentService(Data.token, Data.data);
            return response;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries('all-comments');
            const previousComments = queryClient.getQueryData('all-comments');
            queryClient.setQueryData('all-comments', (old) => {
                return old;
            });
            return { previousComments };
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
            queryClient.invalidateQueries('all-comments');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    // Checkbox logic
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedComments(dataComments?.data?.comment.map(comment => comment.id));
        } else {
            setSelectedComments([]);
        }
    };

    const handleSelectComments = (e, CommentId) => {
        if (e.target.checked) {
            setSelectedComments([...selectedComments, CommentId]);
        } else {
            setSelectedComments(selectedComments.filter(id => id !== CommentId));
        }
    };


    const handleSearchComment = async () => {
        setSearchComment(searchTerm);
        setPageComment(1);
    };

    const handleDeleteComment = async (id) => {

        mutationDeleteComment.mutateAsync({
            token: user?.accset_Token,
            data: id
        });
    }

    const handleDeleteSelected = async () => {
        mutationDeleteComment.mutateAsync({
            token: user?.accset_Token,
            data: selectedComments
        });
    }

    const handlePageChange = (newPage) => {
        setPageComment(newPage);
    }

    return (

        <>
            <div className='AdminForumCommentPage'>
                <Container className='AdminUserPage__container'>
                    <h2>Quản lý Comments</h2>
                    <Button style={{ marginBottom: '10px' }} variant="danger"
                        onClick={handleDeleteSelected}
                        disabled={selectedComments.length === 0}
                    >
                        Xóa đã chọn
                    </Button>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type='text'
                            placeholder="Tìm kiếm theo nội dung bình luận"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchComment()}
                        />
                        <Button
                            onClick={handleSearchComment}
                            variant="success" id="button-addon2">Tìm kiếm</Button>
                    </InputGroup>

                    <Table className='table-dark' striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Form.Check
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedComments.length === dataComments?.data?.comment.length}
                                    />
                                </th>

                                <th>#</th>
                                <th>Chủ bài</th>
                                <th>Tiêu đề</th>
                                <th>Tên người bình luận</th>
                                <th>Nội dung bình luận</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataComments?.data?.comment.length < 1 ? (
                                <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={9}>Không có dữ liệu</td>
                                </tr>
                            ) : dataComments?.data?.comment.map((comments, index) => (
                                <tr key={comments.id}>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handleSelectComments(e, comments.id)}
                                            checked={selectedComments.includes(comments.id)}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{comments.Forum.name}</td>
                                    <td>{comments.Forum.title}</td>
                                    <td>{comments.name}</td>
                                    <td>{comments.content}</td>
                                    <td style={{ display: 'flex', gap: 10 }} >
                                        <button
                                            onClick={() => handleDeleteComment(comments.id)}
                                            className='btn btn-danger'>Xóa
                                        </button>

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
        </>
    );
}

export default AdminForumCommentPage;