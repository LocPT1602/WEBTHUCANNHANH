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
    const orderHistoryContainer = document.getElementById('order-history-content');

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
    } 
}



function toggleOrder(index) {
    const orderElement = document.getElementById(`order-${index}`);
    orderElement.classList.toggle('open_order');
}

var order_admin = document.querySelectorAll('.order')
var btnOderAdmin= document.querySelectorAll('.ti-arrow-circle-down')
// lọc đơn hàng theo ngày
function filterOrdersByDate() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const filteredOrders = filterOrdersByDateRange(startDate, endDate);

    renderFilteredOrders(filteredOrders);
}

function filterOrdersByDateRange(startDate, endDate) {
    return orders.filter(order => {
        const orderDate = new Date(order.personalInfo.deliveryTime);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
}

function renderFilteredOrders(filteredOrders) {
    const orderHistoryContainer = document.getElementById('order-history-content');

    if (filteredOrders.length > 0) {
        let orderHtml = '<h2>Đơn Hàng Đã Đặt</h2>';

        filteredOrders.forEach((order, index) => {
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
window.onload = function() {
    renderOrderHistoryView(); // Để hiển thị đơn hàng ban đầu
};


// hàm hiển thị ở bản điều khiển
// tính doanh thu
// Thêm tham số startDate và endDate để tính toán doanh thu trong khoảng thời gian cụ thể
// Hàm tính tổng doanh thu của đơn hàng
// function calculateOrderTotal(order) {
//     // Giả sử bạn có các trường 'quantity' và 'price' trong đối tượng đơn hàng
//     return order.quantity * order.price;
// }

// Hàm tính tổng số lượng sản phẩm từ một danh sách đơn hàng
function calculateTotalProducts(products) {
    return products.reduce((total, products) => {
        return total + products.quantity;
    }, 0);
}

// Hàm tính tổng số lượng đơn hàng từ một danh sách đơn hàng
function calculateTotalOrders(orders) {
    return orders.length;
}

// Hàm tính doanh thu tháng từ một danh sách đơn hàng
// Hàm tính tổng giá trị của một đơn hàng
function calculateOrderTotal(order) {
    return order.cartItems.reduce((total, item) => total + item.productInfo.price * item.count, 0);
}

// Hàm tính doanh thu tháng từ danh sách đơn hàng
function calculateMonthlyRevenue(orders) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const currentYear = currentDate.getFullYear();

    // Lọc danh sách đơn hàng theo tháng và năm hiện tại
    const monthlyOrders = orders.filter(order => {
        const orderDate = new Date(order.personalInfo.deliveryTime); 
        const orderMonth = orderDate.getMonth() + 1;
        const orderYear = orderDate.getFullYear();

        return orderMonth === currentMonth && orderYear === currentYear;
    });

    // Tính toán doanh thu từ danh sách đơn hàng của tháng hiện tại
    const monthlyRevenue = monthlyOrders.reduce((total, order) => {
        return total + calculateOrderTotal(order);
    }, 0);

    return monthlyRevenue;
}

// Sử dụng hàm calculateMonthlyRevenue với danh sách đơn hàng của bạn
// doanh thu tổng
// Hàm tính tổng doanh thu từ toàn bộ danh sách đơn hàng
function calculateTotalRevenue(orders) {
    // Sử dụng reduce để tính tổng doanh thu từ mỗi đơn hàng
    const totalRevenue = orders.reduce((total, order) => {
        return total + calculateOrderTotal(order);
    }, 0);

    return totalRevenue;
}





// Gọi các hàm và gán giá trị vào các thẻ HTML
const orders =JSON.parse(localStorage.getItem('orders')) || [];;
const totalProducts = calculateTotalProducts(products);
document.getElementById('sum_product').querySelector('.product_revenue').value = totalProducts || 0;

const totalOrders = calculateTotalOrders(orders);
document.getElementById('sum_order').querySelector('.order_revenue').value = totalOrders || 0;

const monthlyRevenue = calculateMonthlyRevenue(orders);
document.getElementById('month_sale').querySelector('.month_revenue').value = monthlyRevenue || 0;

const Revenue = calculateTotalRevenue(orders);
document.getElementById('revenueall').querySelector('.revenue').value = Revenue || 0;

// lọc doanh thu theo thời gian
function filterRevenue() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    // Lọc các đơn hàng trong khoảng thời gian được chọn
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.personalInfo.deliveryTime);
        return orderDate >= startDate && orderDate <= endDate;
    });

    // Tính tổng doanh thu từ các đơn hàng đã lọc
    const totalRevenuefilt = filteredOrders.reduce((total, order) => {
        return total + calculateOrderTotal(order)
    }, 0);

    // Hiển thị kết quả
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Doanh thu từ ${startDate.toISOString().split('T')[0]} đến ${endDate.toISOString().split('T')[0]}: ${totalRevenuefilt}`;
}






