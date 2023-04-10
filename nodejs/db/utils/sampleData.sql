
-- Users insertions //note: we should manually register users so passwords will be salted and stored
-- INSERT INTO users (username, pwd, fname, lname, lastlogin)
-- VALUES	('nsaurino', 'FatEar', 'Nigel', 'Saurino', '2023-01-30'),
--   		('ss9040', 'testpw', 'Sonia', 'Susanto', '2023-01-29'),
--   		('msujon', 'testpassword', 'Mohammed', 'Sujon', '2023-01-29'),
--   		('sjobs', 'apple', 'Steve', 'Jobs', '2011-01-01'),
--   		('tcook', 'appleceo', 'Tim', 'Cook', '2023-03-20'),
--   		('emusk', 'tesla', 'Elon', 'Musk', '2023-03-29');


-- Friends insertions  //note: redo sample data after registering a bunch of test users
INSERT INTO friend (user1, user2, acceptStatus, requestSentBy, createdAt, updatedAt)
VALUES
-- ('nsaurino', 'ss9040', 'Accepted', 'nsaurino', '2023-02-01', '2023-02-02'),
  		('ss9040', 'astark', 'Not accepted', 'ss9040', '2011-01-01', '2011-02-02'),
  		('ss9040', 'jsnow', 'Pending', 'ss9040', '2023-02-01', null),
  		('ss9040', 'rgilmore', 'Accepted', 'ss9040', '2021-02-01', '2021-02-02'),
  		-- ('ss9040', 'msujon', 'Accepted', 'ss9040', '2023-02-01', '2011-02-02'),
  		-- ('nsaurino', 'emusk', 'Accepted', 'nsaurino', '2023-02-01', '2023-02-02'),
  		('astark', 'jsnow', 'Accepted', 'astark', '2011-09-01', '2011-09-02'),
			('jsnow', 'rgilmore', 'Accepted', 'jsnow', '2012-09-01', '2012-09-02');

-- Follows insertions //note: redo sample data after registering a bunch of test users
INSERT INTO follows (follower, followed, createdAt)
VALUES
			-- ('nsaurino','ss9040', '2023-02-01'),
  		-- ('nsaurino','msujon', '2023-02-01'),
  		-- ('msujon', 'ss9040', '2023-02-01'),
  		('ss9040', 'astark', '2022-02-01'),
  		('ss9040', 'jsnow', '2020-02-01'),
  		('ss9040', 'rgilmore', '2011-02-01'),
  		('astark', 'jsnow', '2012-02-01'),
				('astark', 'rgilmore', '2012-02-01'),
					('rgilmore', 'jsnow', '2012-02-01'),
						('jsnow', 'ss9040', '2012-02-01');


-- Artist insertions
INSERT INTO artist (fname, lname, artistBio, artistURL)
VALUES	('Luke','Combs', 'Country Singer from North Carolina', 'https://www.lukecombs.com/'),
  		('Britney','Spears','Pop Singer','https://www.britneyspears.com/'),
  		('Taylor', 'Swift', 'Very Popular Country Singer', 'https://www.taylorswift.com/'),
  		('Shawn', 'Carter', 'New York Rap Artist', 'https://www.rocnation.com/music/jay-z/'),
  		('Alicia', 'Keys', 'Super talented singer with many hits', 'https://www.aliciakeys.com/'),
  		('Ralph', 'Hutter', 'German musician part of Kraftwerk band', 'https://en.wikipedia.org/wiki/Ralf_H%C3%BCtter'),
  		('Elton', 'John', 'English singer, pianist, composer', 'https://www.eltonjohn.com/'),
  		('Ella', 'Fitzgerald', 'American Jazz musician', 'https://en.wikipedia.org/wiki/Ella_Fitzgerald'),
  		('Miles', 'Davis', 'American Tumpeter, bandleader, and composer', 'https://en.wikipedia.org/wiki/Miles_Davis');



-- Song insertions
INSERT INTO song (title, releaseDate, songURL)
VALUES	('Heart of the City', '1978-01-01', null),
  		('Fast Car', '2010-01-01', null),
  		('Empire State of Mind', '2010-01-01', null),
  		('Computer World', '2020-01-01', null),
  		('Baby One More Time', '1994-01-01', null),
  		('Blank Space', '2010-01-01', null),
  		('Fallin', '2009-01-01', null),
  		('Your Song', '2010-01-01', null),
  		('Summertime', '1959-01-01', null),
  		('So What', '1959-08-17', null),
  		('All Blues', '1959-08-17', null);


-- Album insertions
INSERT INTO album (title)
VALUES	('The Blueprint'),
  		('Tracy Chapman'),
  		('The Blueprint 3'),
  		('Computer World'),
 	 	('Songs in A Minor'),
  		('1989'),
  		('Baby One More Time'),
  		('Elton John');


-- Genre insertions
INSERT INTO songGenre (songID, genre)
VALUES	(1, 'Rap'),
	 	(2, 'Folk'),
	 	(3, 'Country'),
	 	(4, 'Synth-Pop'),
	 	(5, 'Pop'),
	 	(6, 'Electropop'),
	 	(7, 'R&B'),
	 	(8, 'Pop'),
	 	(9, 'Jazz'),
	 	(10, 'Jazz'),
	 	(11, 'Jazz');


-- Song in album insertions
INSERT INTO songInAlbum (songID, albumId)
VALUES	(1,1),
		(2,2),
		(3,3),
		(4,4),
		(5,7),
		(6,6),
		(7,5),
		(8,8);


-- Artist performs song insertions
INSERT INTO artistPerformsSong (artistID, songID)
VALUES	(5,3),
		(5,7),
		(2,5),
		(7,8),
		(8,9),
		(9,10),
		(9,11);


-- Users fan of artist insertions // redo after registering users
INSERT INTO userFanOfArtist (username, artistID)
VALUES	('ss9040', 5),
		('ss9040', 3),
		('jsnow', 7),
		('astark', 7),
		('rgilmore', 7),
		('jsnow', 3);


-- Review song insertions // redo after registering users
INSERT INTO reviewSong (username, songId, reviewText, reviewDate)
VALUES
-- ('msujon', 3, 'Nice song', '2023-02-10'),
		-- ('msujon', 4,'Cool synth wave music', '2023-01-10'),
		('ss9040', 7, 'beautiful vocals', '2023-01-30'),
				('ss9040', 5, 'classic tunes', '2012-01-30'),
						('astark', 7, 'beautiful voice', '2015-01-30'),
								('jsnow', 3, 'upbeat song', '2019-01-30'),
		('jsnow', 6, 'Catchy tunes', '2019-03-10');


-- Rate song insertions // redo after registering users
INSERT INTO rateSong (username, songID, stars, ratingDate)
VALUES
-- ('msujon', 3, 4, '2023-02-10'),
-- 		('msujon', 4,5, '2023-01-10'),
		('ss9040', 7, 5, '2020-01-30'),
		('ss9040', 6, 4, '2020-03-10'),
				('astark', 5, 4, '2020-03-10'),
						('jsnow', 3, 4, '2020-03-10'),
								('astark', 1, 3, '2020-03-10');
		-- ('msujon', 9,5, '2023-01-10'),
		-- ('nsaurino', 10,4, '2023-01-10'),
		-- ('nsaurino', 11,3, '2023-01-10');


-- Rate album insertions // redo after registering users
INSERT INTO rateAlbum (username, albumID, stars)
VALUES
-- ('msujon', 5, 4),
-- 		('msujon', 4,5),
		('ss9040', 7, 5),
		('astark', 3, 5),
		('jsnow', 1, 3),
	  ('rgilmore', 3, 4),
		('ss9040', 3, 2),
		('jsnow', 6, 4);


-- Review album insertions // redo after registering users
INSERT INTO reviewAlbum (username, albumID, reviewText, reviewDate)
VALUES
-- ('msujon', 3, 'All songs are nice', '2023-02-10'),
-- 		('msujon', 4,'Cool synth wave music for chilling', '2023-01-10'),
		('ss9040', 7, 'beautiful vocals by talented singer', '2020-01-30'),
		('jsnow', 3, 'great album', '2019-01-30'),
		('astark', 6, 'catchy songs in the album', '2018-01-30'),
		('jsnow', 8, 'all around classic', '2015-01-30'),
		('ss9040', 8, 'great songs all around', '2020-03-10');
