var TalentPage = angular.module("TalentPage", ["ngMaterial", "ui.router", "ngRoute"])

TalentPage.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){

	    $urlRouterProvider.otherwise('/');

		$stateProvider
			.state('blogPosts', {
				url: '/',
				templateUrl: 'talentzeng/posts.html'
			})

			.state('profile', {
				url: '/profile',
				templateUrl: '/talentzeng/profile.html'
			})

			.state('experience', {
				url: '/experience',
				templateUrl: '/talentzeng/experience.html'
			})

			.state('projects', {
				url: '/projects',
				templateUrl: '/talentzeng/projects.html'
			})

			.state('blog4', {
				url: '/11-06-2016',
				templateUrl: '/talentzeng/blogposts/11-06-2016.html'
			})

			.state('blog3', {
				url: '/09-06-2016',
				templateUrl: '/talentzeng/blogposts/09-06-2016.html'
			})

			.state('blog2', {
				url: '/06-19-2016',
				templateUrl: '/talentzeng/blogposts/06-19-2016.html'
			})

			.state('blog1', {
				url: '/05-19-2016',
				templateUrl: '/talentzeng/blogposts/05-19-2016.html'
		});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}
]);

$(document).on("ready page:load", function(){
	angular.bootstrap(document.body, ["TalentPage"]);
});