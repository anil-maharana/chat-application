import React, { useEffect, useState } from 'react'
import './Room.css'
import RoomList from './RoomList';
import RoomsArea from './RoomsArea';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRooms } from "../../redux/actions/room";

const RoomDashBoard = (props) => {
    const { auth: { isAuthenticated, user } ,  getAllRooms} = props;
    const [loadingData, setLoadingData] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null)

    const handleRoomSelection = (selectedRoom) => {
        console.log(selectedRoom);
        setSelectedRoom(selectedRoom);
    }

    useEffect(() => {
        async function fetchData(params) {
            await _getMyRooms();
        }
        fetchData();
    }, []);


    const _getMyRooms = async () => {
        setLoadingData(true);
        console.log(user);
        if (isAuthenticated === true) {
            getAllRooms()
        }
        setLoadingData(false);
    }

    return (
        <div className="room_dashboard">
            {loadingData ? <span>Loading...</span> : <>
                <RoomList onRoomSelection={handleRoomSelection} />
                {!selectedRoom ? <div className="notSelectedRoomDiv">
                    <h1>Welcome</h1>
                    <p>Click on a Room name to start chatting!</p>
                </div> : <RoomsArea room={selectedRoom} />}
            </>}
        </div>
    )
}

RoomDashBoard.prototypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, {getAllRooms})(RoomDashBoard);
