import axios from "axios";

const BASE_URL = "/api/v1";

export function fetchGroups(projectID) {
  return axios.get(`${BASE_URL}/projects/${projectID}/groups/`);
}

export function fetchProjects() {
  return axios.get(`${BASE_URL}/projects/`);
}
