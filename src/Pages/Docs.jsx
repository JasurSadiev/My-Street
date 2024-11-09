import React from 'react';
import NavBar from '../Components/NavBar';

const Docs = () => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col w-full min-h-[100vh] bg-gray-100 p-8">
        <h1 className="text-5xl font-bold text-center text-gray-800 my-6">
          Information for Citizens
        </h1>
        <hr className="mx-auto w-3/5 border-[#bda640] border-2 mb-6" />

        <section className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">What is My Street?</h2>
          <p className="text-gray-600 mb-6">
            My Street is an independent platform where citizens can report issues in their communities directly to the responsible local authorities. This transparency enables better tracking and resolution of public issues.
          </p>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Is this a council website?</h3>
          <p className="text-gray-600 mb-6">
            No, it isn't. However, My Street forwards reports directly to your local council or the authority responsible for addressing the issue. Reports are also published online so the community can stay informed and engage.
          </p>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Then who are you? And why are you doing this?</h3>
          <p className="text-gray-600 mb-6">
            Our goal is to simplify the process of reporting issues within communities, making it accessible even if you don’t know the exact responsible authority. With My Street, simply enter your location, describe the issue, and we’ll handle the rest.
          </p>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">How can I contact you?</h3>
          <p className="text-gray-600 mb-6">
            Feel free to reach out via our contact form. But before that, please take a moment to see if these FAQs answer your question.
          </p>
        </section>

        <section className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Using My Street</h2>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">How Do I Make a Report?</h3>
          <ol className="list-decimal list-inside text-gray-600 mb-6 space-y-2">
            <li>Go to the homepage and enter your postcode or location. You can also use “use my location” if you're not sure where you are.</li>
            <li>Mark the issue location on the map, describe the problem, and submit your report.</li>
            <li>Check your email for a confirmation link. Click the link, and your report is officially submitted!</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-700 mb-3">What Can I Report?</h3>
          <p className="text-gray-600 mb-6">
            My Street is for issues needing fixing, cleaning, or clearing, such as graffiti, dog fouling, potholes, or malfunctioning street lights.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Docs;
