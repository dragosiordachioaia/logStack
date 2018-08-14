import axios from "axios";

const BASE_URL = "/api/v1";

export function fetchGroups() {
  return axios.get(`${BASE_URL}/groups/`);
}
