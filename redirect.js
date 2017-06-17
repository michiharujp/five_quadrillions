(function(){

    var ua = navigator.userAgent.toUpperCase();
    var url = document.location.href;
    var pcPath = 'yukichi.html';

    (ua.indexOf('IPHONE') != -1 || (ua.indexOf('ANDROID') != -1 && ua.indexOf('MOBILE') != -1))? isSP() : isPC();

    function isSP(){
        if(!url.match(pcPath)) return false;
        else location.href = 'index.html';
    }

    function isPC(){
        if(url.match(pcPath)) return false;
        else location.href = pcPath;
    }

}());
