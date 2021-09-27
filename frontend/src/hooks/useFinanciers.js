import { useQuery } from "react-query";
import { queryKeys } from "../react-query/constants";

import httpClient from "../api/httpClient";

const getFinancier = async () => {
	const { data } = await httpClient.get(`/api/financier/user/${1}`);
	return data;
};

export const useFinanciers = () => {
	const { data } = useQuery(queryKeys.financiers, getFinancier);
	return data.financiers;
};
