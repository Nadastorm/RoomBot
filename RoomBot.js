/**
 * Plug.dj Room Bot
 */

// Set song max time (s)
var songBoundary = 60 * 7;

// Time between announcements
var announcementTick = 60 * 5;

// Index of the last announcement
var lastAnnouncement = 0;

// Random announcements to make periodically
var announcements = [
    "*Welcome to Nadastorm Radio!*",
    "*Join us for Movie Mondays, every Monday at 8ET! Vote on movies here http://bit.ly/NRmovie*",
    "*Read the info tab located in the upper left for room rules, startup guide, and other helpful links*",
    "*Join us on the Overcast Network Minecraft server! IP: us.oc.tc*",
    "*Want to host an event in Nadastorm Radio like a movie night, room takeover, genre night, livestream music, or something else? Contact the room staff*",
    "*Check out Plug.Bot in the info tab for auto-woot and auto-queue!*",
    "*New? Read 'Get Started' in the info tab located in the upper left*",
    "*Be sure to tell your friends to check out Nadastorm Radio!*"
];

// Keywords of blocked songs
var blockedSongs = [
    "Rick Roll",
    "GANGNAM",
    "The Fox",
    "10 hour"
];

var blockedArtists = [
    "Rick Astley"
];

API.on(API.DJ_ADVANCE, listener);
window.setInterval(sendAnnouncement, 1000 * announcementTick);

function listener(data)
{
    if (data == null)
    {
        return;
    }

    var title = data.media.title;
    var author = data.media.author;
    for (var i = 0; i < blockedSongs.length; i++)
    {
        if (title.indexOf(blockedSongs[i]) != -1 || author.indexOf(blockedArtists[i]) != -1)
        {
            API.moderateForceSkip();
            chatMe("*Skipped song \"" + title + "\" because it is blocked.*");
            return;
        }
    }

    var songLenRaw = $("#time-remaining-value").text();
    var songLenParts = songLenRaw.split(":");
    var songLen = (parseInt(songLenParts[0].substring(1)) * 60) + parseInt(songLenParts[1]);
    if (songLen >= songBoundary)
    {
        window.setTimeout(skipLongSong, 1000 * songBoundary);
    }
}

function skipLongSong()
{
    API.moderateForceSkip();
    chatMe("*Skipping song because it has exceeded the song limit (" + (songBoundary / 60) + " minutes.)*");
}

function sendAnnouncement()
{
	if (lastAnnouncement++ >= announcements.length - 1)
	{
		lastAnnouncement = 0;
	}
    chatMe(announcements[lastAnnouncement]);
}

function chatMe(msg)
{
	API.sendChat("/me " + msg);
}

API.chatLog("*Nadastorm Radio Bot is on*", true);
