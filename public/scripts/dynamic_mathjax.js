function update() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js";

    var config = 'MathJax.Hub.Config({' +
        'extensions: ["tex2jax.js"],' +
        'jax: ["input/TeX","output/HTML-CSS"]' +
        '});' +
        'MathJax.Hub.Startup.onload();';

    if (window.opera) { script.innerHTML = config }
    else { script.text = config }

    document.getElementsByTagName("head")[0].appendChild(script);
}

function run() {
    // document.getElementsByTagName("head")[0].removeChild(document.getElementsByTagName("head")[0].lastChild); // be very careful with this line of code
    update();
}

setTimeout(run, 1000);

// taken from https://sites.math.rutgers.edu/courses/MathJax/docs/html/dynamic.html