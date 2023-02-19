/**
 *
 * GameConfigurationForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';

function GameConfigurationForm(props) {
  const allModules = [
    'wormholes',
    'minorSpecies',
    'galacticEvents',
    'riftCanon',
    'turnOrder',
    'fifthPlayerWormholes',
  ];
  const allColors = [
    { color: 'red', backgroundColor: 'white' },
    { color: 'green', backgroundColor: 'white' },
    { color: 'blue', backgroundColor: 'white' },
    { color: 'black', backgroundColor: 'white' },
    { color: 'white', backgroundColor: 'black' },
    { color: 'yellow', backgroundColor: 'black' },
  ];

  const allRaces = [
    { race: 'human', color: 'gray', backgroundColor: 'white' },
    { race: 'eridani', color: 'red', backgroundColor: 'white' },
    { race: 'planta', color: 'green', backgroundColor: 'white' },
    { race: 'hydran', color: 'blue', backgroundColor: 'white' },
    { race: 'orion', color: 'black', backgroundColor: 'white' },
    { race: 'mechanema', color: 'white', backgroundColor: 'black' },
    { race: 'draco', color: 'yellow', backgroundColor: 'black' },
  ];

  const handleChangeColor = (player, color) => {
    props.onPlayerChange({
      ...player,
      color,
    });
  };
  const handleChangeRace = (player, race) => {
    props.onPlayerChange({
      ...player,
      race,
    });
  };
  const handleChangeNickName = (player, nickname) => {
    props.onPlayerChange({
      ...player,
      nickname,
    });
  };

  const errors = [];
  const usedRaces = [];
  const usedColors = [];
  const usedNickNames = [];
  props.players.forEach((player, index) => {
    if (player.race !== 'human') {
      if (usedRaces.includes(player.race)) {
        errors.push(`race ${player.race} is used more than once`);
      } else {
        usedRaces.push(player.race);
      }
    }
    if (usedColors.includes(player.color)) {
      errors.push(`color ${player.color} is used more than once`);
    } else {
      usedColors.push(player.color);
    }
    if (!player.nickname.trim()) {
      errors.push(`Give a nickname to player ${index + 1}`);
    } else if (usedNickNames.includes(player.nickname)) {
      errors.push(`Nickname ${player.nickname} is used more than once`);
    } else {
      usedNickNames.push(player.nickname);
    }
  });

  const handleAddPlayer = () => {
    props.onPlayerAdd(props.players.length);
  };

  const handleModuleChange = module => {
    if (props.gameSettings.modules.includes(module)) {
      props.onGameChange({
        ...props.gameSettings,
        modules: props.gameSettings.modules.filter(m => m !== module),
      });
    } else {
      props.onGameChange({
        ...props.gameSettings,
        modules: [...props.gameSettings.modules, module],
      });
    }
  };
  const handleSetNpcChoice = (npc, choice) => {
    props.onGameChange({
      ...props.gameSettings,
      npcs: {
        ...props.gameSettings.npcs,
        [npc]: choice,
      },
    });
  };
  const handleChangeKnownAtStart = () => {
    props.onGameChange({
      ...props.gameSettings,
      npcs: {
        ...props.gameSettings.npcs,
        knownAtStart: !props.gameSettings.npcs.knownAtStart,
      },
    });
  };

  const npcFields = ['ancient', 'guardian', 'center'];
  const npcChoices = ['easy', 'hard', 'randomPerGame', 'randomPerTile'];

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
                {props.players.map((player, index) => (
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
                        disabled={player.race !== 'human'}
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
                    {props.players.length > 2 ? (
                      <button
                        type="button"
                        onClick={() => props.onPlayerDelete(index)}
                      >
                        <FormattedMessage {...messages.button.remove} />
                      </button>
                    ) : null}
                  </fieldset>
                ))}
                {props.players.length < 6 ? (
                  <button type="button" onClick={handleAddPlayer}>
                    <FormattedMessage {...messages.button.add} />
                  </button>
                ) : null}
                {errors.map(e => (
                  <p key={e} style={{ color: 'red' }}>
                    {e}
                  </p>
                ))}
              </td>
              <td width="25%">
                <fieldset>
                  <legend>
                    <FormattedMessage {...messages.game.legend} />
                  </legend>
                  {allModules.map(module => (
                    <div key={module}>
                      <label>
                        <input
                          type="checkbox"
                          checked={props.gameSettings.modules.includes(module)}
                          onChange={() => handleModuleChange(module)}
                        />
                        <FormattedMessage {...messages.game.module[module]} />
                      </label>
                    </div>
                  ))}
                </fieldset>
              </td>
              <td width="25%">
                <fieldset>
                  <legend>
                    <FormattedMessage {...messages.game.npcs.legend} />
                  </legend>
                  {npcFields.map(npc => (
                    <fieldset key={npc}>
                      <legend>{npc}</legend>
                      {npcChoices.map(choice => (
                        <label key={choice}>
                          <input
                            type="radio"
                            value={choice}
                            checked={props.gameSettings.npcs[npc] === choice}
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
                      checked={props.gameSettings.npcs.knownAtStart}
                      onChange={handleChangeKnownAtStart}
                    />
                    <FormattedMessage {...messages.game.npcs.knownAtStart} />
                  </label>
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
        {errors.length === 0 ? (
          <button type="button" onClick={props.onValidate}>
            <FormattedMessage {...messages.button.validate} />
          </button>
        ) : null}
        <button type="button" onClick={props.onCancel}>
          <FormattedMessage {...messages.button.cancel} />
        </button>
      </form>
      <h2>Summary of races</h2>
      <ul>
        <li>
          <strong>Human (any remaining color)</strong>
          <p>
            Standard game play. Play human if you never played the game before.
            <br />
            You can move more ships at once, you have a good commercial exchange
            ratio (1:2), and have the ability to build star bases from the
            start.
            <br />
            You will have no race specific boost, but it will be balanced by a
            excellent flexibility.
          </p>
          <p>
            <strong>Strong point</strong> : You should adapt to the game events
            better than other players to claim the victory.
          </p>
        </li>

        <li>
          <strong>Mechanema (white)</strong>
          <p>
            Play Mechanema if you want to play aggressive at the end.
            <br />
            You will be able to build and customize your ships faster than the
            other players, provided that you can grab enough ressources for
            that.
          </p>
          <p>
            <strong>Strong point</strong> : You should grab resources to get the
            strongest fleet at the end of game.
          </p>
        </li>

        <li>
          <strong>Orion Hegemony (black)</strong>
          <p>
            Play Orion Hegemony if you want to play aggressive from start.
            <br />
            You will have the strongest fleet at the sart of game, and start
            with a cruiser where other players have only an interceptor.
            <br />
            You have an extra victory point slot, but lack one alliance slot.
            <br />
            Also you have a very bad commercial rate (1:4).
          </p>
          <p>
            <strong>Strong point</strong> : You should grab the most juicy
            victory points from the start, build a strong advance to ensure
            victory.
          </p>
        </li>

        <li>
          <strong>Epsilon Eridani (red)</strong>
          <p>
            Play Epsilon Eridani if you feel like en economist.
            <br />
            You start with and already developed civilization but your economy
            is in jeopardy.
            <br />
            On the other side, you have some advance : 2 VP tiles and 3
            technologies to upgrade you ships, a good money stock, and extra
            energy on your ships.
            <br />
            You must stabilize your economy or you might end stun-locked at the
            end of the game.
          </p>
          <p>
            <strong>Strong point</strong> : Stabilize your economy early and you
            should push you overall advance to the end of the game.
          </p>
        </li>

        <li>
          <strong>Hydran Progress (blue)</strong>
          <p>
            Play Hydran Progress if you feel like a scientific.
            <br />
            You start with advanced science production and can research 2
            technologies at once.
            <br />
            You weak point is that but have very low mineral production at the
            start.
            <br />
            You will have to adapt at the available technologies to compensate
            and plan your game accordingly.
          </p>
          <p>
            <strong>Strong point</strong> : You should build the most advanced
            technology tracks to score additional winning victory point with
            them.
          </p>
        </li>

        <li>
          <strong>Draco (yellow)</strong>
          <p>
            Play Draco if you feel like a protecting the NPCs.
            <br />
            You will be able to use the ancient NPC production planets and claim
            their sector without fighting them.
            <br />
            On each exploration you will be able to choose between two sectors.
            You will score extra VP for each ancient still alive at the end.
            <br />
            On the other side, you can not claim the discoveries tiles on their
            sector while they are alive.
            <br />
            That will make you look very juicy to other races, and therefore you
            are very likely to get attacked.
            <br />
          </p>
          <p>
            <strong>Strong point</strong> : You should get the most ressources
            and win by protecting your ancient NPCs and dominions.
          </p>
        </li>

        <li>
          <strong>Planta (green)</strong>
          <p>
            Play Planta if you feel like an explorer.
            <br />
            You will be able to explore twice faster than other players, and
            score 1 extra VP for each sector you get at the end of game.
            <br />
            You start with less adaptable ships and your population cannot
            defend from invasion.
            <br />
            You will win the game if you are not contested, so prepare yourself
            for you WILL be attacked by other players.
          </p>
          <p>
            <strong>Strong point</strong> : You should lock your domain and win
            the game by resisting to invasions.
          </p>
        </li>
      </ul>
    </div>
  );
}

GameConfigurationForm.propTypes = {
  intl: intlShape.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  gameSettings: PropTypes.object.isRequired,
  onPlayerAdd: PropTypes.func.isRequired,
  onPlayerDelete: PropTypes.func.isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  onGameChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default injectIntl(GameConfigurationForm);
