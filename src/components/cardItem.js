import React from "react";
import { useDispatch } from "react-redux";
import { toggleLikeCard, removeCard } from "../store/cardSlice";
import { Card, CardActions, CardContent, IconButton, Typography, makeStyles, withStyles } from "@material-ui/core";
import { FavoriteBorderOutlined, Favorite, Delete } from "@material-ui/icons";

const useStyles = makeStyles({
    card: {
        marginBottom: 25,
    },
    cardContent: {
        paddingBottom: 0,
    },
    cardActions: {

    },
    contentTitle: {

    },
    cardDescription: {

    },
});

const CardItem = ({id, name, image_link, liked, latin_name, habitat, geo_range}) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <img src={image_link} alt={image_link} style={{width: "100%", objectFit: "cover",}} />
            <CardContent className={classes.cardContent}>
                
                <Typography variant="h4">
                    {name}
                </Typography>
                <Typography>
                    Latin name: <b>{latin_name}</b>
                </Typography>
                <Typography>
                    Habitat: {habitat}, {geo_range}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton
                    aria-label="like"
                    color="secondary"
                    onClick={() => dispatch(toggleLikeCard({id}))}
                >
                    {liked ? <Favorite /> : <FavoriteBorderOutlined />}
                </IconButton>
                <IconButton
                    variant="contained"
                    color="default"
                    onClick={() => dispatch(removeCard({id, liked}))}
                >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default CardItem;