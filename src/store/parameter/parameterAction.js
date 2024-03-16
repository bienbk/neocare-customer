import {NEOCARE} from 'store/actionsTypes';

export const createParameterAction = payload => ({
  type: NEOCARE.CREATE_PARAMETER_REQUEST,
  payload,
});
export const resetCreationParameter = () => ({
  type: NEOCARE.CREATE_PARAMETER_RESET,
});

export const listParameterAction = payload => ({
  type: NEOCARE.LIST_PARAMETER_REQUEST,
  payload,
});
export const resetListingParameter = () => ({
  type: NEOCARE.LIST_PARAMETER_RESET,
});
