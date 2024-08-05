


const timeAgo = (date) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now - then) / 1000);
    const interval = Math.floor(seconds / 60);

    if (interval < 1) return 'Vừa xong';
    if (interval < 60) return `${interval} phút trước`;
    if (interval < 1440) return `${Math.floor(interval / 60)} giờ trước`;
    if (interval < 43200) return `${Math.floor(interval / 1440)} ngày trước`;
    if (interval < 518400) return `${Math.floor(interval / 43200)} tháng trước`;
    return `${Math.floor(interval / 518400)} năm trước`;

};

const CustomTimeAgo = (date) => {
    const formattedTimeAgo = timeAgo(date);
    return formattedTimeAgo;
}

export default CustomTimeAgo;