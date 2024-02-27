import {NEOCARE} from 'store/actionsTypes';

export const getListDiseasesAction = payload => ({
  type: NEOCARE.LIST_ALL_DISEASE_REQUEST,
  payload,
});
