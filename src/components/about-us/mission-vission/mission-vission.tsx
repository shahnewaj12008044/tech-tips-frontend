export default function MissionVision() {
    return (
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-8">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-teal-400">Our Mission</h3>
              <p className="mt-4 text-gray-300">
                Our mission is to empower developers and tech enthusiasts by offering clear, actionable tech tips, tutorials, and practical guides. We break down complex technical concepts, making them accessible to everyone.
              </p>
            </div>
            {/* Vision */}
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-teal-400">Our Vision</h3>
              <p className="mt-4 text-gray-300">
                Our vision is to become the premier destination for insightful, well-structured, and high-quality tech content, fostering a culture of learning and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  