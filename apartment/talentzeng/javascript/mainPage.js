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

    $scope.views = [{name: 'home', url: '/posts.html'},
                    {name: 'profile', url: '/profile.html'},
                    {name: 'experience', url: '/experience.html'},
                    {name: 'projects', url: '/projects.html'}];

    //On load
    $scope.content = $scope.views[0].url;

    //Change on view click
    $scope.selectView = function(view){
        $scope.content = $scope.views[view].url;
        $scope.$broadcast('viewSelected', {index: view});
    };

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


    // $('#about').on("click", function(){
    //     $("#main").load("profile.html");
    // });

    // $('#home').on("click", function(){
    //     $("#main").load("posts.html");
    // });

    // $('#experience').on("click", function(){
    //     $("#main").load("experience.html");
    // });

    // $('#projects').on("click", function(){
    //     $("#main").load("projects.html");
    // });



});