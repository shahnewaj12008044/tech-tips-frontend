import { FaCalendarAlt, FaCar, FaDollarSign } from 'react-icons/fa'; // Importing icons
import StatCard from './statecard';

const User = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <p className="text-4xl font-extrabold text-gray-800">Admin Dashboard</p>
      </header>
      <main>
        <section className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">
            Welcome <span className="animate-waving-hand">👋</span>
          </h1>
          <p className="text-lg text-gray-600">
            Start the day with managing new appointments
          </p>
        </section>

        {/* Stat Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            type="totalBookings"
            count={30}
            label="Total Bookings"
            icon={<FaCalendarAlt />}
          />
          <StatCard
            type="totalAvailableCars"
            count={60}
            label="Total Available Cars"
            icon={<FaCar />}
          />
          <StatCard
            type="totalRevenue"
            count={70}
            label="Total Revenue"
            icon={<FaDollarSign />}
          />
        </section>
      </main>
    </div>
  );
};

export default User;
