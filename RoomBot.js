/**
 * Plug.dj Room Bot
 */

// Set song max time (s)
var songBoundary = 60 * 7;

// Time between announcements
var announcementTick = 60 * 5;

// Random announcements to make periodically
var announcements = [
    "/me *Welcome to Nadastorm Radio!*",
    "/me *Read our rules in the info tab located in the upper left*",
    "/me *New? Read 'Get Started' in the info tab located in the upper left*",
    "/me *Join us on the Overcast Network Minecraft server! IP: us.oc.tc*",
    "/me *Want to host an event in Nadastorm Radio? Contact the room staff*",
    "/me *Check out Plug.Bot in the info tab for auto-woot and auto-queue!*",
];

// Keywords of blocked songs
var blockedSongs = [
    "Rick Roll",
    "GANGNAM",
    "10 hour"
];

var blockedArtists = [
    "Rick Astley",
    "Ylvis"
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
            API.sendChat("/me *Skipped song \"" + title + "\" because it is blocked.*");
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
    API.sendChat("/me *Skipping song because it has exceeded the song limit (" + (songBoundary / 60) + " minutes.)*");
}

function sendAnnouncement()
{
    API.sendChat(announcements[Math.floor(Math.random() * announcements.length)]);
}

API.sendChat("/me *Nadastorm Radio Bot is on*");
