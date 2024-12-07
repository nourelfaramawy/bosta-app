import React from 'react';
import './TimelineStyles.css';
import { MdDone } from 'react-icons/md';

/**
 * @file Timeline.tsx
 * @description The Timeline component renders the progress of a shipment using steps. It also displays
 * the status of the shipment and updates the progress of the timeline based on the current shipment 
 * status and cancellation status of the shipment.
 * @dependencies
 * React: Provides the framework for defining the component.
 * react-icons: Used to display an icon (MdDone) for completed steps.
 * TimelineStyles.css: Defines the styles for the timeline component.
 * @props
 * `currentStep` (number): The index of the current progress step.
 * `isCancelled` (boolean): Indicates whether the shipment is cancelled.
 */


type TimelineProps = {
    currentStep: number;
    isCancelled: boolean;
};

const Timeline:React.FC<TimelineProps> = ({ currentStep, isCancelled }) => {
  const steps = [
    'تم إنشاء الشحنة',
    'تم إستلام الشحنة من التاجر',
    'الشحنة خرجت للتسليم',
    'تم التسليم',
  ];

  return (
    <div className="container">
      <div className="progress_container">
        <div
          className="progress"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%`, transformOrigin: 'right', 
          backgroundColor: isCancelled ? 'red' : 'green',
        }}
        ></div>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`circle ${
              index <= currentStep
                ? isCancelled
                  ? 'cancelled'
                  : 'active'
                : ''
            }`}
          >
            {index <= currentStep && <MdDone />}
          </div>
        ))}
      </div>
      <div className="steps">
        {steps.map((step, index) => (
          // <span
          //   key={index}
          //   className={index <= currentStep ? 'active-step' : ''}
          // >
          //   {step}
          // </span>
          <div
            key={index}
            className={`step-container ${
              isCancelled && index === currentStep ? 'cancelled-step' : ''
            }`}
          >
            <span className={index <= currentStep ? 'active-step' : ''}>
              {step}
            </span>
            {/* Add extra text if cancelled */}
            {isCancelled && index === currentStep && (
              <span className="cancelled-text">تم إلغاء الشحنة</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
