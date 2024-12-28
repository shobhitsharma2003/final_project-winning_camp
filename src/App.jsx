import React, { useState } from 'react';

const initialEmails = [
  { id: 1, sender: 'john.doe@example.com', subject: 'Hello', body: 'This is a test email', isRead: false },
  { id: 2, sender: 'jane.doe@example.com', subject: 'Meeting', body: 'We have a meeting at 2 PM', isRead: false },
  { id: 3, sender: 'john.smith@example.com', subject: 'Project Update', body: 'The project is going well', isRead: false },
];

const EmailManagementSystem = () => {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newEmail, setNewEmail] = useState({ sender: '', subject: '', body: '' });

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setEmails(emails.map((e) => (e.id === email.id ? { ...e, isRead: true } : e)));
  };

  const handleComposeSubmit = (e) => {
    e.preventDefault();
    const newEmailObject = {
      id: emails.length + 1,
      sender: newEmail.sender,
      subject: newEmail.subject,
      body: newEmail.body,
      isRead: false,
    };
    setEmails([...emails, newEmailObject]);
    setIsComposeOpen(false);
    setNewEmail({ sender: '', subject: '', body: '' });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Email Management System</h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsComposeOpen(true)}
        >
          Compose
        </button>
      </div>
      {isComposeOpen && (
        <form onSubmit={handleComposeSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
              Sender:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sender"
              type="email"
              value={newEmail.sender}
              onChange={(e) => setNewEmail({ ...newEmail, sender: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              value={newEmail.subject}
              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
              Body:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="body"
              value={newEmail.body}
              onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Send
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setIsComposeOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Sender</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Subject</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((email) => (
                    <tr
                      key={email.id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      onClick={() => handleEmailClick(email)}
                    >
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {email.sender}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {email.subject}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {email.isRead ? 'Read' : 'Unread'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedEmail && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Email Details</h2>
          <p className="text-sm text-gray-700 font-light mb-2">Sender: {selectedEmail.sender}</p>
          <p className="text-sm text-gray-700 font-light mb-2">Subject: {selectedEmail.subject}</p>
          <p className="text-sm text-gray-700 font-light mb-2">Body: {selectedEmail.body}</p>
        </div>
      )}
    </div>
  );
};

export default EmailManagementSystem;
