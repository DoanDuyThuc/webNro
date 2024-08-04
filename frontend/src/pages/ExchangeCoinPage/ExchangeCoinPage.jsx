
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineRetweet } from "react-icons/ai";
import { useMutation, useQueryClient } from 'react-query';
import './ExchangeCoinPage.scss';
import { useState } from 'react';
import { ExchangeCoinService } from '../../services/AccountService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ExchangeCoinPage() {

    const exchangeItem = [
        {
            coin: 10000,
            vnd: 50
        },
        {
            coin: 20000,
            vnd: 100
        },
        {
            coin: 50000,
            vnd: 250
        },
        {
            coin: 100000,
            vnd: 500
        },
        {
            coin: 200000,
            vnd: 1000
        },
        {
            coin: 500000,
            vnd: 2500
        },
        {
            coin: 1000000,
            vnd: 5000
        },
        {
            coin: 3000000,
            vnd: 15000
        },
        {
            coin: 5000000,
            vnd: 25000
        },
    ]

    const queryClient = useQueryClient();

    //mutations
    const mutation = useMutation({
        mutationFn: async (newTodo) => {
            const resj = await ExchangeCoinService(newTodo.token, newTodo.id, newTodo.data);
            return resj
        },
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
        }
    })


    const [selectedItem, setSelectedItem] = useState({});
    const user = useSelector(state => state.user);

    const handleSelectItem = (e, item) => {
        const previouslySelectedItem = document.querySelector('.ExchangeCoinPage__content__list--item .selected');

        if (previouslySelectedItem) {
            previouslySelectedItem.classList.remove('selected');
        }
        const Item = e.target.closest('.ExchangeCoinPage__content__list--item div');

        if (Item) {
            Item.classList.toggle('selected');
            setSelectedItem(item)
        }

    }

    const handleSubmitExchange = () => {

        mutation.mutate({
            token: user?.accset_Token,
            id: user?.user?.id,
            data: selectedItem
        })
    }



    return (

        <div className='ExchangeCoinPage'>
            <h4>Đổi Coin</h4>
            <div className='ExchangeCoinPage__content'>
                <div className='ExchangeCoinPage__content__list'>
                    <Row>
                        {exchangeItem.map((item, index) => (
                            <Col onClick={(e) => handleSelectItem(e, item)} key={index} md={4} className='ExchangeCoinPage__content__list--item' xs={4}>
                                <div className={selectedItem === item.coin ? `selected` : ''}>
                                    <h4>{item.coin} Coin</h4>
                                    <AiOutlineRetweet />
                                    <h4>{item.vnd} Vnd</h4>
                                </div>
                            </Col>
                        ))}
                    </Row>

                </div>
                <button onClick={handleSubmitExchange} className='ExchangeCoinPage__content--btn'>Đổi Ngay</button>
            </div>
        </div>
    );
}

export default ExchangeCoinPage;