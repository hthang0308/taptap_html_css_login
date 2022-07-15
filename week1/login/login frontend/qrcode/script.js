//display image save in local storage
var qrcode = localStorage.getItem("qrcode");
$("#qrcode").attr("src", qrcode);
