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


//Videos!
Router.map(function() {
  this.route('video', {
    path: '/video',
    data: function () { callTheYouTube()


    }
  });
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
  function callTheYouTube(){
    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {

      // New Video Player, the first argument is the id of the div.
      // Make sure it's a global variable.
      player = new YT.Player("player", {

        height: "400",
        width: "600",

        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
        videoId: "LdH1hSWGFGU",

        // Events like ready, state change,
        events: {

          onReady: function (event) {

            // Play video when player ready.
            event.target.playVideo();
          }

        }

      });

    };

    YT.load();

  }
};



if (Meteor.isServer) {



}
