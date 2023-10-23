const decklist = [
    {
        nome: 'destiny hero - dark angel', 
        qtd: 1
    },
    {
        nome: 'maxx "c"', 
        qtd: 3
    },
    {
        nome: 'vision hero increase',
        qtd: 2
    },
    {
        nome: 'ash blossom & joyous spring',
        qtd: 3
    },
    {
        nome: 'destiny hero - denier',
        qtd: 1
    },
    {
        nome: 'elemental hero stratos',
        qtd: 2
    },
    {
        nome: 'vision hero vyon',
        qtd: 2
    },
    {
        nome: 'elemental hero shadow mist',
        qtd: 2
    },
    {
        nome: 'elemental hero liquid soldier',
        qtd: 1
    },
    {
        nome: 'vision hero faris',
        qtd: 3
    },
    {
        nome: 'destiny hero - malicious',
        qtd: 2
    },
    {
        nome: 'elemental hero honest neos',
        qtd: 1
    },
    {
        nome: 'destiny hero - plasma',
        qtd: 1
    },
    {
        nome: 'polymerization',
        qtd: 2
    },
    {
        nome: 'foolish burial',
        qtd: 1
    },
    {
        nome: 'reinforcement of the army',
        qtd: 1
    },
    {
        nome: 'miracle fusion',
        qtd: 1
    },
    {
        nome: "a hero lives",
        qtd: 3
    },
    {
        nome: 'fusion destiny',
        qtd: 2
    },
    {
        nome: 'book of eclipse',
        qtd: 3
    },
    {
        nome: 'mask change',
        qtd: 2
    },
    {
        nome: 'called by the grave',
        qtd: 2
    },
    {
        nome: 'crossout designator',
        qtd: 1
    },
    {
        nome: 'forbidden droplet',
        qtd: 1
    },
    {
        nome: 'infinite impermanence',
        qtd: 3
    },
    {
        nome: 'masked hero dark law',
        qtd: 2
    },
    {
        nome: 'masked hero blast',
        qtd: 1
    },
    {
        nome: 'destiny hero - dangerous',
        qtd: 1
    },
    {
        nome: 'elemental hero sunrise',
        qtd: 1
    },
    {
        nome: 'elemental hero absolute zero',
        qtd: 1
    },
    {
        nome: 'vision hero trinity',
        qtd: 1
    },
    {
        nome: 'elemental hero escuridao',
        qtd: 1
    },
    {
        nome: 'destiny hero - destroyer phoenix enforcer',
        qtd: 1
    },
    {
        nome: 'wake up your elemental hero',
        qtd: 1
    },
    {
        nome: 'elemental hero flame wingman - infernal rage',
        qtd: 1
    },
    {
        nome: 'xtra hero cross crusader',
        qtd: 1
    },
    {
        nome: 'xtra hero wonder driver',
        qtd: 1
    },
    {
        nome: 'predaplant verte anaconda',
        qtd: 1
    },
    {
        nome: 'xtra hero dread decimator',
        qtd: 1
    }
]

const challengers = [
    {
        nome: 'vision hero trinity'
    },
    {
        nome: 'tearlaments kaleido-heart'
    },
    {
        nome: 'kashtira fenrir'
    },
    {
        nome: 'gigantic spright'
    },
    {
        nome: 'blue-eyes white dragon'
    },
    {
        nome: 'Lady Labrynth of the Silver Castle'
    },
    {
        nome: 'Bystial Magnamhut'
    },
    {
        nome: 'Accesscode Talker'
    },
    {
        nome: 'Borreload Savage Dragon'
    },
    {
        nome: 'Baronne de Fleur'
    }
]

// FUNCTIONS

// API
const getHeroApi = async() => {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    const data = response.json();
    return data;
}

// FILTER HEROES FROM API
const filterHeroes = async () => {
    const heroes = []
    const getData = await getHeroApi();
    
    getData.data.filter(element => {
        if(element.name.toLowerCase().includes('hero')){
            heroes.push(element);
        }
    });

    return heroes;
}

// FILTER DECKLIST BASED ON DECKLIST JSON
const filterDecklist = async () => {
    const mainDeck = [];
    const getData = await getHeroApi();

    decklist.forEach(card => {
        getData.data.filter(element => {
            if(element.name.toLowerCase() == card.nome.toLowerCase()){
                for(let i = 0; i < card.qtd; i++){
                    mainDeck.push(element)
                }
            }
        })
    })

    return mainDeck;
}

// FILTER CHALLENGERS BASED ON CHALLENGERS JSON
const filterChallengers = async () => {
    const mainChallengers = [];
    const getData = await getHeroApi();

    challengers.forEach(card => {
        getData.data.filter(element => {
            if(element.name.toLowerCase() == card.nome.toLowerCase()){
                mainChallengers.push(element)
            }
        })
    })
    return mainChallengers;
}

// CREATE DECKLIST SECTION WITH API AND FILTER DECKLIST
const createDeckList = async() => {
    const mainDeck = await filterDecklist()
    mainDeck.forEach(card => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('card-container')
        
        newDiv.innerHTML = `<img data-bs-toggle="modal" data-bs-target="#exampleModal" class='card-decklist' src="${card.card_images[0].image_url}" alt='${card.name}' />`
        
        document.getElementById('main-deck').appendChild(newDiv)
    })
}

// CREATE HEROES SECTION WITH API (I DECIDED TO NOT CREATE A JSON HERE AND MAKE WITH IF ELSE)
const createCards = async () => {
    const heroes = await filterHeroes();
    const heroesCards = []

    heroes.filter(hero => {
        if(hero.name.toLowerCase().includes("destroyer phoenix enforcer")){
            heroesCards.push(hero)
        }
        if(hero.name.toLowerCase().includes("destiny hero - plasma")){
            heroesCards.push(hero)
        }
        if(hero.name.toLowerCase().includes("wake up")){
            heroesCards.push(hero)
        }
        if(hero.name.toLowerCase().includes("dark law")){
            heroesCards.push(hero)
        }
        if(hero.name.toLowerCase().includes("sunrise")){
            heroesCards.push(hero)
        }
    })

    heroesCards.forEach(hero => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('hero-img', 'rounded');
        
        newDiv.innerHTML = `<img class="rounded" src="${hero.card_images[0].image_url_cropped}" alt="${hero.name}">`;

        document.getElementById('heroes').appendChild(newDiv)
    })
}

// CREATE CHALLENGER SECTION WITH API - TRINITY
const startChallengers = async () => {
    const mainChallengers = await filterChallengers();

    document.getElementById('trinity-container').innerHTML = "";
    
    const newDiv = document.createElement('div');
    newDiv.id = 'trinity-main';
    newDiv.classList.add('rounded', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between');

    newDiv.innerHTML = `<div class="trinity-img">
                            <img class="mb-4" src="${mainChallengers[0].card_images[0].image_url_cropped}" alt="Vision Hero Trinity">
                        </div>
                        <h3 class="mb-4 fw-bold text-center">Draw an archetype to face Trinity</h3>
                        <button class="btn cta" id="challenge">Challenge</button>`;

    document.getElementById('trinity-container').appendChild(newDiv)
}

// 2ND STAGE OFF CHALLENGE SECTION WITH API - TRINITY VS RANDOM CHALLENGER FROM JSON FILTER
const challengeFunc = async() => {
    const getChallengers = await filterChallengers();

    document.getElementById('trinity-container').innerHTML = ""
    let randomChallenge = 0

    while(randomChallenge == 0){
        randomChallenge = Math.floor(Math.random() * getChallengers.length);
    }
    
    const newDiv = document.createElement('div');
    newDiv.id = 'trinity-duel';
    newDiv.classList.add('rounded', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between');

    newDiv.innerHTML = `<div id="duel" class="d-flex align-items-center container justify-content-evenly">
                            <div class="trinity-img text-center">
                                <img class="mb-4" src="${getChallengers[0].card_images[0].image_url_cropped}" alt="${getChallengers[0].name}">
                                <h3 class="mb-4 fw-bold text-center">${getChallengers[0].name}</h3>
                                <button class="btn cta" id="aposta1">Vote</button>
                            </div>
                            <img src="img/vs.png" alt="" id="versus">
                            <div class="trinity-img text-center">
                                <img class="mb-4" src="${getChallengers[randomChallenge].card_images[0].image_url_cropped}" alt="${getChallengers[randomChallenge].name}">
                                <h3 class="mb-4 fw-bold text-center">${getChallengers[randomChallenge].name}</h3>
                                <button class="btn cta" id="aposta2">Vote</button>
                            </div>
                        </div>`;

    document.getElementById('trinity-container').appendChild(newDiv)
}

// FINAL CHALLENGE SECTION - TRINITY CRASH
const trinityCrash = () => {
    document.getElementById('trinity-container').innerHTML = "";

    const newDiv = document.createElement('div');
    newDiv.classList.add('rounded', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between')
    newDiv.id = "trinity-crash"

    newDiv.innerHTML = `<div class="trinity-img">
                            <img class="mb-4" src="img/trinity-crash.jpg" alt="Vision Hero Trinity">
                        </div>
                        <h3 class="mb-4 fw-bold text-center">TRINITY CRASH</h3>
                        <button class="btn cta" id="restart">New Challenge</button>`
    document.getElementById('trinity-container').appendChild(newDiv);
}

// MODAL SHOWS CARDS BY DECKLIST
document.getElementById('main-deck').addEventListener('click', (e) => {
    if(e.target.classList.contains('card-decklist')){
        document.querySelector('#modal-img').src = e.target.src;
    }
})

// TRINITY FUNCTIONS
document.getElementById('trinity').addEventListener('click', (e) => {
    if(e.target.id == "challenge"){
        challengeFunc();
    }
    if(e.target.id == "aposta1"){
        trinityCrash()
    }
    if(e.target.id == "aposta2"){
        trinityCrash()
    }
    if(e.target.id == "restart"){
        startChallengers();
    }
})

// CREATE CARDS, DECKLIST, CHALLENGERS SECTION
createCards();
createDeckList();
startChallengers();