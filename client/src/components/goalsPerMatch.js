import React, { useState, useEffect } from "react";

export default function GoalsPerMatch(props) {
  const [goals, setGoals] = useState([]);
  const [averageGoals, setAverageGoals] = useState({
    average: 0,
    color: "red"
  });
  const fetchData = async id => {
    const data = await fetch(`/players/${id}/goals`);
    const items = await data.json();
    items.sort((a, b) => new Date(a.date) - new Date(b.date));

    let goals = [];

    items.forEach(element => {
      goals.push(element.goals);
    });
    const averageGoals = (
      goals.reduce((a, b) => {
        return a + b;
      }, 0) / goals.length
    ).toFixed(2);

    const color =
      averageGoals < 2 ? "#E43025" : averageGoals < 6 ? "#DF7604" : "#01C23C";

    setAverageGoals({ average: averageGoals, color: color });
    setGoals(goals);
  };

  useEffect(() => {
    fetchData(props.id);
  }, [props.id]);

  return (
    <div className="physicalFormHeader">
      <h3>PHYSCIAL FORM</h3>
      <p>
        Average Goals:{" "}
        <span style={{ color: averageGoals.color }}>
          {averageGoals.average}
        </span>
      </p>
    </div>
  );
}

// fetchData() {
//     fetch(`/players/${this.props.match.params.id}/goals`)
//       .then(response => response.json())
//       .then(data => {
//         let goals = 0;
//         data.forEach(element => {
//           goals.push(element.goals);
//         });

//         this.setState({
//           appearances: data.length,
//           goals: goals,
//           isLoading: false,
//           urlPlayerId: this.props.match.params.id
//         });
//       });
//   }
