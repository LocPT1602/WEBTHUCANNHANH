document.addEventListener("DOMContentLoaded", function () {
    var sidebarItems = document.querySelectorAll(".admin-navbar_left ul li");
    var namePage = document.getElementsByClassName('name_list')
    var dashBoard = document.getElementById('dashboard')
    var productManage = document.getElementById('container_admin');
    var manageUser=document.getElementById('manageUser')
    var orderHistory = document.getElementById('order-history-container')
    var totalSale = document.getElementById('total_sale')
    var currentNavItemContent = document.getElementsByClassName('name')[0]

    var currentSelected=dashBoard;

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
                    dashBoard.style.display = 'block';
                    currentSelected = dashBoard;
                    break;
                case "product":
                    productManage.style.display = 'block';
                    currentSelected = productManage;
                    currentNavItemContent.textContent = namePage[1].textContent;
                    break;
                case "manageUser":
                    manageUser.style.display = 'block';
                    currentSelected = manageUser;
                    currentNavItemContent.textContent = namePage[2].textContent;
                    break;    
                case "manageOrders":
                    orderHistory.style.display = 'block'
                    currentNavItemContent.textContent = namePage[3].textContent;
                    currentSelected = orderHistory
                    break;
                case "businessStats":
                    totalSale.style.display = 'block'
                    currentNavItemContent.textContent = namePage[4].textContent;
                    currentSelected = totalSale
                    break;
                // Thêm các case khác tương ứng với các mục trong nav left
                default:

                    break;
            }
        });
    });
});

function closeAddForm() {
    document.querySelector("#add_form").style = 'display: none';
    document.querySelector("#edit_form").style = 'display: none';

}

var saveBtnAdd = document.getElementsByClassName('save')[0];
saveBtnAdd.addEventListener('click', function () {

    validateAndSave()
    
    
    
   
    

});
function saveForm(){
    var addForm = document.getElementById('add_form');



    addForm.style.display = 'none'
    var product = addProduct();
    // addProductToAdminPage(product);
    
    renderAllProductsInAdmin()
    alert("đã thêm sản phẩm thành công, đang cập nhật lại trang")   
    
    window.location.reload()
}
var addBtn = document.getElementsByClassName('icon_add_item')[0];
var addForm = document.getElementById('add_form');
const currentDate = new Date();

// Lấy ô nhập ngày bắt đầu và ngày kết thúc
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

// Đặt giá trị mặc định cho ô nhập ngày bắt đầu là ngày 1/1/2023 và ngày kết thúc là ngày hiện tại
startDateInput.valueAsDate = new Date('2023-01-01');
endDateInput.valueAsDate = currentDate;

// Gọi hàm filterRevenue để tự động lọc doanh thu
filterRevenue();


function openAddItem() {
    addForm.style.display = 'block';
}

addBtn.addEventListener('click', openAddItem);



//  đăng xuất admin
var logoutAdmin = document.getElementsByClassName('ti-power-off')
function logoutAdminFct() {
    localStorage.removeItem('loggedInAccount');
    document.getElementById('end-user').style.display = 'block'
    document.getElementsByClassName('admin-container')[0].style.display = 'none'

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
                <h3 id="${index}">Đơn Hàng #${order.orderCode} </h3>
                <p><strong>Tên:</strong> ${order.personalInfo.name}</p>
                <p><strong>Số Điện Thoại:</strong> ${order.personalInfo.phone}</p>
                <p><strong>Địa Chỉ:</strong> ${order.personalInfo.address}</p>
                <p><strong>thời gian đặt hàng:</strong>${order.personalInfo.deliveryTime}</p>
                <p><strong>Trạng Thái:</strong> <span class="order-status">${order.status}</span></p>

                <h4>Chi Tiết Đơn Hàng:</h4>
                <ul>`
            
            order.cartItems.forEach(item => {
                orderHtml += `<li>${item.productInfo.name} - ${item.productInfo.count} - ${item.productInfo.price * item.productInfo.count}đ</li>`;
            });

            orderHtml += `</ul></div>`;
            if (order.status == 'Chưa xử lí') {
                orderHtml += `<button class="confirm-button" onclick="confirmOrder(${index})">Xác Nhận</button>`
            }
        });

        orderHistoryContainer.innerHTML = orderHtml;
        orders.forEach((order, index) => {
            if (order.status == 'Đã xử lí') {
                document.getElementById(`${index}`).style = 'background-color: green';
            }
        })

    }
}



function toggleOrder(index) {
    const orderElement = document.getElementById(`order-${index}`);
    orderElement.classList.toggle('open_order');
}
//xác nhận đơn hàng
function confirmOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Đặt trạng thái xác nhận cho đơn hàng
    orders[index].status = 'Đã xử lí';

    // Lưu lại danh sách đơn hàng đã cập nhật vào Local Storage
    localStorage.setItem('orders', JSON.stringify(orders));

    orders[index].cartItems.forEach(element => {
        products.forEach(product => {
            if (product.name == element.productInfo.name) {
                product.quantity = parseInt(product.quantity) - parseInt(element.productInfo.count)
            }
        })
    });
    localStorage.setItem('products', JSON.stringify(products));

    // Hiển thị lại danh sách đơn hàng
    renderOrderHistoryView();
    document.querySelector(`#${index}`).style = 'background-color: green';

}

var order_admin = document.querySelectorAll('.order')
var btnOderAdmin = document.querySelectorAll('.ti-arrow-circle-down')
// lọc đơn hàng theo ngày
function filterOrdersByDate() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const filteredOrders = filterOrdersByDateRange(startDate, endDate);

    renderFilteredOrders(filteredOrders);
    orders.forEach((order, index) => {
        if (order.status == 'Đã xử lí') {
            document.getElementById(`${index}`).style = 'background-color: green';
        }
    })
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
                <h3 id="${index}">Đơn Hàng #${order.orderCode}</h3>
                <p><strong>Tên:</strong> ${order.personalInfo.name}</p>
                <p><strong>Số Điện Thoại:</strong> ${order.personalInfo.phone}</p>
                <p><strong>Địa Chỉ:</strong> ${order.personalInfo.address}</p>
                <p><strong>thời gian đặt hàng:</strong>${order.personalInfo.deliveryTime}</p>
                <p><strong>Trạng Thái:</strong> <span class="order-status">${order.status}</span></p>
                <h4>Chi Tiết Đơn Hàng:</h4>
                <ul>`;

            order.cartItems.forEach(item => {
                orderHtml += `<li>${item.productInfo.name} - ${item.productInfo.count} - ${item.productInfo.price * item.productInfo.count}đ</li>`;
            
                if (order.status == 'Chưa xử lí') {
                orderHtml += `<button class="confirm-button" onclick="confirmOrder(${index})">Xác Nhận</button>`
            }
            });

            orderHtml += `</ul></div>`;
            orderHistoryContainer.innerHTML = orderHtml;
            
        });

    } else {
        orderHistoryContainer.innerHTML = '<p>Không có đơn hàng nào.</p>';
    }
}
window.onload = function () {
    renderOrderHistoryView(); // Để hiển thị đơn hàng ban đầu
};
// kết thúc lọc đơn hang theo ngày



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
    const monthlyRevenue = monthlyOrders.reduce((total, orders) => {
        
        return calculateOrderTotal(orders);
        
    }, 0);

    return monthlyRevenue;
    
}

// Gọi các hàm và gán giá trị vào các thẻ HTML
let orders = JSON.parse(localStorage.getItem('orders')) || [];
console.log(orders)
let totalProducts = calculateTotalProducts(products);
document.getElementById('sum_product').querySelector('.product_revenue').value = totalProducts || 0;

let totalOrders = calculateTotalOrders(orders);
document.getElementById('sum_order').querySelector('.order_revenue').value = totalOrders || 0;

let monthlyRevenue = calculateMonthlyRevenue(orders);




// tính tổng doanh thu chung
function calculateTotalRevenue(revenueByProductType) {
    // Tính tổng doanh thu chung từ tất cả các loại
    return Object.values(revenueByProductType)
        .reduce((acc, type) => acc + type.total, 0) || 0;
}

// tính tổng doang thu theo từng loại
function calculateRevenueByProductType(orders) {
    const revenueByProductType = {
        '0': { total: 0, products: [] }, // Loại 0
        '1': { total: 0, products: [] }, // Loại 1
        '2': { total: 0, products: [] }, // Loại 2
        '3': { total: 0, products: [] }  // Loại 3
    };

    orders.forEach(order => {
        if (order.status=="Đã xử lí") {
        order.cartItems.forEach(item => {
            const productType = item.productInfo.type;
            const productTotal = item.productInfo.price * item.productInfo.count;

            revenueByProductType[productType].total += productTotal;

            // Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
            const existingProduct = revenueByProductType[productType].products.find(p => p.name === item.productInfo.name);

            if (existingProduct) {
                // Nếu sản phẩm đã tồn tại, cập nhật tổng tiền
                existingProduct.total += productTotal;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
                revenueByProductType[productType].products.push({
                    name: item.productInfo.name,
                    total: productTotal
                });
            }
        });
    }
    });
    const totalRevenue = calculateTotalRevenue(revenueByProductType);
document.getElementById('revenueall').querySelector('.revenue').value = totalRevenue !== undefined ? totalRevenue : 0;
document.getElementById('month_sale').querySelector('.month_revenue').value = totalRevenue||0;

    return revenueByProductType;
}

// hiển thị doanh thu
function displayRevenueAndTotal(revenueByProductType) {
    const resultElement = document.getElementById("result");

    resultElement.innerHTML = `
    <h3 class="revenuetitle">Tổng doanh thu</h3>
        <input class="inputThongke" type="text" value="${calculateTotalRevenue(revenueByProductType)}">
        <h3 class="revenuetitle">Doanh thu theo loại sản phẩm</h3>
        <ul class="thongke">
            ${Object.entries(revenueByProductType)
                .map(([type, { total, products }]) => `
                    <li class="typeItem">
                        <label><i class="fa-solid fa-user-large"></i>${getProductTypeName(type)}</label>
                        <input class="inputThongke" type="text" value="${total}">
                        <ul>
                            ${products.map(product => `
                                <li class="li_product">
                                    ${product.name} - Tổng tiền: ${product.total}
                                </li>
                            `).join('')}
                        </ul>
                    </li>
                `).join('')}
        </ul>
        
        
    `;
    function getProductTypeName(type) {
        switch (type) {
            case '0':
                return 'Combo lẻ 1';
            case '1':
                return 'Combo nhóm';
            case '2':
                return 'Thức ăn';
            case '3':
                return 'Thức uống';
            default:
                return 'Unknown Type';
        }
    }
}


// Gọi hàm lọc doanh thu khi trang web được tải
function filterRevenue() {
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    // Lấy danh sách đơn hàng từ Local Storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Kiểm tra nếu danh sách đơn hàng không rỗng
    if (orders.length > 0) {
        // Lấy ngày đầu tiên trong danh sách đơn hàng
        const firstOrderDate = new Date(orders[0].personalInfo.deliveryTime);

        // Đặt ngày bắt đầu là ngày đầu tiên trong danh sách đơn hàng
        const startDate = startDateInput.value
            ? new Date(startDateInput.value)
            : firstOrderDate;
            startDate.setHours(0,0,0,0)

        const endDate = new Date(endDateInput.value);
        endDate.setHours(23,59,59,99)
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.personalInfo.deliveryTime);
            return orderDate >= startDate && orderDate <= endDate;
        });
        // console.log(startDate)
        // console.log(endDate)
        const revenueByProductType = calculateRevenueByProductType(filteredOrders);

        displayRevenueAndTotal(revenueByProductType);
    }
}





// trc khi lọc

// quản lý tài khoản

function accountDataManage() {
    const accountData = JSON.parse(localStorage.getItem('accountData'));
    const manageUserContainer = document.getElementById('userlist');
    let manageUserTemp = '<table class="userlistcontainer"><tr><th class="headerUserlist">STT</th><th class="headerUserlist">Họ tên khách hàng</th><th class="headerUserlist">Tên đăng nhập</th><th class="headerUserlist">Mật khẩu</th><th class="headerUserlist">Ngày đăng ký</th><th class="headerUserlist">Xóa</th></tr>';

    if (accountData.length > 0) {
        manageUserTemp += '<h2>danh sách tài khoản</h2>';
        for (let i = 1; i < accountData.length; i++) {
            manageUserTemp += `<tr>
                <td>${i}</td>
                <td>${accountData[i].fullName}</td>
                <td>${accountData[i].email}</td>
                <td>${accountData[i].password}</td>
                <td>${accountData[i].phoneNumber}</td>
                <td><button id="removeUser" onclick="removeUser(${i})">Xóa</button></td>
            </tr>`;
        }

        manageUserTemp += '</table>';
        manageUserContainer.innerHTML = manageUserTemp;
    } else {
        manageUserContainer.innerHTML = '<p>Không có đơn hàng nào.</p>';
    }
}

accountDataManage();
function removeUser(i) {
    let ans = confirm('Bạn có chắc muốn xóa người dùng này ?');
    if(ans == true) {
          let accountData = JSON.parse(localStorage.getItem('accountData'));
          accountData.splice(i,1);
          localStorage.setItem('accountData',JSON.stringify(accountData));
        //   customAlert('Bạn đã xóa sản phẩm thành công','success');
          accountDataManage();
    }
}










