import { observable, action, makeAutoObservable } from "mobx";

class Session {
  currentSession = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSession(session) {
    this.currentSession = session;
  }

  clearSession() {
    this.currentSession = null;
  }
}

const SessionStore = new Session();
export default SessionStore;
