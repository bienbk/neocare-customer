import {NEOCARE} from 'store/actionsTypes';

export const buyPackageAction = payload => ({
  type: NEOCARE.BUY_PACKAGE_REQUEST,
  payload,
});
export const resetBuyPackage = () => ({
  type: NEOCARE.BUY_PACKAGE_RESET,
});
