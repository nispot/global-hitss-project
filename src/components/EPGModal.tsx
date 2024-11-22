import Epg from '@components/Epg/Epg';
import React from 'react';

interface EPGModalProps {
  onClose: () => void;
}

const EPGModal: React.FC<EPGModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full  h-[100vh] relative rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white px-2 py-1 text-xl"
        >
          X
        </button>
        <Epg />
      </div>
    </div>
  );
};

export default EPGModal;
