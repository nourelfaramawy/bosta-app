import React, { useState } from 'react';

const SearchShipment = ({ onSubmit }: { onSubmit: (trackingNumber: string) => void }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(trackingNumber);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', direction: 'rtl'  }}>
      <h2>تتبع شحنتك</h2>
      <p>جميع تحديثات الشحنة ستكون متاحة من خلال هذا الرابط.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="أدخل رقم الشحنة"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: 'red', color: 'white' }}>
          تتبع
        </button>
      </form>
    </div>
  );
};

export default SearchShipment;
