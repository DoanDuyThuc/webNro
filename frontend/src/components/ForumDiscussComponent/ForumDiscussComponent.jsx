
import Image from 'react-bootstrap/Image';
import namec from '../../public/images/namec.png';
import xayda from '../../public/images/xayda.png';
import traidat from '../../public/images/traidat.png';
import AdminRose from '../../public/images/adminRose.png';
import Pagination from 'react-bootstrap/Pagination';

import './ForumDiscussComponent.scss';
import { NavLink } from 'react-router-dom';
import { GetPostForumDicussService } from '../../services/AccountService';
import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

function ForumDiscussComponent() {

    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    //data fetch
    const fetchForum = async ({ queryKey }) => {
        const [_key, { page, limit }] = queryKey;
        const dataForum = await GetPostForumDicussService(page, limit);
        return dataForum;
    };

    const data = useQuery({
        queryKey: ['forum_discuss', { page, limit }],
        queryFn: fetchForum,
        keepPreviousData: true,
        onSuccess: (data) => {
            setTotalPages(data?.totalPage);
        },
        onError: (error) => {
            console.error('Error fetching player data:', error);
        },
    });

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className='ForumDiscuss'>
            <h5 className='ForumNotify__Header'>Những Lời Đàm Tiếu</h5>

            {data?.data?.post.length > 0 ? (
                !data.isLoading ? (data?.data?.post.map((item, index) => (
                    <div key={index} className='ForumDiscuss__content'>
                        {(() => {
                            switch (item?.avartar) {
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
                        <div className='ForumDiscuss__content__title'>
                            <h4>
                                <NavLink to={`/forum/discuss/${item.id}`}>{item.title}</NavLink>
                            </h4>
                            <span>
                                Đăng bởi: {item.name}
                            </span>
                        </div>
                    </div>
                ))) : 'Loading...'
            ) : (
                <div style={{
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                }}>
                    Không có bài viết
                </div>
            )}
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
    );
}

export default ForumDiscussComponent;