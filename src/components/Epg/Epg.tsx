import type { HoveredEvent } from '@/types';
import { TimeTitlesProvider } from '@context/TimeTitlesContext';
import { ChannelRow } from '@epgComponents/ChannelRow';
import { EventHoverDetails } from '@epgComponents/EventHoverDetails';
import { TimesRow } from '@epgComponents/TimesRow';
import { useChannels } from '@hooks/useChannels';
import React, { useState } from 'react';

const Epg: React.FC = () => {
  const { data: channels = [], isLoading, isError } = useChannels();
  const [hoveredEvent, setHoveredEvent] = useState<HoveredEvent | null>(null);

  return (
    <TimeTitlesProvider>
      <div className="flex flex-col h-full overflow-hidden">
        <EventHoverDetails hoveredEvent={hoveredEvent} />
        {isLoading || isError ? (
          <div className="flex-1 flex items-center justify-center bg-[#1A1A1A] text-white">
            {isLoading
              ? 'Cargando Grilla de Canales...'
              : 'Error Grilla de Canales :('}
          </div>
        ) : (
          <div className="flex-1 overflow-auto relative bg-[#1A1A1A]">
            <TimesRow />
            <div>
              {channels.map((channel) => (
                <ChannelRow
                  key={channel.id}
                  channel={channel}
                  setHoveredEvent={setHoveredEvent}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </TimeTitlesProvider>
  );
};

export default Epg;
