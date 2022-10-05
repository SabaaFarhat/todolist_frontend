import { Link } from 'react-router-dom';
import logo from '../assets/todoicon.jpg';
import main from '../assets/to-do-list.png';
import Wrapper from '../assets/LandingPage';

function Home() {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="jobify" className="logo" />
        <span>ToDoList</span>
      </nav>
      <div className="container page">
        <div className='grid'>
          <h2>
            <span>To Do List</span> App
          </h2>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/users/signUp" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
      
      <img src={main} alt="job hunt" className="img main-img" /></div>
    </Wrapper>
  );
}



export default Home;
