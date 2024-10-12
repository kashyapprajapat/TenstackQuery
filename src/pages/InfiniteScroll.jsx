// eslint-disable-next-line no-unused-vars
import React from "react";
import { useInView } from "react-intersection-observer"; 
import { useInfiniteQuery } from '@tanstack/react-query'; 

const InfiniteScroll = () => {
  // Function to fetch photos with pagination
  const fetchPhotos = async ({ pageParam = 1 }) => {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=10`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  // Use the useInfiniteQuery hook to handle fetching photos
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos,
    getNextPageParam: (lastPage, pages) => {
      // If there are less than 10 items returned, there are no more pages
      return lastPage.length === 10 ? pages.length + 1 : undefined;
    }
  });

  // Use the `useInView` hook to detect when the last element is visible on the screen
  const { ref, inView } = useInView({
    threshold: 1.0, // Trigger when 100% of the element is visible
  });

  // Effect to fetch the next page of photos when the last item comes into view
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // Fetch the next page of photos
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle loading and error states
  if (isError) {
    return <p>Error fetching photos: {error.message}</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Infinite Scroll Page</h1>

      {/* Render the list of photos */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data?.pages.map((page) =>
          page.map((photo) => (
            <div
              key={photo.id}
              style={{
                margin: "10px",
                border: "2px solid white", // White border around the image
                padding: "5px",
                borderRadius: "8px", // Optional: add rounded corners
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Optional: add subtle shadow for better visibility
                display: "inline-block", // Keep divs inline for centering
              }}
            >
              <img src={photo.thumbnailUrl} alt={photo.title} style={{ maxWidth: "100%", height: "auto" }} />
            </div>
          ))
        )}
      </div>

      {/* This `div` is used as the observer target to detect when the last element comes into view */}
      <div ref={ref}>
        {isFetchingNextPage && <p>Loading more photos...</p>}
        {!hasNextPage && <p>No more photos to load</p>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
