//
// Controller for the Main Page
// Talent's Page
////////////////////////////////////


App.controller('MainPageController',  
    function($scope){

	var vm = this;

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    //On Load
    $("#main").load("posts.html");

    //toggleClass
    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    //Hamburger link click
    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };


    $('#about').on("click", function(){
        $("#main").load("profile.html");
    });

    $('#home').on("click", function(){
        $("#main").load("posts.html");
    });

    $('#experience').on("click", function(){
        $("#main").load("experience.html");
    });

    $('#projects').on("click", function(){
        $("#main").load("projects.html");
    });







});