import {NEOCARE} from 'store/actionsTypes';

export const actionBuyPackage = payload => ({
  type: NEOCARE.BUY_PACKAGE_REQUEST,
  payload,
});
export const actionResetBuyPackage = () => ({
  type: NEOCARE.BUY_PACKAGE_RESET,
});
