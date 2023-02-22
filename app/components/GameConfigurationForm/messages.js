/*
 * GameConfigurationForm Messages
 *
 * This contains all the text for the GameConfigurationForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.GameConfigurationForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'New game configuration',
  },
  player: {
    id: `${scope}.player`,
    defaultMessage: 'Player',
  },
  nickname: {
    id: `${scope}.nickname`,
    defaultMessage: 'Nickname',
  },
  color: {
    label: {
      id: `${scope}.color.label`,
      defaultMessage: 'Color',
    },
    gray: {
      id: `${scope}.color.label`,
      defaultMessage: 'Gray',
    },
    green: {
      id: `${scope}.color.label`,
      defaultMessage: 'Green',
    },
    blue: {
      id: `${scope}.color.label`,
      defaultMessage: 'Blue',
    },
    red: {
      id: `${scope}.color.label`,
      defaultMessage: 'Red',
    },
    yellow: {
      id: `${scope}.color.label`,
      defaultMessage: 'Yellow',
    },
    white: {
      id: `${scope}.color.label`,
      defaultMessage: 'White',
    },
    black: {
      id: `${scope}.color.label`,
      defaultMessage: 'Black',
    },
  },
  race: {
    label: {
      id: `${scope}.race.label`,
      defaultMessage: 'Race',
    },
    human: {
      id: `${scope}.race.human`,
      defaultMessage: 'Human',
    },
    eridani: {
      id: `${scope}.race.eridani`,
      defaultMessage: 'Epsilon Eridani',
    },
    planta: {
      id: `${scope}.race.planta`,
      defaultMessage: 'Planta',
    },
    hydran: {
      id: `${scope}.race.hydran`,
      defaultMessage: 'Hydran Progress',
    },
    orion: {
      id: `${scope}.race.orion`,
      defaultMessage: 'Orion Hegemony',
    },
    mechanema: {
      id: `${scope}.race.mechanema`,
      defaultMessage: 'Mechanema',
    },
    draco: {
      id: `${scope}.race.draco`,
      defaultMessage: 'Draco',
    },
  },
  button: {
    validate: {
      id: `${scope}.button.validate`,
      defaultMessage: 'Start !',
    },
    cancel: {
      id: `${scope}.button.cancel`,
      defaultMessage: 'Cancel',
    },
    add: {
      id: `${scope}.button.add`,
      defaultMessage: 'Add a player',
    },
    remove: {
      id: `${scope}.button.remove`,
      defaultMessage: 'Remove',
    },
  },
  game: {
    legend: {
      id: `${scope}.game.legend`,
      defaultMessage: 'Game add-ons',
    },
    module: {
      wormholes: {
        id: `${scope}.game.module.wormholes`,
        defaultMessage: 'Wormholes',
      },
      minorSpecies: {
        id: `${scope}.game.module.minorSpecies`,
        defaultMessage: 'Minor Species',
      },
      galacticEvents: {
        id: `${scope}.game.module.galacticEvents`,
        defaultMessage: 'Galactic Events',
      },
      riftCanon: {
        id: `${scope}.game.module.riftCanon`,
        defaultMessage: 'Rift Canon',
      },
      turnOrder: {
        id: `${scope}.game.module.turnOrder`,
        defaultMessage: 'Turn Order',
      },
      fifthPlayerWormholes: {
        id: `${scope}.game.module.fifthPlayerWormholes`,
        defaultMessage: '5th Player Wormholes',
      },
    },
    npcs: {
      legend: {
        id: `${scope}.game.npcs.legend`,
        defaultMessage: 'NPCs difficulty',
      },
      center: {
        id: `${scope}.game.npcs.center`,
        defaultMessage: 'center',
      },
      ancient: {
        id: `${scope}.game.npcs.ancient`,
        defaultMessage: 'ancient',
      },
      guardian: {
        id: `${scope}.game.npcs.guardian`,
        defaultMessage: 'guardian',
      },
      knownAtStart: {
        id: `${scope}.game.npcs.knownAtStart`,
        defaultMessage: 'NPCs difficulty known at start',
      },
      choices: {
        easy: {
          id: `${scope}.game.npcs.choices.easy`,
          defaultMessage: 'easy',
        },
        hard: {
          id: `${scope}.game.npcs.choices.hard`,
          defaultMessage: 'hard',
        },
        randomPerGame: {
          id: `${scope}.game.npcs.choices.randomPerGame`,
          defaultMessage: 'random per game',
        },
        randomPerTile: {
          id: `${scope}.game.npcs.choices.randomPerTile`,
          defaultMessage: 'random per tile',
        },
      },
    },
  },
});
