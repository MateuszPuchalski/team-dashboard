import React, { Component } from "react";
import Metrics from "./metrics";
import Statue from "./statue";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      position: "",
      age: "",
      height: null,
      weight: null,
      nr: null,
      isLoading: true,
      error: null,
      urlPlayerId: null,
      active: false
    };
    // this.fetchData = this.fetchData.bind(this);
  }

  // this.setState({ idUrl: this.props.match.params.id });
  // const data = await fetch(`/players/${this.props.match.params.id}`);
  fetchData() {
    fetch(`/players/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          ...data[0],
          isLoading: false,
          urlPlayerId: this.props.match.params.id,
          active: true
        })
      );
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
  componentWillUnmount() {
    this.setState({ active: false });
  }

  render() {
    const { isLoading, error } = this.state;

    return (
      <>
        {!isLoading ? (
          <div className="playerInfo">
            <div className="info">
              <h1>
                {this.state.name.toUpperCase()}{" "}
                {this.state.surname.toUpperCase()}
              </h1>
              <p>{this.state.position}</p>
            </div>

            <Statue
              nr={this.state.nr}
              name={this.state.name}
              surname={this.state.surname}
            />
            <Metrics
              weight={this.state.weight}
              height={this.state.height}
              age={this.state.age}
            />
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </>
    );
  }
}

export default PlayerInfo;
