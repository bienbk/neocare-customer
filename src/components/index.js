// export {Splash} from './Splash/Splash'; cách này xuất ra named export Splash trực tiếp
// từ file Splash.js nằm trong thư mục Splash
// thì bạn có thể import Splash từ đường dẫn import Splash from 'components/Splash';
// mà không cần phải chỉ định đường dẫn đầy đủ tới Splash component

import Splash from './Splash/Splash'; //xuất ra named export Splash từ module hiện tại
import Main from './Main/Main';
import Home from './Home/Home';
import Login from './Login/Login';
import VerifyCode from './VerifyCode/VerifyCode';
import Profile from './Profile/Profile';
import ProfileHealth from './ProfileHealth/ProfileHealth';
import MyDoctor from './MyDoctor/MyDoctor';
import HealthManual from './HealthManual/HealthManual';
import DoctorDetail from './DoctorDetail/DoctorDetail';
import Account from './Account/Account';
import PackageDetail from './PackageDetail/PackageDetail';
import Connection from './Connection/Connection';
export {
  Splash,
  Main,
  Home,
  Login,
  VerifyCode,
  Profile,
  ProfileHealth,
  Connection,
  HealthManual,
  PackageDetail,
  MyDoctor,
  DoctorDetail,
  Account,
};
