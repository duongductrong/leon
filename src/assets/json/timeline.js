import React from 'react';

export const timelinejson = [
    {
        title: "EDUCATION",
        item: [
            {
                currently: true,
                date: "2018 - 2021",
                name: "Student of Ton Duc Thang University",
                location: "TON DUC THANG UNIVERSITY . HCM City",
                description: "Hiện tại mình là sinh viên trường TÔN ĐỨC THẮNG UNIVERSITY - HỆ CAO ĐẲNG. Tại khóa 2018 sẽ tốt nghiệp vào đầu năm 2021"
            }
        ]
    },
    {
        title: "EXPERIENCE",
        item: [
            {
                currently: false,
                date: "NOV 2019 - DEC 2019",
                name: "[Project] XSKILL STORE - SHOES STORE",
                location: "https://reactjs-xskillstore.firebaseapp.com/",
                description: "XSKILL-STORE - SHOES STORE là một trang web bán hàng với sản phẩm là giày. Trang có một số chức năng cơ bản như ĐĂNG NHẬP, ĐĂNG KÝ TÀI KHOẢN ,ĐẶT HÀNG, CHỌN LỌC MẶT HÀNG theo xem trước ảnh của sản phẩm, phân trang, viết blog giới thiệu sản phẩm. Trang web cũng có giao diện quản lý, thống kê bài viết, sản phẩm, đơn hàng, ngoài ra cũng có thể chỉnh sửa và xóa các đối tượng.",
                using: (
                    <ul>
                        <li>Frontend: ReactJS</li>
                        <li>Backend: Nodejs - Expressjs</li> 
                        <li>Database: MongoDB atlas</li>
                    </ul>
                )
            },
            {
                currently: true,
                date: "FEB 2020",
                name: "[Project] Leon Blog - Blog cá nhân",
                location: `${window.location.origin}`,
                description: (<div>
                    Leon blog là trang web về chủ đề blog. Mục đích dùng để chia sẻ kiến thức mình học được lên trang, cũng như dịch các bài blog có kiến thức liên quan đến ngôn ngữ Javascript.
                    Leon blog được mình xây dựng kèm theo trang giao diện quản lý sử dụng thư viện UI/Ant.design. <br /> <br />
                    Sau khi làm sản phẩm này mình có học được một số kiến thức mới
                    như sử dụng UI/ant.design để xây dựng UI/UX tốt hơn, quản lý Form/thông tin người dùng nhập vào và validate giá trị trước khi gửi yêu cầu lên SERVER API để giảm
                    bớt lượng yêu cầu dư thừa, áp dụng thuật toán phân trang
                </div>),
                using: (
                    <ul>
                        <li>Frontend: ReactJS / SCSS-BEM</li>
                        <li>Backend: Nodejs - Expressjs</li> 
                        <li>Database: MongoDB atlas</li>
                    </ul>
                )
            }
        ]
    }
]