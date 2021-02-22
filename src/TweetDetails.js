import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { database } from './Firebase'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from './AuthContext'
import DeleteTweet from "./DeleteTweet";
import AnswerTweet from "./AnswerTweet";
import moment from 'moment'
import GetUserDoc from "./GetUserDoc";
import HandleInteraction from "./HandleInteraction";

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
                    setTweet(tweetDoc)
                }
            })
            database.tweets
            .doc(id)
            .collection('answers')
            .orderBy('createdAt','asc')
            .onSnapshot((querySnapshot) => {
                if (mounted) {
                    var answersDoc = []
                    querySnapshot.forEach(function(doc) {
                        if (!doc.data().createdAt && querySnapshot.metadata.hasPendingWrites) {
                            return
                        }
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
            <div className="content">
                <div className="tweet-details">
                    <div className="goBackDiv">
                        <FontAwesomeIcon onClick={history.goBack} className="goBackButton" icon={faArrowLeft} size='lg' />
                    </div>
                    { tweet && (
                        <div>
                            <article>
                                { tweet.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> }
                                <Link to={`/user/${tweet.userId}`} className="tweetUserInfoLink">
                                    <img id="profilePicture" src={(GetUserDoc(tweet.userId)).profilePicture} alt="profile_picture"/>
                                    <div className="tweetUserInfo">
                                        <h3> { tweet.name } </h3>
                                        <br/>
                                        <h5>{ tweet.user }</h5>
                                    </div>
                                </Link>
                                <p>{ tweet.tweet }</p>
                                <h5 style={{ marginLeft: '15px' }}>{ tweet.createdAt !== undefined && moment(tweet.createdAt.toDate()).format('h:mm · MMM D, YYYY') }</h5>
                            </article>
                            <div className="tweetBottom" style={{justifyContent: "initial" }}>
                                <Link to={`/`} > {tweet.retweet.length} Retweets</Link>
                                <Link to={`/`} > {tweet.like.length} Likes</Link>
                            </div>
                            <div className="tweetBottom">
                                <AnswerTweet {...tweet} />

                                {tweet.retweet && <HandleInteraction tweet={tweet} interaction='retweet' />}

                                { tweet.like && <HandleInteraction tweet={tweet} interaction='like' />}
                            </div>
                            { answers.map(answer => (
                                <div key={answer.id}>
                                    <article className="answerArticle">
                                        {/* answer.userId === currentUser.uid && <DeleteTweet tweet={tweet.id} /> */}
                                        <Link to={`/user/${answer.userId}`} className="tweetUserInfoLink" id="answerLink">
                                            <img id="profilePicture" src={answer.profilePicture} alt="profile_picture"/>
                                            <div className="tweetUserInfo">
                                                <h3> {answer.name} </h3>
                                                <h5> { answer.user + ' · ' + moment(tweet.createdAt.toDate()).format('MMM D') } </h5>
                                            </div>
                                        </Link>
                                        <Link to={`/user/${tweet.userId}/${tweet.id}/${answer.id}`} style={{ textDecoration: "none" }} ><p> {answer.tweet} </p></Link>
                                        
                                    </article>
                                    <div className="tweetBottom">
                                        <AnswerTweet {...answer} />
                                        
                                        {/* TODO:

                                        <HandleInteraction tweet={tweet} interaction='retweet' />
                                        <HandleInteraction tweet={tweet} interaction='like' /> */}
                                    </div>
                                </div>
                            )) }
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default TweetDetails;