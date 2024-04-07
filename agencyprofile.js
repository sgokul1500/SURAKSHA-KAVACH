function getProfileData() {  
    fetch("http://127.0.0.1:5001/profile", {
      method: "GET",
      credentials: "include"
    })
    .then(data => {
        if (!data.ok) {
            throw new Error('Network response was not ok');
        }
        return data.json(); // Convert response to JSON format and return the promise
    })
      .then((response) => {
          document.getElementById('agname').value = response.username;
          document.getElementById('agexpertise').value = response.expertise;
          document.getElementById('agphone').value = response.contact;
          document.getElementById('agaddress').value = response.address;        
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
      return false;   
  }


  window.onload = getProfileData;