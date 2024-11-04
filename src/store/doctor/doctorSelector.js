// ---------------- GET ALL PACKAGE OF DOCTOR SELECTOR -------------------------
// export const pakageOfDoctorSelector = state => state.doctor.packageOfDoctor;
// export const statusPackageDoctorSelector = state =>
//   state.doctor.statusGetPackageDoctor;
// export const messagePackageDoctorSelector = state =>
//   state.doctor.messageGetPackageDoctor;

// ---------------- FOLLOW DOCTOR SELECTOR ------------------------------
export const statusFollowDoctorSelector = state =>
  state.doctor.statusFollowDoctor;
export const messageFollowDoctorSelector = state =>
  state.doctor.messageFollowDoctor;
export const followedDoctorSelector = state => state.doctor.followedDoctor;

// ------------------- LIST DOCTOR SELECTOR ----------------------
export const listDoctorSelector = state => state.doctor.listDoctor;
export const statusListDoctorSelector = state => state.doctor.statusListDoctor;

// ------------------ SEND SERVICE TO EXPERT ------------------
export const statusSendServiceSelector = state => state.doctor.statusSendService;
export const errorSendServiceSelector = state => state.doctor.errorSendService;
// ------------------- REMOVE DOCTOR --------------------'
export const statusRemoveDoctor = state => state.doctor.statusRemoveDoctor;
export const messageRemoveDoctor = state => state.doctor.messageRemoveDoctor;
