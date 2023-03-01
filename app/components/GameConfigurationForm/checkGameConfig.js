export default function checkGameConfig(players) {
  const errors = [];
  const usedRaces = [];
  const usedColors = [];
  const usedNickNames = [];
  players.forEach((player, index) => {
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

  return errors;
}
