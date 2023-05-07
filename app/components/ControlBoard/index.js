/**
 *
 * ControlBoard
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex-grow: 1;
  border: 1px solid #ccc;
  height: 100vh;
  min-width: 400px;
  background-color: #111;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: space-between;
`;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-content: flex-start;
  background-color: ${props => props.theme.backColor};
  color: ${props => props.theme.textColor};
`;

const TabBox = styled.div`
  flex-grow: 1;
  text-align: center;
  overflow: hidden;
  padding: 8px 0;
  cursor: pointer;
  background-color: ${props => props.theme.backColor};
  color: ${props => props.theme.textColor};
`;

const playerThemes = {
  blue: {
    frontColor: '#fff',
    textColor: '#fff',
    backColor: '#37F',
    lineColor: '#37F',
  },
  yellow: {
    frontColor: '#000',
    textColor: '#000',
    backColor: '#ff4',
    lineColor: '#ff4',
  },
  white: {
    frontColor: '#000',
    textColor: '#000',
    backColor: '#eee',
    lineColor: '#eee',
  },
  black: {
    frontColor: '#fff',
    textColor: '#fff',
    backColor: '#333',
    lineColor: '#333',
  },
  red: {
    frontColor: '#fff',
    textColor: '#fff',
    backColor: '#F64',
    lineColor: '#F64',
  },
  green: {
    frontColor: '#000',
    textColor: '#000',
    backColor: '#4c4',
    lineColor: '#4c4',
  },
  empty: {
    frontColor: '#ccc',
    textColor: '#ccc',
    backColor: '#333',
    lineColor: '#888',
  },
};

function ControlBoard({ gameData }) {
  const sortedPlayers = gameData.players.sort((a, b) => a.order - b.order);
  const connectedPlayer = gameData.players.find(p => p.isConnected);

  const [activePlayer, setActivePlayer] = useState(null);
  const currentPlayer = gameData.players.find(
    p => p.id === gameData.status.playerOrder[gameData.status.playerIndex],
  );
  const isActiveConnected =
    activePlayer && activePlayer.id === connectedPlayer.id;
  const isActiveCurrent =
    (activePlayer && activePlayer.id) === (currentPlayer && currentPlayer.id);
  const activeTheme = activePlayer
    ? playerThemes[activePlayer.color]
    : playerThemes.empty;

  const showPlayerPanel = player => {
    setActivePlayer(player);
  };

  const resetPanelDisplay = () => {
    setActivePlayer(connectedPlayer);
  };

  useEffect(() => {
    setActivePlayer(connectedPlayer);
  }, [connectedPlayer && connectedPlayer.id]);

  if (!currentPlayer) {
    return <div>loading</div>;
  }

  return (
    <Wrapper>
      <TabsWrapper>
        {sortedPlayers.map(player => (
          <TabBox
            key={player.id}
            theme={playerThemes[player.color]}
            onMouseEnter={() => showPlayerPanel(player)}
            onMouseLeave={resetPanelDisplay}
          >
            {player.id === currentPlayer.id && <span>&gt;&gt;&nbsp;</span>}
            {player.nickname}
            {player.id === currentPlayer.id && <span>&nbsp;&lt;&lt;</span>}
          </TabBox>
        ))}
      </TabsWrapper>
      {activePlayer ? (
        <PanelWrapper theme={activeTheme}>
          <h2>
            {activePlayer.nickname} ({activePlayer.race})
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flexGrow: 1 }}>Economy : </div>
            {activePlayer.discsCosts.map((cost, index) => {
              const isCovered =
                activePlayer.availableDiscs >=
                activePlayer.discsCosts.length - index;

              return (
                <div
                  key={`${index + 1}-${cost}`}
                  style={{ width: '2em', textAlign: 'center' }}
                >
                  {isCovered && <span>[</span>}
                  {cost}
                  {isCovered && <span>]</span>}
                </div>
              );
            })}
          </div>
          <div>
            {activePlayer.populationTracks.map(track => (
              <div
                key={track.type}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <span>Population {track.type} : </span>
                {track.populations.map(pop => (
                  <span
                    key={pop.index}
                    style={{ width: '2em', textAlign: 'center' }}
                  >
                    {pop.present && <span>[</span>}
                    {pop.income}
                    {pop.present && <span>]</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div>Alliances / PVs</div>
          <div>
            Exchange : 1:3&nbsp;&nbsp;&nbsp;
            <u>&nbsp;&lt;cO[=&nbsp;&lt;cO[=&nbsp;&lt;cO[=&nbsp;</u>
          </div>
          {isActiveCurrent ? (
            <div>
              <h3>Your turn ! Pick an action :</h3>
              {isActiveConnected ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <div>EXP</div>
                  <div>DEV</div>
                  <div>IMP</div>
                  <div>BUI</div>
                  <div>MOV</div>
                  <div>INF</div>
                </div>
              ) : (
                <span>This player is picking an action...</span>
              )}
            </div>
          ) : (
            <h3>Someone else is playing.</h3>
          )}
          {activePlayer.hasPassed && <p>(you already passed)</p>}
          <div>
            <h3>Technologies</h3>
            {activePlayer.playerTechnos.map(track => (
              <div
                key={track.color}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <div style={{ width: 60, textAlign: 'right' }}>
                  {track.color}
                </div>
                {track.technos.map((techno, index) => (
                  <div key={`${index + 1}`}>
                    {techno.techno ? (
                      <div
                        style={{
                          textAlign: 'center',
                          width: 60,
                          border: '1px solid black',
                        }}
                      >
                        {techno.techno.id}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: 'center',
                          width: 60,
                          border: '1px solid black',
                        }}
                      >
                        &nbsp;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <h3>Ships</h3>
          <div>
            Scout = 3, Cruiser = 5, Dreadnought = 7, Orbitals = 3, Monolith = 9
          </div>
          <div>
            <span>Interceptor : </span>
            {activePlayer.ships.interceptor.parts.map((p, i) => (
              <span key={`${i + 1}`}>{p.part}</span>
            ))}
            {Array(activePlayer.ships.interceptor.stats.ini).map((v, ii) => (
              <span key={`${ii + 1}`}>^</span>
            ))}
          </div>
          <div>
            <span>Cruiser : </span>
            {activePlayer.ships.cruiser.parts.map((p, i) => (
              <span key={`${i + 1}`}>{p.part}</span>
            ))}
            {Array(activePlayer.ships.cruiser.stats.ini).map((v, ii) => (
              <span key={`${ii + 1}`}>^</span>
            ))}
          </div>
          <div>
            <span>Dreadnought : </span>
            {activePlayer.ships.dreadnought.parts.map((p, i) => (
              <span key={`${i + 1}`}>{p.part}</span>
            ))}
            {Array(activePlayer.ships.dreadnought.stats.ini).map((v, ii) => (
              <span key={`${ii + 1}`}>^</span>
            ))}
          </div>
          <div>
            <span>Starbase : </span>
            {activePlayer.ships.starbase.parts.map((p, i) => (
              <span key={`${i + 1}`}>{p.part}</span>
            ))}
            {Array(activePlayer.ships.starbase.stats.ini).map((v, ii) => (
              <span key={`${ii + 1}`}>^</span>
            ))}
          </div>
        </PanelWrapper>
      ) : (
        <PanelWrapper>...processing...</PanelWrapper>
      )}
      <TabsWrapper>
        <TabBox>Tab 1</TabBox>
        <TabBox>Tab 2</TabBox>
      </TabsWrapper>
    </Wrapper>
  );
}

ControlBoard.propTypes = {
  gameData: PropTypes.object.isRequired,
};

export default ControlBoard;
