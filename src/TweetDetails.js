import { useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import useFetch from "./useFetch";

const TweetDetails = () => {
    const { id } = useParams();
    const { data: tweet, error, isLoading } = useFetch('http://localhost:8000/tweets/' + id)
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/tweets/' + tweet.id, {
            method: 'DELETE',
        }).then(() => {
            history.push('/home');
        })
    }

    return ( 
        <div>
            <Navbar />
            <div className="tweet-details">
                { isLoading && <div>Loading...</div> }
                { error && <div>{ error }</div> }
                { tweet && (
                    <article>
                        <p>{ tweet.author }</p>
                        <div>{ tweet.body }</div>
                        <button onClick={handleClick}>Delete</button>
                    </article>
                )}
            </div>
        </div>
     );
}
 
export default TweetDetails;