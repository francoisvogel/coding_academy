async function getChild(id) {
    var root = document.createElement('div');
    
}

async function init() {
    var data = await fetch('./data/news/setup.json');
    data = await data.text();
    data = JSON.parse(data);
    data = data.news;
    for (let i = 0; i < data.length; i++) {
        document.getElementById('news').appendChild(await getChild(data[i]));
    }
}

init();