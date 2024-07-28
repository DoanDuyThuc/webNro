const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');

const ConfigViewEngine = (app) => {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    //cookier parser
    app.use(cookieParser())

    // morgan để ghi lại log của các yêu cầu HTTP
    app.use(morgan('dev'));

    // Cấu hình CORS(Cross-Origin Resource Sharing) 
    app.use(cors());

    // Middleware để làm sạch dữ liệu đầu vào để chống XSS
    app.use(xss());

    // Middleware helmet để thiết lập các tiêu đề HTTP bảo mật
    app.use(helmet());

}

module.exports = ConfigViewEngine;