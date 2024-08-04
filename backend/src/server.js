const express = require('express')
const ConfigViewEngine = require('./config/viewEngine')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const router = require('./routes')
const connectDb = require('./config/connectDb')
const path = require('path');
require('dotenv').config()

//connet db
connectDb();

const app = express()

//config engine
// ConfigViewEngine(app)

// Cấu hình CORS(Cross-Origin Resource Sharing) 
app.use(cors({
  origin: 'http://localhost:3000', // Địa chỉ của frontend
  credentials: true // Để cho phép gửi cookie
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

//cookier parser
app.use(cookieParser())

// morgan để ghi lại log của các yêu cầu HTTP
app.use(morgan('dev'));

// Middleware để làm sạch dữ liệu đầu vào để chống XSS
app.use(xss());

// Middleware helmet để thiết lập các tiêu đề HTTP bảo mật
app.use(helmet());

// Sử dụng path.join để tạo đường dẫn tuyệt đối tới thư mục public/uploads
app.use('/public/uploads', express.static(path.join(__dirname, '../public/uploads')));

router(app);

const port = process.env.PORT || 3001


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})