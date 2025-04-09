import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>About This App</h2>
      <p>This weather dashboard is built to help you track real-time weather data with ease and style.</p>

      <div className="about-details">
        <h3>Developer Info</h3>
        <p><strong>Name:</strong> Avinash Anand</p>
        <p><strong>Email:</strong> <a href="mailto:22052018@kiit.ac.in">22052018@kiit.ac.in</a></p>
        <p><strong>Mobile:</strong> <a href="tel:+919523613460">+91 9523613460</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/avii1253" target="_blank" rel="noopener noreferrer">github.com/avii1253</a></p>
      </div>
    </div>
  );
};

export { About }
