 let input = document.querySelector("input");
 let button = document.querySelector("button")

const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json' // Declare the data type
      },
      body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
    });

    if (!response.ok) {
      // Check for HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json(); // Parse the response body as JSON
    console.log('Success:', responseData); // Handle the successful response
    return responseData;

  } catch (error) {
    console.error('Error posting data:', error); // Handle network errors or those thrown above
  }
};


button.addEventListener("click",(e)=>{
    e.preventDefault();

    let username = input.value
    if(username == ""){
        alert("Entrer un username svp !")
        return
    }
    const apiEndpoint = 'http://localhost:3000/api/users'; 
    const myData = {
    username: `${username}`
    };
   postData(apiEndpoint, myData);

}) 





