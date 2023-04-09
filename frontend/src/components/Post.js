import '../css/Post.css';

//Post Component
export default function Post({ reviewedItem, author, date, body }) {
  //fetch from db

  return (
    <div className="Post">
      <div className="postHeading">
        <h2 className="postTitle">{reviewedItem}</h2>
        <span className="byAuthor">
          By <span className="authorName">{author}</span>| Posted on{' '}
          <span>{date}</span>
        </span>
      </div>
      <p className="postContent">{body}</p>
    </div>
  );
}
