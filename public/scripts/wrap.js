function init() {
    var header = document.getElementsByTagName('header')[0]
    fetch('./pages/header.html')
        .then(response => response.text())
        .then(text => header.innerHTML = text);
    var footer = document.getElementsByTagName('footer')[0];
    fetch('./pages/footer.html')
        .then(response => response.text())
        .then(text => footer.innerHTML = text);
}

setTimeout(init, 0);