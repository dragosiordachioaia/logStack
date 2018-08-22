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

export function fetchLoggedInUser() {
  return axios.get(`${BASE_URL}/users/me`);
}

export function fetchProjectTypes() {
  return axios.get(`${BASE_URL}/project_types`);
}

export function login({ username, password }) {
  return axios.post(`${BASE_URL}/login`, { username, password });
}

export function logout() {
  return axios.post(`${BASE_URL}/logout`);
}

export function register(userData) {
  return axios.post(`${BASE_URL}/users`, { ...userData });
}

export function createProject(projectData) {
  return axios.post(`${BASE_URL}/projects`, { ...projectData });
}
