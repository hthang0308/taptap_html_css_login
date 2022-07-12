$(".loginbtn").click(function (e) {
  e.preventDefault();
  var data = {
    username: $("#username").val(),
    password: $("#password").val(),
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/api/users/login",
    data: data,
    success: function (data) {
      alert("Success");
      localStorage.setItem("token", data.token);
      window.location.href = "../welcomepage/index.html";
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
