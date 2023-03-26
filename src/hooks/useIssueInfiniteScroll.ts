import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "../api/config";

import { Issue, State } from "../interfaces/issue";

interface Props {
  state?: State;
  selectedLabels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}

const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  console.log("[QUERY_KEY]", queryKey);
  const [, , args] = queryKey;
  console.log("[ARGS]", args);
  const { state, selectedLabels } = args as Props;

  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (selectedLabels.length > 0) {
    const labels = selectedLabels.join(",");
    params.append("labels", labels);
  }

  // agregar query params de paginación
  params.append("page", pageParam.toString());
  params.append("per_page", "5");

  const { data } = await instance.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssueInfiniteScroll = ({ state, selectedLabels }: Props) => {
  // useInfiniteQuery es el hook que se encarga del control de peticiones con páginación
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, selectedLabels }],
    (data) => getIssues(data),
    {
      // Propiedad que se encarga de controlar el paso de páginas
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;
        return pages.length + 1;
      },
    }
  );

  // review
  //   const issuesQuery2 = useInfiniteQuery(
  //     queryKey: ["issues", "infinite", { state, selectedLabels, page }],
  //     queryFn: (data) => getIssues(data),
  //     options: {
  //         getNextPageParam: (lastPage, pages) => {
  //             if(lastPage.length === 0) return;
  //             return pages.length + 1;
  //         }
  //     }
  //   );

  return {
    issuesQuery,
  };
};
