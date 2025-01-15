import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination, setPagination }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <span className="text-sm text-gray-600">
        Showing {(pagination.currentPage - 1) * 10 + 1} to{' '}
        {Math.min(pagination.currentPage * 10, pagination.totalEmployees)} of{' '}
        {pagination.totalEmployees} entries
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
          disabled={pagination.currentPage === 1}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setPagination(prev => ({ ...prev, currentPage: page }))}
              className={`px-3 py-2 border rounded-lg ${
                page === pagination.currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          disabled={pagination.currentPage === pagination.totalPages}
          className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
