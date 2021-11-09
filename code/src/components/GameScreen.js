import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";

import { secondFetch } from "../reducers/gameFetch";
import Loading from "./Loading";
import EndScreen from "./EndScreen";

const GameScreen = () => {
  const gameDescription = useSelector((store) => store.gameFetch.description);
  const gameActions = useSelector((store) => store.gameFetch.actions);
  const userName = useSelector((store) => store.gameFetch.userName);
  const loading = useSelector((store) => store.gameFetch.loading);
  const coordinates = useSelector((store) => store.gameFetch.coordinates);

  const dispatch = useDispatch();

  const onMove = (direction) => {
    dispatch(secondFetch(userName, direction));
  };

  return (
    <>
      {loading && <Loading />}
      {coordinates === "1,3" && <EndScreen gameDescription={gameDescription} />}

      {!loading && coordinates !== "1,3" && (
        <GameContainer coordinates={coordinates}>
          <Content>
            <InnerContainer>
              <GameDescription>{gameDescription}</GameDescription>
              <DescriptionAndButtonContainer>
                {gameActions.map((choice, index) => (
                  <InnerWrap key={index}>
                    <Description>{choice.description}</Description>
                    <Button onClick={() => onMove(choice.direction)}>
                      {choice.direction}
                    </Button>
                  </InnerWrap>
                ))}
              </DescriptionAndButtonContainer>
            </InnerContainer>
          </Content>
        </GameContainer>
      )}
    </>
  );
};

export default GameScreen;

const GameContainer = styled.div`
  background-image: url(${(props) =>
    props.coordinates === "0,0"
      ? img1
      : props.coordinates === "1,0"
      ? img2
      : props.coordinates === "1,1"
      ? img3
      : props.coordinates === "0,1"
      ? img4
      : props.coordinates === "0,2"
      ? img5
      : props.coordinates === "0,3"
      ? img6
      : "./assets/6.jpg"});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 300px;
  min-height: 300px;
  height: auto;
  border: 6px double;
  border-radius: 15px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #f7f5e1;

  @media (min-width: 768px) {
    min-width: 600px;
    padding: 30px;
  }
`;

const GameDescription = styled.p`
  text-align: center;
  padding-bottom: 15px;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const DescriptionAndButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  text-align: center;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  padding: 10px;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const Description = styled.p`
  padding-bottom: 15px;
  font-size: 16px;
  font-family: "Raleway", sans-serif;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border: 1px solid #333;
  border-radius: 10px;
  font-size: 16;
  cursor: pointer;
  color: #000;
  background: #cfb05d;
  -webkit-box-shadow: inset 1px 1px 10px #333;
  -moz-box-shadow: inset 1px 1px 10px #333;
  box-shadow: inset 1px 1px 3px #333;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;
