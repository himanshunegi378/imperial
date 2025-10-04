import { PreviewArea } from "../components/PreviewArea";
import { useFetchAllComponents } from "../hooks/useFetchAllComponents";
import { useDeleteComponents } from "../hooks/useDeleteComponent";

export const PreviewAreaContainer = () => {
    const { data, isLoading, error } = useFetchAllComponents();
    const { mutateAsync: deleteComponents } = useDeleteComponents();

    if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="h-screen flex items-center justify-center">Error: {error.message} </div>;
    return (
        <div className="h-screen overflow-y-auto">
            <PreviewArea deleteComponents={deleteComponents} htmlContentList={data || []} />
        </div>
    )
}