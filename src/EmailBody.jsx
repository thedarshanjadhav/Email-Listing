/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const EmailBody = ({
  emailId,
  favorites,
  onToggleFavorite,
  onMarkEmailAsRead,
}) => {
  const [emailList, setEmailList] = useState([]);
  const [emailBody, setEmailBody] = useState(null);

  // Fetch the list of emails
  useEffect(() => {
    const fetchEmailList = async () => {
      try {
        const response = await axios.get("https://flipkart-email-mock.now.sh/");
        console.log("Email List:", response.data);
        setEmailList(response.data.list);
      } catch (error) {
        console.error("Error fetching email list:", error);
      }
    };

    fetchEmailList();
  }, []);

  // Fetch the email body based on emailId
  useEffect(() => {
    const fetchEmailBody = async () => {
      if (!emailId) return;

      try {
        const response = await axios.get(
          `https://flipkart-email-mock.now.sh/?id=${emailId}`
        );
        console.log("Email Body:", response.data);
        setEmailBody(response.data);
        onMarkEmailAsRead(emailId);
      } catch (error) {
        console.error("Error fetching email body:", error);
      }
    };

    fetchEmailBody();
  }, [emailId, onMarkEmailAsRead]);

  if (!emailId || !emailBody) return <h4>Loading</h4>;

  // Find the subject from the email list
  const selectedEmail = emailList.find((email) => email.id === emailId);

  const isFavorite = favorites.includes(emailId);

  return (
    <div className=" p-5 rounded-lg shadow-lg border border-[#CFD2DC] flex gap-4 text-[#636363]">
      {/* icon */}
      <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-xl font-bold bg-[#E54065] text-white">
        {selectedEmail.from ? selectedEmail.from.name.charAt(0) : "NA"}
      </div>

      <div>
        <div className=" pb-4 mb-4 gap-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{selectedEmail.subject}</h1>

            <button
              onClick={() => onToggleFavorite(emailId)}
              className="py-2 px-3 rounded-full text-white text-sm bg-[#E54065]"
            >
              {isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
            </button>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-sm">
              {new Date(selectedEmail.date).toLocaleString()}
            </div>
          </div>
        </div>

        <div
          className="email-content my-6 text-sm"
          dangerouslySetInnerHTML={{ __html: emailBody.body }} // Render HTML content
        />
      </div>
    </div>
  );
};

export default EmailBody;
