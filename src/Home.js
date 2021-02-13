import TweetList from './TweetList';
import { useAuth } from './AuthContext';
import Tweet from "./Tweet";
import Navbar from './Navbar'
import FollowingTweets from './FollowingTweets';

const Home = () => {
    const { currentUser } = useAuth()

    return ( 
        <div className="home">
            <Navbar />
            <div className="content">
                <div className="goBackDiv">
                    <h3>Home</h3>
                </div>
                <div className="tweetear" id="tweetFromHome">
                    <Tweet/>
                </div>
                {/* <TweetList user={'all'} /> */}
                <FollowingTweets filter='home' userId={currentUser.uid} />
            </div>
        </div>
     );
}

export default Home;