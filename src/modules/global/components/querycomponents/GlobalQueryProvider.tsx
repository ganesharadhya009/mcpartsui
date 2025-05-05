import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalQueryProviderProps } from "../../types/globalTypes";

/**
 * GlobalQueryProvider component provides a QueryClient to manage global query
 * configurations and the React Query Devtools in development mode.
 *
 * @param {React.ReactNode} children - The child components that require query context.
 * @param {object} config - Optional configurations to override default query and mutation behaviors.
 *
 * The configuration is resolved at three levels:
 * 1. **Global Level**: From environment variables (e.g., process.env.VITE_DEFAULT_QUERY_RETRY).
 * 2. **Component Level**: Via `config` prop, allowing specific overrides for queries and mutations.
 * 3. **Query/Mutation Level**: Individual queries and mutations can still override settings.
 */

/**
 * Conditionally renders the ReactQueryDevtools component in development mode,
 * based on the environment variable `process.env.VITE_NODE_ENV`.
 */

const GlobalQueryProvider = ({
  children,
  config,
}: GlobalQueryProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus:
          config?.defaultOptions?.queries?.refetchOnWindowFocus ??
          Boolean(process.env.VITE_QUERY_REFETCH_ON_WINDOW_FOCUS),
        retry:
          config?.defaultOptions?.queries?.retry ??
          parseInt(process.env.VITE_DEFAULT_QUERY_RETRY as string),
        staleTime:
          config?.defaultOptions?.queries?.staleTime ??
          parseInt(
            process.env.VITE_DEFAULT_QUERY_STALE_TIMEOUT_MILLI_SECOND as string
          ),
      },
      mutations: {
        retry:
          config?.defaultOptions?.mutations?.retry ??
          parseInt(process.env.VITE_DEFAULT_QUERY_MUTATION_RETRY as string),
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {process.env.VITE_NODE_ENV === GlobalConstant.DEVELOPMENT_MODE && (
        <ReactQueryDevtools
          initialIsOpen={Boolean(process.env.VITE_DEVTOOL_OPEN) as boolean}
        />
      )} */}
    </QueryClientProvider>
  );
};

export default GlobalQueryProvider;
