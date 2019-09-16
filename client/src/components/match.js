import React from "react";
import YouTube from "react-youtube";

export default function Match() {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    },
    startSeconds: 3600
  };

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.seekTo(367, true);
    event.target.playVideo();

    let playButton = document.getElementById("przycisk");
    playButton.addEventListener("click", function() {
      event.target.seekTo(367, true);
      event.target.playVideo();
    });
    let playButton2 = document.getElementById("przycisk2");
    playButton2.addEventListener("click", function() {
      event.target.seekTo(405, true);
      event.target.playVideo();
    });
  }

  function boom() {
    document.getElementById("matchYt");
    console.log("boom");
  }
  //player.seekTo(seconds:367, allowSeekAhead:true)

  return (
    <div className="match">
      <h1 id="przycisk">Match Start</h1>
      <h1 id="przycisk2">Bramka Puchal</h1>
      <YouTube
        id="matchYt"
        videoId="7YTPWEO1oO0"
        opts={opts}
        onReady={_onReady}
      />
    </div>
  );
}
