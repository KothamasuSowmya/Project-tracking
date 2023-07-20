import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Autocomplete } from "@mui/material";

const CreateExercise = () => {
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState({
    username: "",
    description: "",
    duration: "",
    users: [],
  });
  const userInputRef = useRef(null);
  const [durationError, setDurationError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/");
        if (response.data.length > 0) {
          setExerciseData((prevState) => ({
            ...prevState,
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onChangeUsername = (e, newValue) => {
    setExerciseData((prevState) => ({
      ...prevState,
      username: newValue,
    }));
  };

  const onChangeDescription = (e) => {
    setExerciseData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };

  const onChangeduration = (e) => {
    const durationInput = e.target.value;
    const isValid = /^[0-9]*(\.[0-9]*)?$/.test(durationInput);

    setExerciseData((prevState) => ({
      ...prevState,
      duration: isValid ? durationInput : prevState.duration,
    }));

    setDurationError(isValid ? "" : "Please enter a valid number.");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: exerciseData.username,
      description: exerciseData.description,
      duration: exerciseData.duration,
    };
    console.log(exercise);

    axios
      .post("http://localhost:3000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    navigate("/exerciselist");
  };

  return (
    <div className="container col-lg-10 col-12 col-sm-12 col-md-10">
      <div>
        <h2 className="text-center mt-5 me-5 ms-5">
          This is <span style={{ color: "#00dfc0" }}>Create Exercise</span> log space
        </h2>
        <p className="text-secondary text-center mb-5 mt-4">
          Here you have a dropdown menu from that please do select the user you want
          <br></br> to store the data about him and then give description and the time spent!!
        </p>
      </div>

      <Box className="container col-lg-10" sx={{ justifyContent: "center", alignItems: "center" }}>
        <Box component="form" onSubmit={onSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
           <label className=" mb-2" style={{color:'#00dfc0'}}>Please select user from below dropdown :</label>
            <Autocomplete
              ref={userInputRef}
              options={exerciseData.users}
              value={exerciseData.username}
              onChange={onChangeUsername}
              renderInput={(params) => <TextField {...params} required />}
            />
          </FormControl>
          <TextField
            label="Description"
            type="text"
            required
            fullWidth
            value={exerciseData.description}
            onChange={onChangeDescription}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Duration (in minutes)"
            type="text"
            required
            fullWidth
            value={exerciseData.duration}
            onChange={onChangeduration}
            sx={{ mb: 2 }}
            error={Boolean(durationError)}
            helperText={durationError}
          />
          <Box display="flex" justifyContent="left">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#00dfc0",
                "&:hover": {
                  bgcolor: "#263238",
                },
              }}
            >
              Create Exercise Log
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateExercise;
