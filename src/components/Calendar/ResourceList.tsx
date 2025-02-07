import React from 'react';
import { Plus } from 'lucide-react';
import type { Resource } from '../../types';

interface ResourceListProps {
  resources: Resource[];
  onAddResource: () => void;
}

export function ResourceList({ resources, onAddResource }: ResourceListProps) {
  return (
    <div className="border-r dark:border-gray-700 w-48 flex-shrink-0">
      <div className="p-4 border-b dark:border-gray-700 font-semibold dark:text-white">
        Resources
      </div>
      <div className="overflow-y-auto">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="p-4 border-b dark:border-gray-700 dark:text-gray-300"
          >
            {resource.name}
          </div>
        ))}
        <button
          onClick={onAddResource}
          className="w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-600 dark:text-gray-400"
        >
          <Plus className="w-4 h-4" />
          Add Resource
        </button>
      </div>
    </div>
  );
}