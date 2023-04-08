
CREATE TABLE users (
    username varchar(10) not null,
    pwd varchar(100),
    fname varchar(20) not null,
    lname varchar(20) not null,
    lastlogin date,
    email varchar(40),
    userProfile varchar(100),
    primary key (username)
);


CREATE TABLE song (
    songID int AUTO_INCREMENT,
    title varchar(20) not null,
    releaseDate date,
    songURL varchar(50),
    primary key (songID)
);


CREATE TABLE artist (
    artistID int AUTO_INCREMENT,
    fname varchar(20) not null,
    lname varchar(20) not null,
    artistBio varchar(100),
    artistURL varchar(50),
    primary key (artistID)
);


CREATE TABLE album (
    albumID int AUTO_INCREMENT,
    title varchar(30),
    primary key (albumID)
);


CREATE TABLE friend (
    user1 varchar(10),
    user2 varchar(10),
    acceptStatus varchar(20) check (acceptStatus in ('Accepted', 'Not accepted', 'Pending')),
    requestSentBy varchar(10),
    createdAt datetime,
    updatedAt datetime,
    primary key (user1, user2),
    foreign key (user1) references users(username) on delete cascade,
    foreign key (user2) references users(username) on delete cascade
);


CREATE TABLE follows (
    follower varchar(10),
    followed varchar(10),
    createdAt datetime,
    primary key (follower, followed),
    foreign key (follower) references users(username) on delete cascade,
    foreign key (followed) references users(username) on delete cascade
);


CREATE TABLE rateAlbum (
    username varchar(10),
    albumID int,
    stars int check (stars in (1,2,3,4,5)),
    primary key (username, albumID),
    foreign key (username) references users(username) on delete cascade,
    foreign key (albumID) references album(albumID) on delete cascade
);


CREATE TABLE reviewAlbum (
    username varchar(10),
    albumID int,
    reviewText varchar(100),
    reviewDate date,
    primary key (username, albumID),
    foreign key (username) references users(username) on delete cascade,
    foreign key (albumID) references album(albumID) on delete cascade
);


CREATE TABLE rateSong (
    username varchar(10),
    songID int,
    stars int check (stars in (1,2,3,4,5)),
    ratingDate date,
    primary key (username, songID),
    foreign key (username) references users(username) on delete cascade,
    foreign key (songID) references song(songID) on delete cascade
);


CREATE TABLE reviewSong (
    username varchar(10),
    songID int,
    reviewText varchar(100),
    reviewDate date,
    primary key (username, songID),
    foreign key (username) references users(username) on delete cascade,
    foreign key (songID) references song(songID) on delete cascade
);


CREATE TABLE songInAlbum (
    albumID int,
    songID int,
    primary key (albumID, songID),
    foreign key (albumID) references album(albumID) on delete cascade,
    foreign key (songID) references song(songID) on delete cascade
);


CREATE TABLE songGenre (
    songID int,
    genre varchar(10),
    primary key (songID, genre),
    foreign key (songID) references song(songID) on delete cascade
);


CREATE TABLE artistPerformsSong (
    artistID int,
    songID int,
    primary key (artistID, songID),
    foreign key (artistID) references artist(artistID) on delete cascade,
    foreign key (songID) references song(songID) on delete cascade
);


CREATE TABLE userFanOfArtist (
    username varchar(10),
    artistID int,
    primary key (username, artistID),
    foreign key (username) references users(username) on delete cascade,
    foreign key (artistID) references artist(artistID) on delete cascade
);
