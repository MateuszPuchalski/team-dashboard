import React from "react";
import { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import Avatar from "./avatar";
import AddMatchLog from "./addMatchLog";
import SearchLog from "./searchLog";
import MatchTimeline from "./matchTimeline";
import SketchBoard from "./sketchBoard";
import GoalPost from "./goalPost";

export default function Match(props) {
  const [logs, setLogs] = useState([]);
  const [youtubeId, setYoutubeId] = useState("");
  const [time, setTime] = useState(0);
  const youtubeRef = useRef();
  const opts = {
    height: "826",
    width: "1250",
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

    // let testThis = document.getElementById("testThis");
    // testThis.addEventListener("click", function() {
    //   setInterval(function() {
    //     console.log(time);
    //     setTime(event.target.getCurrentTime());
    //   }, 1000);

    //   // console.log(event.target.getCurrentTime());
    //   // setTime(event.target.getCurrentTime());
    // });

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
      const data = await fetch(`/matches/${props.match.params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const items = await data.json();
      console.log({ matches: items });
      setLogs(items);
    }
  };

  const fetchYoutubeId = async () => {
    if (props.match.params.id == "undefined") {
      console.log("WTF!?");
    } else {
      const data = await fetch(`/matches/youtubeId/${props.match.params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
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
        <button className="logButton" id={`logButton${element.id}`}>
          <Avatar id={element.player_id} />
          {element.assist_id > 0 ? <Avatar id={element.assist_id} /> : null}
          <div className="timeStamp">{timeString}</div>

          <div>
            {element.log == "throw" ? (
              element.throw_acc == "true" || element.throw_acc == 1 ? (
                <div className="ball">
                  <img
                    src={process.env.PUBLIC_URL + `/ball.png`}
                    id="ball"
                    alt="ball"
                  />
                </div>
              ) : (
                "X"
              )
            ) : (
              element.log
            )}
          </div>
        </button>
      );
    });

    return buttons;
  };

  // fetchData();
  //player.seekTo(seconds:367, allowSeekAhead:true)
  useEffect(() => {
    fetchData();
    fetchYoutubeId();
    console.log(youtubeRef.current);
  }, []);

  return (
    <>
      <div className="match">
        <YouTube
          ref={youtubeRef}
          id="matchYt"
          videoId={youtubeId}
          opts={opts}
          onReady={_onReady}
        />

        {/* <SketchBoard width={1250} height={703} /> */}
      </div>
      <div className="log">
        <SearchLog />
        {renderButton(logs)}

        {!youtubeRef.current ? (
          "Loading..."
        ) : (
          <AddMatchLog
            youtubeControler={youtubeRef.current}
            match={props.match.params.id}
          />
        )}
      </div>
    </>
  );
}
