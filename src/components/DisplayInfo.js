import React from "react";

class DisplayInfo extends React.Component {
  render() {
    let { name, age } = this.props;
    return (
      <div>
        <div>My nam {name}</div>
        <div>I'm {age}</div>
      </div>
    )
  }
}

export default DisplayInfo;