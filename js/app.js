var app = {
	views: {},
	models: {},
	classes: {},

	init: function(callback) {
		// app initialization goes here
		callback();
	}
};

app.classes.VersionsView = Backbone.View.extend({

	render: function () {
		this.$el.html("<h1> Versions </h1>");
		return this;
	},

	events: {
	},

});

app.classes.DocumentView = Backbone.View.extend({

	render: function () {
		this.$el.html("<h1> Document </h1>");
		return this;
	},

	events: {
	},

});


app.classes.TreeView = Backbone.View.extend({

	initialize: function () {
		// note:  $el will get set by framework
	},

	render: function () {
		this.$el.html("<h1> Tree View  </h1> <a href='#page2'>Link to page2</a><p><button >A button</button></p>");
		return this;
	},

	buttonClicked: function() {
		alert("Click event handled in the view");
	},

	events: {
		"click button": "login"
	},

	login: function() {
		var login = $.ajax({
			type: "POST",
			url: "/dex-dev-mobile/api/login",
			data: { user_id: "rob", pass: "rob", app: "webexp", version: "0.1"},
		});
		login.done(function(){ console.log("logged in") });
	},

});

app.classes.BrowseModel = Backbone.Model.extend({

	url: "/dex-dev-mobile/api/browse",

});



app.classes.AppRouter = Backbone.Router.extend({

	routes: {
		"page2":					"page2",
		"":							"home",
		"login":					"login",
	},

	page2: function() {
		alert('Navigation handled in router to #page2');
	},

	home: function() {
		app.views.tree = new app.classes.TreeView({el: $('#content-tree') });
		app.views.versions = new app.classes.VersionsView({el: $('#content-versions') });
		app.views.document = new app.classes.DocumentView({el: $('#content-document') });
		app.views.tree.render();
		app.views.versions.render();
		app.views.document.render();
		app.models.browse = new app.classes.BrowseModel();
		app.models.browse.fetch();
	},

});

// this is where it all kicks off
$(document).on("ready", function () {
	app.init( function () {
		app.router = new app.classes.AppRouter();
		Backbone.history.start();
	});
});


