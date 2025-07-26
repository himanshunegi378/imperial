import { PreviewArea } from "../components/PreviewArea";
import { useFetchAllComponents } from "../hooks/useFetchAllComponents";
import { useDeleteComponents } from "../hooks/useDeleteComponent";

export const PreviewAreaContainer = () => {
    const { data, isLoading, error } = useFetchAllComponents();
    const { mutateAsync: deleteComponents } = useDeleteComponents();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message} </div>;
    return (
        <div>
            <PreviewArea deleteComponents={deleteComponents} htmlContentList={data || []} />
        </div>
    )
}