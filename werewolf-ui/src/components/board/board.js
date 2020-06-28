import React, { useState }  from 'react';
import styles from './board.module.css';
import {
  useParams
} from "react-router-dom";
import ReactPolling from 'react-polling';
import WaitingRoom from '../waitingRoom/waitingRoom';
import Playroom from '../playroom/playroom';
import {getHeaders} from '../../utils/index';


const Board = () => {
  let {game} = useParams();

  const [gameState, setGameState] = useState({game:{
      id: game,
      created: null,
      roster: [],
      location: { day: 0, time: 'night' },
      hasStarted: false,
      isFinished: false,
      winner: ''
    },
    vote: [],
    role: ""
  });

  return (
  <div className={styles.board} data-testid="board">
    <ReactPolling
      url={process.env.REACT_APP_API_URL + '/gameroom/' + game }
      headers={getHeaders()}
      interval= {3000} // in milliseconds(ms)
      retryCount={3} // this is optional
      onSuccess={(data) => {
        setGameState(data);
        return true;
      }}
      onFailure={() => console.log('handle failure')} // this is optional
      method={'GET'}
      render={({ startPolling, stopPolling, isPolling }) => {
        return (
          <div>
            <div> 
              {!gameState.game.hasStarted?
              <WaitingRoom gameState={gameState.game}></WaitingRoom>
              :<Playroom gameState={gameState}></Playroom>}
            </div>
            {/* {JSON.stringify(gameState)} */}
          </div>
        );
      }}
    />
  </div>
)};


Board.propTypes = {};

Board.defaultProps = {};

export default Board;
