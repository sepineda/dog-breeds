import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import axios from "axios";
import {
  GridList,
  GridListTile,
  Container,
  GridListTileBar,
} from "@material-ui/core";
import Link from "../src/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  gridList: {},
  container: {
    margin: 20,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Index() {
  const classes = useStyles();
  const [dogList, setDogList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let breeds = await axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then((r) => r.data.message);
      breeds = Object.keys(breeds);
      const list = breeds.map(async (breed) => {
        const image = await axios
          .get(`https://dog.ceo/api/breed/${breed}/images/random`)
          .then((r) => r.data.message);
        return { breed, image };
      });
      const breedList = await Promise.all(list)
      setDogList(breedList);
      setCurrentList(breedList); 
    }
    fetchData();
  }, []);
  const onChange = ({target: {value}}) => {
    console.log(dogList);
    setCurrentList(dogList.filter(d => d.breed.includes(value)))
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Dog Breeds
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={onChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container classes={{ root: classes.container }}>
        <GridList cellHeight={260} className={classes.gridList} cols={3}>
          {currentList.map((dog) => (
            <GridListTile key={dog.breed} cols={1}>
              <img src={dog.image} />
              <Link href="/[breed]" as={`/${dog.breed}`}>
                <GridListTileBar
                  title={dog.breed}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <PhotoLibraryIcon />
                    </IconButton>
                  }
                />
              </Link>
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </div>
  );
}
