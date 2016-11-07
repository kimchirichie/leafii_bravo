var TalentPage = angular.module("TalentPage", ["ngMaterial", "ui.router", "ngRoute"])

TalentPage.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider){

	    $urlRouterProvider.otherwise('/');

		$stateProvider
			.state('blogPosts', {
				url: '/talentzeng/',
				templateUrl: 'posts.html'
			})

			.state('profile', {
				url: '/talentzeng/profile',
				templateUrl: 'profile.html'
			})

			.state('experience', {
				url: '/talentzeng/experience',
				templateUrl: 'experience.html'
			})

			.state('projects', {
				url: '/talentzeng/projects',
				templateUrl: 'projects.html'
			})

			.state('blog4', {
				url: '/talentzeng/11-06-2016',
				templateUrl: 'blogposts/11-06-2016.html'
			})

			.state('blog3', {
				url: '/talentzeng/09-06-2016',
				templateUrl: 'blogposts/09-06-2016.html'
			})

			.state('blog2', {
				url: '/talentzeng/06-19-2016',
				templateUrl: 'blogposts/06-19-2016.html'
			})

			.state('blog1', {
				url: '/talentzeng/05-19-2016',
				templateUrl: 'blogposts/05-19-2016.html'
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