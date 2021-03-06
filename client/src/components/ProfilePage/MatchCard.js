import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const matchCardWidth = "350px";
const borderRadius = "5px";

const Wrapper = styled.div`
  
  /* background: linear-gradient(to right, #0f2027, #203a43, #2c5364); */
  background: ${(props) => props.theme.primary};
  border-radius: ${borderRadius};
  width: ${matchCardWidth};
  box-shadow: ${(props) => props.theme.boxShadow};
  .competitionNameWrapper {
    /* ----- */
    border-top-left-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    width: ${matchCardWidth};
    border-bottom: 1px rgba(255, 255, 255, 0.3) solid;

    img {
      margin-right: 1rem;
      width: 33px;
      height: 33px;
    }
  }
  .mainPart {
    /* ____
      |OvsO|
     */
     color: white;
    background-image: url(${process.env.PUBLIC_URL}/matmatchcard.JPG);
    background-size: cover;
    /* border-bottom-left-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius}; */
    height: 180px;
    width: ${matchCardWidth};
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    .matchDesc {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 70px;
        height: 70px;
      }
      .clubName {
        margin-top: 1rem;
        font-weight: bold;
        font-size: 0.75rem;
      }
    }

    .scoreWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .youtubeIcon {
        flex-grow: 1;
      }
      .score {
        flex-grow: 3;
        display: flex;
        align-items: center;
      }
      .scoreNum {
        font-weight: bold;
        font-size: 1.5rem;
      }
      .vs {
        font-size: 0.75rem;
        margin: 0 1rem;
      }
      .date {
        flex-grow: 1;

        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  .matchStatsWrapper {
    min-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 30px;
    }
    .stats {
      overflow:hidden;
      width: ${matchCardWidth};
      height: 0; 
    }
  }
`;

export default function MatchCard() {
  const [open, setOpen] = useState(false);
  const props = useSpring({ height: open ? 200 : 0, from: { height: 0 } });

  return (
    <Wrapper>
      <div className="competitionNameWrapper">
        <img src={`${process.env.PUBLIC_URL}/logo/zprp.png`} />
        <span className="competitionName">2 Liga Piłki Ręcznej</span>
      </div>
      <div className="mainPart">
        <div className="matchDesc">
          <img src={`${process.env.PUBLIC_URL}/logo/AZSUMCSLublin.png`} />
          <div className="clubName">
            <span>AZS UMCS Lublin</span>
          </div>
        </div>
        <div className="scoreWrapper">
          <img
            className="youtubeIcon"
            src={`${process.env.PUBLIC_URL}/youtube.svg`}
          />
          <div className="score">
            <spand className="scoreNum">30</spand>
            <span className="vs">VS</span>
            <spand className="scoreNum">30</spand>
          </div>
          <div className="date">04/08/2020</div>
        </div>
        <div className="matchDesc">
          <img
            src={`${process.env.PUBLIC_URL}/logo/MKSPiotrkowianinPiotrkowTrybunalski.png`}
          />
          <div className="clubName">
            <span>MKS Piotrkiowianin</span>
          </div>
        </div>
      </div>
      <div className="matchStatsWrapper">
        <animated.div style={props} className="stats">
          <p>Woowowlwowlwo</p>
          <p>Woowowlwowlwo</p>

          <p>Woowowlwowlwo</p>

          <p>Woowowlwowlwo</p>

          <p>Woowowlwowlwo</p>
        </animated.div>

        <img
          onClick={() => setOpen(!open)}
          src={`${process.env.PUBLIC_URL}/down-arrow.svg`}
        />
      </div>
    </Wrapper>
  );
}
