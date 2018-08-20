import axios from "axios";

const BASE_URL = "/api/v1";

export function fetchProjects() {
  return axios.get(`${BASE_URL}/projects/`);
}

export function fetchGroups(projectID) {
  return axios.get(`${BASE_URL}/projects/${projectID}/groups/`);
}

export function fetchGroupDetails(groupID) {
  return axios.get(`${BASE_URL}/groups/${groupID}`);
}

export function fetchIssueDetails(issueID) {
  return axios.get(`${BASE_URL}/issues/${issueID}`);
}

export function fetchUserDetails(userID) {
  return axios.get(`${BASE_URL}/users/${userID}`);
}

export function login({ username, password }) {
  return axios.post(`${BASE_URL}/login`, { username, password });
}

export function register(userData) {
  return axios.post(`${BASE_URL}/users`, { ...userData });
}

export function getUserStatus() {
  return axios.get(`${BASE_URL}/user_status`);
}
