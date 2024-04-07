const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
let otpGen = 0;

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

function login() {
    alert("hi")
  var username = document.getElementById("agencyname").value;
  var password = document.getElementById("agencyloginpassword").value;

  if (!username || !password) {
    alert("Please enter both username and passworddddd");
  }

  fetch("http://127.0.0.1:5001/login?username="+username+"&password="+password, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' // Add this header if necessary
  },
  credentials: 'include', 
    // headers: {
    //   "Content-Type": "application/json",
    // }
    // body: JSON.stringify({
    //   username: username,
    //   password: password
      
    // }),
  })
    .then((response) => {
     
      if (!response.ok) {
        alert("Failed to login agency",response);       
      } else{
        alert("agency logged in successfully");
        window.location.href = "/dashboardAgency.html";
      }
      
    })
    .catch((error) => {
      alert("Error ",error)
      console.error("Error:", error);
    });

    return false;
 
}
function verify(){
  var username = document.getElementById("agencysignupname").value;
  var password = document.getElementById("agencypassword").value;
  var contact = document.getElementById("agencycontact").value;
  var expertise = document.getElementById("agencyexpert").value;
  var address = document.getElementById("agencyaddress").value
  var otp = document.getElementById("otp").value;
  //Check otp
  if(otp == otpGen){
    alert("OTP verified successfully");
  }else{
    alert("OTP Verification failed");
    window.location.href = "loginUser.html";
  }

      // Register into users mongodb
      fetch("http://127.0.0.1:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          contact: contact,
          expertise : expertise,
          address :address,
          password : password
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Agency registered successfully");
            window.location.href="dashboardAgency.html"
            // Redirect to another page or perform any other action
          } else {
            alert("Failed to register Agency");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    
      window.location.href = "loginAgency.html";

      return false;
}

function register() {

  var contact = document.getElementById("agencycontact").value;
  document.getElementById("verifyOTPButton").style.display='inline'
  document.getElementById("enterOTP").style.display='flex'
  document.getElementById("signUpButton").style.display='none'


  otpGen = Math.floor(1000 + Math.random() * 9000);
  // OTP verification
  fetch("http://127.0.0.1:5001/send-sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: contact,
      otp: otpGen 
      
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("OTP generated successfully");
       // window.location.href="dashboardUser.html"
        // Redirect to another page or perform any other action
      } else {
        alert("Failed to generate OTP");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });


   




  // if (!username || !password) {
  //   alert("Please enter both username and password");
  // } else if (username === "gokul" && password === "mango") {
  //   window.location.href = "dashboardUser.html";
  // }
  return false;
}
// Otp verification
// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'http://localhost:5000/send-sms');
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.onload = function() {
//     if (xhr.status === 200) {
//         alert('SMS sent successfully!');
//     } else {
//         alert('Failed to send SMS: ' + xhr.responseText);
//     }
// };
// xhr.send(JSON.stringify({to: contact, body: username}));




