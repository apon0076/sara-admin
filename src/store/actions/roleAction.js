//////////////////////This is import for API Call/////////////
import roleService from "../services/roleService";

export const GET_ROLE = "GET_ROLE";
export const GET_ROLE_SUCCESS = "GET_ROLE_SUCCESS";
export const GET_ROLE_ERROR = "GET_ROLE_ERROR";

export const GET_ROLE_BY_ID = "GET_ROLE_BY_ID";
export const GET_ROLE_BY_ID_SUCCESS = "GET_ROLE_BY_ID_SUCCESS";
export const GET_ROLE_BY_ID_ERROR = "GET_ROLE_BY_ID_ERROR";

export const CREATE_ROLE = "CREATE_ROLE";
export const CREATE_ROLE_SUCCESS = "CREATE_ROLE_SUCCESS";
export const CREATE_ROLE_ERROR = "CREATE_ROLE_ERROR";

export const UPDATE_ROLE = "UPDATE_ROLE";
export const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS";
export const UPDATE_ROLE_ERROR = "UPDATE_ROLE_ERROR";

export const DELETE_ROLE = "DELETE_ROLE";
export const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";
export const DELETE_ROLE_ERROR = "DELETE_ROLE_ERROR";

export function getRoleRecord() {
  return async (dispatch) => {
    dispatch(getRole());
    return await roleService
      .getRole()

      .then((response) => dispatch(getRoleSuccess(response.data)))
      .catch((error) => dispatch(getRoleError(error)));
  };
}

export function getRole() {
  return {
    type: GET_ROLE,
  };
}

export function getRoleSuccess(success) {
  return {
    type: GET_ROLE_SUCCESS,
    payload: { success },
  };
}

export function getRoleError(error) {
  return {
    type: GET_ROLE_ERROR,
    payload: { error },
  };
}

export function getRoleByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getRoleById());
    return await roleService
      .getRoleById(id)

      .then((response) => dispatch(getRoleByIdSuccess(response.data)))
      .catch((error) => dispatch(getRoleByIdError(error)));
  };
}

export function getRoleById() {
  return {
    type: GET_ROLE_BY_ID,
  };
}

export function getRoleByIdSuccess(success) {
  return {
    type: GET_ROLE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getRoleByIdError(error) {
  return {
    type: GET_ROLE_BY_ID_ERROR,
    payload: { error },
  };
}

export function createRoleRecord(data) {
  //////debugger;
  return async (dispatch) => {
    dispatch(createRole());
    return await roleService
      .createRole(data)

      .then((response) =>
        dispatch(createRoleSuccess(response), alert(response.message))
      )
      .catch((error) => dispatch(createRoleError(error)));
  };
}

export function createRole() {
  return {
    type: CREATE_ROLE,
  };
}

export function createRoleSuccess(success) {
  return {
    type: CREATE_ROLE_SUCCESS,
    payload: { success },
  };
}

export function createRoleError(error) {
  return {
    type: CREATE_ROLE_ERROR,
    payload: { error },
  };
}

export function updateRoleRecord(roles) {
  return async (dispatch) => {
    dispatch(updateRole());
    return await roleService
      .createRole(roles)
      
      .then((response) => dispatch(updateRoleSuccess(response)))
      .catch((error) => dispatch(updateRoleError(error)));
  };
}

export function updateRole() {
  return {
    type: UPDATE_ROLE,
  };
}

export function updateRoleSuccess(success) {
  return {
    type: UPDATE_ROLE_SUCCESS,
    payload: { success },
  };
}

export function updateRoleError(error) {
  return {
    type: UPDATE_ROLE_ERROR,
    payload: { error },
  };
}

export function deleteRoleRecord(id) {
  return async (dispatch) => {
    dispatch(deleteRole());
    return await roleService
      .deleteRole(id)

      .then((response) => dispatch(deleteRoleSuccess(response)))
      .catch((error) => dispatch(deleteRoleError(error)));
  };
}

export function deleteRole() {
  return {
    type: DELETE_ROLE,
  };
}

export function deleteRoleSuccess(success) {
  return {
    type: DELETE_ROLE_SUCCESS,
    payload: { success },
  };
}

export function deleteRoleError(error) {
  return {
    type: DELETE_ROLE_ERROR,
    payload: { error },
  };
}
