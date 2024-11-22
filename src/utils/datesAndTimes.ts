export function getApiDateRange() {
  const now = new Date();
  const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours after now

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  return {
    startDate: formatDate(now),
    endDate: formatDate(endDate),
  };
}

export const formatDuration = (duration: string) => {
  const [hours, minutes] = duration.split(':').map(Number);
  return `${hours}h ${minutes}min`;
};

export const generateTimeTitles = () => {
  const now = new Date();
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  let currentHour = now.getHours();

  if (currentHour < 0) {
    currentHour += 24;
  }

  const titles = [];
  for (let i = 0; i < 27 * 2; i++) {
    const hour = (currentHour + Math.floor(i / 2)) % 24;
    const minutes = i % 2 === 0 ? '00' : '30';
    titles.push({
      label: `${hour.toString().padStart(2, '0')}:${minutes}`,
      timestamp: new Date(now.getTime() + i * 30 * 60 * 1000).getTime() / 1000,
    });
  }

  return titles;
};

export const formatTime = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const calculateProportionalPosition = (
  unixStart: number,
  unixEnd: number,
  timeSlots: { label: string; timestamp: number }[]
) => {
  const slotWidth = 150;
  const gridStart = timeSlots[0].timestamp;
  const totalGridWidth = timeSlots.length * slotWidth;

  // Calculate position relative to grid start
  const startOffset = unixStart - gridStart;
  const duration = unixEnd - unixStart;

  // Convert seconds to pixels (30 minutes = 150px)
  const pixelsPerSecond = slotWidth / (30 * 60);
  const startPosition = startOffset * pixelsPerSecond;
  const width = duration * pixelsPerSecond;

  return {
    startPosition: Math.max(0, startPosition),
    width: Math.max(5, Math.min(width, totalGridWidth - startPosition)),
  };
};
