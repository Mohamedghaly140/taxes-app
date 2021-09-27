import "./App.css";
import AppRouter from "./router/Router";
import Spinner from "./components/Spinner/SpinnerContainer";
import { queryClient } from "./react-query/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, useIsFetching } from "react-query";

const App = () => {
	const isFetching = useIsFetching();

	return (
		<QueryClientProvider client={queryClient}>
			<AppRouter />
			{isFetching && <Spinner />}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
