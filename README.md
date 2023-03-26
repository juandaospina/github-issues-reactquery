# React Query - Issues

1. Clonar repositorio
2. Ejecutar ``` yarn install``` o ```npm install```
3. Abrir el URL del proyecto

# Pasos implementación Tanstack Query

1. Instalacciones
2. Crear el cliente de react query en el root del proyecto -> const client = new queryClient()
3. Agregar el queryClientProvider envolviendo la aplicación y pasar el client
4. Crear las query en componentes o a través de hooks
    const query = useQuery({
        queryKey: ['todos']
        queryFn: getData()
    })
5. Parámetros adicionales que se pueden pasar a la query: 
    1. staleTime: indica la cantidad de milisegundos en los que la información no será considerada obsoleta
    2. refetchOnWindowFocus: evita hacer el fetching de data cada vez que el usuario este en el foco de la pantalla
    3. initialData y placeholderData: ambas opciones proveen la posibilidad de cargar data con la misma estructura de la 
        que sabemos será cargada, aunque existe una diferencia, initialData persiste en fresh la información por lo cual se debe 
        tener cuidado en su uso. Ambas opciones reciben un object[] de la estructura a cargar 
    4. cacheTime: permite indicar que cantidad de tiempo se tendrá la query en cache, por defecto es de 5 min
    5. enable: permite condicionar el llamado de la query si en el caso esta depende de otra para su ejecución
        para tal habilitación podemos utilizar un ternario que la condicione || enable: !!todos -> true // false
    6. updateAt: permite establecer un fecha en tiempo en la cual la información se considerará fresca, opción 
       similar a staleTime.

6. Tanstack Query identifica cuando las querys no se están utilizando sea porque los componentes renderizados o páginas no requieran de ellas, 
   y cuando esto pasa, de forma automática deja en una estado de inactive las querys no usadas por 5 minutos y las borra si no se vuelven a requerir
   para controlar el rendimiento

7. prefetchQuery: este prellamado de la información es muy útil para casos en los cuales busquemos tener la información servida en el momento en que
   nuestros usuarios hagan hover a los componentes de información, su estructura es la misma a la de useQuery pero en particular requiere de la
   instancia del queryClient creado

    const queryClient = useQueryClient(); // hook que nos permite manejar nuestro queryClient en todo el contexto de la aplicación

   const prefetchingData = async () => {
    await queryClient.prefetchData({
        queryKey: ['todos'],
        queryFn: getTodos
    })
   }
8. Cuando se van a manejar varios valores de referencia en la queryKey que vienen a través de un array pueden ser pasados directamente 
en un objecto y react query les dará el manejo adecuado para su identificación indiferentemente de como entran los valores.
    const issuesQuery = useQuery({
        queryKey: ["issues", {state, selectedLabels}], 
        queryFn: () => getIssues(selectedLabels, state),
    });
9. Cuando se busca trabajar con paginación react query nos provee el hook useInfiniteQuery que controla la carga de páginas, y la validación de datos constante por cada page.
   const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, selectedLabels }],
    (data) => getIssues(data),
    {
        // Propiedad que se encarga de controlar el paso de páginas 
        getNextPageParam: (lastPage, pages) => {
            if(lastPage.length === 0) return;
            return pages.length + 1;
        }
    }
  );
