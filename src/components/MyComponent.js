import React from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
  state = {
    users: [
      { id: 1, name: "Quan dep trai", age: "16" },
      { id: 2, name: "Quan xau trai", age: "23" },
      { id: 3, name: "Quan AP", age: "24" },
    ]
  }

  handleAddNewUser = (newUserData) => {
    console.log(newUserData);
    this.setState({
      users: [...this.state.users, newUserData],
    })
  }

  render() {
    return (
      <div>
        <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
        <br />
        <br />
        {/* DRY: Don't repeat yoursefl */}

        <DisplayInfo users={this.state.users} />
      </div>
    )
  }
}

export default MyComponent;