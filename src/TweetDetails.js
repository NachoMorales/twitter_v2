import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { database } from './Firebase'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from './AuthContext'
import UpdatePictures from './UpdatePictures'
import DeleteTweet from "./DeleteTweet";
import AnswerTweet from "./AnswerTweet";

const TweetDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const [tweet, setTweet] = useState([])
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        let mounted = true

        const getTweet = async () => {    
            database.tweets
            .doc(id)
            .onSnapshot((doc) => {
                if (mounted) {
                    var tweetDoc = []
                    tweetDoc = database.formatDoc(doc)
                    console.log(tweetDoc)
                    setTweet(tweetDoc)
                }
            })
            database.tweets
            .doc(id)
            .collection('answers')
            .onSnapshot((querySnapshot) => {
                if (mounted) {
                    var answersDoc = []
                    querySnapshot.forEach(function(doc) {
                        answersDoc.push(database.formatDoc(doc))
                    });
                    setAnswers(answersDoc)
                }
            })
        }
        
        getTweet();
        return () => mounted = false
    }, [id]);
    

    return ( 
        <div>
            <Navbar />
            <div className="tweet-details">
                <div className="goBackDiv">
                    <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                </div>
                { tweet && (
                    <div>
                        <article>
                            { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> }
                            <Link to={`/user/${tweet.userId}`} className="tweetUserInfoLink">
                                <img id="profilePicture" src={UpdatePictures('Profile_Picture', tweet.userId)} alt="profile_picture"/>
                                <div className="tweetUserInfo">
                                    <h3> { tweet.name } </h3>
                                    <br/>
                                    <h5>{ tweet.user }</h5>
                                </div>
                            </Link>
                            <p>{ tweet.tweet }</p>
                        </article>
                        <div className="tweetBottom">
                            <AnswerTweet {...tweet} />
                        </div>
                        { answers.map(answer => (
                            <div>
                                <article className="answerArticle" key={answer.id}>
                                    {/* answer.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> */}
                                    <Link to={`/user/${answer.userId}`} className="tweetUserInfoLink" id="answerLink">
                                        {/* TODO: display profile pictures in tweets
                                        <img id="profilePicture" src={UpdatePictures('Profile_Picture', tweet.userId)} alt="profile_picture"/> */}
                                        <div className="tweetUserInfo">
                                            <h3> {answer.name} </h3>
                                            <h5> {answer.user} </h5>
                                        </div>
                                    </Link>
                                    <p> {answer.tweet} </p>
                                </article>
                                <div className="tweetBottom">
                                    <AnswerTweet {...answer} />
                                </div>
                            </div>
                        )) }
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default TweetDetails;