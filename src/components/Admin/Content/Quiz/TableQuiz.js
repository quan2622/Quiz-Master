import { useEffect, useState } from "react";

const TableQuiz = (props) => {

  const { listQuiz } = props;

  useEffect(() => {
    props.fetchDataQuiz();
  }, []);


  const handleUpdate = (dataQuiz) => {
    props.handleUpdate(dataQuiz);
  }

  const handleViewInfo = (dataQuiz) => {
    props.handleViewInfo(dataQuiz);
  }

  const handleDeleteQuiz = (dataQuiz) => {
    props.handleDeleteQuiz(dataQuiz);
  }

  return (
    <>
      <div className="title">
        List Quizzes
      </div>
      <table className="table table-hover table-bordered my-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz && listQuiz.length > 0 && listQuiz.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleViewInfo(item)}>Info</button>
                  <button className="btn btn-warning mx-2" onClick={() => handleUpdate(item)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteQuiz(item)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default TableQuiz;