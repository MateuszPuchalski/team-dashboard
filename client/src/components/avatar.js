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
    // console.log(window.location.href[window.location.href.length - 1]);
    // let classNames = "sidebar__item";
    // console.log(this.state.id);
    // if (
    //   window.location.href[window.location.href.length - 1] == this.state.id
    // ) {
    //   classNames += " avatarSelected";
    // }
    return (
      <div className={"sidebar__item"}>
        <Link to={`/player/${this.props.id}`}>
          <img
            src={
              process.env.PUBLIC_URL +
              `/avatars/${this.state.name}${this.state.surname}.png`
            }
            alt={`${this.state.name} ${this.state.surname}`}
          />
        </Link>
      </div>
    );
  }
}

export default Avatar;
