import *as PlayerActionTypes from '../actionTypes/player'

const initialState = {
	players: [{
    name: 'Natalya',
	  score: 10,
	},
	{
  	name: 'Rafael',
		score: 10
	},
	{
		name: 'Tiago',
		score: 10
	}
	],
	selectedPlayerIndex: -1
}


export default function Player(state = initialState, action) {
  switch (action.type) {
    case PlayerActionTypes.ADD_PLAYER:
      const addPlayerList = [ ...state.players,
        {
          name: action.name,
          score: 0,
        }
      ];
      return {
          ...state,
          players: addPlayerList  
      };

    case PlayerActionTypes.REMOVE_PLAYER:
      const removePlayerList = [
          ...state.players.slice(0, action.index),
          ...state.players.slice(action.index + 1)
      ]
      return {
        ...state,
        players: removePlayerList
      }

    case PlayerActionTypes.SELECT_PLAYER:
      return {
        ...state,
        selectedPlayerIndex: action.index
      };

    default:
      return state;
  }
}
