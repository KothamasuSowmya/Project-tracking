import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exerciseData, setExerciseData] = useState({
    username: "",
    description: "",
    duration: 0,
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exerciseResponse = await axios.get(
          `http://localhost:3000/exercises/${id}`
        );
        const userResponse = await axios.get("http://localhost:3000/users/");

        setExerciseData((prevState) => ({
          ...prevState,
          username: exerciseResponse.data.username,
          description: exerciseResponse.data.description,
          duration: exerciseResponse.data.duration,
          users: userResponse.data.map((user) => user.username),
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const onChangeUsername = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      username: e.target.value,
    }));
  };

  const onChangeDescription = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const onChangeduration = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      duration: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { username, description, duration } = exerciseData;
    const exercise = {
      username,
      description,
      duration,
    };

    try {
      await axios.post(`http://localhost:3000/exercises/update/${id}`, exercise);
      console.log("Exercise updated successfully!");
      navigate("/exerciselist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <select
            required
            className="form-control"
            value={exerciseData.username}
            onChange={onChangeUsername}
          >
            {exerciseData.users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            required
            className="form-control"
            value={exerciseData.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            type="text"
            required
            className="form-control"
            value={exerciseData.duration}
            onChange={onChangeduration}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
