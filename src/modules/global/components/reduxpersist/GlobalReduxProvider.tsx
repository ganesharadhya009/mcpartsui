import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactElement, ReactNode, ReactPortal } from "react";
import { persistor, store } from "../../redux/store";
import LoadingFullScreen from "../../../common/components/LoadingFullScreen";

/**
 * Global redux provider with persist local storage for state management.
 * @param props properties of the GlobalReduxProvider includes child component
 * @returns PersistGate which renders the loadingspinner while persist retrieves data to redux
 */

export const GlobalReduxProvider = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<string>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingFullScreen />}
        onBeforeLift={() => {}}
        persistor={persistor}
      >
        {props.children}
      </PersistGate>
    </Provider>
  );
};
