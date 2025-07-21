import { PreviewArea } from "../components/PreviewArea";
import { useFetchAllComponents } from "../hooks/useFetchAllComponents";

export const PreviewAreaContainer = () => {
    const { data, isLoading, error } = useFetchAllComponents();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message} </div>;
    return (
        <div>
            <PreviewArea htmlContentList={data || []} />
        </div>
    )
}