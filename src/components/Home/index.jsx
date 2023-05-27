import React, { useState } from 'react';
import { JourneyPicker } from '../JourneyPicker';
import { JourneyDetail } from '../JourneyDetail/index.jsx';
import { SelectedSeat } from '../SelectedSeat/index.jsx';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journey) => {
    setJourney(journey);
  };

  //funkce na tlačítko "rezervovat"
  const handleBuy = () => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        seat: journey.autoSeat,
        journeyId: journey.journeyId,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate(`/reservation/${data.results.reservationId}`));
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey === null ? null : (
        <div className="container">
          Nalezeno spojení s id <JourneyDetail journey={journey} />
          <SelectedSeat autoSeat={journey.autoSeat} />
        </div>
      )}
      <div className="controls container">
        <button className="btn btn--big" type="button" onClick={handleBuy}>
          Rezervovat
        </button>
      </div>
    </main>
  );
};
