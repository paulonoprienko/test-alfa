import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardItem from "./cardItem";
import { fetchCards } from "../store/cardSlice";
import { Checkbox, FormControlLabel, Grid, CircularProgress } from "@material-ui/core";


const Spinner = () => {
    return (
        <div style={{textAlign: 'center', padding: '2rem'}}>
            <CircularProgress />
        </div>
    );
}

const CardList = ({currentTab}) => {

    const [likedOnlyFilter, setLikedOnlyFilter] = useState(false);
    const {cards} = useSelector(state => state.cards);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    // const [] = null;

    useEffect(() => {
        dispatch(fetchCards());
    }, [dispatch]);

    useEffect(() => {
        const intersectEl = document.getElementById('intersect-anchor');
        let observer = null;
        if(likedOnlyFilter) {
            observer && observer.unobserve(intersectEl);
            return;
        }

        observer = observeElement(intersectEl);

        if(observer) {
            return function() {
                observer.unobserve(intersectEl);
            }
        }
    }, [cards, likedOnlyFilter]);

    const observeElement = (intersectEl) => {
        if(intersectEl === null) return;

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting === true) {
                console.log('loading')
                addMoreCards();
            }
        }, {
            threshold: 0,
        });

        observer.observe(intersectEl);
        return observer;
    }

    const addMoreCards = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            dispatch(fetchCards());
        }, 1000);
    }

    return (
        <Fragment>
            <div role="tab-panel" hidden={currentTab !== 0}>

                { /* Filter */ }
                <FormControlLabel 
                    value='favorites only'
                    label='favorites only'
                    control={
                        <Checkbox 
                            name='favsonly'
                            color='primary'
                            checked={likedOnlyFilter}
                            onChange={(event, value) => setLikedOnlyFilter(value)}
                        />
                    }
                />

                { /*  */ }

                <Grid container spacing={3} alignContent='stretch'>
                    {cards.map(card => {
                        if(!likedOnlyFilter || card.liked) {
                            return (
                                <Grid key={card.id} item xs={4}>
                                    <CardItem {...card} />
                                </Grid>
                            );
                        }
                        return null;
                    })}
                </Grid>
                {loading && <Spinner />}
                {cards.length > 0 && <div id="intersect-anchor" style={{height: 1}}></div>}
            </div>
            <div role="tab-panel" hidden={currentTab !== 1}>
                { /*  */ }
                <Grid container spacing={3} alignContent='stretch'>
                    {cards.map(card => {
                        if(!card.liked) return null;
                        return (
                            <Grid key={card.id} item xs={4}>
                                <CardItem {...card} />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </Fragment>
    );
}

export default CardList;