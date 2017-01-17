//
// Controller for the Main Page
// Talent's Page
////////////////////////////////////


TalentPage.controller('MainPageController',  
    function($scope){

	var vm = this;

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    $scope.blogposts = [{blogNum: 'blog5', name: 'Motivation vs Discipline', date: 'January 16 2017'},
                        {blogNum: 'blog4', name: 'The momentum of failure and success', date: 'November 6 2016'},
                        {blogNum: 'blog3', name: 'Dealing with difficult concepts and logic', date: 'September 6 2016'},
                        {blogNum: 'blog2', name: 'Early bird or night owl', date: 'June 19 2016'},
                        {blogNum: 'blog1', name: 'Learning how to learn', date: 'May 19 2016'}];

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


});