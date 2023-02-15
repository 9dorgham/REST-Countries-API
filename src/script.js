let section = document.getElementById('countries')
let select = document.querySelector('select')
let input = document.querySelector('input')




async function getData() {
    try {
        let respon = await fetch('./data.json');

        if (!respon.ok) {
            throw new Error(`HTTP error: ${respon.status}`)
        }

        let ob = await respon.json()
        return ob;
    }catch (er) {
        console.log(`Could not get data, Error type: ${er}`)
    }
}


getData().then((ob) => {
    displayCountries(ob, '')

    select.addEventListener('change', (e) => {
        displayCountries(ob, e.target.value)
    })

    input.addEventListener('change', (e) => {
        let countryName = e.target.value.toLowerCase()
    
        searchEngin(ob, countryName)
    })
})





class Country {
    constructor(src, name, pop, region, capital) {
        this.src = src;
        this.name = name;
        this.pop = pop;
        this.region = region;
        this.capital = capital;
    }

    addToDOM() {
        let parent = document.createElement('figure'),
        img = document.createElement('img'),
        anchor = document.createElement('a'),
        figc = document.createElement('figcaption'),
        name = document.createElement('strong'),
        pop = document.createElement('p'),
        region = document.createElement('p'),
        capital = document.createElement('p');
   
        anchor.href = "./country.html"
        img.src = this.src;
        img.setAttribute('alt', '');
        name.textContent = this.name;
        pop.innerHTML = `<b>Population:</b> ${this.pop}`;
        region.innerHTML = `<b>Region</b>: ${this.region}`;
        capital.innerHTML = `<b>Capital</b>: ${this.capital}`;
        parent.classList.add('card')
   

        // anchor.appendChild(img)
        figc.append(name, pop, region, capital)
        parent.append(img, figc)
        section.appendChild(parent)
    }
}


function displayCountries(ob, continent) {
    section.textContent = ''
    for (i = 0; i < ob.length; i++) {
        let countryOb = ob[i]
        let card = new Country(
            countryOb.flag, 
            countryOb.name, 
            countryOb.population, 
            countryOb.region, 
            countryOb.capital)

            if (continent == card.region) {
                card.addToDOM()
            }else if (!continent) {
                card.addToDOM()
            }
    }
}




function searchEngin(arr, countryName) {
    let first = arr.slice(0, arr.length / 2);
    let second = arr.slice(arr.length / 2);

    let found = false

    for (let ob of first) {
        if (ob.name.toLowerCase() == countryName) {
            found = true;
            section.innerHTML = '';
            displayCountries([ob], ob.region)
        }
    }

    if (found == false) {
        for (let ob of second) {
            if (ob.name == countryName) {
                found = true;
                section.innerHTML = '';
                displayCountries([ob], ob.region)
            }
        }
    }

    if (!found)  {
        section.innerHTML = '';
        let result = document.createElement('p')
        result.classList.add('result')
        result.textContent = "The country not found";
        section.appendChild(result)
    }
}



// section.children[0].addEventListener('click', shareData(this), false)