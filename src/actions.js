function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export const actionTypes = createConstants(
  'ROUTER_INIT',
  'ROUTER_POP',
  'ROUTER_PUSH',
  'ROUTER_REPLACE',
  'ROUTER_RESET',
);

const filter = data => {
  if(typeof(data)==='undefined'){
    return {};
  }
  if (typeof(data) !== 'object') {
    return data;
  }
  if (!data) {
    return;
  }

  let proto = (data || {}).constructor.name;

  if (proto != 'Object') {
    data = {};
  }
  if (data.data) {
    data.data = filter(data.data);
  }

  return data;
};

export function initRouter(data) {
  return {
    type: actionTypes.ROUTER_INIT,
    payload: filter(data),
  };
}

export function popRouter(data) {
  return {
    type: actionTypes.ROUTER_POP,
    payload: filter(data),
  };
}

export function pushRouter(data) {
  return {
    type: actionTypes.ROUTER_PUSH,
    payload: filter(data),
  };
}

export function resetRouter(data) {
  return {
    type: actionTypes.ROUTER_RESET,
    payload: filter(data),
  };
}

export function replaceRouter(data) {
  return {
    type: actionTypes.ROUTER_REPLACE,
    payload: filter(data),
  };
}
