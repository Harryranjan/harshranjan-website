import React from 'react';

export default function Card({ title, description, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
