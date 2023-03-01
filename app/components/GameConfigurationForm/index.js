/**
 *
 * GameConfigurationForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import checkGameConfig from './checkGameConfig';
import generateChoices from './generateChoices';
import GameDoc from './GameDoc';

function GameConfigurationForm(props) {
  const { players, modules, npcs, gameStarting } = props;
  const [copied, setCopied] = useState(false);
  const {
    allModules,
    allColors,
    allRaces,
    npcFields,
    npcChoices,
  } = generateChoices(players);

  const handleChangeColor = (player, color) => {
    props.onPlayerChange({ ...player, color });
  };
  const handleChangeRace = (player, race) => {
    props.onPlayerChange({ ...player, race });
  };
  const handleChangeNickName = (player, nickname) => {
    props.onPlayerChange({ ...player, nickname });
  };

  const errors = checkGameConfig(players);

  const handleAddPlayer = () => {
    props.onPlayerAdd(players.length);
  };

  const handleModuleChange = module => {
    if (modules.includes(module)) {
      props.onGameChange({ modules: modules.filter(m => m !== module) });
    } else {
      props.onGameChange({ modules: [...modules, module] });
    }
  };

  const handleSetNpcChoice = (npc, choice) => {
    props.onGameChange({ npcs: { ...npcs, [npc]: choice } });
  };
  const handleChangeKnownAtStart = () => {
    props.onGameChange({
      npcs: { ...npcs, knownAtStart: !npcs.knownAtStart },
    });
  };

  const handleHashClick = hash => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  };

  return (
    <div>
      <h2>
        <FormattedMessage {...messages.header} />
      </h2>
      <form>
        <table width="100%">
          <tbody>
            <tr>
              <td width="50%">
                {players.map((player, index) => (
                  <fieldset key={player.id}>
                    <legend>
                      <FormattedMessage {...messages.player} /> {index + 1}
                    </legend>
                    <label>
                      Nickname
                      <input
                        value={player.nickname}
                        onChange={e =>
                          handleChangeNickName(player, e.target.value)
                        }
                      />
                    </label>
                    &nbsp;
                    <label>
                      <FormattedMessage {...messages.race.label} />
                      <select
                        disabled={gameStarting}
                        value={player.race}
                        onChange={e => handleChangeRace(player, e.target.value)}
                      >
                        {allRaces.map(r => (
                          <option
                            key={r.race}
                            value={r.race}
                            style={{
                              color: r.color,
                              backgroundColor: r.backgroundColor,
                            }}
                          >
                            {props.intl.formatMessage(messages.race[r.race])}
                          </option>
                        ))}
                      </select>
                    </label>
                    &nbsp;
                    <label>
                      <FormattedMessage {...messages.color.label} />
                      <select
                        value={player.color}
                        disabled={player.race !== 'human' || gameStarting}
                        style={{
                          backgroundColor:
                            player.race !== 'human' ? 'lightgray' : 'white',
                        }}
                        onChange={e =>
                          handleChangeColor(player, e.target.value)
                        }
                      >
                        {allColors.map(c => (
                          <option
                            key={c.color}
                            value={c.color}
                            style={{
                              color: c.color,
                              backgroundColor: c.backgroundColor,
                            }}
                          >
                            {props.intl.formatMessage(messages.color[c.color])}
                          </option>
                        ))}
                      </select>
                    </label>
                    &nbsp;
                    {players.length > 2 && !gameStarting ? (
                      <button
                        type="button"
                        onClick={() => props.onPlayerDelete(index)}
                      >
                        <FormattedMessage {...messages.button.remove} />
                      </button>
                    ) : null}
                    {player.hash ? (
                      <span
                        style={{
                          color: '#f5f',
                          fontSize: '+4',
                          fontFamily: 'Courier New',
                          fontWeight: 'bolder',
                        }}
                      >
                        &nbsp;&nbsp;&gt;&gt;
                        <a
                          style={{ margin: '0 20px', cursor: 'pointer' }}
                          onClick={() => handleHashClick(player.hash)}
                        >
                          {player.hash}
                        </a>
                        &lt;&lt;
                        {copied ? <span>&nbsp;&nbsp;Copié</span> : null}
                      </span>
                    ) : null}
                  </fieldset>
                ))}
                {players.length < 6 && !gameStarting ? (
                  <button type="button" onClick={handleAddPlayer}>
                    <FormattedMessage {...messages.button.add} />
                  </button>
                ) : null}
                {errors.map(e => (
                  <p key={e} style={{ color: 'red' }}>
                    {e}
                  </p>
                ))}
                {gameStarting ? (
                  <div>
                    <h2>Game is starting, sit down and prepare yourself...</h2>
                    <p>
                      Meanwhile, send the{' '}
                      <span style={{ color: '#f5f' }}>starting code</span> above
                      to each player and wait for them to connect, <br />
                      using the "Join an existing game" input
                      on top of this page...
                    </p>
                  </div>
                ) : null}
              </td>
              <td width="20%">
                <fieldset>
                  <legend>
                    <FormattedMessage {...messages.game.legend} />
                  </legend>
                  {allModules.map(module => (
                    <div key={module}>
                      <label>
                        <input
                          type="checkbox"
                          disabled={gameStarting}
                          checked={modules.includes(module)}
                          onChange={() => handleModuleChange(module)}
                          style={{ marginRight: '0.3em' }}
                        />
                        <FormattedMessage {...messages.game.module[module]} />
                      </label>
                    </div>
                  ))}
                </fieldset>
              </td>
              <td width="30%">
                <fieldset>
                  <legend>
                    <FormattedMessage {...messages.game.npcs.legend} />
                  </legend>
                  {npcFields.map(npc => (
                    <fieldset key={npc}>
                      <legend>{npc}</legend>
                      {npcChoices.map(choice => (
                        <label key={choice} style={{ marginRight: '1em' }}>
                          <input
                            type="radio"
                            disabled={gameStarting}
                            value={choice}
                            checked={npcs[npc] === choice}
                            style={{ marginRight: '0.3em' }}
                            onChange={e =>
                              handleSetNpcChoice(npc, e.target.value)
                            }
                          />
                          <FormattedMessage
                            {...messages.game.npcs.choices[choice]}
                          />
                        </label>
                      ))}
                    </fieldset>
                  ))}
                  <label>
                    <input
                      type="checkbox"
                      checked={npcs.knownAtStart}
                      disabled={gameStarting}
                      style={{ marginRight: '0.3em' }}
                      onChange={handleChangeKnownAtStart}
                    />
                    <FormattedMessage {...messages.game.npcs.knownAtStart} />
                  </label>
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
        {errors.length === 0 && !gameStarting ? (
          <button
            type="button"
            onClick={props.onValidate}
            style={{ marginTop: '1em' }}
          >
            <FormattedMessage {...messages.button.validate} />
          </button>
        ) : null}
      </form>
      {!gameStarting ? <GameDoc /> : null}
    </div>
  );
}

GameConfigurationForm.propTypes = {
  intl: intlShape.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  npcs: PropTypes.object.isRequired,
  gameStarting: PropTypes.bool.isRequired,
  modules: PropTypes.array.isRequired,
  onPlayerAdd: PropTypes.func.isRequired,
  onPlayerDelete: PropTypes.func.isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  onGameChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

export default injectIntl(GameConfigurationForm);
