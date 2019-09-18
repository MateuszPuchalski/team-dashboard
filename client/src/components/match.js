import React from "react";
import YouTube from "react-youtube";
import Avatar from "./avatar";

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
      <div id="przycisk2">
        <Avatar id={1} />
      </div>

      <YouTube
        id="matchYt"
        videoId="7YTPWEO1oO0"
        opts={opts}
        onReady={_onReady}
      />
    </div>
  );
}
