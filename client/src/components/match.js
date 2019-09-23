import React from "react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Avatar from "./avatar";

export default function Match(props) {
  const [logs, setLogs] = useState([]);

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

    logs.forEach(element => {
      let button = document.getElementById(`logButton${element.id}`);
      button.addEventListener("click", function() {
        event.target.seekTo(element.timestamp, true);
        event.target.playVideo();
      });
    });
  }
  const fetchData = async () => {
    const data = await fetch(`/matches/${props.match.params.id}`);
    const items = await data.json();
    setLogs(items);
  };

  const renderButton = logs => {
    const buttons = logs.map(element => {
      return (
        <div className="logButton" id={`logButton${element.id}`}>
          <Avatar id={element.player_id} />
          <p>{element.log}</p>
        </div>
      );
    });

    return buttons;
  };

  // fetchData();
  //player.seekTo(seconds:367, allowSeekAhead:true)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="match">
      {renderButton(logs)}

      <YouTube
        id="matchYt"
        videoId="7YTPWEO1oO0"
        opts={opts}
        onReady={_onReady}
      />
    </div>
  );
}
