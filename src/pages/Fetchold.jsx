import { useState, useEffect } from "react";
import { getQuotes } from '../API/api'; 

const FetchOld = () => {
  const [quotes, setQuotes] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQuotesData = async () => {
    try {
      const res = await getQuotes();
      console.log('API Response:', res);

      
      if (Array.isArray(res)) {
        setQuotes(res);  
      } else if (res.data && Array.isArray(res.data)) {
        setQuotes(res.data); 
      } else {
        setQuotes([]); 
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotesData();
  }, []);

  if (loading) {
    return <p>Loading quotes...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div key={quote.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <p>{quote.body}</p>   
            <p><strong>User ID:</strong> {quote.userId}</p>
          </div>
        ))
      ) : (
        <p>No quotes available</p>
      )}
    </div>
  );
};

export default FetchOld;
