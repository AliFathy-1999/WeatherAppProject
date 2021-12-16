/* Global Variables */
// I acquire API credentials from OpenWeatherMap website by get from it personal Api Key and its Url 
const ApiKey = "&appid=6cdcbcd65ac041144a236fe1908f44e2&units=metric";
let BaseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
let generateButton = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
generateButton.addEventListener("click", async () => {
  const EnteredZipCode = document.getElementById("zip").value;
  const feelings1 = document.getElementById("feelings").value;
// Check first if Zip Code and User feelings are Entered 
  if (EnteredZipCode === "" || feelings1 === "") {
    alert(`Oh! You don't enter the Zip code or your feelings, please enter them first.`);
  } else {
//In the async function i use fetch() to make a GET request to the OpenWeatherMap API.
    const data = await getData(BaseURL, EnteredZipCode, ApiKey).then(
      async (data) => {
        const PostedProjectData = await postData("/postData", {
          temperature: "🌡️ " + data.main.temp + "^C",
          date: "📅 " + newDate,
          user_response: "💬 "+ feelings1,
          // Using promise to makes post request to add the API data, as well as data entered by the user 
        }).then(async () => {
          const projectData = await getProjectData("/getData", "");
          updateUI(
            projectData.temperature,
            projectData.date,
            projectData.user_response
          );
        });
      }
    );
  }
});

/* POST request to add the API data */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
         "Content-Type": "application/json" 
        },
    body: JSON.stringify(data),
  });
  try {
    const newPost = await response.json();
    return newPost;
  } catch (e) {
    console.log("Error!" + e);
  }
};

/* Function to GET Web API Data*/
const getData = async (base_url, zipCode, ApIkey) => {
  const FullURL = base_url + zipCode + ApIkey;
  console.log(FullURL);
  const response = await fetch(FullURL);
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error!" + e);
  }
};

/* Function to GET Project Data */ 
const getProjectData = async (BaseURL) => {
  const response = await fetch(BaseURL);
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error!" + e);
  }
};

/* Function to update Data in UI */
const Temperature = document.getElementById("temp");
const MyDate = document.getElementById("date");
const UserResponse = document.getElementById("content");
const updateUI = (temp, date, feelings) => {
  try {
    Temperature.innerHTML = `Temperature: ${temp}.`;
    MyDate.innerHTML = `Date: ${date}.`;
    UserResponse.innerHTML = `User feelings: ${feelings}.`;
  } catch (e) {
    console.log("Error!" + e);
  }
};
