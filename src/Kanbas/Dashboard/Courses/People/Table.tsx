import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as peopleClient from "../People/client";
import { setEnrollments } from "../../Enrollment/reducer";
import { useDispatch } from "react-redux";
import ProtectedContent from "../../../Account/ProtectedContent";


export default function PeopleTable() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  
  const [users, setUsers] = useState<any[]>([]);
  const [isAddPeopleView, setIsAddPeopleView] = useState(false);
  const [userIdToAdd, setUserIdToAdd] = useState("");
  
  const [editState, setEditState] = useState<Record<string, boolean>>({});
  const [newSection, setNewSection] = useState<Record<string, string>>({});

  const toggleEdit = (userId: string) => {
    setEditState((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  const handleSectionChange = (userId: string, value: string) => {
    setNewSection((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const updateSection = async (userId: string) => {

      const updatedUser = await peopleClient.updateUserSection(userId, newSection[userId]);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, section: newSection[userId] } : user
        )
      );
      

  };

  const handleKeyPress = (e: React.KeyboardEvent, userId: string) => {
    if (e.key === "Enter") {
      updateSection(userId);
      toggleEdit(userId);
      setEditState((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const fetchPeople = async () => {
    const usersData = await peopleClient.findCoursePeople(cid as string);
    setUsers(usersData);
    dispatch(setEnrollments(usersData));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const addUserToCourse = async () => {
    const userExists = users.some((user: any) => user._id === userIdToAdd);

    if (userExists) {
      alert(`User with ID ${userIdToAdd} already exists in the course.`);
      return;
    } else {
      await peopleClient.addUserToCourse(cid, userIdToAdd);
      fetchPeople();
      setIsAddPeopleView(false);
    }
  };

  const removeUserFromCourse = async (userId: string) => {
    try {
      await peopleClient.removeUserFromCourse(cid, userId);
      fetchPeople();
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            <ProtectedContent>
              <th></th><th></th>
            </ProtectedContent>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">
                  {editState[user._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={newSection[user._id] || user.section}
                      onChange={(e) => handleSectionChange(user._id, e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, user._id)}
                      autoFocus
                    />
                  ) : (
                    user.section
                  )}
                </td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
                <ProtectedContent>
                  <td>
                    <button
                      className="btn btn-warning"
                      id="wd-update-people"
                      onClick={() => toggleEdit(user._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      id="wd-remove-people"
                      onClick={() => removeUserFromCourse(user._id)}
                    >
                      Remove
                    </button>
                  </td>
                </ProtectedContent>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ProtectedContent>
        <button
          className="btn btn-primary mb-4"
          id="wd-add-people"
          onClick={() => setIsAddPeopleView((prev) => !prev)}
        >
          Add Student
        </button>

        {isAddPeopleView ? (
          <div className="mb-5 border p-2">
            <label htmlFor="enroll-user-id">Write Student ID</label>
            <input
              id="enroll-user-id"
              name="enroll-user-id"
              type="text"
              className="form-control"
              onChange={(e) => setUserIdToAdd(e.target.value)}
            />
            <label htmlFor="enroll-course-id">Course ID</label>
            <input
              disabled
              id="enroll-course-id"
              name="enroll-user-id"
              type="text"
              className="form-control mb-4"
              defaultValue={cid}
            />
            <button
              className="btn btn-danger me-2"
              id="wd-remove-people"
              onClick={addUserToCourse}
            >
              Add
            </button>
            <button
              className="btn btn-secondary"
              id="wd-remove-people"
              onClick={() => setIsAddPeopleView(false)}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </ProtectedContent>
    </div>
  );
}


