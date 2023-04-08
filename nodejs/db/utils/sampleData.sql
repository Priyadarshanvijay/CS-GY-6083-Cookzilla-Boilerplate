
-- Users insertions
INSERT INTO users (username, pwd, fname, lname, lastlogin)
VALUES	('nsaurino', 'FatEar', 'Nigel', 'Saurino', '2023-01-30'),
  		('ssusanto', 'testpw', 'Sonia', 'Susanto', '2023-01-29'),
  		('msujon', 'testpassword', 'Mohammed', 'Sujon', '2023-01-29'),
  		('sjobs', 'apple', 'Steve', 'Jobs', '2011-01-01'),
  		('tcook', 'appleceo', 'Tim', 'Cook', '2023-03-20'),
  		('emusk', 'tesla', 'Elon', 'Musk', '2023-03-29');


-- Friends insertions
INSERT INTO friend (user1, user2, acceptStatus, requestSentBy, createdAt, updatedAt)
VALUES	('nsaurino', 'ssusanto', 'Accepted', 'nsaurino', '2023-02-01', '2023-02-02'),
  		('ssusanto', 'sjobs', 'Not accepted', 'ssusanto', '2011-01-01', '2011-02-02'),
  		('ssusanto', 'tcook', 'Pending', 'ssusanto', '2023-02-01', null),
  		('ssusanto', 'nsaurino', 'Accepted', 'ssusanto', '2023-02-01', '2011-02-02'),
  		('ssusanto', 'msujon', 'Accepted', 'ssusanto', '2023-02-01', '2011-02-02'),
  		('nsaurino', 'emusk', 'Accepted', 'nsaurino', '2023-02-01', '2023-02-02'),
  		('tcook', 'sjobs', 'Pending', 'tcook', '2011-09-01', null);


-- Follows insertions
INSERT INTO follows (follower, followed, createdAt)
VALUES	('nsaurino','ssusanto', '2023-02-01'),
  		('nsaurino','msujon', '2023-02-01'),
  		('msujon', 'ssusanto', '2023-02-01'),
  		('ssusanto', 'msujon', '2023-02-01'),
  		('ssusanto', 'emusk', '2023-02-01'),
  		('sjobs', 'tcook', '2011-02-01'),
  		('tcook', 'emusk', '2023-02-01'),
  		('nsaurino', 'emusk', '2023-02-01');


-- Artist insertions
INSERT INTO artist (artistID, fname, lname, artistBio, artistURL)
VALUES	('00001', 'Luke','Combs', 'Country Singer from North Carolina', 'https://www.lukecombs.com/'),
  		('00002', 'Britney','Spears', 'Pop Singer', 'https://www.britneyspears.com/'),
  		('00003', 'Taylor', 'Swift', 'Very Popular Country Singer', 'https://www.taylorswift.com/'),
  		('00004', 'Shawn', 'Carter', 'New York Rap Artist', 'https://www.rocnation.com/music/jay-z/'),
  		('00005', 'Alicia', 'Keys', 'Super talented singer with many hits', 'https://www.aliciakeys.com/'),
  		('00006', 'Ralph', 'Hutter', 'German musician part of Kraftwerk band', 'https://en.wikipedia.org/wiki/Ralf_H%C3%BCtter'),
  		('00007', 'Elton', 'John', 'English singer, pianist, composer', 'https://www.eltonjohn.com/'),
  		('00008', 'Ella', 'Fitzgerald', 'American Jazz musician', 'https://en.wikipedia.org/wiki/Ella_Fitzgerald'),
  		('00009', 'Miles', 'Davis', 'American Tumpeter, bandleader, and composer', 'https://en.wikipedia.org/wiki/Miles_Davis');



-- Song insertions
INSERT INTO song (songID, title, releaseDate, songURL)
VALUES	('00001', 'Heart of the City', '1978-01-01', null),
  		('00002', 'Fast Car', '2010-01-01', null),
  		('00003', 'Empire State of Mind', '2010-01-01', null),
  		('00004', 'Computer World', '2020-01-01', null),
  		('00005', 'Baby One More Time', '1994-01-01', null),
  		('00006', 'Blank Space', '2010-01-01', null),
  		('00007', 'Fallin', '2009-01-01', null),
  		('00008', 'Your Song', '2010-01-01', null),
  		('00009', 'Summertime', '1959-01-01', null),
  		('00010', 'So What', '1959-08-17', null),
  		('00011', 'All Blues', '1959-08-17', null);


-- Album insertions
INSERT INTO album (albumID, title)
VALUES	('00001', 'The Blueprint'),
  		('00002', 'Tracy Chapman'),
  		('00003', 'The Blueprint 3'),
  		('00004', 'Computer World'),
 	 	('00005', 'Songs in A Minor'),
  		('00006', '1989'),
  		('00007', 'Baby One More Time'),
  		('00008', 'Elton John');


-- Genre insertions
INSERT INTO songGenre (songID, genre)
VALUES	('00001', 'Rap'),
	 	('00002', 'Folk'),
	 	('00003', 'Country'),
	 	('00004', 'Synth-Pop'),
	 	('00005', 'Pop'),
	 	('00006', 'Electropop'),
	 	('00007', 'R&B'),
	 	('00008', 'Pop'),
	 	('00009', 'Jazz'),
	 	('00010', 'Jazz'),
	 	('00011', 'Jazz');


-- Song in album insertions
INSERT INTO songInAlbum (songID, albumId)
VALUES	('00001','00001'),
		('00002','00002'),
		('00003','00003'),
		('00004','00004'),
		('00005','00007'),
		('00006','00006'),
		('00007','00005'),
		('00008','00008');


-- Artist performs song insertions
INSERT INTO artistPerformsSong (artistID, songID)
VALUES	('00005','00003'),
		('00005','00007'),
		('00006','00003'),
		('00002','00005'),
		('00007','00008'),
		('00008','00009'),
		('00009','00010'),
		('00009','00011');


-- Users fan of artist insertions
INSERT INTO userFanOfArtist (username, artistID)
VALUES	('ssusanto', '00005'),
		('ssusanto', '00003'),
		('tcook', '00007'),
		('emusk', '00007'),
		('sjobs', '00007'),
		('emusk', '00003');


-- Review song insertions
INSERT INTO reviewSong (username, songId, reviewText, reviewDate)
VALUES	('msujon', '00003', 'Nice song', '2023-02-10'),
		('msujon', '00004','Cool synth wave music', '2023-01-10'),
		('ssusanto', '00007', 'beautiful vocals', '2023-01-30'),
		('ssusanto', '00006', 'Catchy tunes', '2023-03-10');


-- Rate song insertions
INSERT INTO rateSong (username, songID, stars, ratingDate)
VALUES	('msujon', '00003', 4, '2023-02-10'),
		('msujon', '00004',5, '2023-01-10'),
		('ssusanto', '00007', 5, '2023-01-30'),
		('ssusanto', '00006', 4, '2023-03-10'),
		('msujon', '00009',5, '2023-01-10'),
		('nsaurino', '00010',4, '2023-01-10'),
		('nsaurino', '00011',3, '2023-01-10');


-- Rate album insertions
INSERT INTO rateAlbum (username, albumID, stars)
VALUES	('msujon', '00005', 4),
		('msujon', '00004',5),
		('ssusanto', '00007', 5 ),
		('ssusanto', '00006', 4);


-- Review album insertions
INSERT INTO reviewAlbum (userName, albumID, reviewText, reviewDate)
VALUES	('msujon', '00003', 'All songs are nice', '2023-02-10'),
		('msujon', '00004','Cool synth wave music for chilling', '2023-01-10'),
		('ssusanto', '00007', 'beautiful vocals by talented singer', '2023-01-30'),
		('ssusanto', '00006', 'Catchy tunes all around', '2023-03-10');
