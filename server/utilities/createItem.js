const ITEM_MAP = {
  orbital: { hasColon: false },
};

function createItem(type) {
  return {
    kind: 'item',
    type,
    ...(ITEM_MAP[type] || {}),
  };
}

module.exports = createItem;
