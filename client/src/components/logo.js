import React, { Component } from "react";
import { Link } from "react-router-dom";

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { against, date, match_id, youtube_id } = this.props.match;
    return (
      <>
        {youtube_id === "" ? (
          <img
            className="logo"
            src={process.env.PUBLIC_URL + `/logo/${against}.webp`}
            alt="LOGO"
          />
        ) : (
          <Link to={`/matches/${match_id}`}>
            <img
              className="logo"
              src={process.env.PUBLIC_URL + `/logo/${against}.webp`}
              alt="LOGO"
            />
          </Link>
        )}

        {/* <p>{date.substring(5)}</p> */}
      </>
    );
  }
}

export default Logo;
