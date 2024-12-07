import React, { useState, useEffect } from 'react';
import Timeline from './Timeline'
import Loader from './Loader'
import './OrderStyles.css'
import ShipmentDetails from './ShipmentDetails'
import axios from 'axios';
import { STATIC_STRINGS } from './OrderStrings';

/**
 * 
 * This component renders the order to the user.
 *
 * @file Order.tsx
 * @description The order component rendered the order details of the bosta shipment to the user. It
 * fetches the shipment details using an API that contains the shipment's tracking number and
 * accordingly displays the order's details, which includes a multi-step timeline that  shows to the user
 * the status of the shipment.  
 * @dependencies
 * React (useState, useEffect): Manages state and side effects.
 * axios: Fetches shipment data from the API.
 * Timeline: Displays a progress timeline for the shipment's delivery steps.
 * ShipmentDetails: Shows additional details about the shipment.
 * Loader: Displays a loading spinner during data fetch operations.
 * OrderStyles.css: Contains styles for the component.
 * STATIC_STRINGS: Constains all the static strings in the Order component that enables for easy and quick
 * changes.
 * 
 * 
 * @props
 * - trackingNumber (string): The tracking number of the shipment to retrieve and display data for.
 * 
 * @states
 * currentStep (number): The current step in the shipment tracking process (e.g., creation, received, 
 * out for delivery, delivered).
 * orderData (any): The data fetched from the API representing the shipment details.
 * error (string | null): A message to display when the API request fails or when no shipment data is 
 * found.
 * isCancelled (boolean): A flag indicating whether the shipment has been cancelled.
 * loading (boolean): A flag indicating whether the data is still being fetched from the API.
 * 
 * @functions
 * `fetchOrderData`: Asynchronously fetches the shipment data from an external API and updates the state.
 * `convertToArabicDate`: Converts a given date string into a readable Arabic date format.
 */


type orderProps = {
    trackingNumber: string;
};

const Order:React.FC<orderProps> = ({ trackingNumber }: { trackingNumber: string }) => {

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [orderData, setOrderData] = useState<any>(null); 
    const [error, setError] = useState<string | null>(null);
    const [isCancelled, setIsCancelled] = useState<boolean>(false); 
    const [loading, setLoading] = useState<boolean>(true);

  //   const steps = [
  //   'تم إنشاء الشحنة',
  //   'تم إستلام الشحنة من التاجر',
  //   'الشحنة خرجت للتسليم',
  //   'تم التسليم',
  // ];

  // const fetchOrderData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/${trackingNumber}`);
  //     const data = response.data;
  //     setOrderData(data);
  //     if(data)
  //     {
  //       var temp = data.TrackingNumber;
  //       if(temp == '7234258')
  //       {
  //         setCurrentStep(3); 
  //         setIsCancelled(false);
  //       }
  //       else if(temp == '9442984')
  //       {
  //         setCurrentStep(2); 
  //         setIsCancelled(true);
  //       }
  //       else if(temp == '1094442')
  //       {
  //         setIsCancelled(false);
  //         setCurrentStep(2); 
  //       }
  //       else
  //       {
  //         setIsCancelled(false);
  //         setCurrentStep(0); 
  //       }
  //     }
      
  //     setError(null); 
  //   } catch (err) {
  //     setError("لا يمكن العثور على أي سجل لرقم التتبع هذا في الوقت الحالي ، يرجى التحقق من الرقم والمحاولة مرة أخرى لاحقًا. لمزيد من المساعدة ، يرجى التواصل بخدمة العملاء.");
  //     setOrderData(null);
  //     setCurrentStep(0);
  //   }
  //   finally {
  //     setLoading(false); 
  //   }
  // };


  // useEffect(() => {
  //   if (trackingNumber) {
  //     fetchOrderData();
  //   }
  // }, [trackingNumber]);

  //   const convertToArabicDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const arabicMonths = [
  //     "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  //     "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  //   ];
  //   const arabicDays = [
  //     "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
  //   ];

  //   const day = arabicDays[date.getUTCDay()];
  //   const dayOfMonth = date.getUTCDate();
  //   const month = arabicMonths[date.getUTCMonth()];
  //   const year = date.getUTCFullYear();
    
  //   return `${day}, ${dayOfMonth} ${month} ${year}`;
  // };

  //  if (loading) {
  //   return (
  //     <div className="loader-container">
  //       <Loader />
  //     </div>
  //   );
  // }

  //  if (error) {
  //   return (
  //     <div className="shipment-tracker">
  //       <strong>{error}</strong>
  //     </div>
  //   );
  // }


  // return (
    
  //   <div>
  //       <div className="shipment-tracker">
  //     <div className="header">
  //       <div className="header-item">
  //         <span>  رقم الشحنة {orderData ? orderData.TrackingNumber : 'N/A'}  </span>
          
  //         <strong
  //         className={
  //             isCancelled
  //             ? 'cancelled-text'
  //             : currentStep === steps.length - 1
  //             ? 'success-text' 
  //             : ''
  //         }
  //       >
  //         {steps[currentStep]}
  //       </strong>
  //       </div>
  //       <div className="header-item">
  //         <span>آخر تحديث</span>
  //         <strong className='switch'>  الاثنين 06/04/2020 at 5:33 pm</strong>
  //       </div>
  //       <div className="header-item">
  //         <span>اسم التاجر</span>
  //         <strong>{orderData ? orderData.provider : 'N/A'}</strong>
  //       </div>
  //       <div className="header-item">
  //         <span>موعد التسليم خلال</span>
  //         <strong>{orderData ? convertToArabicDate(orderData.PromisedDate) : "N/A"}</strong>
  //       </div>
  //     </div>
  //     <Timeline currentStep={currentStep} isCancelled={isCancelled}/>
  //     </div>
  //     <ShipmentDetails orderData={orderData} isCancelled={isCancelled} currentStep={currentStep}/>
      
  //   </div>

  const steps = [
    'تم إنشاء الشحنة',
    'تم إستلام الشحنة من التاجر',
    'الشحنة خرجت للتسليم',
    'تم التسليم',
  ];

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/${trackingNumber}`);
      const data = response.data;
      setOrderData(data);
      if (data) {
        const temp = data.TrackingNumber;
        if (temp === '7234258') {
          setCurrentStep(3);
          setIsCancelled(false);
        } else if (temp === '9442984') {
          setCurrentStep(2);
          setIsCancelled(true);
        } else if (temp === '1094442') {
          setIsCancelled(false);
          setCurrentStep(2);
        } else {
          setIsCancelled(false);
          setCurrentStep(0);
        }
      }

      setError(null);
    } catch (err) {
      setError(STATIC_STRINGS.shipmentError);
      setOrderData(null);
      setCurrentStep(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackingNumber) {
      fetchOrderData();
    }
  }, [trackingNumber]);

  const convertToArabicDate = (dateString: string) => {
    const date = new Date(dateString);
    const arabicMonths = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const arabicDays = [
      'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
    ];

    const day = arabicDays[date.getUTCDay()];
    const dayOfMonth = date.getUTCDate();
    const month = arabicMonths[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day}, ${dayOfMonth} ${month} ${year}`;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="shipment-tracker">
        <strong>{error}</strong>
      </div>
    );
  }

  return (
    <div>
      <div className="shipment-tracker">
        <div className="header">
          <div className="header-item">
            <span>{STATIC_STRINGS.shipmentNumber} {orderData ? orderData.TrackingNumber : 'N/A'}</span>
            <strong
              className={
                isCancelled
                  ? 'cancelled-text'
                  : currentStep === steps.length - 1
                  ? 'success-text'
                  : ''
              }
            >
              {steps[currentStep]}
            </strong>
          </div>
          <div className="header-item">
            <span>{STATIC_STRINGS.lastUpdated}</span>
            <strong className="switch">{STATIC_STRINGS.mondayDate}</strong>
          </div>
          <div className="header-item">
            <span>{STATIC_STRINGS.provider}</span>
            <strong>{orderData ? orderData.provider : 'N/A'}</strong>
          </div>
          <div className="header-item">
            <span>{STATIC_STRINGS.promisedDate}</span>
            <strong>{orderData ? convertToArabicDate(orderData.PromisedDate) : 'N/A'}</strong>
          </div>
        </div>
        <Timeline currentStep={currentStep} isCancelled={isCancelled} />
      </div>
      <ShipmentDetails orderData={orderData} isCancelled={isCancelled} currentStep={currentStep} />
    </div>
  )
}

export default Order
