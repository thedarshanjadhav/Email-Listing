/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const EmailList = ({
  filter,
  favorites,
  readEmails,
  onToggleFavorite,
  onMarkEmailAsRead,
  onEmailClick,
}) => {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(10);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("https://flipkart-email-mock.now.sh/");
        console.log(response.data);
        setEmails(response.data.list);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
    fetchEmails();
  }, []);

  // Filter emails based on the selected filter (favorites, read, unread)
  const filteredEmails = emails.filter((email) => {
    if (filter === "favorites") {
      return favorites.includes(email.id);
    }
    if (filter === "read") {
      return readEmails.includes(email.id);
    }
    if (filter === "unread") {
      return !readEmails.includes(email.id);
    }
    return true;
  });
  // Calculate the emails to show based on the current page and number of emails per page
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = filteredEmails.slice(
    indexOfFirstEmail,
    indexOfLastEmail
  );

  // Function to change pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const markEmailAsRead = (id) => {
    onMarkEmailAsRead(id);
    onEmailClick(id);
  };

  // Determine the total number of pages
  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);

  const isFavorite = (id) => favorites.includes(id);

  return (
    <div className="email-list space-y-5">
      {currentEmails.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No emails found for this filter.
        </div>
      ) : (
        currentEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => markEmailAsRead(email.id)}
            className={` border border-orange-400 rounded-md p-5 hover:bg-gray-300 text-black cursor-pointer transition-colors ${
              readEmails.includes(email.id) ? "bg-slate-50" : "bg-slate-300"
            }`}
          >
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-xl font-bold bg-orange-400 text-gray-800">
                {email.from ? email.from.name.charAt(0) : "NA"}
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  From:{" "}
                  <span className="font-medium">
                    {email.from ? email.from.name : "Unknown"}
                  </span>
                </div>
                <h4 className="text-lg font-semibold">{email.subject}</h4>
                <p className="text-sm">{email.short_description}</p>
                <span className="text-xs text-black-400">
                  {new Date(email.date).toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering `markEmailAsRead`
                    onToggleFavorite(email.id);
                  }}
                  className={`m-2 p-1 rounded-md text-sm text-white ${
                    isFavorite(email.id) ? "bg-red-500" : "bg-blue-500"
                  }`}
                >
                  {isFavorite(email.id)
                    ? "Unmark as Favorite"
                    : "Mark as Favorite"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="pagination flex justify-center mt-5">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`p-2 mx-2 ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 mx-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailList;
