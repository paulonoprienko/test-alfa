import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Badge,
  Container,
  CssBaseline,
  Tab,
  Tabs,

} from "@material-ui/core";
import CardList from "./components/cardList";



const App = () => {

  const [currentTab, setCurrentTab] = useState(0);

  const {likedCardsCount} = useSelector(state => state.cards);

  const changeTab = (event, value) => {
    setCurrentTab(value);
  }

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="sticky" style={{marginBottom: 20}}>
        <Container>
          <Tabs value={currentTab} onChange={changeTab}>
            <Tab label="Home" id="home-tab" aria-controls="home-panel" />
            <Tab
              label={
                <Badge
                  badgeContent={likedCardsCount > 0 ? likedCardsCount : null}
                  color="secondary"
                  overlap="circular"
                >
                  Likes
                </Badge>
              }
              id="likes-tab" aria-controls="likes-panel"
            />
          </Tabs>
        </Container>
      </AppBar>

      <Container>
        <CardList currentTab={currentTab} />
      </Container>
    </div>
  );
}

export default App;
