import TweetList from './TweetList';
import Tweet from "./Tweet";
import Navbar from './Navbar'

const Home = () => {
 
    return ( 
        <div className="home">
            <Navbar />
            <h1>Homepage</h1>
            <div className="tweetear" id="tweetFromHome">
                <Tweet/>
            </div>
            <TweetList user={'all'} />
        </div>
     );
}
 
export default Home;