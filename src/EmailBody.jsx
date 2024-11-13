/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const EmailBody = ({  
  emailId,
  favorites,
  onToggleFavorite,
  onMarkEmailAsRead,
}) => {
  const [emailBody, setEmailBody] = useState(null);

  useEffect(() => {
    const fetchEmailBody = async () => {
      try {
        const response = await axios.get(
          `https://flipkart-email-mock.now.sh/?id=${emailId}`
        );
        console.log(response);
        setEmailBody(response.data);
        onMarkEmailAsRead(emailId);
      } catch (error) {
        console.error("Error fetching email body:", error);
      }
    };

    if (emailId) {
      fetchEmailBody();
    }
  }, [emailId, onMarkEmailAsRead]);

  if (!emailBody) return <div>Select an email to view its body.</div>;

  const isFavorite = favorites.includes(emailId);

  return (
    <div className="email-body p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-orange-400 my-4">
      <div className="border-b-2 pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {emailBody.subject}
        </h1>
        <div className="flex justify-between items-center mt-2">
          <div className="text-lg text-gray-600">
            From: {emailBody.from ? emailBody.from.name : "Unknown"}
          </div>
          <div className="text-sm text-gray-400">
            {new Date(emailBody.date).toLocaleString()}
          </div>
        </div>
      </div>
      <div
        className="email-content my-6 text-lg text-gray-800"
        dangerouslySetInnerHTML={{ __html: emailBody.body }} // Render HTML content
      />
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => onToggleFavorite(emailId)}
          className={`p-3 rounded-md text-white ${
            isFavorite ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
        </button>
        <button
          onClick={() => alert("Reply functionality can be added here")}
          className="p-3 bg-green-500 rounded-md text-white"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default EmailBody;
