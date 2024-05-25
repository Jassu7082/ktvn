import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase-config'; // Adjust the import path as necessary
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

const AdminPage = () => {
  const [responses, setResponses] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchResponses = async (startAfterDoc = null) => {
    setLoading(true);
    setError(null);
    try {
      let q = query(collection(db, 'contact'), orderBy('timestamp', 'desc'), limit(10));
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }
      const querySnapshot = await getDocs(q);
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setResponses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLastVisible(lastVisibleDoc);
      setLoading(false);
    } catch (err) {
      setError('Error fetching responses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleNextPage = () => {
    fetchResponses(lastVisible);
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchResponses(); // Fetch the first page again (this can be optimized further)
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Admin - Contact Responses</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-1/4 px-4 py-2">Name</th>
                <th className="w-1/4 px-4 py-2">Contact</th>
                <th className="w-1/4 px-4 py-2">Email</th>
                <th className="w-1/4 px-4 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {responses.map(response => (
                <tr key={response.id}>
                  <td className="border px-4 py-2">{response.name}</td>
                  <td className="border px-4 py-2">{response.contact}</td>
                  <td className="border px-4 py-2">{response.email}</td>
                  <td className="border px-4 py-2">{response.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={responses.length < 10}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPage;
