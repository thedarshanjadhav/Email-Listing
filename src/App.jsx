import { useState } from "react";
import EmailList from "./EmailList";
import EmailBody from "./EmailBody";
import EmailFilter from "./EmailFilter";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [readEmails, setReadEmails] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  const toggleFavorite = (emailId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(emailId)) {
        return prevFavorites.filter((id) => id !== emailId);
      } else {
        return [...prevFavorites, emailId];
      }
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const markEmailAsRead = (emailId) => {
    setReadEmails((prevReadEmails) => {
      if (!prevReadEmails.includes(emailId)) {
        return [...prevReadEmails, emailId];
      }
      return prevReadEmails;
    });
  };

  const handleEmailClick = (emailId) => {
    markEmailAsRead(emailId);
    setSelectedEmailId(emailId);
  };

  return (
    <div className="h-screen flex px-5">
      {/* Master: Email List with Filter */}
      <div className="w-1/2 p-5">
        <EmailFilter onFilterChange={handleFilterChange} />
        <EmailList
          filter={filter}
          favorites={favorites}
          readEmails={readEmails}
          onToggleFavorite={toggleFavorite}
          onMarkEmailAsRead={markEmailAsRead}
          onEmailClick={handleEmailClick}
        />
      </div>

      {/* Slave: Email Body */}
      <div className="w-2/3 p-5">
        {selectedEmailId ? (
          <EmailBody
            emailId={selectedEmailId}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onMarkEmailAsRead={markEmailAsRead}
          />
        ) : (
          <div className="text-center text-lg text-gray-500">
            Select an email to view its details
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
