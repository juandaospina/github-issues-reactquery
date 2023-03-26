import { FC } from "react";

import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getIssueItem, getIssueComments } from "../../hooks/useIssueItem";
import { Issue, State } from "../../interfaces/issue";
import { timeSince } from "../../helpers/time-since";

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => { 
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchQueryIssues = async (issueNumber: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['ISSUE_ITEM', issueNumber],
      queryFn: () => getIssueItem(issueNumber),
      cacheTime: 1000 * 150 // query en cache por  minutos
    })

    await queryClient.prefetchQuery({
      queryKey: ['ISSUE_COMMENTS', issueNumber],
      queryFn: () => getIssueComments(issueNumber),
      cacheTime: 1000 * 180 // query en cache por 3 minutos
    });
  }


  const handleClick = () => {
    return navigate(`/issues/issue/${issue.number}`);
  }

  return (
    <div className="card mb-2 issue" onClick={handleClick} onMouseEnter={() => prefetchQueryIssues(issue.number)}>
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}
        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened {timeSince(issue.created_at)} ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
            <div>
              {issue.labels.map(label => (
                <span
                  key={label.id}
                  className="badge rounded-pill m-1"
                  style={{ backgroundColor: `#${label.color}`, color: 'black'}}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
