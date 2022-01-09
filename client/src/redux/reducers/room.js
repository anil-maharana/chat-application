import {
  GET_ALL_ROOMS,
  GET_ROOM_DETAILS,
  ADD_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  SET_SELECTED_ROOM,
} from "../constants";
const initialstate = {
  myRooms: [],
  selectedRoom: {},
};

export default function (state = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ROOMS:
      return {
        ...state,
        myRooms: payload,
      };

    case GET_ROOM_DETAILS:
    case SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: state.myRooms.filter((r) => r._id === payload)[0],
      };
    case ADD_ROOM:
      return {
        ...state,
        myRooms: [...state.myRooms, payload],
        selectedRoom: payload,
      };
    case EDIT_ROOM:
      const _updatedRoom = state.myRooms.map((room) => {
        if (room._id === payload._id) {
          return {
            ...room,
            ...payload,
          };
        } else {
          return room;
        }
      });
      return {
        ...state,
        myRooms: _updatedRoom,
        selectedRoom: payload,
      };
    case DELETE_ROOM:
      return {
        ...state,
        myRooms: state.myRooms.filter((r) => r._id != payload.id),
        selectedRoom: {},
      };
    default:
      return state;
  }
}
