import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
//slices    
import appReducer from "./slices/app";
import audioCallReducer from './slices/audioCall';
import videoCallReducer from './slices/videoCall'
import authReducer from "./slices/auth";
import conversationReducer from "./slices/conversation";

// slicessss

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // whitelist:[],  to persist only those reducers that are inside the whitelist and if the reducers are inside the blacklist then those reducers won't be persisted
  // blacklist:[],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
  audioCall: audioCallReducer,
  videoCall: videoCallReducer,
});

export { rootPersistConfig, rootReducer };
