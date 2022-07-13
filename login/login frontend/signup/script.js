$(".signupbtn").click(function (e) {
  e.preventDefault();
  var data = {
    username: $("#username").val(),
    password: $("#password").val(),
    email: $("#email").val(),
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/api/users/register",
    data: data,
    success: function (data) {
      //load qrcode.html
      window.location.href = "../qrcode/index.html";
      //save to local storage
      localStorage.setItem("qrcode", data.qrcode);
    },
    error: function (err) {
      alert("Error: " + err.responseJSON.msg);
    },
  });
});
//onload, check if token is present in local storage
if (localStorage.getItem("token")) {
  window.location.href = "../welcomepage/index.html";
}
