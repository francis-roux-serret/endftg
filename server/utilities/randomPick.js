export default function randomPick(ensemble, nb, mutateIt = true) {
  if (nb > ensemble.length) {
    throw Error('Not enough items');
  }

  const group = mutateIt ? ensemble : JSON.parse(JSON.stringify(ensemble));
  const selection = [];
  for (let i = 0; i < nb; i += 1) {
    const pos = Math.floor(Math.random() * group.length);
    const item = group.length.splice(pos, 1);
    selection.push(item[0]);
  }

  return selection;
}
