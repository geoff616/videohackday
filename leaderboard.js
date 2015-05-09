// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "videos".

Players = new Mongo.Collection("videos");

//Make the routes

// simple route with
// name 'home' that
// matches '/' and automatically renders
// template 'home'
Router.route('/', function () {
  this.render('home');
});
// complex route with
// name 'postDetail' that for example
// matches '/posts/1' or '/posts/hello-world' and automatically renders
// template 'postDetail'
Router.route('/video/:_id', function () {
  this.render('video');
});

//Testing adding data to route

Router.map(function(){
  this.route('test', {
    path: '/test',
    data: {
      someValue: "Hello, I'm a value.",
      anotherValue: "Hello, I'm another value."
    }
  });
});

if (Meteor.isClient) {

}

if (Meteor.isServer) {



}
