import React from "react";

class UserInfo extends React.Component {
  state = {
    name: 'Quan xau trai',
    address: 'Can Tho',
    age: 21,
  }

  handleInput = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div>
          My name is {this.state.name} and I'm from {this.state.address}. I'm {this.state.age}
        </div>
        <form onSubmit={(event) => this.handleSubmitForm(event)}>
          <input type="text" onChange={(event) => this.handleInput(event)} value={this.state.name} />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

export default UserInfo;