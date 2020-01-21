import React from "react";
import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <>
      {props.match.youtube_id === "" ? (
        <div>
          <img
            className="logo"
            src={process.env.PUBLIC_URL + `/logo/${props.match.against}.webp`}
            alt="LOGO"
          />
        </div>
      ) : (
        <Link to={`/matches/${props.match.match_id}`}>
          <div className="logoWithVideo">
            <img
              className="logo"
              src={process.env.PUBLIC_URL + `/logo/${props.match.against}.webp`}
              alt="LOGO"
            />
            <img
              id="youtubeLogo"
              src={process.env.PUBLIC_URL + `/youtube.svg`}
              alt=""
            />
          </div>
        </Link>
      )}
    </>
  );
}

// class Logo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const { against, date, match_id, youtube_id } = this.props.match;
//     return (
//       <>
//         {youtube_id === "" ? (
//           <img
//             className="logo"
//             src={process.env.PUBLIC_URL + `/logo/${against}.webp`}
//             alt="LOGO"
//           />
//         ) : (
//           <Link to={`/matches/${match_id}`}>
//             <img
//               className="logo"
//               src={process.env.PUBLIC_URL + `/logo/${against}.webp`}
//               alt="LOGO"
//             />
//           </Link>
//         )}
//       </>
//     );
//   }
// }

// export default Logo;
