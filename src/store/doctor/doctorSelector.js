// ---------------- GET ALL PACKAGE OF DOCTOR SELECTOR -------------------------
export const pakageOfDoctorSelector = state => state.doctor.packageOfDoctor;
export const statusPackageDoctorSelector = state =>
  state.doctor.statusGetPackageDoctor;
export const messagePackageDoctorSelector = state =>
  state.doctor.messageGetPackageDoctor;

// ---------------- FOLLOW DOCTOR SELECTOR ------------------------------
export const statusFollowDoctorSelector = state => state.doctor.statusFollowDoctor;
export const messageFollowDoctorSelector = state => state.doctor.messageFollowDoctor;
