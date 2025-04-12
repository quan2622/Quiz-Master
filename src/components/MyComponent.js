import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  state = {
    users: [
      { id: 1, name: "Quan dep trai", age: "22" },
      { id: 2, name: "Quan xau trai", age: "23" },
      { id: 3, name: "Quan AP", age: "24" },
    ]
  }


  render() {
    return (
      <div>
        <UserInfo />
        <br />
        <br />
        {/* DRY: Don't repeat yoursefl */}
        { }
        <DisplayInfo users={this.state.users} />
      </div>
    )
  }
}

export default MyComponent;