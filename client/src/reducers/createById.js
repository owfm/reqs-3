const createById = entity => {
  const byId = (state = {}, action) => {
    // if any action contains an entity byId from normalizr, put it in the store
    if (action.payload && action.payload.entities)
      return {
        ...state,
        ...action.payload.entities[entity],
      };
    switch (action.type) {
      case `DELETE_${entity.toUpperCase()}_SUCCESS`:
        const next = { ...state };
        delete next[action.payload];
        return {
          ...next,
        };
      default:
        return state;
    }

    // todo: write reducer to handle updates to individual requistions
  };
  return byId;
};

const getEntity = (state, id) => state[id];

export default createById;
export { getEntity };
