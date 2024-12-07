import React, { useState } from 'react';
import './App.css';
import Bosta from './components/Bosta';
import Order from './components/Order';
import SearchShipment from './components/SearchShipment';

/**
 * @file App.tsx
 * @description This file defines the `App` component, which serves as the root 
 * component for the application. It manages the layout and structure by rendering 
 * the header component `Bosta`, which includes the company's logo and navigation links, 
 * and the `Order` component, which displays tracking information for orders based on 
 * the provided tracking number. It also integrates the `SearchShipment` component to allow 
 * users to input and submit tracking numbers to display order details.
 * 
 * @dependencies
 * React: Provides the framework for defining the component.
 * Bosta: A header component that contains the company's logo and navigation links.
 * Order: A component that handles the order tracking functionality, displaying details based on a  
 * tracking number.
 * Loader: A loading spinner component (currently commented out) used to indicate loading states.
 * SearchShipment: A component that allows the user to input and submit a shipment tracking number.
 * App.css: The stylesheet that defines the layout and appearance of the main application.
 * 
 * @component
 * The `App` component manages the state for the `trackingNumber` and renders:
 * The `Bosta` component (company logo and navigation)
 * The `SearchShipment` component (for submitting the tracking number)
 * The `Order` component (which shows tracking details for the submitted tracking number)
 * 
 * @state
 * trackingNumber (string): A state variable used to store the tracking number input by the user.
 * 
 */



function App() {

   const [trackingNumber, setTrackingNumber] = useState<string>('');

  return (
    <div className="App">
     <Bosta />
     <SearchShipment onSubmit={setTrackingNumber} />
      {trackingNumber && <Order trackingNumber={trackingNumber} />}
    </div>
  );
}

export default App;
