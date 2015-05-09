//Track users online status
urls = new Mongo.Collection("urls");


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
      window.myDataRef = new Firebase('https://torrid-fire-9103.firebaseio-demo.com/' + this.params.query.video_id);
      window.myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };

      //Track online status


    }
  });
});





if (Meteor.isClient) {

    function callTheYouTube(videoID) {
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

    }
    YT.load();



}


if (Meteor.isServer) {





}
