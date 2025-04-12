import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: '',
    address: 'Can Tho',
    age: '',
  }

  handleInputName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleInputAge = (event) => {
    this.setState({
      age: event.target.value,
    })
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 1000) + '-random',
      name: this.state.name,
      age: this.state.age,
    });
  }

  render() {
    return (
      <>
        <div>
          My name is {this.state.name} and I'm from {this.state.address}. I'm {this.state.age}
        </div>
        <form onSubmit={(event) => this.handleSubmitForm(event)}>
          <label>Your name: </label>
          <input type="text" onChange={(event) => this.handleInputName(event)} value={this.state.name} />
          <br />
          <label>Your age: </label>
          <input type="text" onChange={(event) => this.handleInputAge(event)} value={this.state.age} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

export default AddUserInfo;