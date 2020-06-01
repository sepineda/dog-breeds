import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  makeStyles,
  Container,
  GridList,
  GridListTile,
  ListSubheader,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  page: {
    paddingTop: theme.spacing(2),
  },
  container: {
    margin: 20,
  },
}));

export default function BreedPictures() {
  const router = useRouter();
  const classes = useStyles();
  const { breed } = router.query;
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const pictures = await Axios.get(
        `https://dog.ceo/api/breed/${breed}/images`
      ).then((r) => r.data.message);
      setImages(pictures);
    }
    fetchData();
  }, []);

  return (
    <Container classes={{ root: classes.container }}>
      <Link href="/">
        <Button variant="contained" color="primary">
          Go Back
        </Button>
      </Link>
      <GridList cellHeight={260} className={classes.gridList} cols={3}>
        <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
          <ListSubheader component="div">{breed}</ListSubheader>
        </GridListTile>
        {images.map((image) => (
          <GridListTile cols={1}>
            <img src={image} />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}
