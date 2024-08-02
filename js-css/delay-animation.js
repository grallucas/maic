document.body.classList.add('js-loading');
window.addEventListener("load", function(){
    if(!document.hidden){
        document.body.classList.remove('js-loading');
    }
});

document.addEventListener('visibilitychange', function(e) {
    document.body.classList.remove('js-loading');
});