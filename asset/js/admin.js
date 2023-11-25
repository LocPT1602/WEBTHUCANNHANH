document.addEventListener("DOMContentLoaded", function () {
    var sidebarItems = document.querySelectorAll(".admin-navbar_left ul li");
    var namePage = document.getElementsByClassName('name_list')
    var dashBoard=document.getElementById('dashboard')
    var productManage = document.getElementById('container_admin');
    var orderHistory=document.getElementById('order-history-container')
    var totalSale=document.getElementById('total_sale')
    var currentNavItemContent = document.getElementsByClassName('name')[0]

    var currentSelected = dashBoard;

    sidebarItems.forEach(function (item) {
        item.addEventListener("click", function () {
            var targetValue = item.getAttribute("data-target");


            // Gán nội dung của thẻ a vào biến


            // Ẩn thẻ cũ nếu có
            if (currentSelected) {
                
                currentSelected.style.display = 'none';

            }
            

            switch (targetValue) {
        
                case "home":
                    currentNavItemContent.textContent = namePage[0].textContent;
                    dashBoard.style.display= 'block';
                    currentSelected = dashBoard;
                    break;
                case "product":
                    productManage.style.display = 'block';
                    currentSelected = productManage;
                    currentNavItemContent.textContent = namePage[1].textContent;
                    break;
                case "manageOrders":
                    orderHistory.style.display='block'
                    currentNavItemContent.textContent = namePage[2].textContent;
                    currentSelected =orderHistory
                    break;
                case "businessStats":
                    totalSale.style.display='block'
                    currentNavItemContent.textContent = namePage[3].textContent;
                    currentSelected=totalSale
                    break;
                // Thêm các case khác tương ứng với các mục trong nav left
                default:
                    
                    break;
            }
        });
    });
});
var addBtn = document.getElementsByClassName('icon_add_item')[0];
var addForm = document.getElementById('add_form');
// var imgInput = document.getElementById('img_input');
// var nameInput = document.getElementsByClassName('nameInput')[0];
// var describeInput = document.getElementsByClassName('describeInput')[0];
// var priceInput = document.getElementsByClassName('priceInput')[0];
// var saveBtn = document.getElementsByClassName('save')[0]

function openAddItem() {
    addForm.style.display = 'block';
}

addBtn.addEventListener('click', openAddItem);



//  đăng xuất admin
var logoutAdmin=document.getElementsByClassName('ti-power-off')
function logoutAdminFct(){
    localStorage.removeItem('loggedInAccount');
    document.getElementById('end-user').style.display='block'
    document.getElementsByClassName('admin-container')[0].style.display='none'
    
    return;
}

//đơn hàng đã đặt

// Lấy danh sách đơn hàng từ Local Storage
// Bạn có thể thêm mã JavaScript sau vào mã của bạn

// Lấy danh sách đơn hàng từ Local Storage
function renderOrderHistoryView() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderHistoryContainer = document.getElementById('order-history-container');

    if (orders.length > 0) {
        let orderHtml = '<h2>Đơn Hàng Đã Đặt</h2>';

        orders.forEach((order, index) => {
            orderHtml += `<div class="order" id="order-${index}">
                <div class="ti-arrow-circle-down" onclick="toggleOrder(${index})"></div>
                <h3>Đơn Hàng #${order.orderCode}</h3>
                <p><strong>Tên:</strong> ${order.personalInfo.name}</p>
                <p><strong>Số Điện Thoại:</strong> ${order.personalInfo.phone}</p>
                <p><strong>Địa Chỉ:</strong> ${order.personalInfo.address}</p>
                <h4>Chi Tiết Đơn Hàng:</h4>
                <ul>`;

            order.cartItems.forEach(item => {
                orderHtml += `<li>${item.productInfo.name} - ${item.productInfo.count} - ${item.productInfo.price * item.productInfo.count}đ</li>`;
            });

            orderHtml += `</ul></div>`;
        });

        orderHistoryContainer.innerHTML = orderHtml;
    } else {
        orderHistoryContainer.innerHTML = '<p>Không có đơn hàng nào.</p>';
    }
}

function toggleOrder(index) {
    const orderElement = document.getElementById(`order-${index}`);
    orderElement.classList.toggle('open_order');
}

var order_admin = document.querySelectorAll('.order')
var btnOderAdmin= document.querySelectorAll('.ti-arrow-circle-down')


// hàm hiển thị ở bản điều khiển





