import React, { useState } from "react";
import "./Room.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Stack from "@mui/material/Stack";
import NewRoom from "./NewRoom";
import { ListItemButton } from "@mui/material";
import { stringAvatar } from "../layouts/ColouredAvatar";
import EditRoom from "./EditRoom";
import DeleteRoom from "./DeleteRoom";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeNotification } from "../../redux/actions/notification";
import configData from "../../config/config.json";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
const RoomList = ({
  value,
  onRoomSelection,
  notifications,
  removeNotification,
}) => {
  const [rooms, setRooms] = useState(value);
  const [addChannelDialog, setAddChannelDialog] = useState(false);
  const [editChannelDialog, setEditChannelDialog] = useState(false);
  const [deleteChannelDialog, setDeleteChannelDialog] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, room, index) => {
    setSelectedRoomIndex(index);
    onRoomSelection(room);
    setSelectedRoom(room);
    removeNotification(room._id);
  };
  const handleAddChannel = async (val) => {
    setAddChannelDialog(false);
    if (val) {
      _getMyRooms();
    }
  };
  const handleEditChannel = async (val) => {
    setEditChannelDialog(false);
    if (val) {
      _getMyRooms();
    }
  };
  const handleDeleteChannel = async (val) => {
    setDeleteChannelDialog(false);
    if (val) {
      _getMyRooms();
      setSelectedRoom(null);
    }
  };
  const _getMyRooms = async () => {
    const { data } = await axios.get(
      `${configData.SERVER_URL}/api/users/myRooms`
    );
    setRooms(data);
  };
  const handleMoreOptionIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div className="rooms">
        <div className="roomsAreadHeader">
          <div className="roomsAreadHeader__left">
            <h2>Rooms</h2>
          </div>
          <div className="roomsAreadHeader__right">
            <IconButton
              edge="end"
              aria-label="Add"
              onClick={() => setAddChannelDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="rooms__list">
          {rooms.length > 0 ? (
            <List>
              {rooms.map((room, index) => (
                <ListItem
                  key={room._id}
                  secondaryAction={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleMoreOptionIconClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setSelectedRoom(room);
                            setEditChannelDialog(true);
                          }}
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setSelectedRoom(room);
                            setDeleteChannelDialog(true);
                          }}
                        >
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Stack>
                  }
                  disablePadding
                >
                  <ListItemButton
                    selected={selectedRoomIndex === index}
                    onClick={(event) => handleListItemClick(event, room, index)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        {...stringAvatar(room.roomName)}
                        variant="square"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          type="body2"
                          style={{
                            fontWeight: `${
                              notifications.filter((n) => n.room == room._id)
                                .length > 0
                                ? "bold"
                                : "normal"
                            }`,
                          }}
                        >
                          {room.roomName}
                        </Typography>
                      }
                      // primary={room.roomName}
                      secondary={room.roomType}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <div
              style={{
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ margin: "8px", padding: "8px" }}>
                No Rooms Available.
              </span>
            </div>
          )}
        </div>
      </div>
      {addChannelDialog && (
        <NewRoom
          isAddChannelDialogOpen={addChannelDialog}
          onAddChannelDialogClose={(val) => handleAddChannel(val)}
        />
      )}
      {editChannelDialog && selectedRoom && (
        <EditRoom
          selectedRoom={selectedRoom}
          isEditChannelDialogOpen={editChannelDialog}
          onEditChannelDialogClose={(val) => handleEditChannel(val)}
        />
      )}
      {deleteChannelDialog && selectedRoom && (
        <DeleteRoom
          selectedRoom={selectedRoom}
          isDeleteRoomDialogOpen={deleteChannelDialog}
          onDeleteRoomDialogClose={(val) => handleDeleteChannel(val)}
        />
      )}
    </>
  );
};

RoomList.propTypes = {
  notifications: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onRoomSelection: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notification,
});
export default connect(mapStateToProps, { removeNotification })(RoomList);
