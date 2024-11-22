import { HoveredEvent } from '@/types';

interface EventHoverDetailsProps {
  hoveredEvent: HoveredEvent | null;
}

export const EventHoverDetails = ({ hoveredEvent }: EventHoverDetailsProps) => {
  return (
    <div className="min-h-48 h-auto p-4 bg-gray-800 text-white flex items-center px-4 ">
      {hoveredEvent ? (
        <div>
          <h1 className="text-lg font-bold">{hoveredEvent.name}</h1>
          <p>{hoveredEvent.timeInfo}</p>
          <p className="text-sm ">
            {hoveredEvent.description != hoveredEvent.name
              ? hoveredEvent.description
              : 'Sin descripción'}
          </p>
        </div>
      ) : (
        <p>Pasa el mouse sobre un programa para ver los detalles</p>
      )}
    </div>
  );
};
