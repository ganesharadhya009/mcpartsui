import { QueryErrorResetBoundary } from "@tanstack/react-query";
import GlobalErrorBoundary from "./modules/global/components/error/GlobalErrorBoundary";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../src/modules/global/styles/Global.css";
import GlobalQueryProvider from "./modules/global/components/querycomponents/GlobalQueryProvider";
import { GlobalReduxProvider } from "./modules/global/components/reduxpersist/GlobalReduxProvider";
import ApplicationInsightsProvider from "./modules/global/components/azureinsight/ApplicationInsightsProvider";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AxiosInterceptorLayer from "./modules/global/components/api/AxiosInterceptorLayer";
import GlobalRouter from "./modules/global/routes/GlobalRouter";
import { theme } from "./modules/global/styles/theme";
import "react-toastify/dist/ReactToastify.css";
import "./modules/login/styles/setNewPassword.css";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalReduxProvider>
        <ApplicationInsightsProvider>
          <ToastContainer />
          <GlobalQueryProvider>
            <QueryErrorResetBoundary>
              {({ reset }) => (
                <GlobalErrorBoundary onReset={reset}>
                  <AxiosInterceptorLayer>
                    <BrowserRouter>
                      <GlobalRouter />
                    </BrowserRouter>
                  </AxiosInterceptorLayer>
                </GlobalErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </GlobalQueryProvider>
        </ApplicationInsightsProvider>
      </GlobalReduxProvider>
    </ThemeProvider>
  );
};

export default App;
