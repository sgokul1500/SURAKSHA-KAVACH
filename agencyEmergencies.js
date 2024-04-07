function getAgencyName() {  
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
         return response.username;   
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;  
      });        
  }

  function getEmergencies(){
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
           return response.username;   
        })
        .catch((error) => {
          console.error("Error:", error);
          return null;  
        });        
}
  