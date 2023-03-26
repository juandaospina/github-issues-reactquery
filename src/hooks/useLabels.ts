import { useQuery } from "@tanstack/react-query";
import { instance } from "../api/config";
import { Label } from "../interfaces/label";

// :Promise<type> indica que returna una promesa y el tipo de dato de la misma
const getLabels = async (): Promise<Label[]> => {
  const { data } = await instance.get<Label[]>("/labels", {
    headers: {
      Authorization: null,
    },
  });
  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    // Si un usuario abandona la pag y regresa tanstack query realiza de forma automática una nueva solicitud
    // para mantener el estado actualizado, esto se puede deshabilitar usando refetchOnWindowFocus por cada query
    // o como un defaultOptions en el queryClient()
    refetchOnWindowFocus: false,
    // Permite definir el tiempo en milisegundos en el que la información se va considerar fresca, por defecto esta
    // tiene  1 segundo y luego de este pasa a considerarse obsolota por lo que tanstack query volverá a hacer un fetching
    staleTime: 1000 * 30 * 30,
  });

  return { labelsQuery };
};
