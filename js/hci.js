$(document).ready(function() {
    initializeSideNav();
    var offset = 60;

    $('#sidenav-content li a').click(function(event) {
        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -offset);
    });

    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    });

    if (urlParams['debug'] != null) {
        $('small.notes').css("display", "block");
    }

});

function initializeSideNav() {
    var selector = '.sidenav #sidenav-content'
    if ($(selector).length == 0) {
        console.log("No element matching selector " + selector + ". No sidenav present.");
        return;
    }

    // figure out minimum header value (e.g., h3 is the largest)
    var uniqueHeaderIndices = [];
    $('.sidenav-anchor').each(function() {
        var header = $(this).children(':header').first();
        // http://stackoverflow.com/questions/5127017/automatic-numbering-of-headings-h1-h6-using-jquery
        var hIndex = parseInt(header.prop('nodeName').substring(1));
        if ($.inArray(hIndex, uniqueHeaderIndices) == -1) {
            uniqueHeaderIndices.push(hIndex);
        }
        uniqueHeaderIndices.sort();
    });

    // now put all the <h> elements under each sidenav-anchor into the sidenav
    $('.sidenav-anchor').each(function() {
        var header = $(this).children(':header').first();
        var hrefTarget = $(this).prop('id');
        var levelsDeep = $.inArray(parseInt(header.prop('nodeName').substring(1)), uniqueHeaderIndices);

        var elem = "";
        for (var i=0; i<levelsDeep; i++) {
            elem += "<ul class='nav'><li>";
        }
        elem += '<a href="#' + hrefTarget + '">' + header.text() + '</a>';
        for (var i=0; i<levelsDeep; i++) {
            elem += "</li></ul>";
        }

        $('#sidenav-content').append('<li>' + elem + '</li>');
    });
}

// from StackOverflow:
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();