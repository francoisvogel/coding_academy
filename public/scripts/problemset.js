async function generatePart(data, name) {
    var element = document.createElement('div');
    element.classList = "flex flex-col";
    var title = document.createElement('h3');
    title.classList = "text-base sm:text-lg p-2 font-bold text-center w-full bg-indigo-800";
    var content = document.createElement('p');
    content.classList = "text-sm sm:text-base p-3";
    title.innerHTML = name;
    content.innerHTML = data;
    element.appendChild(title);
    element.appendChild(content);
    return element;
}

async function problemWrapper(data) {
    var problem = document.createElement('div');
    problem.classList = "w-full sm:w-4/5 lg:w-3/5 xl:w-1/2 rounded bg-indigo-600 my-10";

    var name = document.createElement('h1');
    name.classList = "text-lg sm:text-xl font-semibold";
    name.innerHTML = data.name + ' (problem code: ' + data.id + ')';

    var difficulty = document.createElement('h2');
    difficulty.classList = "p-4 rounded-full bg-black w-min";
    difficulty.innerHTML = data.difficulty;

    var heading = document.createElement('div');
    heading.classList = "w-full flex flex-row justify-between items-center rounded-tl rounded-tr bg-indigo-700 p-4";
    heading.appendChild(name);
    heading.appendChild(difficulty);

    problem.appendChild(heading);

    var statement = await fetch('./data/problemset/' + data.id + '/statement.html');
    statement = await statement.text();

    problem.appendChild(await generatePart(statement, 'Statement'));

    var solution = await fetch('./data/problemset/' + data.id + '/solution.html');
    solution = await solution.text();

    problem.appendChild(await generatePart(solution, 'Solution'));

    var code = await fetch('./data/problemset/' + data.id + '/code.html');
    code = await code.text();

    problem.appendChild(await generatePart(code, 'Code'));

    var links = problem.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].classList = 'italic text-blue-300 hover:text-blue-200 duration-200 font-semibold';
        links[i].setAttribute('target', '_blank'); // opens in new tab
    }

    return problem;
}

async function showProblems() {
    var root = document.getElementById('problemset');
    fetch('./data/problemset/setup.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            var setup = json;
            setup = setup.problemset;
            for (var i = 0; i < setup.length; i++) {
                problemWrapper(setup[i]).then(child => root.appendChild(child));
            }
        });
}

setTimeout(showProblems, 0);