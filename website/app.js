/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '&appid=2fe3c94afe7a303282a55284594e361d&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zipcode = document.getElementById('zip').value;
    if(zipcode === '') {
        alert('please enter the zip code');
        return ;
    }
    const feelings = document.getElementById('feelings').value;
    getData(baseURL, zipcode, APIKey)
    .then((data) => {
        postData('/all',{
            temp: data,
            feelings: feelings,
            date: newDate
        });
    }).then(() => {
        updateUI();
    })
}

const getData = async (baseURL, zipcode, APIKey) => {
    const response = await fetch(baseURL + encodeURIComponent(zipcode) + APIKey);
    try {
        const data = await response.json();
        if(!data.main) {
            return data.message;
        }
        return data.main.temp;
    } catch(error) {
        console.log(error);
    }
}

const postData = async (url='', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const data = await response.json();

        return data;
    }catch(error) {
        console.log(error);
    }
}

const updateUI = async () => {
    const response = await fetch('/ui');

    try{
        const data = await response.json();
        if(typeof data.temp !== "number") {
            document.getElementById('date').innerHTML = data.temp;
            document.getElementById('temp').innerHTML = "";
            document.getElementById('content').innerHTML = "";
        } else {
            document.getElementById('date').innerHTML = "The date is " + data.date;
            document.getElementById('temp').innerHTML = "The temperature is " + data.temp;
            document.getElementById('content').innerHTML = "Your feelings is " + data.feelings;
        }
    }catch(error) {
        console.log(error);
    }

}
