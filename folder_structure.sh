/project-root
│
├── /backend # Thư mục Backend (FastAPI)
│ ├── /app
│ │ ├── /api # Các endpoint API
│ │ │ ├── video.py # Xử lý gọi video qua ZegoCloud
│ │ │ ├── subtitle.py # Xử lý chuyển âm thanh thành phụ đề
│ │ │ └── sign_lang.py # Xử lý hiển thị ngôn ngữ ký hiệu
│ │ ├── /models # Các mô hình tương tác với cơ sở dữ liệu
│ │ ├── /services # Dịch vụ kết nối và xử lý logic
│ │ │ ├── zegocloud_service.py # Dịch vụ gọi video
│ │ │ ├── whisper_service.py # Dịch vụ nhận diện giọng nói
│ │ │ └── sign_language_service.py # Dịch vụ hiển thị ký hiệu
│ │ ├── /config # Cấu hình chung
│ │ ├── /utils # Các tiện ích chung
│ │ └── main.py # Điểm vào của ứng dụng Backend
│ └── requirements.txt # Các thư viện phụ thuộc cho Backend
│
├── /frontend # Thư mục Frontend (NextJS)
│ ├── /components # Các thành phần React
│ │ ├── VideoCall.js # Giao diện gọi video
│ │ ├── Subtitle.js # Hiển thị phụ đề
│ │ └── SignLanguage.js # Hiển thị ngôn ngữ ký hiệu
│ ├── /pages # Các trang chính của ứng dụng
│ ├── /services # Các dịch vụ kết nối với Backend
│ │ ├── api.js # Gọi API từ Backend
│ ├── /styles # Các tệp CSS và Tailwind
│ ├── /utils # Các tiện ích chung
│ └── package.json # Thông tin và phụ thuộc của Frontend
│
├── /ai_models # Thư mục chứa mô hình AI
│ ├── whisper/ # Mô hình nhận diện giọng nói
│ └── sign_language/ # Mô hình tạo ngôn ngữ ký hiệu
│
├── /scripts # Các script hỗ trợ (CI/CD, Deploy,...)
│ ├── deploy.sh # Triển khai ứng dụng
│ ├── start_dev.sh # Khởi động ứng dụng cho môi trường phát triển
│ └── build_docker.sh # Tạo Docker image
│
├── /config # Cấu hình chung cho dự án
│ ├── .env # Biến môi trường
│ ├── zegocloud_config.py # Cấu hình ZegoCloud
│ ├── database.py # Cấu hình cơ sở dữ liệu
│ └── settings.py # Các cài đặt khác
│
├── /tests # Thư mục kiểm thử
│ ├── /backend_tests # Kiểm thử cho Backend
│ ├── /frontend_tests # Kiểm thử cho Frontend
│ └── /integration_tests # Kiểm thử tích hợp
│
└── README.md # Thông tin giới thiệu dự án
