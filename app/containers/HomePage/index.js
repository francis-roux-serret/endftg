/*
 * HomePage
 *
 * This is the first thing rs see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import GameConfigurationForm from '../../components/GameConfigurationForm';

export default function HomePage() {
  const colors = ['red', 'green', 'blue', 'black', 'white', 'yellow'];
  const [players, setPlayers] = useState([
    { id: 1, race: 'human', color: colors[0], nickname: 'Player 1' },
    { id: 2, race: 'human', color: colors[1], nickname: 'Player 2' },
  ]);
  const [gameSettings, setGameSettings] = useState({
    npcs: {
      center: 'easy',
      ancient: 'easy',
      guardian: 'easy',
      knownAtStart: true,
    },
    modules: ['wormholes'],
  });

  const handleChangePlayer = player => {
    const forcedColors = {
      eridani: 'red',
      draco: 'yellow',
      orion: 'black',
      mechanema: 'white',
      hydran: 'blue',
      planta: 'green',
    };
    const updatedPlayer = {
      ...player,
      color: forcedColors[player.race] || player.color,
    };
    setPlayers(players.map(p => (p.id === player.id ? updatedPlayer : p)));
  };

  const handleChangeGame = newSettings => {
    setGameSettings(newSettings);
  };

  const handleAddPlayer = () => {
    const maxId = players.reduce((a, v) => (a < v.id ? v.id : a), 0);
    setPlayers([
      ...players,
      {
        id: maxId + 1,
        race: 'human',
        color: colors[players.length],
        nickname: `Player ${maxId + 1}`,
      },
    ]);
  };

  const handleRemovePlayer = index => {
    setPlayers(players.filter((p, i) => i !== index));
  };

  const dullFunc = () => {};

  return (
    <div>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <GameConfigurationForm
        players={players}
        gameSettings={gameSettings}
        onPlayerAdd={handleAddPlayer}
        onPlayerDelete={handleRemovePlayer}
        onPlayerChange={handleChangePlayer}
        onGameChange={handleChangeGame}
        onValidate={dullFunc}
        onCancel={dullFunc}
      />
    </div>
  );
}
