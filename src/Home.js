import TweetList from './TweetList';
import Tweet from "./Tweet";
import Navbar from './Navbar'

const Home = () => {
    // const { data: tweets, isLoading, error } = useFetch('http://localhost:8000/tweets');
    // const [error, setError] = useState("");
    // const { currentUser } = useAuth();
    // const userId = currentUser.uid;
    //  const tweets = [];
    //  const [loaded, setLoaded] = useState(false);

    // TODO: Load tweets from Firebase into Homepage. Find a way to use async function with useEffect


    // useEffect(() => {
    //     database.tweets.get().then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             tweets.push(doc.data())
    //         });
    //         setLoaded(true)
    //     }).catch(() => {
    //         setError('Error loading tweets')
    //     })
    // })


    return ( 
        <div className="home">
            <Navbar />
            <h1>Homepage</h1>
            <div className="tweetear" id="tweetFromHome">
                <Tweet/>
            </div>
            {/* { !loaded && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { loaded && <TweetList tweets={tweets} />} */}
            <TweetList />
        </div>
     );
}
 
export default Home;