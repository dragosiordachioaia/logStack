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
