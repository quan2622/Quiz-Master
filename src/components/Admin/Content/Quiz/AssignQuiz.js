import { useEffect, useState } from "react";
import Select from "react-select";
import { getDataQuizTable, postAssignQuizToUser } from "../../../../services/quizService";
import { getAllUser } from "../../../../services/userService";
import { toast } from "react-toastify";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    fetchListQuiz();
    fetchListUser();
  }, []);

  // console.log('check list quiz: ', listQuiz);
  const fetchListQuiz = async () => {
    // API get list quiz
    const res = await getDataQuizTable();
    if (res.EC === 0) {
      let new_quiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        }
      })
      setListQuiz(new_quiz);
    }
  }
  const fetchListUser = async () => {
    // API get list user
    const res = await getAllUser();
    console.log('check res user: ', res);
    if (res.EC === 0) {
      let new_user = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        }
      })
      setListUser(new_user);
    }
  }

  const handleAssignQuizToUser = async () => {
    const res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  }

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group select-quiz">
        <label className="mb-2">Select Quiz</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group select-quiz">
        <label className="mb-2">Select User</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div className="my-4">
        <button className="btn btn-warning" onClick={() => handleAssignQuizToUser()}>Assign</button>
      </div>
      <hr />
      <div className="table-list-user mt-3">
        <table className="table table-bordered table-hover border-primary">
          <thead>
            <tr>
              <th className="text-center" style={{ 'width': '100px' }}>Assigned</th>
              <th className="text-center" >Id</th>
              <th className="text-center" >Name</th>
              <th className="text-center" >Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center"><input type="checkbox" /></td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AssignQuiz;