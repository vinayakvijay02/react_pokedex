import React, { useState, useEffect } from "react";
import mockData from "./mockData";
import { Typography, Link } from "@material-ui/core";
import { firstCharUpperCase } from "./utils";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";

import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    position: "fixed",
    top: "10%",
    left: "40%",
  },
  media: {
    height: 130,

    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const TYPE_COLORS = {
  bug: "#B1C12E",
  dark: "#4F3A2D",
  dragon: "#755EDF",
  electric: "#FCBC17",
  fairy: "#F4B1F4",
  fighting: "#823551D",
  fire: "#E73B0C",
  flying: "#A3B3F7",
  ghost: "#6060B2",
  grass: "#74C236",
  ground: "#D3B357",
  ice: "#A3E7FD",
  normal: "#C8C4BC",
  poison: "#934594",
  psychic: "#ED4882",
  rock: "#B9A156",
  steel: "#B5B5C3",
  water: "3295F6",
};
const Pokemon = (props) => {
  const { history } = props;
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);
  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;

    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    const colorValue = types.map((type) => type.type.name);
    const themeColor = colorValue.map(
      Map.prototype.get,
      new Map(Object.entries(TYPE_COLORS).map(([k, v]) => [k, v]))
    );

    return (
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {`${id}`}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                {pokemon !== undefined && (
                  <ArrowBackRoundedIcon
                    variant="contained"
                    onClick={() => history.push("/")}
                  />
                )}
              </IconButton>
            }
            title={firstCharUpperCase(name)}
            subheader={types.map((typeInfo, key) => {
              const colorSelectedValue = themeColor[key];
              const { type } = typeInfo;
              const { name } = type;

              return (
                <Chip
                  key={name}
                  //  icon={`<img alt="${name}"  src="${MyIcon}" style="max-height: 10px; max-width: 10px;" >`}
                  avatar={
                    <Avatar
                      src={`/images/types/${name}.png`}
                      style={{ backgroundColor: `${colorSelectedValue}` }}
                    />
                  }
                  label={`${name}`}
                  clickable
                  color="primary"
                  style={{ backgroundColor: `${colorSelectedValue}` }}
                />
              );
              // return <Typography key={name}> {`${name}`}</Typography>;
            })}
          />
          <CardMedia
            className={classes.media}
            image={fullImageUrl}
            title="Paella dish"
          />
          <CardContent>
            <Typography>
              <Typography variant="h3">Pokemon Info</Typography>
              <Typography>
                {"Species: "}
                <Link href={species.url}>{species.name} </Link>
              </Typography>
              <Typography>Height: {height} </Typography>
              <Typography>Weight: {weight} </Typography>
              {/* <Typography variant="h6"> Types:</Typography>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography key={name}> {`${name}`}</Typography>;
              })} */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
    </>
  );
};
export default Pokemon;
