import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import modalReducer from "./modalSlice";
import popupReducer from "./popupSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["modals", "popups"], // Only persist these reducers
};

// Combine reducers
const rootReducer = combineReducers({
  modals: modalReducer,
  popups: popupReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
