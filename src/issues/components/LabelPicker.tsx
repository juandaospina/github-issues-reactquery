import { Loading } from "../../components/Loading";
import { useLabels } from "../../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker = ({ onChange, selectedLabels }: Props) => {
  const { labelsQuery } = useLabels();

  return (
    <div>
      {labelsQuery.isLoading ? (
        <Loading />
      ) : (
        labelsQuery.data?.map((label) => (
          <span
            onClick={() => onChange(label.name)}
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${
              selectedLabels.includes(label.name) && `label-active`
            }`}
            style={{
              border: `1px solid #${label.color}`,
              color: `#${label.color}`,
            }}
          >
            {label.name}
          </span>
        ))
      )}
    </div>
  );
};
