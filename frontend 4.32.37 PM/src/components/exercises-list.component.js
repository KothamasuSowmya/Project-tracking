import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "./nav.css";
import "./list.css";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Link as MuiLink,
} from "@mui/material";

const mapStateToProps = (state) => ({
  user: state.user // Assuming your Redux store has a slice called "user" with the user's information
});

const Exercise = (props) => {
  const isEvenRow = props.index % 2 === 0;
  const cellClass = isEvenRow ? "alternate-cell" : "normal";
  const durationValue = parseFloat(props.exercise.duration);
  return (
    <TableRow>
      <TableCell className={cellClass} sx={{ fontSize: '1rem', textAlign: 'center', borderBlock: '1px solid #00dfc0' }}>{props.exercise.username}</TableCell>
      <TableCell className={cellClass} sx={{ fontSize: '1rem', textAlign: 'center', borderBlock: '1px solid #00dfc0' }}>{props.exercise.description}</TableCell>
      <TableCell className={cellClass} sx={{ fontSize: '1rem', textAlign: 'center', borderBlock: '1px solid #00dfc0' }}>{durationValue}</TableCell>
      <TableCell className={cellClass} sx={{ fontSize: '1.2rem', textAlign: 'center', borderBlock: '1px solid #00dfc0' }}>
        <MuiLink component={Link} to={"/edit/" + props.exercise._id}style={{textDecoration:"none"}}>
          <div>edit</div>
        </MuiLink>{" "}
      
        <MuiLink
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
          style={{textDecoration:"none"}}
        >
          <span className="text-danger" >delete</span>
        </MuiLink>{" "}
      </TableCell>
    </TableRow>
  );
};

class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3000/exercises/")
      .then((response) => {
        this.setState({
          exercises: response.data
        });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    axios.delete("http://localhost:3000/exercises/" + id).then((res) => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id)
    });
  }
  exerciseList() {
    return this.state.exercises.map((currentexercise, index) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
          index={index}
        />
      );
    });
  }

  render() {
    const { user } = this.props;
    const { exercises } = this.state; // Destructure exercises from the state

    return (
      <div className="container   ">
        <div className="container col-lg-8">
          <h2 className="text-center mt-5 me-5 ms-5">
            Welcome to <span style={{ color: "#00dfc0" }}>Exercise Tracking</span> website!!
          </h2>
          <p className="text-secondary text-center mb-5 mt-4">
            Here are the exercise logs of all the users that you have been created. Here you would be able to create
            more users
           and then can create exercise logs for the users and can delete the logs if you want to or else
            modify the data.
          </p>
        </div>

        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {exercises.length === 0 ? (
            <Typography variant="h5" color="textSecondary" mt={4}>
              Oops!! there are no recent entries.
            </Typography>
          ) : (
            <TableContainer>
              <Table sx={{ border: "1px solid #00dfc0" }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#00dfc0", color: "white" }}>
                    <TableCell sx={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}>Username</TableCell>
                    <TableCell sx={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}>Description</TableCell>
                    <TableCell sx={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}>Duration</TableCell>
                    <TableCell sx={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{this.exerciseList()}</TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExercisesList);
