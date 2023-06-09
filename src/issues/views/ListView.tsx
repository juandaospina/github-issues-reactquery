import { useState } from "react";

import { IssueList, LabelPicker } from "../components";
import { Loading } from "../../components/Loading";
import { useIssues } from "../../hooks/useIssues";
import { State } from "../../interfaces/issue";

export const ListView = () => {
  const [state, setState] = useState<State>();
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
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
            issues={issuesQuery.data}
            state={state}
            onChangeState={(newState?: State) => setState(newState)}
          />
        )}

        <div className="d-flex justify-content-between mt-2">
          <button
            className="btn btn-outline-primary"
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
          >
            Anterior
          </button>
          <span>{page}</span>
          <button
            className="btn btn-outline-primary"
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker selectedLabels={selectedLabels} onChange={onLabelChange} />
      </div>
    </div>
  );
};
