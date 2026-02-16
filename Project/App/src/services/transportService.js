// Simulates a backend API call
export const fetchBusDepartures = async () => {
  // Simulate network delay (e.g., 800ms)
  await new Promise(resolve => setTimeout(resolve, 800));

  // Return mock data
  return [
    {
      id: 1,
      type: 'shuttle',
      name: 'Campus Shuttle',
      status: 'On Time',
      departures: [
        { route: 'U1', destination: 'City Campus', due: '5 mins' },
        { route: 'U1', destination: 'Walsall Campus', due: '20 mins' },
        { route: 'U1', destination: 'Telford Campus', due: '45 mins' }
      ]
    },
    {
      id: 2,
      type: 'public',
      name: 'Public Bus',
      status: 'Delayed',
      departures: [
        { route: '529', destination: 'Wolverhampton', due: '12 mins' },
        { route: '1', destination: 'Dudley', due: '18 mins' },
        { route: '79', destination: 'Birmingham', due: '25 mins' }
      ]
    }
  ];
};

export const fetchParkingStatus = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { id: 'north', name: 'North Car Park', spaces: 45, total: 100, status: 'available' },
    { id: 'south', name: 'South Car Park', spaces: 8, total: 50, status: 'limited' }
  ];
};

export const fetchJourneyOptions = async (coords) => {
  // Simulate API calculation delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock response based on "location" (randomized slightly)
  return [
    { type: 'train', label: 'Fastest', provider: 'West Midlands Railway', duration: '18 mins', cost: '£4.20', depart: '10:45', arrive: '11:03' },
    { type: 'bus', label: 'Cheapest', provider: 'National Express', duration: '35 mins', cost: '£2.40', depart: '10:38', arrive: '11:13' },
    { type: 'walk', label: 'Eco', provider: 'Walking', duration: '45 mins', cost: 'Free', depart: 'Now', arrive: '11:30' },
  ];
};
