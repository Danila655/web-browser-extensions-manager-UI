const themeButton = document.querySelector(".header-container button");
const gridContainer = document.querySelector(".grid-container");
const buttons = document.querySelectorAll(".buttons .btn");
let currentFilter = "all";

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.innerHTML = `<img src="assets/images/icon-sun.svg" alt="">`;
    }
    else {
        themeButton.innerHTML = `<img src="assets/images/icon-moon.svg" alt="">`;
    }
})

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("active")) {
            return;
        }

        buttons.forEach(btn => {
            btn.classList.remove("active");
        })

        currentFilter = button.dataset.filter;
        button.classList.add("active");

        filterCards(currentFilter);

    })
})



async function renderExtensions() {
    const arr = await getJson();
    for (let i = 0; i < arr.length; i++) {
        createCard(arr[i].logo, arr[i].name, arr[i].description, arr[i].isActive);
    }
}

function createCard(logo, name, description, isActive) {
    let checked = null;
    if (isActive) {
        checked = "checked";
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.status = getDataStatus(isActive);
    card.innerHTML = `
        <div class="card-header">
            <img class="card-logo" src="${logo}" alt="">
            <div>
                <p class="card-name">${name}</p>
                <p class="card-description">${description}</p>
            </div>
        </div>
        <div class="card-bottom">
            <button class="btn">Remove</button>
            <label class="switch">
                <input type="checkbox" ${checked}>
                <span class="slider"></span>
            </label>
        </div>
    `;

    gridContainer.append(card);

    const checkBox = card.querySelector("input[type='checkbox']");

    checkBox.addEventListener("change", (event) => {
        if(event.target.checked){
            card.dataset.status = "active";
        }else{
            card.dataset.status = "inactive";
        }
        filterCards(currentFilter);
    });

    
}


async function getJson() {
    try {
        const jsonFile = await fetch("data.json");

        const jsonArray = await jsonFile.json();
        return jsonArray;
    } catch (error) {
        console.log("sth wrong");
    }
}

function getDataStatus(flag) {
    switch (flag) {
        case true:
            return "active";
        case false:
            return "inactive";
    }
}

function filterCards(filter) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (filter === "all") {
            card.style.display = "flex";
        }
        else if (card.dataset.status === filter) {
            card.style.display = "flex";
        }
        else if (card.dataset.status !== filter) {
            card.style.display = "none";
        }
    })
}



renderExtensions();