
//chuyển content
var homePage = document.getElementById('home_page');
var menuPage = document.getElementById('menu_page'); // Thay thế bằng id tương ứng
var salePage = document.getElementById('sale_page'); // Thay thế bằng id tương ứng
var servicePage = document.getElementById('service_page'); // Thay thế bằng id tương ứng
// var newsPage = document.getElementById('news_page'); // Thay thế bằng id tương ứứng
var contactPage = document.getElementById('contact');

//btn_content
var homeBtn = document.getElementsByClassName('home_btn')[0];
var contactBtn = document.getElementsByClassName('contact_btn')[0];
var menuBtn = document.getElementsByClassName('menu_btn')[0]
var saleBtn = document.getElementsByClassName('sale_btn')[0]
var serviceBtn = document.getElementsByClassName('service_btn')[0]
var searchBtn = document.getElementsByClassName('ti-search')[0]
function PageOpen(page, btn) {
  closeAllPages(btn);
  var computedStyle = window.getComputedStyle(page);
  if (computedStyle.display === 'none') {
    page.style.display = 'block';
    btn.classList.add("products")
  }

}
function closeAllPages(button) {
  var allPages = [homePage, contactPage, menuPage, salePage, servicePage];
  var allBtn = [homeBtn, contactBtn, menuBtn, saleBtn, serviceBtn]
  allPages.forEach(function (page) {
    page.style.display = 'none';

  })
  allBtn.forEach(function (btn) {
    btn.classList.remove("products")
  })
}
homeBtn.addEventListener('click', function () {
  PageOpen(homePage, homeBtn);
});

contactBtn.addEventListener('click', function () {
  PageOpen(contactPage, contactBtn);
});
menuBtn.addEventListener("click", function () {
  PageOpen(menuPage, menuBtn)
});
saleBtn.addEventListener('click', function () {
  PageOpen(salePage, saleBtn)
})
serviceBtn.addEventListener('click', function () {
  PageOpen(servicePage, serviceBtn)
})
searchBtn.addEventListener("click", function () {
  addProduct()
  PageOpen(menuPage, menuBtn)
});


// open, close login and register
// find_box
var findBox = document.getElementsByClassName('findbox')[0];
var openFindbox = document.getElementsByClassName('ti-search')[0]
function transWidth() {
  var computedStyle = window.getComputedStyle(findBox);
  if (parseInt(computedStyle.width) < 300 || parseInt(openFindbox.style.width) < 300) {
    findBox.style.width = '220px';

  }

}


//slider
let sliderListImg = ['asset/img/shrimpBurger.jpg', 'asset/img/item6.jpg', 'asset/img/maxresdefault.jpg'];
var imgFeature = document.querySelector('#img-feature');
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
var currentIndex = 0;



prevBtn.addEventListener('click', e=> {
    if (currentIndex == 0)
    {
        currentIndex = sliderListImg.length - 1;
    }
    else 
        currentIndex--;
    imgFeature.src = sliderListImg[currentIndex];
})

nextBtn.addEventListener('click', e=> {

    if (currentIndex == sliderListImg.length - 1)
    {
        currentIndex = 0;
    }
    else 
        currentIndex++;
    imgFeature.src = sliderListImg[currentIndex];
})

setInterval(() => {nextBtn.click()}, 3000);

//end slider


function resetWidth() {
  findBox.style.width = ''; // Reset to the default width (empty string)
}

findBox.addEventListener('click', transWidth);

// Add a click event listener to the document
document.addEventListener('click', function (event) {
  // Check if the clicked element is not within the findBox
  if (!findBox.contains(event.target)) {
    resetWidth(); // Reset the width if the click is outside findBox
  }
});

// find_box_end
var loginIcon = document.getElementsByClassName('ti-user')[0];

var closeLogin = document.getElementsByClassName('close_login')[0];
var loginForm = document.getElementById('login_form');
var registText = document.getElementsByClassName('register')[0];
var closeRegister = document.getElementsByClassName('close_register')[0];
var registForm = document.getElementById('register_form');
var returnLoginForm = document.getElementsByClassName('login_return')[0];
var forgetAccount = document.getElementById('foget_pass_form');
var forgetAccountBtn = document.getElementsByClassName('login_forget_pass')
var loginBtn = document.getElementsByClassName('login_btn')[0];
var user = document.getElementById('nameuser')
var LogOut = document.getElementById('logout')
var logOutBtn = document.getElementsByClassName('logout_btn')[0]

let inforAccount = JSON.parse(localStorage.getItem('accountData')) ?? [];
if (inforAccount.length == 0) 
{
  inforAccount = [{
    fullName: 'Admin',
    email: 'admin@example.com',
    phoneNumber: '123456789',
    password: 'adminPassword',
    isAdmin: true // Đặt trạng thái admin
  },
  {
    email: "ploc32207@gmail.com",
    fullName: "phan lộc",
    password: "23122004",
    phoneNumber: "0814836606",
    sexSelect: "",
  }];
  localStorage.setItem('accountData', JSON.stringify(inforAccount));
};

loginIcon.addEventListener('click', loginFormOpen);
closeLogin.addEventListener('click', loginFormClose);
registText.addEventListener('click', registFormOpen);
closeRegister.addEventListener('click', registFormClose);
returnLoginForm.addEventListener('click', returnLogin);

loginBtn.addEventListener('click', login);

//close funtion
function close(btn) {
  var computedStyle = window.getComputedStyle(btn);
  if (computedStyle.display === 'block') {
    loginForm.style.display = 'none';
  }
}

//close fution
function loginFormOpen() {
  var computedStyle = window.getComputedStyle(loginForm);
  if (computedStyle.display === 'none') {
    loginForm.style.display = 'block';
  }
}

function loginFormClose() {
  var computedStyle = window.getComputedStyle(loginForm);
  if (computedStyle.display === 'block') {
    loginForm.style.display = 'none';
  }
}

function registFormOpen() {
  var computedStyle = window.getComputedStyle(registForm);
  if (computedStyle.display === 'none') {
    loginFormClose();
    registForm.style.display = 'block';
  }
}

function registFormClose() {
  var computedStyle = window.getComputedStyle(registForm);
  if (computedStyle.display === 'block') {
    registForm.style.display = 'none';
  }
}

function removeIconUser() {
  // loginIcon.style.display='none'
  user.style.display = 'block'
  loginIcon.remove();
}
function returnLogin() {
  var computedStyle = window.getComputedStyle(loginForm);
  if (computedStyle.display === 'none') {
    registFormClose();
    loginForm.style.display = 'block';
  }
}
function forgetPassAcc() {
  var computedStyle = window.getComputedStyle(forgetAccount)
  if (computedStyle.display === 'none') {
    loginFormClose()
    forgetAccount.style.display = 'block'
  }
}
forgetAccountBtn[0].addEventListener('click', forgetPassAcc)
var logInAccount = '';

//login
var accountLogin = [];
// test()
function login(event) {
  event.preventDefault();
  var emailOrPhone = document.getElementsByClassName('login_name')[0].value;
  var passwordLogin = document.getElementsByClassName('login_password')[0].value;
  document.getElementById('nameAcc_message').textContent = '';
  document.getElementById('password_message').textContent = '';
  if (emailOrPhone.trim() === '') {
    document.getElementById('nameAcc_message').textContent = 'Vui lòng nhập tên đăng nhập';
    document.getElementsByClassName('login_name')[0].classList.add('error-input');
    return;
  }
  for (let i = 0; i < inforAccount.length; i++) {
    accountLogin = inforAccount[i];
    if (accountLogin.email === emailOrPhone || accountLogin.phoneNumber === emailOrPhone) {
      if (accountLogin.password === passwordLogin) {
        localStorage.setItem('loggedInAccount', JSON.stringify(accountLogin));
        logInAccount = accountLogin;
        if (logInAccount.isAdmin == true) {
          // Nếu là admin, chuyển sang trang admin
          
          document.getElementById('end-user').style.display = 'none'
          document.getElementsByClassName('admin-container')[0].style.display = 'flex'
          window.location.reload();
          return;
        } else {
          loginIcon.style.display = 'none'
          loginIcon.textContent = logInAccount.fullName;
          renderOrderHistory();
          user.textContent = logInAccount.fullName;
          LogOut.style.display = 'flex'
          loginFormClose();
          // removeIconUser();
          fullnameInput.disabled = true;
          phoneInput.disabled = true;
          emailInput.disabled = true;
          sexSelect.disabled = true;
          birthdayInput.disabled = true;
          document.getElementsByClassName('login_input')[0].reset();
          
          window.location.reload();
          
        }
      }
      else {
        document.getElementById('password_message').textContent = 'Mật khẩu không đúng, vui lòng nhập lại';
        document.getElementsByClassName('login_password')[0].classList.add('error-input');
        return;
      }
    }

    user.addEventListener('click', openInfor);

  }
  userName();

}

document.addEventListener('DOMContentLoaded', function () {
  var loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));

  if (loggedInAccount != null) {
    if (loggedInAccount.isAdmin) {
      // Nếu là admin, chuyển sang trang admin
      document.getElementById('end-user').style.display = 'none'
      document.getElementsByClassName('admin-container')[0].style.display = 'flex'
      renderAllProductsInAdmin();
      
      



    }
    else {
      logInAccount = loggedInAccount;
      loginIcon.style.display = 'none';
      user.textContent = logInAccount.fullName;
      LogOut.style.display = 'flex';
      renderOrderHistory()
      calculateTotalRevenue(orders)
      


    }
  }
});

// function test(){
//   if(loggedInAccount!==null){
//     loginIcon.style.display = 'none'
//           loginIcon.textContent = logInAccount.fullName;
//           // renderOrderHistory();
//           user.textContent = logInAccount.fullName;
//           LogOut.style.display = 'flex'
//   }
// }

function userName() {
  if (logInAccount) {
    loginFormClose();
  } else {
    document.getElementById('nameAcc_message').textContent = 'Tài khoản không tồn tại';
    document.getElementsByClassName('login_name')[0].classList.add('error-input');
    return false;
  }
}
// đăng xuất
function logoutFunction() {
  localStorage.removeItem('loggedInAccount');
  LogOut.style.display = 'none'
  loginIcon.style.display = 'block'
  loginIcon.textContent = ''
  deleteCart(0, cart.length);
  alert("bạn đã đăng xuất")
  location.reload()
  

}
logOutBtn.addEventListener('click', logoutFunction)


// Đăng ký tài khoản
var btnRegister = document.getElementsByClassName('register_btn')[0];
btnRegister.addEventListener('click', regist);

function regist(event) {
  event.preventDefault();
  var fullName = document.getElementsByClassName('register_name')[0].value;
  var phoneNumber = document.getElementsByClassName('register_phone')[0].value;
  var email = document.getElementsByClassName('register_email')[0].value;
  var password = document.getElementsByClassName('register_password')[0].value;
  var sexSelect = document.getElementById('sex_select').value;
  var birthDay = document.getElementById('birthday').value;

  document.getElementById('fullnameMessage').textContent = '';
  document.getElementById('phoneMessage').textContent = '';
  document.getElementById('mailMessage').textContent = '';
  document.getElementById('passwordMessage').textContent = '';

  if (fullName.trim() === '') {
    document.getElementById('fullnameMessage').textContent = 'Vui lòng nhập họ và tên.';
    document.getElementsByClassName('register_name')[0].classList.add('error-input');
    return false;
  }

  if (phoneNumber.trim() === '') {
    document.getElementById('phoneMessage').textContent = 'Vui lòng nhập số điện thoại.';
    document.getElementsByClassName('register_phone')[0].classList.add('error-input');
    return false;
  }

  if (!isValidEmail(email.trim())) {
    document.getElementById('mailMessage').textContent = 'Vui lòng nhập địa chỉ email hợp lệ.';
    document.getElementsByClassName('register_email')[0].classList.add('error-input');
    return false;
  }

  if (password.trim() === '') {
    document.getElementById('passwordMessage').textContent = 'Vui lòng nhập mật khẩu.';
    document.getElementsByClassName('register_password')[0].classList.add('error-input');
    return false;
  } else if (password.length < 8) {
    document.getElementById('passwordMessage').textContent = 'Mật khẩu phải có ít nhất 8 ký tự.';
    document.getElementsByClassName('register_password')[0].classList.add('error-input');
    return false;
  }



  var existAccount = false;

  for (var i = 0; i < inforAccount.length; i++) {
    if (inforAccount[i].email === email || inforAccount[i].phoneNumber === phoneNumber) {
      existAccount = true;
      break;
    }
  }

  if (existAccount) {
    alert('Tài khoản đã tồn tại, vui lòng đăng nhập.');
  } else {
    var account = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      sexSelect: sexSelect,
      birthDay: birthDay
    };
    returnLogin();
    inforAccount.push(account);
    localStorage.setItem('accountData', JSON.stringify(inforAccount));
    alert('đăng kí thành công, vui lòng đăng nhập')
  }
}
function isValidEmail(email) {
  // Simple email validation using a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
//thay đổi mật khẩu

//hiển thị thông tinh cá nhân
var informationForm = document.getElementById('information_form');
var closeInformation = document.getElementsByClassName('close_infor')[0];
var saveBtn = document.getElementsByClassName('save_btn')[0];
var fullnameInput = document.getElementsByClassName('fullname')[0];
var phoneInput = document.getElementsByClassName('phone')[0];
var emailInput = document.getElementsByClassName('email')[0];
var sexSelect = document.getElementsByClassName('sex')[0];
var birthdayInput = document.getElementsByClassName('birthday')[0];

closeInformation.addEventListener('click', closeInformationForm);

user.addEventListener('click', openInfor);

function closeInformationForm() {
  informationForm.style.display = 'none';
}
function openInfor() {
  informationForm.style.display = 'block';

  // Điền thông tin của người dùng vào các trường dữ liệu
  fullnameInput.value = logInAccount.fullName;
  phoneInput.value = logInAccount.phoneNumber;
  emailInput.value = logInAccount.email;
  sexSelect.value = logInAccount.sexSelect;
  const birthDate = new Date(logInAccount.birthDay);
  const formattedBirthDate = birthDate.toISOString().split('T');

  birthdayInput.value = formattedBirthDate[0];
}

function saveInformation(event) {
  event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu

  var fullnameValue = fullnameInput.value;
  var phoneValue = phoneInput.value;
  var emailValue = emailInput.value;
  var sexValue = sexSelect.value;
  var birthdayValue = birthdayInput.value;

  // Thực hiện lưu thông tin hoặc gửi yêu cầu AJAX tới máy chủ

  // Ví dụ:
  console.log('Fullname:', fullnameValue);
  console.log('Phone:', phoneValue);
  console.log('Email:', emailValue);
  console.log('Sex:', sexValue);
  console.log('Birthday:', birthdayValue);
}
// edit infor
var editBtn = document.getElementsByClassName('edit_btn')[0];
editBtn.addEventListener('click', editInformation);

function editInformation() {
  // Cho phép chỉnh sửa thông tin trong các trường dữ liệu
  fullnameInput.disabled = false;
  phoneInput.disabled = false;
  emailInput.disabled = false;
  // sexSelect.disabled = false;
  birthdayInput.disabled = false;

  // Thay đổi văn bản của nút "Sửa" thành "Lưu"
  editBtn.value = 'Lưu';

  // Thêm sự kiện nghe cho nút "Lưu" để lưu thông tin sau khi người dùng hoàn thành sửa đổi
  editBtn.removeEventListener('click', editInformation);
  editBtn.addEventListener('click', saveEditedInformation);

}

function saveEditedInformation() {
  // Lấy thông tin đã chỉnh sửa từ các trường dữ liệu
  var fullName = document.querySelector('.fullname').value;
  var phoneNumber = document.querySelector('.phone').value;
  var email = document.querySelector('.email').value;
  // var sex = document.getElementById('sex').value;
  var birthday = document.getElementById('birthday').value;

  // Tìm và cập nhật thông tin trong mảng inforAccount
  for (var i = 0; i < inforAccount.length; i++) {
    if (inforAccount[i].email === logInAccount.email) {
      // Cập nhật thông tin tài khoản
      inforAccount[i].fullName = fullName;
      inforAccount[i].phoneNumber = phoneNumber;
      inforAccount[i].email = email;
      // inforAccount[i].sexSelect = sex;
      inforAccount[i].birthDay = birthday;

      // Lưu mảng đã cập nhật vào localStorage
      localStorage.setItem('accountData', JSON.stringify(inforAccount));
      localStorage.setItem('loggedInAccount', JSON.stringify(inforAccount));
      user.textContent = fullName;
      // Vô hiệu hóa việc chỉnh sửa thông tin trong các trường dữ liệu
      fullnameInput.disabled = true;
      phoneInput.disabled = true;
      emailInput.disabled = true;
      // sexSelect.disabled = true;
      birthdayInput.disabled = true;

      // Thay đổi văn bản của nút "Lưu" thành "Sửa"
      editBtn.value = 'Sửa';

      // Thêm lại sự kiện nghe cho nút "Sửa"
      editBtn.removeEventListener('click', saveEditedInformation);
      editBtn.addEventListener('click', editInformation);

      // Kết thúc vòng lặp sau khi tìm thấy và cập nhật thông tin
      break;
    }
  }
}
//open đặt hàng
// lịch sử đơn hàng
// validator
function validateForm() {
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var address = document.getElementById('address').value;
  var deliveryTime = document.getElementById('delivery-time').value;

  if (!name || !phone || !address || !deliveryTime) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return false;
  }

  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      alert('Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số!');
      return false;
  }
  window.location.href = 'payment.html';
  return false;
}

