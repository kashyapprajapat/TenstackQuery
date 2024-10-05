import { getQuotes } from '../API/api'; 
import { useQuery } from "@tanstack/react-query";

const FetchRq = () => {

  const getQuotesData = async () => {
    try {
      const res = await getQuotes();
      console.log(res.data);
      return res.data; 
    } catch (error) {
      console.error('Error fetching quotes:', error);
      throw new Error('Failed to fetch quotes'); 
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['quotes'],    // <- it's like useState
    queryFn: getQuotesData,   // <- it's Like a UseEffect
     // gcTime:2000,          // <- Garbage Collection Time
     staleTime:7000,          // <- Background refetching for new data instead of cached data
  });

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  if (isError) {
    return <p>Error fetching data.</p>; 
  }

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((quote) => (
          <div key={quote.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <p>{quote.body}</p>   
            <p><strong>User ID:</strong> {quote.userId}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default FetchRq;
