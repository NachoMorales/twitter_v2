<<<<<<< HEAD
import TweetList from './TweetList';
import Tweet from "./Tweet";
import Navbar from './Navbar'

const Home = () => {

    return ( 
        <div className="home">
            <Navbar />
            <div className="tweetear" id="tweetFromHome">
                <Tweet/>
            </div>
            <TweetList user={'all'} />
        </div>
     );
}
 
=======
import TweetList from './TweetList';
import Tweet from "./Tweet";
import Navbar from './Navbar'

const Home = () => {
 
    return ( 
        <div className="home">
            <Navbar />
            <div className="tweetear" id="tweetFromHome">
                <Tweet/>
            </div>
            <TweetList user={'all'} />
        </div>
     );
}
 
>>>>>>> 2ce7aabb605b7d29f14503f2178f6eae0caaea7d
export default Home;