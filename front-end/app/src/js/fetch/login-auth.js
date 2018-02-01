import { locale } from "moment";

export const auth = {
  isAuthenticated: false,
  loginAuth(){
    var token = localStorage.getItem('scm-token');
    if(token != null){
      return true;
    }
    return false;
  }
}

export const auth2 = {msg: "test"};

