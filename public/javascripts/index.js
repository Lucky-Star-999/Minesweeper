

function redirectSettings() {
    alert(
    "Hiện tại project lấy board từ API (tui tạo ra). Nhưng vì khi đặt API lên server thật, nó ngăn các request lạ. " + 
    "Do đó cần bấm vào link phía dưới để open request tạm thời. Cứ cách nửa ngày vô link đó bấm 1 lần." +
    "\n\nTôi sẽ cố gắng làm thêm 1 bộ sinh Random board offline để nó load nhanh hơn, chứ API chạy đợi 15 giây mới chơi được thì toang :))");
    window.location.href = "/settings";
}

//console.log(TestAppCenter.x);
