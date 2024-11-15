export interface Country{
    id: number,
    name: string,
    cities: City[]
}

export interface City{
    name: string,
    imageUrl: string,
    description: string,
}

export interface Beach{
    id: number,
    name: string,
    imageUrl: string,
    description: string,
}

export interface Temple{
    id: number,
    name: string,
    imageUrl: string,
    description: string,
}

export interface TravelRecommendations {
    countries: Country[];
    temples: Temple[];
    beaches: Beach[];
}

export function processSearch(text: string): string | null{
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

export function fetchTravelData(){

    const searchBar = document.getElementById("search-bar") as HTMLInputElement | null;
    if(!searchBar){
        console.error("Search Bar does not exist");
        return
    }
    const searchQuery: string = searchBar.value;
    const processedQuery = processSearch(searchQuery);
    if(!processedQuery){
        return;
    }

    fetch("../travel_recommendation_api.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network is not working properly")
        }
        return response.json()
    })
    .then(data => {
        console.log(data);
        const result = data[processedQuery];
        console.log(result);

        const resultContainer = document.getElementById("search-result");
        if(!resultContainer){
            console.error("Result container is not working");
            return
        }
        resultContainer.innerHTML = "";
        result.forEach((item: Country | Beach | Temple) => {
            const card = document.createElement("div");
            card.classList.add("recommendation-card");

            const image = document.createElement("img");
            image.src = (item as Beach).imageUrl || (item as Temple).imageUrl || (item as Country).cities[0].imageUrl || "";

            const title = document.createElement("h2");
            title.textContent = (item as Beach).name || (item as Temple).name || (item as Country).cities[0].name || "";

            const description = document.createElement("p");
            description.textContent = (item as Beach).description || (item as Temple).description || (item as Country).cities[0].name || "";

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

export function clearResult(){
    const result: HTMLElement | null = document.getElementById("search-result");
    if(!result){
        console.error("Result container is not present");
        return
    }
    result.innerHTML = "";
}

const searchButton: HTMLButtonElement | null = document.getElementById("search-button") as HTMLButtonElement;
const resetButton: HTMLButtonElement | null = document.getElementById("reset-button") as HTMLButtonElement;

searchButton?.addEventListener("click", fetchTravelData);
resetButton?.addEventListener("click", clearResult)
