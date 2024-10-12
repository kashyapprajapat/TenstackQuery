import { NavLink } from "react-router-dom";
import { deletePost, getQuotes, updatePost } from "../API/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

const FetchRq = () => {
  const [pageNumber, setPagenumber] = useState(0);

  const queryClient = useQueryClient();

  const getQuotesData = async (pageNumber) => {
    try {
      const res = await getQuotes(pageNumber);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching quotes:", error);
      throw new Error("Failed to fetch quotes");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quotes", pageNumber], // <- it's like useState
    queryFn: () => getQuotesData(pageNumber), // <- it's Like a UseEffect
    placeholderData: keepPreviousData, // <-  to remain prevois data for pagination
    // gcTime:2000,          // <- Garbage Collection Time
    // staleTime:7000,          // <- Background refetching for new data instead of cached data
    // refetchInterval: 7000, // <- After 1 sec reftech for fresh data use in stocke related api
    // refetchIntervalInBackground:true //<- it stop when you go athor tab if true then aslo background reftech
  });


  //->Murtaion Function to delete the Quate
  const deletedata = useMutation({
    mutationFn: (id) => deletePost(id), // <- delete the quate
    onSuccess: (data, id) => {           // <- remove from the cache/local storage why bec it not our api otherwise you dont remove from localstorage
      queryClient.setQueryData(["quotes", pageNumber], (curEle) => {
        return curEle?.filter((quates) => quates.id !== id);
      });
    },
  });


//-> Mutation Function to update the Quote
const updatedata = useMutation({
  mutationFn: ({ id, newTitle }) => updatePost(id, newTitle), // Pass both id and newTitle
  onSuccess: (apiData, { id, newTitle }) => {
    queryClient.setQueryData(["quotes", pageNumber], (quotesData) => {
      return quotesData?.map((curQuote) =>
        curQuote.id === id ? { ...curQuote, title: newTitle } : curQuote
      );
    });
  },
});

// -> to get data which user want to update
const handleUpdate = (quote) => {
  const newTitle = prompt("Update the title:", quote.title);
  if (newTitle) {
    updatedata.mutate({ id: quote.id, newTitle });
  }
};


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  return (
    <>
      <div>
        {data && data.length > 0 ? (
          data.map((quote) => (
            <div
              key={quote.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <NavLink to={`/rq/${quote.id}`}>
                <p>{quote.id}</p>
                <p>{quote.title}</p>
                <p>{quote.body}</p>
                <p>
                  <strong>User ID:</strong> {quote.userId}
                </p>
              </NavLink>
              <button onClick={() => deletedata.mutate(quote.id)}>
                Delete
              </button>
              <button onClick={() => handleUpdate(quote)}>Update</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* you can do direct pageNumber+1 but it is bad practice. so use Prev  */}
      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPagenumber((prev) => prev - 1)}
        >
          Prev
        </button>
        <h1 style={{ marginTop: "0px" }}>{pageNumber}</h1>
        <button onClick={() => setPagenumber((prev) => prev + 1)}>Next</button>
      </div>
    </>
  );
};

export default FetchRq;
