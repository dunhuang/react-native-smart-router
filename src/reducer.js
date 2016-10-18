import { actionTypes } from './actions';

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const initialState = {
  currentRoute: null,
  mode: null,
  routeStacks: {},
  routes: [],
};

const defaultUpdates = (payload, routes) => ({
  currentRoute: routes[routes.length - 1],
  data: payload.data,
  routes,
});

function routerReducer(state = initialState, action){
  let payload = action.payload; 
  let routes = state.routes.slice();
  let updates;
  switch (action.type){
    case actionTypes.ROUTER_INIT:
      updates = defaultUpdates(payload, [payload.name]);
      return Object.assign({}, state, updates);

    case actionTypes.ROUTER_POP: 
      let data = { num: 1 };
      if (isNumeric(payload)) {
        data = { num: payload };
      } else {
        data = Object.assign({}, data, payload.data);
      }
      data.name = state.currentRoute;
      for (let i = 0; i < data.num && routes.length > 1; i++) {
        routes.pop();
      }
      updates = defaultUpdates(payload, routes);
      return Object.assign({}, state, updates, {
        data: data,
        mode: actionTypes.ROUTER_POP
      });      

    case actionTypes.ROUTER_PUSH: 
      routes.push(payload.name);
      updates = defaultUpdates(payload, routes);
      return Object.assign({}, state, updates, {
        mode: actionTypes.ROUTER_PUSH,
      });

    case actionTypes.ROUTER_REPLACE: 
      routes.pop();
      routes.push(payload.name);
      return Object.assign({}, state, defaultUpdates(payload, routes), {
        mode: actionTypes.ROUTER_REPLACE,
      });
    case actionTypes.ROUTER_RESET:
      routes = [payload.name];
      return Object.assign({}, state, defaultUpdates(payload, routes), {
        mode: actionTypes.ROUTER_RESET,
      });    
    default:
      return state;
  }
}
module.exports=routerReducer;

