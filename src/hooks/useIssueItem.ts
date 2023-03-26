import { useQuery } from "@tanstack/react-query";

import { instance } from "../api/config";
import { Issue } from "../interfaces/issue";

export const getIssueItem = async (issueId: number): Promise<Issue> => {
  const { data } = await instance.get<Issue>(`/issues/${issueId}`);
  return data;
};

export const getIssueComments = async (issueId: number): Promise<Issue[]> => {
  const { data } = await instance.get<Issue[]>(`/issues/${issueId}/comments`);
  return data;
};

export const useIssueItem = (issueNumber: number) => {
  const issueItem = useQuery({
    queryKey: ["ISSUE_ITEM", issueNumber],
    queryFn: () => getIssueItem(issueNumber),
  });

  const issueCommentsItem = useQuery({
    queryKey: ["ISSUE_COMMENTS", issueNumber],
    queryFn: () => getIssueComments(issueNumber),
    // cacheTime nos permite formatear la cantidad de milisegundos en los que la query se estará en cache
    cacheTime: 1000 * 90,
    // enable permite condicionar el llamado de la query si en el caso esta depende de otra para su ejecución, en este caso de issueItem
    enabled: !!issueItem,
  });

  return {
    issueItem,
    issueCommentsItem,
  };
};
