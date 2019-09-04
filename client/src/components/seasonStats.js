import React, { Component } from "react";

class SeasonStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      urlPlayerId: null
    };
  }
  fetchData() {
    fetch(`/players/${this.props.match.params.id}/goals`)
      .then(response => response.json())
      .then(data => {
        let goals = 0;
        data.forEach(element => {
          goals += element.goals;
        });

        this.setState({
          appearances: data.length,
          goals: goals,
          isLoading: false,
          urlPlayerId: this.props.match.params.id
        });
      });
  }

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id != this.state.urlPlayerId) {
      this.fetchData();
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        {!isLoading ? (
          <div className="seasonStats">
            <h3>SEASON STATS</h3>
            <p>
              Appearances: <span>{this.state.appearances}</span>
            </p>
            <p>
              Goals: <span>{this.state.goals}</span>
            </p>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </>
    );
  }
}

export default SeasonStats;
