import Tangram from "../../components/tangram";
import tangrams from "../../assets/tangrams.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  toolbarButtons: {
    marginLeft: "auto",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Examples() {
  const classes = useStyles();
  const router = useRouter();

  const examples = ["page4-51", "page6-243", "page8-54"];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
          <Typography variant="h6" align="center" className={classes.title}>
            Examples
          </Typography>
        </Toolbar>
      </AppBar>

      <GridList
        cols={6}
        className={classes.gridList}
        style={{ margin: "12px", padding: "12px" }}
      >
        {examples.map((name) => {
          const filename = name + ".svg";
          const value = tangrams[filename];
          return (
            <GridListTile
              key={name}
              rows={1.5}
              onClick={() => {
                router.push(`/examples/${encodeURIComponent(filename)}`);
              }}
            >
              <Tangram
                viewBox={value["viewBox"]}
                points={value["points"]}
                colors={[
                  "lightgray",
                  "lightgray",
                  "lightgray",
                  "lightgray",
                  "lightgray",
                  "lightgray",
                  "lightgray",
                ]}
                transform={value["transform"]}
              ></Tangram>
              <GridListTileBar
                title={name}
                // subtitle={
                //   <span>{fileNameToCounts[name] + " annotations"}</span>
                // }
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}
