import React from "react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Avatar from "./avatar";
import AddMatchLog from "./addMatchLog";
import MatchTimeline from "./matchTimeline";

export default function Match(props) {
  const [logs, setLogs] = useState([]);
  const [youtubeId, setYoutubeId] = useState("");
  const [time, setTime] = useState(0);
  const opts = {
    height: "490",
    width: "740",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    },
    startSeconds: 3600
  };

  function boom() {
    console.log("boom");
  }

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.seekTo(367, true);
    event.target.playVideo();

    let testThis = document.getElementById("testThis");
    testThis.addEventListener("click", function() {
      setInterval(function() {
        console.log(time);
        setTime(event.target.getCurrentTime());
      }, 1000);

      // console.log(event.target.getCurrentTime());
      // setTime(event.target.getCurrentTime());
    });

    console.log(testThis);
    console.log(this);
    console.log(event);
    logs.forEach(element => {
      let button = document.getElementById(`logButton${element.id}`);
      button.addEventListener("click", function() {
        console.log(event.target.getCurrentTime());
        event.target.seekTo(element.timestamp, true);
        event.target.playVideo();
      });
    });
  }

  const fetchData = async () => {
    if (props.match.params.id == "undefined") {
      console.log("WTF!?");
    } else {
      const data = await fetch(`/matches/${props.match.params.id}`);
      const items = await data.json();
      setLogs(items);
    }
  };

  const fetchYoutubeId = async () => {
    if (props.match.params.id == "undefined") {
      console.log("WTF!?");
    } else {
      const data = await fetch(`/matches/youtubeId/${props.match.params.id}`);
      const items = await data.json();
      setYoutubeId(items[0]["youtube_id"]);
    }
  };

  const renderButton = logs => {
    const buttons = logs.map(element => {
      let dateObj = new Date(element.timestamp * 1000);
      let hours = dateObj.getUTCHours();
      let minutes = dateObj.getUTCMinutes();
      let seconds = dateObj.getSeconds();
      let timeString = (function() {
        let timeStamp = "";
        if (hours > 0) {
          timeStamp += hours.toString().padStart(2, "0") + ":";
        }
        if (hours < 1) {
          timeStamp += minutes.toString() + ":";
        } else {
          timeStamp += minutes.toString().padStart(2, "0") + ":";
        }

        timeStamp += seconds.toString().padStart(2, "0");
        return timeStamp;
      })();

      return (
        <div className="logButton" id={`logButton${element.id}`}>
          <Avatar id={element.player_id} />
          <div className="timeStamp">{timeString}</div>
          <div className="ball">
            <img
              src={process.env.PUBLIC_URL + `/ball.png`}
              id="ball"
              alt="ball"
            />
          </div>
        </div>
      );
    });

    return buttons;
  };

  // fetchData();
  //player.seekTo(seconds:367, allowSeekAhead:true)
  useEffect(() => {
    fetchData();
    fetchYoutubeId();
  }, []);

  return (
    <>
      <div className="match">
        <YouTube
          id="matchYt"
          videoId={youtubeId}
          opts={opts}
          onReady={_onReady}
        />
        <AddMatchLog match={props.match.params.id} />
      </div>
      <div className="log">{renderButton(logs)}</div>
      <h1 id="testThis">{time}</h1>
      <MatchTimeline />
    </>
  );
}
