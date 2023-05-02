import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

const FriendRequestModal = (props) => {
    const {setShowFriendRequestModal} = props
    return <div style={{left: '60%', top: '8%',height: '400px',width: '517px', zIndex: 5, position:'fixed', backgroundColor: 'ghostwhite', border: '1px solid black'}}>
<div style={{display: 'flex', justifyContent: 'space-between'}}>
    <h5>Friend Requests</h5>
    <button onClick={()=>setShowFriendRequestModal(false)}><FontAwesomeIcon icon={faClose} /></button>
</div>

        <div>
            <div>
                <p>Person A has sent you a friend request</p>
                <button>Accept</button>
                <button>Decline</button>
            </div>

            <div>
                <p>Person C has sent you a friend request</p>
                <button>Accept</button>
                <button>Decline</button>
            </div>
            <div>
                <p>Person B has sent you a friend request</p>
                <button>Accept</button>
                <button>Decline</button>
            </div>
        </div>
    </div>
}

export default FriendRequestModal;