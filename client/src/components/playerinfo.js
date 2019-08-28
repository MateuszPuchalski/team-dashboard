import React, { Component } from "react";
import Metrics from "./metrics";
import Statue from "./statue";

class PlayerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      surname: "",
      position: "",
      age: "",
      height: null,
      weight: null,
      nr: null
    };
    // this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    // this.setState({ idUrl: this.props.match.params.id });
    const data = await fetch(`/players/${this.props.match.params.id}`);
    const metrics = await data.json();
    const final = await metrics[0];
    await this.setState({ ...final });
  };

  componentDidUpdate(prevProps) {
    // Typowy sposób użycia (nie zapomnij porównać właściwości):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
      this.setState({ idUrl: this.props.match.params.id });
    }
  }

  render() {
    return (
      <div className="playerInfo">
        <div className="info">
          <h1>
            {this.state.name.toUpperCase()} {this.state.surname.toUpperCase()}
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
    );
  }
}

export default PlayerInfo;
