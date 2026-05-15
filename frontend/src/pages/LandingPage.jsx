import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        <div className="hero-content text-center relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Create Your Perfect Resume with AI
            </h1>
            <p className="py-6 text-lg opacity-90">
              Build a professional resume in minutes. Just describe yourself,
              and our AI will do the rest!
            </p>
            <Link to={"/generate-resume"} className="btn btn-lg bg-white text-indigo-700 border-none hover:bg-gray-100 font-bold transition-all shadow-lg">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-blue-200">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="card-title text-gray-800">AI-Powered</h3>
                <p className="text-gray-700">
                  Our AI analyzes your input and generates a tailored resume for
                  you.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="card bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-green-200">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📄</div>
                <h3 className="card-title text-gray-800">Professional Templates</h3>
                <p className="text-gray-700">
                  Choose from a variety of professionally designed resume
                  templates.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="card bg-gradient-to-br from-purple-50 to-pink-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-purple-200">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="card-title text-gray-800">Job-Ready</h3>
                <p className="text-gray-700">
                  Optimize your resume for specific job roles and industries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="card bg-white shadow-lg border border-blue-200">
              <div className="card-body">
                <p className="text-gray-700 italic">
                  "This AI resume maker saved me so much time! My resume looks
                  professional and got me multiple interviews."
                </p>
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="User"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">John Doe</h4>
                    <p className="text-gray-600">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="card bg-white shadow-lg border border-green-200">
              <div className="card-body">
                <p className="text-gray-700 italic">
                  "I love the templates and the ease of use. Highly recommend
                  this tool to anyone looking for a job."
                </p>
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src="https://randomuser.me/api/portraits/women/2.jpg"
                        alt="User"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Jane Smith</h4>
                    <p>Marketing Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your Resume?
          </h2>
          <p className="mb-8 text-lg">
            Join thousands of users who have landed their dream jobs with our AI
            resume maker.
          </p>
          <Link to={"/generate-resume"} className="btn btn-primary">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
