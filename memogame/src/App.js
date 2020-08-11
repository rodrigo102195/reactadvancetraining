import React, { Component } from "react";
import mockAPI from './API/mockAPI';
import Card from "./Components/Card/Card";
import "./App.scss";
import IconNames from './Constants/iconsNames';
import Info from './Components/Info/Info';
import axios from "axios";


class App extends Component {


  state = {
    attemps: 0,
    blockedGame: false,
    cards: this.prepareCards(20),
    compareFirst: -1,
    compareSecond: -1,
    playerName: 'Player#1',
    winners: [],
  }

  async componentDidMount(){
    const positionTable = await mockAPI.get("?sortBy=value");
    this.setState({
      winners: positionTable.data,
    });
  }

  prepareIconNames(numberOfIcons){
    const arrToRet = new Array(numberOfIcons);
    for (let i = 0; i < numberOfIcons; i++){
      arrToRet[i] = IconNames[Math.floor(Math.random() * (IconNames.length))];
    }
    return arrToRet;
  }
  
  prepareCards(countCards) {
    const arrayIcons = this.prepareIconNames(countCards/2);
    let cards = new Array(countCards);
    for (let i = 0; i < cards.length; i++) {
      cards[i] = {
        icon: arrayIcons[i%arrayIcons.length],
        flipped: false,
        win: false,
      }
    }
    cards = this.shuffle(cards);
    return cards;
  }

  shuffle(array) {
    let currentIndex = array.length, 
        temporaryValue, 
        randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  resetGame = () => {
    this.setState({
      attemps: 0,
      cards: this.prepareCards(20),
      compareFirst: -1,
      compareSecond: -1,
      blockedGame: false, 
    });
  }

  wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async verifyWin(){
    let win = true;
    let { cards, attemps, playerName, winners } = this.state;
    for (let i = 0; i < cards.length && win; i++)
    {
      win = cards[i].win;
    }
    if (win){
      await this.wait(1000); //Because I wait to flip the card to show a message
      alert(`¡You win with ${attemps} tries`);
      let newRankings = [...winners];
      let myRanking = newRankings.find(obj => obj.name === playerName);
      if ((myRanking && myRanking.value > attemps) || !myRanking){
        if (myRanking){
          newRankings = newRankings.filter( obj => obj.name !== playerName);
          mockAPI.put(myRanking.id,{value: attemps})
        }else {
          mockAPI.post("",{name: playerName, value: attemps, id: playerName})
        }
        newRankings.push({name: playerName, value: attemps, id:playerName });
        newRankings.sort(this.compare);
        console.log("los rankings luego de ser ordenados son");
        console.log(newRankings);
        this.setState({
          winners: newRankings,
        });
      }
    }
  }

  resetPositions = () => {
    axios.all(this.state.winners.map(obj => mockAPI.delete(obj.id)));
    this.setState({
      winners: [], 
    });
  }

  flip = async(indexCard) => {
    let {attemps, blockedGame, cards, compareFirst, compareSecond} = this.state;

    if(!cards[indexCard].flipped && !blockedGame) {
      const newStateCards = [...cards];
      newStateCards[indexCard].flipped = !newStateCards[indexCard].flipped;
      compareFirst = compareFirst < 0 ? indexCard : compareFirst;
      compareSecond = compareFirst < 0 ? -1 : indexCard;
      blockedGame = compareSecond >= 0 ? true : false;

      if( compareSecond >= 0 ){
        console.log(newStateCards[compareFirst].icon +" comparado "+newStateCards[compareSecond].icon );
        if(newStateCards[compareFirst].icon === newStateCards[compareSecond].icon) {
          newStateCards[compareFirst].win = true;
          newStateCards[compareSecond].win = true;
          compareFirst = -1;
          compareSecond = -1;
          blockedGame = false;
        } 
        attemps += 1;
      } 
      this.setState({
        cards: newStateCards,
        attemps: attemps,
        compareFirst: compareFirst,
        compareSecond: compareSecond,
        blockedGame: blockedGame,
      });
      this.verifyWin();
      if( compareSecond >= 0 && newStateCards[compareFirst].icon !== newStateCards[compareSecond].icon){
        await this.wait(1000);
        const newArr = [...newStateCards];
        newArr[compareFirst].flipped = false;
        newArr[compareSecond].flipped = false;
        compareFirst = -1;
        compareSecond = -1;
        this.setState({
          cards: newArr,
          compareFirst,
          compareSecond,
          blockedGame: false,
        })
      }
    }
  }

  changePlayerName = (newName) => {
    this.setState({
      playerName: newName,
    })
  }

  confirmationChangePlayerName = () => {
    const newName = document.getElementById('playerNameField').value;
    this.changePlayerName(newName);
  }

  compare( obj1, obj2 ) {
    if ( obj1.value < obj2.value ){
      return -1;
    }
    if ( obj1.value > obj2.value ){
      return 1;
    }
    return 0;
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header__logo">Logo</div>
          <ul className="header-actions">
            <li className="header-actions__li" onClick={this.resetPositions}>Reset Positions</li>
            <li className="header-actions__li" onClick={this.resetGame}>New Game</li>
            <li className="header-actions__li" onClick={() => this.changePlayerName('')}>Change Player</li>
          </ul>
        </header>
        <div className="content">
        <div className="board">
          {this.state.cards.map((card, index) => 
            <Card 
              onFlip={this.flip} 
              index={index} key={index} 
              flipped={card.flipped}
              icon={card.icon}
            />
          )}
        </div>
        <aside className="aside">
          {this.state.playerName !== '' ? 
          <Info title="Current Player">
          <div className="info__text--margin">Name: {this.state.playerName}</div>
          <div className="info__text--margin"># Attemps: {this.state.attemps}</div>
        </Info>:
        <Info>
          <div className="changePlayer__txt">Please enter your name:</div>
          <input type="text" className="changePlayer__input info__text--margin" id="playerNameField"></input><button className="changePlayer__btn" onClick={this.confirmationChangePlayerName}>OK</button>
        </Info>} 
          
          <Info title="Position Table">
            <table className="positionInfo__table">
              <tbody>
            {this.state.winners.map((obj, index) => (
              <tr key={index}>
                <td>
                  {obj.name}
                </td>
                <td>
                  {obj.value}
                </td>
              </tr>
            ))
            }
            </tbody>
            </table>
          </Info>
        </aside>
        </div>
        <footer className="footer">Training 2020</footer>
      </div>
    );
  }
}

export default App;
