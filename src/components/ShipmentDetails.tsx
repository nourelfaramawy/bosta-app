import React from 'react';
import "./ShipmentStyles.css";
import { STATIC_STRINGS } from './ShipmentDetailsStrings';


/**
 * @file ShipmentDetails.tsx
 * @description The Shipment Details component renders the details of the shipment by displaying the date
 * and time of each status of the shipment, such as when the shipment was created, confirmed, out for 
 * delivery, and finally delivered. Additionally, it reflects the shipping address.  
 * @dependencies
 * React: Provides the framework for defining the component.
 * ShipmentStyles.css: Defines the styles for the shipmet component.
 * STATIC_STRINGS: Constains all the static strings in the Order component that enables for easy and quick
 * changes.
 * @props
 * `orderData` (any): The shipment json data retrieved from the API.
 * `isCancelled` (boolean): Indicates whether the shipment is cancelled.
 * `currentStep` (number): The index of the current progress step.
 *  @functions
 * `fetchOrderData`: Fetches shipment data from the API, updates state based on tracking 
 *   number, and handles loading and error states.
 * `formatDate`: it formates the date from the orderData into date and time.
 */

type DetailProps = {
    orderData: any;
    isCancelled: boolean;
    currentStep: number;
};


const ShipmentDetails:React.FC<DetailProps> = ({orderData, isCancelled, currentStep}) => {


const steps = [
    { index: 0, desc: 'تم إنشاء الشحنة' },
    { index: 1, desc: 'تم إستلام الشحنة من التاجر' },
    { index: 2, desc: 'الشحنة خرجت للتسليم' },
    { index: 3, desc: 'تم التسليم' },
  ];


const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric'
  });
  const datePart = dateFormatter.format(dateObj);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true
  });
  const timePart = timeFormatter.format(dateObj);

  return { date: datePart, time: timePart };
};

  return (
    <div className="shipment-container">
      <div className="delivery-address">
        <p className="address-title">{STATIC_STRINGS.deliveryAddressTitle}</p>
        <p className="address-details">{STATIC_STRINGS.addressDetails}</p>
        <div className="report-issue">
          <p>{STATIC_STRINGS.reportIssue}</p>
          <button className="report-button">{STATIC_STRINGS.reportButton}</button>
        </div>
      </div>

      <div className="shipment-details">
        <p className="details-title">{STATIC_STRINGS.shipmentTitle}</p>
        <table className="shipment-table">
          <thead>
            <tr>
              <th>{STATIC_STRINGS.branch}</th>
              <th>{STATIC_STRINGS.date}</th>
              <th>{STATIC_STRINGS.time}</th>
              <th>{STATIC_STRINGS.details}</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr key={step.index}>
                <td>مدينة نصر</td>
                <td>
                  {step.index === 0 && orderData
                    ? formatDate(orderData.CreateDate).date
                    : '05/04/2020'}
                </td>
                <td className="time-column">
                  {step.index === 0 && orderData
                    ? formatDate(orderData.CreateDate).time.toLocaleLowerCase()
                    : '12:30 pm'}
                </td>
                <td>{step.desc} {isCancelled && currentStep === step.index && (
                    <span className="shipment-cancelled-text">{STATIC_STRINGS.shipmentCancelled}</span>
                  )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentDetails;
