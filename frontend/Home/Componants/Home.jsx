import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold">Student Support</h1>

      {/* Search Bar Container */}
      <div className="mt-6 w-full max-w-xl">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Student Support..."
            className="w-full p-4 text-lg border border-input bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-4 text-primary hover:text-accent">
            🔍
          </button>
        </div>
      </div>

      {/* Quick Links (Buddy-Match Style Buttons) */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="px-6 py-3 text-lg font-medium bg-primary text-primary-foreground rounded-lg hover:bg-accent hover:text-accent-foreground">
          Find a Buddy
        </button>
        <button className="px-6 py-3 text-lg font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-muted">
          Student Resources
        </button>
        <button className="px-6 py-3 text-lg font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-muted">
          Upcoming Events
        </button>
      </div>
    </div>
  );
};

export default Home;
