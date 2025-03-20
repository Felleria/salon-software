import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ServiceHistory({ services, clientId }) {
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Sort services by date
  const sortedServices = [...services].sort((a, b) => {
    const dateA = new Date(a.date_time.split(' ')[0]);
    const dateB = new Date(b.date_time.split(' ')[0]);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Service History</h3>
        <div className="flex space-x-2">
          <button
            onClick={toggleSortOrder}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
          </button>
          <Link
            to={`/services/new/${clientId}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-purple-600 hover:bg-purple-700"
          >
            Add Service
          </Link>
        </div>
      </div>
      
      {sortedServices.length > 0 ? (
        <div className="space-y-4">
          {sortedServices.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-2 md:mb-0">
                  <h4 className="text-lg font-medium text-gray-900">{service.service_type}</h4>
                  <p className="text-sm text-gray-500">With {service.stylist}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">${service.cost.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{service.date_time}</p>
                </div>
              </div>
              
              <div className="mt-3 border-t border-gray-200 pt-3">
                {service.products_used && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-500">Products Used:</p>
                    <p className="text-gray-700">{service.products_used}</p>
                  </div>
                )}
                
                {service.satisfaction_rating !== null && (
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-500 mr-2">Client Satisfaction:</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < service.satisfaction_rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex justify-end space-x-2">
                  <Link
                    to={`/services/${service.id}/edit`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No services</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a service for this client.</p>
          <div className="mt-6">
            <Link
              to={`/services/new/${clientId}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Add Service
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceHistory;