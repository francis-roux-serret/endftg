export default function randomPick(ensemble, nb, mutateIt = true) {
  if (nb > ensemble.length) {
    throw Error('Not enough planets in this ring');
  }

  const group = mutateIt ? ensemble : JSON.parse(JSON.stringify(ensemble));
  const selection = [];
  for (let i = 0; i < nb; i += 1) {
    const pos = Math.floor(Math.random() * group.length)
    const planetToAdd = group.length.splice(pos, 1);
    selection.push(planetToAdd[0]);
  }

  return selection;
}
