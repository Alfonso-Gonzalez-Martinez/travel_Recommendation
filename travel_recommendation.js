export function processSearch(text) {
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
            return null;
    }
    return text;
}
export function fetchTravelData() {
    const searchBar = document.getElementById("search-bar");
    if (!searchBar) {
        console.error("Search Bar does not exist");
        return;
    }
    const searchQuery = searchBar.value;
    const processedQuery = processSearch(searchQuery);
    if (!processedQuery) {
        return;
    }
    fetch("travel_recommendation_api.json")
        .then(response => {
        if (!response.ok) {
            throw new Error("Network is not working properly");
        }
        return response.json();
    })
        .then(data => {
        console.log(data);
        const result = data[processedQuery];
        console.log(result);
        const resultContainer = document.getElementById("search-result");
        if (!resultContainer) {
            console.error("Result container is not working");
            return;
        }
        resultContainer.innerHTML = "";
        result.forEach((item) => {
            const card = document.createElement("div");
            card.classList.add("recommendation-card");
            const image = document.createElement("img");
            image.src = item.imageUrl || item.imageUrl || item.cities[0].imageUrl || "";
            const title = document.createElement("h2");
            title.textContent = item.name || item.name || item.cities[0].name || "";
            const description = document.createElement("p");
            description.textContent = item.description || item.description || item.cities[0].name || "";
            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(description);
            resultContainer.appendChild(card);
        });
    })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
export function clearResult() {
    const result = document.getElementById("search-result");
    if (!result) {
        console.error("Result container is not present");
        return;
    }
    result.innerHTML = "";
}
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", fetchTravelData);
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", clearResult);
