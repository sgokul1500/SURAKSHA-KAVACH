function getProfileData() {
    // var username = document.getElementById("name").value;
    // var password = document.getElementById("password").value;
  
    // if (!username || !password) {
    //   alert("Please enter both username and passworddddd");
    // }
  
    fetch("http://127.0.0.1:5000/profile", {
      method: "GET",
      credentials: "include"
    //   headers: {
    //     "Content-Type": "application/json",
    // //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password
        
    //   }),
    })
    .then(data => {
        if (!data.ok) {
            throw new Error('Network response was not ok');
        }
        return data.json(); // Convert response to JSON format and return the promise
    })
    // .then(data => data.json())
      .then((response) => {
       
       // if (!response.ok) {
             
      //  } else{
          alert("Profile fetched successfully",response);
         // console.log("data->",response.json())
          //response = response.json()
          document.getElementById('uname').value = response.username;
          document.getElementById('uemail').value = response.email;
          document.getElementById('uphone').value = response.contact;
          document.getElementById('uaddress').value = response.address;


         // window.location.href = "/profile.html";
       // }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  
      return false;
   
  }


  window.onload = getProfileData;