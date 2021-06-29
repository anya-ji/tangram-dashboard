import Tangram from "../components/tangram";
import { badExamples } from "../assets/badExamples";
import tangrams from "../assets/tangrams.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeColor, makeAnnotation } from "../components/util";
import React from "react";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
  },
  table: {
    minWidth: 650,
    margin: "1vh",
  },
}));

export default function Qual(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="center" className={classes.title}>
            Tutorial & Examples
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} style={{ margin: "3px" }}>
        <Grid item xs={12} color="primary">
          <Typography variant="h4" align="center" className={classes.title}>
            Demo
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ReactPlayer
            className="react-player"
            url="qual/demo.mp4"
            controls={true}
          />
        </Grid>

        <Grid item xs={12} style={{ marginTop: "5px" }}>
          <Typography variant="h4" align="center" className={classes.title}>
            Bad Examples of Annotations
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Bad Example</TableCell>
                  <TableCell align="center">As a whole</TableCell>
                  <TableCell align="center">By parts</TableCell>
                  <TableCell align="center">Why is it bad?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {badExamples.map((value) => {
                  const colorInfo = makeColor(value.piece);
                  const colors = colorInfo["colors"];
                  const annList = makeAnnotation(colorInfo["annToColor"]);
                  return (
                    <TableRow key={badExamples.indexOf(value)}>
                      <TableCell align="center">
                        {
                          <Tangram
                            viewBox={tangrams["a.svg"].viewBox}
                            points={tangrams["a.svg"].points}
                            colors={colors}
                          ></Tangram>
                        }
                      </TableCell>
                      <TableCell align="center">{value.whole}</TableCell>
                      <TableCell align="center">{annList}</TableCell>
                      <TableCell align="center">{value.explanation}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
