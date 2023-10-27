const decklist = [
    {
        nome: 'elemental hero neos', 
        qtd: 1
    },
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
        qtd: 2
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
        qtd: 1
    },
    {
        nome: 'elemental hero liquid soldier',
        qtd: 1
    },
    {
        nome: 'elemental hero blazeman',
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
        qtd: 2
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
        nome: 'favorite contact',
        qtd: 1
    },
    {
        nome: 'elemental hero shining neos wingman',
        qtd: 1
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
        nome: 'xtra hero infernal devicer',
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
        nome: 'blue-eyes white dragon'
    },
    {
        nome: 'Lady Labrynth of the Silver Castle'
    },
    {
        nome: 'Dark Magician'
    },
    {
        nome: 'Accesscode Talker'
    }
]

// VARIAVEIS GLOBAIS
let mainDeck = []
let mainChallengers = []

// FUNCTIONS

// SANITIZE
const sanitizeItems = string => DOMPurify.sanitize(string);

// BODY OVERFLOW
const bodyOverflowChange = () => document.querySelector('body').classList.toggle('loading')

// LOADING
const loadingSpinner = () => {
    bodyOverflowChange();
    document.getElementById('spinner').classList.toggle('active');
}

// API
const getElementalHeroApi = async(type, hero) => {
    try{
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${type}=${hero}`);
        const data = response.json();
        return data;
    }catch(error){
        bodyOverflowChange();
        document.getElementById('error-api').classList.toggle('error');
        document.getElementById('error-api-text').textContent = error;
    }
}

const filterCards = (list, getData) => {
    const deck = [];
    
    list.forEach(card => {
        getData.data.filter(element => {
            if(element.name.toLowerCase() == card.nome.toLowerCase()){
                deck.push(element)
            }
        }) 
    })

    return deck;
}

// INIT FUNCTION
const init = async () => {
    loadingSpinner()

    const promiseDataEH = getElementalHeroApi('archetype', 'Elemental Hero');
    const promiseDataDH = getElementalHeroApi('archetype', 'Destiny Hero');
    const promiseDataVH = getElementalHeroApi('archetype', 'Vision Hero');
    const promiseDataMH = getElementalHeroApi('archetype', 'Masked Hero');
    const promiseStaples = getElementalHeroApi('staple', 'yes')
    const promiseFighters = getElementalHeroApi('rarity', 'Prismatic Secret Rare')

    const datas = await Promise.all([promiseDataEH, promiseDataDH, promiseDataVH, promiseDataMH, promiseStaples])
    const getFighters = await promiseFighters;

    // FILTER DECKLIST
    
    const elementalHeroes = filterCards(decklist, datas[0]);
    const destinyHeroes = filterCards(decklist, datas[1]);    
    const visionHeroes = filterCards(decklist, datas[2]);
    const maskedHeroes = filterCards(decklist, datas[3]);
    const staples = filterCards(decklist, datas[4]);
    const fighters = filterCards(challengers, getFighters);
    
    let elementalHeroTrinity = []
    visionHeroes.forEach(element => 
        element.name.toLowerCase() == "vision hero trinity"
        ? elementalHeroTrinity = element 
        : '');

    mainDeck = [...elementalHeroes, ...destinyHeroes, ...visionHeroes, ...maskedHeroes, ...staples];
    mainChallengers = [elementalHeroTrinity, ...fighters];

    createCards(mainDeck)
    createDeckList(mainDeck)
    startChallengers(mainChallengers);

    loadingSpinner()
}

// CREATE DECKLIST SECTION WITH API AND FILTER DECKLIST
const createDeckList = mainDeck => {
    const fragment = document.createDocumentFragment()

    decklist.forEach(card => {
        mainDeck.filter(element => {
            if(element.name.toLowerCase() == card.nome.toLowerCase()){
                for(let i = 0; i < card.qtd; i++){
                    const newDiv = document.createElement('div');
                    newDiv.setAttribute('class', 'card-container')
                    const newImg = document.createElement('img');
                    newImg.setAttribute('data-bs-toggle', 'modal');
                    newImg.setAttribute('data-bs-target', '#exampleModal');
                    newImg.setAttribute('class', 'card-decklist');
                    newImg.setAttribute('src', sanitizeItems(element.card_images[0].image_url));
                    newImg.setAttribute('alt', sanitizeItems(element.name));
                    
                    newDiv.append(newImg);
                    fragment.append(newDiv)
                }
            }
        })
    })
    
    document.getElementById('main-deck').appendChild(fragment)
}

// CREATE HEROES SECTION WITH API (I DECIDED TO NOT CREATE A JSON HERE AND MAKE WITH IF ELSE)
const createCards = mainDeck => {
    const heroesCards = []

    const fragment = document.createDocumentFragment();

    mainDeck.filter(hero => {
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
        if(hero.name.toLowerCase().includes("shining neos wingman")){
            heroesCards.push(hero)
        }
    })

    heroesCards.forEach(hero => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('hero-img', 'rounded');

        const newImg = document.createElement('img');
        newImg.setAttribute('class', 'rounded');
        newImg.setAttribute('src', sanitizeItems(hero.card_images[0].image_url_cropped));
        newImg.setAttribute('alt', sanitizeItems(hero.name));
        
        newDiv.append(newImg);
        fragment.append(newDiv)
    })

    document.getElementById('heroes').appendChild(fragment);
}

// CREATE CHALLENGER SECTION WITH API - TRINITY
const startChallengers = mainChallengers => {
    document.getElementById('trinity-container').innerHTML = "";
    
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'trinity-main');
    newDiv.setAttribute('class', 'rounded d-flex flex-column align-items-center justify-content-between');
    
    const newDivImg = document.createElement('div');
    newDivImg.setAttribute('class', 'trinity-img');

    const newImg = document.createElement('img');
    newImg.setAttribute('class', 'mb-4');
    newImg.setAttribute('src', sanitizeItems(mainChallengers[0].card_images[0].image_url_cropped))
    newImg.setAttribute('al', 'Vision Hero Trinity');

    const newH3 = document.createElement('h3');
    newH3.setAttribute('class', 'mb-4 fw-bold text-center');
    newH3.textContent = 'Draw an archetype to face Trinity';

    const newBtn = document.createElement('button');
    newBtn.setAttribute('class', 'btn cta');
    newBtn.setAttribute('id', 'challenge');
    newBtn.textContent = "Challenge";

    newDivImg.appendChild(newImg);
    newDiv.append(newDivImg, newH3, newBtn);

    document.getElementById('trinity-container').appendChild(newDiv)
}

// 2ND STAGE OFF CHALLENGE SECTION WITH API - TRINITY VS RANDOM CHALLENGER FROM JSON FILTER
const challengeFunc = mainChallengers => {
    document.getElementById('trinity-container').innerHTML = ""
    let randomChallenge = 0

    while(randomChallenge == 0){
        randomChallenge = Math.floor(Math.random() * mainChallengers.length);
    }
    
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'trinity-duel');
    newDiv.setAttribute('class', 'rounded d-flex flex-column align-items-center justify-content-between');

    const newDivDuel = document.createElement('div');
    newDivDuel.setAttribute('id', 'duel')
    newDivDuel.setAttribute('class', 'd-flex align-items-center container justify-content-evenly')
    
    const newDivTrinity1 = document.createElement('div');
    newDivTrinity1.setAttribute('class', 'trinity-img text-center')
    
    const newDivTrinity2 = document.createElement('div');
    newDivTrinity2.setAttribute('class', 'trinity-img text-center')

    const newImgVS = document.createElement('img');
    newImgVS.setAttribute('src', 'img/vs.png');
    newImgVS.setAttribute('id', 'versus');
    newImgVS.setAttribute('alt', 'VS');

    const newImgChallenger1 = document.createElement('img');
    newImgChallenger1.setAttribute('class', 'mb-4')
    newImgChallenger1.setAttribute('src', sanitizeItems(mainChallengers[0].card_images[0].image_url_cropped))
    newImgChallenger1.setAttribute('alt', sanitizeItems(mainChallengers[0].name))
    
    const newImgChallenger2 = document.createElement('img');
    newImgChallenger2.setAttribute('class', 'mb-4')
    newImgChallenger2.setAttribute('src', sanitizeItems(mainChallengers[randomChallenge].card_images[0].image_url_cropped))
    newImgChallenger2.setAttribute('alt', sanitizeItems(mainChallengers[randomChallenge].name))

    const newH3Chall1 = document.createElement('h3');
    newH3Chall1.setAttribute('class', 'mb-4 fw-bold text-center');
    newH3Chall1.textContent = sanitizeItems(mainChallengers[0].name);
    
    const newH3Chall2 = document.createElement('h3');
    newH3Chall2.setAttribute('class', 'mb-4 fw-bold text-center');
    newH3Chall2.textContent = sanitizeItems(mainChallengers[randomChallenge].name);

    const newButtonChall1 = document.createElement('button');
    newButtonChall1.setAttribute('class', 'btn cta');
    newButtonChall1.setAttribute('id', 'aposta1');
    newButtonChall1.textContent = "Vote";
    
    const newButtonChall2 = document.createElement('button');
    newButtonChall2.setAttribute('class', 'btn cta');
    newButtonChall2.setAttribute('id', 'aposta2');
    newButtonChall2.textContent = "Vote";

    newDivTrinity1.append(newImgChallenger1, newH3Chall1, newButtonChall1);
    newDivTrinity2.append(newImgChallenger2, newH3Chall2, newButtonChall2);
    newDivDuel.append(newDivTrinity1, newImgVS, newDivTrinity2);
    newDiv.append(newDivDuel);

    document.getElementById('trinity-container').appendChild(newDiv)
}

// FINAL CHALLENGE SECTION - TRINITY CRASH
const trinityCrash = mainChallengers => {
    document.getElementById('trinity-container').innerHTML = "";
    
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'trinity-crash');
    newDiv.setAttribute('class', 'rounded d-flex flex-column align-items-center justify-content-between');

    const newDivImg = document.createElement('div');
    newDivImg.setAttribute('class', 'trinity-img');

    const newImg = document.createElement('img');
    newImg.setAttribute('class', 'mb-4');
    newImg.setAttribute('src', sanitizeItems(mainChallengers[0].card_images[0].image_url_cropped))
    newImg.setAttribute('al', 'Vision Hero Trinity');

    const newH3 = document.createElement('h3');
    newH3.setAttribute('class', 'mb-4 fw-bold text-center');
    newH3.textContent = 'Trinity Crash';

    const newBtn = document.createElement('button');
    newBtn.setAttribute('class', 'btn cta');
    newBtn.setAttribute('id', 'restart');
    newBtn.textContent = "New Challenge";

    newDivImg.appendChild(newImg);
    newDiv.append(newDivImg, newH3, newBtn);

    document.getElementById('trinity-container').appendChild(newDiv)
}

// MODAL SHOWS CARDS BY DECKLIST
document.getElementById('main-deck').addEventListener('click', (e) => {
    if(e.target.classList.contains('card-decklist')){
        document.querySelector('#modal-img').src = e.target.src;
    }
})

// TRINITY FUNCTIONS
document.getElementById('trinity').addEventListener('click', (e) => {
    if(e.target.id == "challenge" || e.target.id == "restart"){
        challengeFunc(mainChallengers);
    }
    if(e.target.id == "aposta1" || e.target.id == "aposta2"){
        trinityCrash(mainChallengers)
    }
})

// init
init()

// MENU COLOR ON SCROLL
window.addEventListener('scroll', () => {
    window.scrollY > 0 
            ? document.querySelector('#header').classList.add('active') 
            : document.querySelector('#header').classList.remove('active')
})

// CLOSE MENU MOBILE ON CLICK
const menuToggle = document.getElementById('navbarNavDropdown')

document.querySelectorAll('#navbar-list .nav-item .nav-link').forEach(item => {
    item.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(menuToggle)
        bsCollapse.toggle()
    })
})