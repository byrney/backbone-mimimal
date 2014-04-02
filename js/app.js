var app = {
	views: {},
	models: {},
	routers: {},

	init: function(callback) {
		// app initialization goes here
		callback();
	}
};

app.views.HomeView = Backbone.View.extend({

	initialize: function () {
		// note:  $el will get set by framework
	},

	render: function () {
		this.$el.html("<h1> Home View  </h1> <a href='#page2'>Link to page2</a><p><button >A button</button></p>");
		return this;
	},

	buttonClicked: function() {
		alert("Click event handled in the view");
	},

	events: {
		"click button": "buttonClicked"
	},

});

app.routers.AppRouter = Backbone.Router.extend({

	routes: {
		"page2":					"page2",
		"":							"home",
	},

	page2: function() {
		alert('Navigation handled in router to #page2');
	},

	home: function() {
		var contentDiv = $('#contents');
		var v = new app.views.HomeView({el: contentDiv});
		v.render();
	},

});

// this is where it all kicks off
$(document).on("ready", function () {
	app.init( function () {
		app.router = new app.routers.AppRouter();
		Backbone.history.start();
	});
});


