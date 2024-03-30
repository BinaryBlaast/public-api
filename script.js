// Function to fetch data from an API endpoint with error handling
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Return null for error handling in display functions
    }
}

// Function to display the anime quote
function displayAnimeQuote(data) {
    try {
        if (!data) {
            document.getElementById('anime-quote').textContent = 'Error retrieving quote.';
            return;
        }

        const quoteElement = document.getElementById('anime-quote');
        quoteElement.textContent = `"${data.quote}" - ${data.anime}`;
    } catch (error) {
        console.error("Error displaying anime quote:", error);
    }
}

// Function to display recent threat URLs (truncated for security)
function displayThreatFeed(data) {
    try {
        console.log(data);
        if (!data) {
            const threatList = document.getElementById('threat-feed');
            threatList.innerHTML = '<li class="list-group-item">Error retrieving data.</li>';
            return;
        }

        const threatList = document.getElementById('threat-feed');
        threatList.innerHTML = '';

        data.data.forEach(threat => {
            console.log(threat);
             const threatItem = document.createElement('li');
            threatItem.classList.add('list-group-item');

           
            const truncatedUrl = threat
            threatItem.textContent = truncatedUrl;
            threatList.appendChild(threatItem);
        });
    } catch (error) {
        console.error("Error displaying threat feed:", error);
    }
}

// Function to display a random dog fact
function displayDogFact(data) {
    try {
        if (!data) {
            document.getElementById('dog-fact').textContent = 'Error retrieving fact.';
            return;
        }

        const factElement = document.getElementById('dog-fact');
        data.forEach(holiday => {
            const holidayItem = document.createElement('li');
            holidayItem.classList.add('holiday-item'); // Add a CSS class for styling
            console.log(holiday);
            const date = new Date(holiday.date); // Convert date string to Date object
        
            const formattedDate = date.toLocaleDateString('en-US', { // Format the date
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
        
            holidayItem.textContent = `${formattedDate} - ${holiday.name}`;
        
            factElement.appendChild(holidayItem);
          });
    } catch (error) {
        console.error("Error displaying dog fact:", error);
    }
}

// Fetch and display data on page load
window.onload = function () {
    fetchData('https://animechan.xyz/api/random')
        .then(displayAnimeQuote)
        .catch(error => console.error("Error fetching anime quote:", error));
    fetchData('https://meowfacts.herokuapp.com/')
        .then(displayThreatFeed)
        .catch(error => console.error("Error fetching threat feed:", error));
    fetchData('https://date.nager.at/api/v3/publicholidays/2024/AT')
        .then(displayDogFact)
        .catch(error => console.error("Error fetching dog fact:", error));
};