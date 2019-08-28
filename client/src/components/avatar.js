import React, { Component } from "react";
import "../main.css";
import { Link } from "react-router-dom";
class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: ""
    };
  }

  componentDidMount() {
    fetch(`/players/${this.props.id}`)
      .then(res => res.json())
      .then(result => this.setState(result[0]));
  }

  render() {
    return (
      <Link to={`/player/${this.props.id}`}>
        <img
          className={this.props.className}
          src={
            process.env.PUBLIC_URL +
            `/avatars/${this.state.name}${this.state.surname}.png`
          }
          alt={`${this.state.name} ${this.state.surname}`}
        />
      </Link>
    );
  }
}

export default Avatar;
