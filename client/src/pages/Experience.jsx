import React from 'react';
import Title from '../components/Title';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';

const Experience = () => {
  return (
    <div className='flex flex-col items-center pt-24 min-h-screen w-full'>
      <div className='px-6 md:px-16 lg:px-24 bg-white py-12 text-center w-full'>
        <Title title="The QuickStay Experience" subTitle="Discover what makes staying with us so special" />
        <p className='max-w-3xl mx-auto mt-8 text-gray-600'>
          From seamless booking to luxurious accommodations, the QuickStay experience is tailored to provide you with the utmost comfort and convenience. Explore our exclusive packages, read stories from our happy travelers, and get inspired for your next journey.
        </p>
      </div>
      
      <div className='w-full'>
        <ExclusiveOffers />
      </div>
      
      <div className='w-full bg-slate-50'>
        <Testimonial />
      </div>
    </div>
  );
};

export default Experience;
