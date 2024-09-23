function processSearch(text){
        let textString = text.toLowerCase().trim();

        switch (textString) {
            case "beach":
            case "beaches":
                text = "beaches";
                break;
            case "temple":
            case "temples":
                text = "temples";
                break;
            case "country":
            case "countries":
                text = "countries";
                break;
            default:
                window.alert("Please enter a correct destination");
                return;
            }
            return text;
        }

function fetchTravelData(){

    const searchQuery = document.getElementById("search-bar").value;
    const processedQuery = processSearch(searchQuery);
    if(!processedQuery){
        return;
    }

    fetch("travel_recommendation_api.json", processSearch)
    .then(response => {
        if(!response.ok){
            throw new Error("Network is not working properly")
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        result = data[processedQuery];
        console.log(result);

        const resultContainer = document.getElementById("search-result");
        resultContainer.innerHTML = "";
        result.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("recommendation-card");

            const image = document.createElement("img");
            if(!item.imageUrl){
                image.src = item.cities[0].imageUrl
            } else {
                image.src = item.imageUrl;
            }

            const title = document.createElement("h2");
            title.textContent = item.name;

            const description = document.createElement("p");
            if(!item.description){
                description.textContent = item.cities[0].description
            } else {
                description.textContent = item.description;
            }

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(description);

            resultContainer.appendChild(card);
    })

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error)
    })
}

function clearResult(){
    const result = document.getElementById("search-result");
    result.innerHTML = "";
}

const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

searchButton.addEventListener("click", fetchTravelData);
resetButton.addEventListener("click", clearResult)
