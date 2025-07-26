import React, { useState, useCallback } from 'react';
import { PreviewAreaItem } from "../external";
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import type { ComponentMetadata } from '../types';
import axiosInstance from '../../../axiosInstance';
import { apiRequest } from '../../../shared/utils/apiReuest';

export const AddRagRecords = () => {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState('');
  const [components, setComponents] = useState<ComponentMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Custom toast function
  const showToast = useCallback(({ title, description, status = 'info' }: { title: string; description: string; status?: 'success' | 'error' | 'info' | 'warning' }) => {
    // This is a simple toast implementation. You might want to use a proper toast library like react-hot-toast
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg ${
      status === 'success' ? 'bg-green-500' :
      status === 'error' ? 'bg-red-500' :
      status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
    } text-white max-w-md z-50`;
    
    toast.innerHTML = `
      <h3 class="font-bold">${title}</h3>
      <p class="text-sm">${description}</p>
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }, []);

  const parseJsonInput = useCallback(() => {
    try {
      setError(null);
      if (!jsonInput.trim()) {
        setComponents([]);
        return;
      }
      
      const parsed = JSON.parse(jsonInput);
      const componentsArray = Array.isArray(parsed) ? parsed : [parsed];
      setComponents(componentsArray);
    } catch (err) {
      setError('Invalid JSON format');
      console.error('Error parsing JSON:', err);
    }
  }, [jsonInput]);

  const handleDelete = (index: number) => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
    setJsonInput(JSON.stringify(newComponents, null, 2));
  };

  const handleAddToVectorStore = async () => {
    if (components.length === 0) {
      showToast({
        title: 'No components to add',
        description: 'Please add at least one component',
        status: 'warning'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest<{ count: number, success: boolean }>(() => axiosInstance.post('/library/add-to-html-rag', { components }),
        'library/add-to-html-rag error');
      
      showToast({
        title: 'Success',
        description: `Added ${response.count} components to the vector store`,
        status: 'success'
      });
      
      // Clear the form after successful submission
      setComponents([]);
      setJsonInput('');
    } catch (error: unknown) {
      console.error('Error adding components:', error);
      showToast({
        title: 'Error',
        description: (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add components',
        status: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderMetadata = (metadata: Omit<ComponentMetadata, 'code' | 'componentId'>, level: number = 0) => {
    return Object.entries(metadata).map(([key, value], index) => {
      const isObject = value !== null && typeof value === 'object' && !Array.isArray(value);
      const isArray = Array.isArray(value);
      
      return (
        <div key={`${key}-${index}`} className="mb-2" style={{ paddingLeft: `${level * 12}px` }}>
          <span className="">{key}:</span>{' '}
          {isArray ? (
            <span className='text-gray-500'>{value.join(', ')}</span>
          ) : isObject ? (
            <div className="ml-4 mt-1 pl-2 border-l-2 border-gray-300">
              {renderMetadata(value, level + 1)}
            </div>
          ) : (
            <span className='text-gray-500'>{String(value)}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-6 w-full mx-auto flex flex-col">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Add RAG Records</h1>
      </div>
      <div className="space-y-2 mb-6">
        <p className="text-gray-600">
          Enter an array of component objects in JSON format. Each component should match the expected schema.
        </p>
      </div>
      
      <div className="space-y-4 bg-white rounded-lg shadow p-6">
        <div className="space-y-2">
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700">
            Component JSON
          </label>
          <textarea
            id="json-input"
            value={jsonInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON array of components here..."
            className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={parseJsonInput}
            disabled={!jsonInput.trim()}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              !jsonInput.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            Parse JSON
          </button>
          
          <button
            type="button"
            onClick={handleAddToVectorStore}
            disabled={components.length === 0 || isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium flex items-center ${
              components.length === 0 || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : 'Add to Vector Store'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="mt-8 flex-1 flex flex-col">
        {components.length > 0 ? (
          <div className="flex-1 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Preview <span className="text-gray-600 text-base font-normal">({components.length} components)</span>
            </h3>
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow">
              <div className="overflow-y-auto flex-1">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metadata
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {components.map((component, index) => (
                      <tr key={component.componentId || `component-${index}`}>
                        <td className="px-6 py-4 max-w-lg">
                          {renderMetadata({
                            name: component.name,
                            sourceDesignSystem: component.sourceDesignSystem,
                            tags: component.tags,
                            description: component.description,
                            category: component.category,
                            uxPattern: component.uxPattern,
                            visualStyle: component.visualStyle,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ErrorBoundary fallback={<div>Error rendering preview</div>}>
                            <PreviewAreaItem 
                              item={{ 
                                id: parseInt(component.componentId, 10) || 0, 
                                name: component.name, 
                                html: 'tailwind' in component.code ? component.code.tailwind || '' : component.code.html || ''
                              }} 
                            />
                          </ErrorBoundary>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium border border-red-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No components to display. Add some components using the JSON input above.
          </div>
        )}
      </div>
    </div>
  );
};