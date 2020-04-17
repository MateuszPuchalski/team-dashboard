import React from "react";
import styled from "styled-components";

const borderRadius = "5px";

const Wrapper = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  background: ${(props) => props.theme.primary};
  /* background: linear-gradient(to right, #0f2027, #203a43, #2c5364); */
  padding: 2rem;
  border-radius: ${borderRadius};

  margin: 1rem;
  .stat {
    margin-bottom: 1rem;
    

    }
    .statName {
      
    }
    .statNumber {
      font-weight: bold;
    }
  }
`;

export default function SeasonStats() {
  return (
    <Wrapper>
      <h3>SEASON STATS</h3>
      <div className="stat">
        <span className="statName">Appearances: </span>
        <span className="statNumber">12</span>
      </div>
      <div className="stat">
        <span className="statName">Goals: </span>
        <span className="statNumber">88</span>
      </div>
      <div className="stat">
        <span className="statName">Throws: </span>
        <span className="statNumber">120</span>
      </div>
      <div className="stat">
        <span className="statName">Assists: </span>
        <span className="statNumber">55</span>
      </div>
      <div className="stat">
        <span className="statName">Steals: </span>
        <span className="statNumber">7</span>
      </div>
    </Wrapper>
  );
}
