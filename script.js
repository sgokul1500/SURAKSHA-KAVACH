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
  var username = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter both username and passworddddd");
  }

  fetch("http://127.0.0.1:5000/login?username="+username+"&password="+password, {
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
        alert("Failed to login user",response);       
      } else{
        alert("User logged in successfully");
        window.location.href = "/dashboardUser.html";
      }
      
    })
    .catch((error) => {
      alert("Error ",error)
      console.error("Error:", error);
    });

    return false;
 
}
function verify(){
  var username = document.getElementById("signupname").value;
  var contact = document.getElementById("contact").value;
  var password = document.getElementById("signuppassword").value;
  var email  = document.getElementById("email").value
  var address = document.getElementById("address").value
  var otp = document.getElementById("otp").value;
  //Check otp
  if(otp == otpGen){
    alert("OTP verified successfully");
  }else{
    alert("OTP Verification failed");
    window.location.href = "loginUser.html";
  }

      // Register into users mongodb
      fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          contact: contact,
          email : email,
          address :address
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("User registered successfully");
            window.location.href="dashboardUser.html"
            // Redirect to another page or perform any other action
          } else {
            alert("Failed to register user");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    
      window.location.href = "loginUser.html";

      return false;
}

function register() {

  var contact = document.getElementById("contact").value;
  document.getElementById("verifyOTPButton").style.display='inline'
  document.getElementById("enterOTP").style.display='flex'
  document.getElementById("signUpButton").style.display='none'


  otpGen = Math.floor(1000 + Math.random() * 9000);
  // OTP verification
  fetch("http://127.0.0.1:5000/send-sms", {
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


function agencysetup() {
  var username = document.getElementById("agencyname").value;

  var password = document.getElementById("agencypassword").value;

  if (!username || !password) {
    alert("Please enter both username and password");
  } else if (username === "gokul" && password === "mango") {
    window.location.href = "dashboardUser.html";
  }
  return false;
}

function agencylogin() {
  var username = document.getElementById("actualname").value;
  var password = document.getElementById("actualpassword").value;

  if (!username || !password) {
    alert("Please enter both username and password");
  } else if (!password !== "mango") {
    alert("Wrong password");
  } else if (username === "gokul" && password === "mango") {
    // alert('Please enter correct username and password');
    //return;
    window.location.href = "dashboardUser.html";
    // Window.location.href = "dashboardUser.html";
  }
  return false;
  //window.location.href = "/profile.html";
}


