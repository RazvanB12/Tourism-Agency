import axios from "axios";

const DESTINATIONS_URL = "http://localhost:8000/destinations";
const RESERVATIONS_URL = "http://localhost:8000/reservations";
const AVAILABILITY_URL = "http://localhost:8000/availability";

class UserService {

    getAllDestinations(token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.get(DESTINATIONS_URL + "/0", config);
    }

    getDestination(id, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.get(DESTINATIONS_URL + "/" + id, config);
    }

    saveDestination(destination, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.post(DESTINATIONS_URL, destination, config);
    }

    updateDestination(destination, id, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.put(DESTINATIONS_URL + "/" + id, destination, config);
    }

    deleteDestination(id, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.delete(DESTINATIONS_URL + "/" + id, config);
    }

    getAvailability(request, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.post(AVAILABILITY_URL, request, config);
    }

    saveReservation(reservation, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.post(RESERVATIONS_URL, reservation, config);
    }

    getStatistics(destinationId, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.get(AVAILABILITY_URL + "/" + destinationId, config);
    }

    getReservations(destinationId, token) {
        const config = {
            headers: {
                "Authorization": "Bearer " + token}
          };
        return axios.get(RESERVATIONS_URL + "/" + destinationId, config);
    }

}

export default new UserService;