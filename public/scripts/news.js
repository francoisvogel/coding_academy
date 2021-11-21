async function getChild(data) {
    var root = document.createElement('div');
    root.classList = 'w-full bg-white shadow-2xl sm:w-4/5 lg:w-3/5 p-5 flex flex-col justify-between m-5 items-center duration-200 transform hover:scale-105'

    var title = document.createElement('h1');
    title.classList = 'text-2xl sm:text-5xl py-3 text-center';
    title.innerHTML = data.name;

    var generalInfo = document.createElement('p');
    generalInfo.innerHTML = 'By '+data.author+' on '+data.date_day+'/'+data.date_month+'/'+data.date_year;

    var readTime = document.createElement('p');
    readTime.classList = 'text-gray-800 font-extrabold text-center'
    readTime.innerHTML = data.read+' min read';

    var description = document.createElement('p');
    description.classList = 'text-lg sm:text-2xl p-2';
    description.innerHTML = data.description;

    var readMore = document.createElement('a');
    readMore.classList = 'text-xl sm:text-3xl text-center m-2 duration-200 transform hover:scale-105 w-max'
    readMore.href = './news?article='+data.id;
    readMore.innerHTML = 'Read more';

    var sub = document.createElement('div');
    sub.classList = 'flex flex-row justify-between items-center text-base sm:text-xl my-5 w-full'
    sub.appendChild(generalInfo);
    sub.appendChild(readTime);

    root.appendChild(title);
    root.appendChild(sub);
    root.appendChild(description);
    root.appendChild(readMore);

    return root;
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