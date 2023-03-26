import { useState } from "react";

import { useIssueInfiniteScroll } from "../../hooks/useIssueInfiniteScroll";
import { IssueList, LabelPicker } from "../components";
import { Loading } from "../../components/Loading";
import { State } from "../../interfaces/issue";

export const ListViewCopy = () => {
  const [state, setState] = useState<State>();
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssueInfiniteScroll({
    state,
    selectedLabels,
  });

  // add and delete labels github
  const onLabelChange = (labelName: string) => {
    selectedLabels?.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <Loading />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onChangeState={(newState?: State) => setState(newState)}
          />
        )}

        <div className="mt-2">
          <button
            className="btn btn-outline-primary"
            disabled={ !issuesQuery.hasNextPage}
            onClick={() => issuesQuery.fetchNextPage()}
          >
            Cargar más
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
      </div>
    </div>
  );
};
