import React from "react";

class DisplayInfo extends React.Component {
  render() {
    let { users } = this.props;
    return (
      <>
        {users.map((item, index) => (
          <div key={item.id}>
            <div>Index: {index + 1}</div>
            <div>My name {item.name}</div>
            <div>I'm {item.age}</div>
            <hr />
          </div>
        )
        )}
      </>
    )
  }
}

export default DisplayInfo;