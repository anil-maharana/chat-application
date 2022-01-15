import {
  GET_ALL_ROOMS,
  GET_ROOM_DETAILS,
  ADD_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  SET_ALERT,
} from "../constants";
import axios from "axios";
import configData from "../../config/config.json";

export const getAllRooms = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${configData.SERVER_URL}/api/users/myRooms`
    );
    dispatch({
      type: GET_ALL_ROOMS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getRoomById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ROOM_DETAILS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addRoomDetails =
  ({ roomName, roomType, users }) =>
  async (dispatch) => {
    try {
      const { data:{data} } = await axios.post(`${configData.SERVER_URL}/api/rooms`, {
        roomName,
        roomType,
        users,
      });
      dispatch({
        type: ADD_ROOM,
        payload: data,
      });
      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

export const updateRoomDetails =
  (id, { roomName, roomType, users }) =>
  async (dispatch) => {
    try {
      const { data:{data} } = await axios.put(
        `${configData.SERVER_URL}/api/rooms/${id}`,
        {
          roomName,
          roomType,
          users,
        }
      );
      dispatch({
        type: EDIT_ROOM,
        payload: data,
      });
      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

export const deleteRoomDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${configData.SERVER_URL}/api/rooms/${id}`
    );
    dispatch({
      type: DELETE_ROOM,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
