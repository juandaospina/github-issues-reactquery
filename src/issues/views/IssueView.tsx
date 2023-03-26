import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useIssueItem } from "../../hooks/useIssueItem";

import { IssueComment } from "../components/IssueComment";

export const IssueView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { issueItem, issueCommentsItem } = useIssueItem(Number(id));

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      <>
        {issueItem.isLoading && issueCommentsItem.isLoading && <Loading />}

        {!issueItem.data ? (
          navigate("/")
        ) : (
          <IssueComment issue={issueItem.data} />
        )}
        {
          issueCommentsItem?.data?.map(comment => (
            <IssueComment key={comment.id} issue={comment} />
          ))
        }

      </>
    </div>
  );
};
