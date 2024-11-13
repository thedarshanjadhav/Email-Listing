/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const EmailList = ({
  filter,
  favorites,
  readEmails,
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
    <div className="email-list space-y-5 text-[#636363]">
      {currentEmails.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No emails found for this filter.
        </div>
      ) : (
        currentEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => markEmailAsRead(email.id)}
            className={` border border-[#CFD2DC] rounded-md p-5 cursor-pointer transition-colors ${
              readEmails.includes(email.id) ? "bg-[#F2F2F2]" : "bg-[#F4F5F9]"
            }`}
          >
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-xl font-bold bg-[#E54065] text-white">
                {email.from ? email.from.name.charAt(0) : "NA"}
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  From:{" "}
                  <span className="font-medium">
                    {email.from ? email.from.name : "Unknown"}
                  </span>{" "}
                  <span className="font-medium">
                    &lt;{email.from ? email.from.email : "Unknown"}&gt;
                  </span>
                </div>
                <div className="text-sm">
                  Subject: <span className="font-medium">{email.subject}</span>
                </div>

                <p className="text-sm my-1">{email.short_description}</p>
                <div className="flex text-sm gap-2">
                  <span className="text-sm">
                    {new Date(email.date).toLocaleString()}
                  </span>

                  {isFavorite(email.id) ? (
                    <p className="text-sm font-medium text-[#E54065]">
                      Favorite
                    </p>
                  ) : (
                    ""
                  )}
                </div>
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
          className="p-2 mx-2 bg-[#E1E4EA] border border-[#CFD2DC] rounded-md disabled:bg-[#F4F5F9]"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`p-2 mx-2 ${
              currentPage === index + 1 ? "bg-[#E1E4EA] " : "bg-[#F4F5F9]"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 mx-2 bg-[#E1E4EA] border border-[#CFD2DC] rounded-md disabled:bg-[#F4F5F9]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailList;
