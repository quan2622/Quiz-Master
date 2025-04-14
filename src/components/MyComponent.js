import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";

// class MyComponent extends React.Component {
//   state = {
//     users: [
//       { id: 1, name: "Quan dep trai", age: "16" },
//       { id: 2, name: "Quan xau trai", age: "23" },
//       { id: 3, name: "Quan AP", age: "24" },
//     ]
//   }

//   handleAddNewUser = (newUserData) => {
//     console.log(newUserData);
//     this.setState({
//       users: [newUserData, ...this.state.users],
//     })
//   }

//   handleDeleteUser = (userId) => {
//     let listUserCopy = [...this.state.users];
//     listUserCopy = listUserCopy.filter(item => item.id !== userId);
//     this.setState({
//       users: [...listUserCopy],
//     })
//   }

//   render() {
//     return (
//       <>
//         <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
//         <br />
//         <br />
//         {/* DRY: Don't repeat yourself */}

//         <DisplayInfo users={this.state.users} handleDeleteUser={this.handleDeleteUser} />
//       </>
//     )
//   }
// }

const MyComponent = () => {

  const [users, updateUser] = useState([
    { id: 1, name: "Quan dep trai", age: "16" },
    { id: 2, name: "Quan xau trai", age: "23" },
    { id: 3, name: "Quan AP", age: "24" },
  ]);

  console.log(users);

  const handleAddNewUser = (newUserData) => {
    updateUser([newUserData, ...users]);
  }

  const handleDeleteUser = (userId) => {
    let usersCopy = [...users];
    usersCopy = usersCopy.filter(user => user.id !== userId);
    updateUser(usersCopy);
  }

  return (
    <>
      <AddUserInfo handleAddNewUser={handleAddNewUser} />
      <br />
      <br />
      {/* DRY: Don't repeat yourself */}

      <DisplayInfo users={users} handleDeleteUser={handleDeleteUser} />
    </>
  )
}

export default MyComponent;