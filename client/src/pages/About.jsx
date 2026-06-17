import React from 'react';
import Title from '../components/Title';

const About = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-32 min-h-screen'>
      <Title title="About QuickStay" subTitle="Your ultimate partner in finding the perfect accommodation" />
      <div className='max-w-4xl text-center mt-12 text-gray-600 leading-relaxed space-y-6'>
        <p>
          Welcome to <strong>QuickStay</strong>, a comprehensive hotel booking platform designed to simplify the way you find and reserve your perfect stay. Our mission is to connect travelers with exceptional properties across the globe, offering unparalleled luxury, comfort, and unforgettable experiences.
        </p>
        <p>
          Built as a modern full-stack application, QuickStay bridges the gap between hotel owners and guests. Owners can easily list and manage their rooms, while guests can seamlessly browse, filter, and book rooms that meet their exact needs.
        </p>
        <p>
          Whether you're looking for a cozy single bed, a family suite, or a luxury room with a mountain view, QuickStay provides a curated selection of handpicked properties. We prioritize user experience, security, and reliability so you can focus on enjoying your journey.
        </p>
      </div>
    </div>
  );
};

export default About;
