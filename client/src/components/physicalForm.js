import React, { Component } from "react";
import Logo from "./logo";

class PhysicalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: [],
      error: null
    };
  }

  fetchMatches() {
    fetch("/matches")
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        this.setState({
          matches: data,
          isLoading: false
        });
      });
  }
  componentDidMount() {
    this.fetchMatches();
  }

  render() {
    const { isLoading, matches, error } = this.state;
    return (
      <div className="physicalFormWrapper">
        <div className="physicalFormHeader">
          <h3>PHYSICAL FORM</h3>
          <p>Average Rating: 8.5</p>
        </div>
        <div className="physicalForm">
          {error ? <p>{error.message}</p> : null}

          {!isLoading ? (
            <>
              <Logo match={matches[0]} />
              <Logo match={matches[1]} />
              <Logo match={matches[2]} />
              <Logo match={matches[3]} />
              <Logo match={matches[4]} />
            </>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    );
  }
}

export default PhysicalForm;
