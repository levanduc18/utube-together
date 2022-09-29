import axiosClient from "./axiosClient";
import URL from "@/constants/url.js";

const getAllRooms = () =>
  axiosClient.get(URL.getAllRooms, { withCredentials: true });

const getRoomById = (id) =>
  axiosClient.get(URL.getAllRooms + "/" + id, { withCredentials: true });

const deleteRoomById = (id, ownerId) =>
  axiosClient.delete(URL.getAllRooms + "/" + id, {
    data: { ownerId: ownerId },
    withCredentials: true,
  });
export default { getAllRooms, getRoomById, deleteRoomById };
