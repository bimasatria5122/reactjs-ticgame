import React from 'react';

export default function Modal ({ onClose, children }) {
  return (
    <div className="modal rounded-lg flex items-center justify-center">
      <div className="modal-content rounded-lg flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
