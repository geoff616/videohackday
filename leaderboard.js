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
    data: function () {
      //get the player on the page with the right ID
      callTheYouTube(this.params.query.video_id)

      //trying to set up the real time chat
      window.myDataRef = new Firebase('https://torrid-fire-9103.firebaseio-demo.com/');
      window.myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };


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
  function callTheYouTube(videoID){
    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {

      // New Video Player, the first argument is the id of the div.
      // Make sure it's a global variable.
      player = new YT.Player("player", {

        height: "400",
        width: "600",


        videoId: videoID,

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
