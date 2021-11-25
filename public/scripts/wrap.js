function init() {
    while (document.getElementsByTagName('header').length == 0) { }
    var header = document.getElementsByTagName('header')[0]
    fetch('./pages/header.html')
        .then(response => response.text())
        .then(text => header.innerHTML = text);
    while (document.getElementsByTagName('header').length == 0) { }
    var footer = document.getElementsByTagName('footer')[0];
    fetch('./pages/footer.html')
        .then(response => response.text())
        .then(text => footer.innerHTML = text);
}

setTimeout(init, 0);
