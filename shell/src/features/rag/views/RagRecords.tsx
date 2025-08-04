import { PreviewAreaItem } from "../external";
import { useRagFetch } from "../hooks/useRagFetch"
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { RenderMetadata } from '../components/RenderMetadata';

export const RagRecordsView = () => {
    const navigate = useNavigate();
    const {data, fetchNextPage, fetchPreviousPage, hasNextPage, isFetchingNextPage, isFetchingPreviousPage, hasPreviousPage} = useRagFetch();
    
    return (
        <div className="w-full flex flex-col h-full overflow-hidden bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">RAG Records</h2>
                <button
                    onClick={() => navigate('/rag/add')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add New Records
                </button>
            </div>
            <div className="overflow-x-auto grow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Metadata
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Component
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data?.pages.map((page, pageIndex) => (
                            page.records.map((record, recordIndex) => (
                                <tr 
                                    key={`${pageIndex}-${recordIndex}`} 
                                    className={`h-16 ${recordIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                >
                                    <td className="px-6 py-4 align-top max-w-lg">
                                        <RenderMetadata metadata={record.metadata} />
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <ErrorBoundary fallback={<div>Something went wrong</div>} >
                                            <PreviewAreaItem item={{ 
                                              id: record.id, 
                                              name: record.content.name, 
                                              html: 'tailwind' in record.content.code ? 
                                                (record.content.code.tailwind || '') : 
                                                (record.content.code.html || '') 
                                            }} />
                                        </ErrorBoundary>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <div>
                    {hasPreviousPage && 
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 mr-2"
                            onClick={() => fetchPreviousPage()} 
                            disabled={isFetchingPreviousPage}
                        >
                            {isFetchingPreviousPage ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : 'Load Previous'}
                        </button>
                    }
                </div>
                
                <div>
                    {(isFetchingNextPage || isFetchingPreviousPage) && 
                        <span className="mr-2 text-gray-600">
                            Loading...
                        </span>
                    }
                    {hasNextPage && 
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            onClick={() => fetchNextPage()} 
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : 'Load More'}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}