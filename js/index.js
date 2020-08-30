//-----------------------Ein- & ausblenden Overlay-------------------------------------------------------//

const openOverlay = (id) => { document.getElementById(id).style.display = "block" };

const closeOverlay = (id) => { document.getElementById(id).style.display = "none" };

//-----------------------Fetch--------------------------------------------------------------------------//

async function fetchData(apiURL, parseJSON = true) {
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    let data = null;
    if (parseJSON) {
        data = await response.json();
    } else {
        data = await response.text();
    }
    return data;
}

//-----------------------neues JSON bauen-------------------------------------------------------------//

const newArray = [];

fetch("../JSON/cda-paintings-v2.de.json").then(function (response) {
    return response.json();
}).then(function (data) {

    for (let i in data.items) {

        var title = data.items[i]['titles'][0]['title'];
        var description = data.items[i].description;
        var dimensions = data.items[i].dimensions;
        var year = data.items[i].dating.dated;
        var inventoryNumber = data.items[i].inventoryNumber;
        var repository = data.items[i].repository;
        var location = data.items[i]['locations'][0]['term']

        var image = data.items[i].images;

        for (let j in image) {
            var image_1 = image[j].l;

            for (let k in image_1) {
                var image_2 = image_1.src
            }
        }

        newArray.push({ year, inventoryNumber, title, image_2, description, repository, dimensions, location });
    }

    //-----------------------GroupBy------------------------------------------------------------------//

    // GroupBy übernommen von https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752

    var arrayAll = [];
    var object_1 = {};

    var groupBy = data => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[data];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    const groupByDated = groupBy('year');

    const groupByArray = groupByDated(newArray)


    for (i in groupByArray) {
        var testl = groupByArray[i];
        for (l in testl) {
            var images_1 = testl
        }
        arrayAll.push({ 'year': i, images_1 })
    }

    object_1.data = arrayAll;


    //-----------------------Mustache--------------------------------------------------------------//

    async function mustache() {

        var mustacheElement = document.querySelector('[data-js-render-mustache]');
        const templateURL = await fetchData('./template.html', false);

        const renderedSection = Mustache.render(templateURL, { daten: object_1 })
        mustacheElement.innerHTML = renderedSection;
    }
    mustache()

});

