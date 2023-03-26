import { useQuery } from "@tanstack/react-query";

import { Issue, State } from "../interfaces/issue";
import { instance } from "../api/config";
import { useEffect, useState } from "react";

interface Props {
  state?: State;
  selectedLabels: string[];
  page?: number;
}

const getIssues = async ({
  selectedLabels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (selectedLabels.length > 0) {
    const labels = selectedLabels.join(",");
    params.append("labels", labels);
  }

  // agregar query params de paginación
  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await instance.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, selectedLabels }: Props) => {
  const [page, setPage] = useState(1);

  // si se cambio los valores en el cambio de tags, se actualiza el # de la paginacioón
  useEffect(() => {
    setPage(1);
  }, [state, selectedLabels]);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabels, page }],
    queryFn: () => getIssues({ selectedLabels, state, page }),
  });

  // controlar la paginación a través de argumentos en la query key pasadas como referencia a la
  // función que trae la información
  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage((current) => current + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((current) => current - 1);
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? "Cargando..." : page,
    nextPage,
    prevPage,
  };
};
