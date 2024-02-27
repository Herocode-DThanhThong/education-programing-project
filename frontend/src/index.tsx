import TimeAgo from "javascript-time-ago";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import { persistor, store } from "./redux/configureStore";
import reportWebVitals from "./reportWebVitals";
import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";
import "quill/dist/quill.snow.css";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(vi);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer />
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
