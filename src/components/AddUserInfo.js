import React, { useState } from "react";

// class AddUserInfo extends React.Component {
//   state = {
//     name: '',
//     address: 'Can Tho',
//     age: '',
//   }

//   handleInputName = (event) => {
//     this.setState({
//       name: event.target.value,
//     })
//   }

//   handleInputAge = (event) => {
//     this.setState({
//       age: event.target.value,
//     })
//   }

//   handleSubmitForm = (event) => {
//     event.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 1000) + '-random',
//       name: this.state.name,
//       age: this.state.age,
//     });
//   }

//   render() {
//     return (
//       <>
//         <div>
//           My name is {this.state.name} and I'm from {this.state.address}. I'm {this.state.age}
//         </div>
//         <form onSubmit={(event) => this.handleSubmitForm(event)}>
//           <label>Your name: </label>
//           <input type="text" onChange={(event) => this.handleInputName(event)} value={this.state.name} />
//           <br />
//           <label>Your age: </label>
//           <input type="text" onChange={(event) => this.handleInputAge(event)} value={this.state.age} />
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </>
//     )
//   }
// }

const AddUserInfo = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");


  const handleInputName = (event) => {
    setName(event.target.value);
  }

  const handleInputAge = (event) => {
    setAge(event.target.value);
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100) + '-random',
      name: name,
      age: age,
    });
  }


  return (
    <>
      <div>
        My name is {name} and I'm {age}
      </div>
      <form onSubmit={(event) => handleSubmitForm(event)}>
        <label>Your name: </label>
        <input type="text" onChange={(event) => handleInputName(event)} value={name} />
        <br />
        <label>Your age: </label>
        <input type="text" onChange={(event) => handleInputAge(event)} value={age} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default AddUserInfo;