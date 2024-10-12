// eslint-disable-next-line no-unused-vars
import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <img 
        src="https://res.cloudinary.com/dpf5bkafv/image/upload/v1728713613/yxvzolytlneanah5hqc7.png" 
        alt="Home" 
        style={styles.image} 
      />
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',     // Center vertically (if height is set)
    height: '100vh',          // Full viewport height for vertical centering
    overflow: 'hidden',       // Prevent overflow if needed
    backgroundColor: '#17202a', // Optional: set a background color
  },
  image: {
    maxWidth: '100%',         // Responsive width
    height: 'auto',           // Maintain aspect ratio
    borderRadius: '8px',      // Optional: rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: add shadow
  }
}

export default Home;
