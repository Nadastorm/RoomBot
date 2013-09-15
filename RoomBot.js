/**
 * Plug.dj Room Bot
 */

// Set song max time (s)
var songBoundary = 60 * 7;

// Time between announcements
var announcementTick = 60 * 5;

// Random announcements to make periodically
var announcements = [
    "Welcome to Nadastorm Radio!",
    "Read our rules in the info tab located in the upper left",
    "New? Read 'Get Started' in the info tab located in the upper left",
    "Join us on the Overcast Network Minecraft server! IP: us.oc.tc",
    "Want to host an event in Nadastorm Radio? Contact the room staff"
    "Check out Plug.Bot in the info tab for auto-woot and auto-queue!"
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
            API.sendChat("Skipped song \"" + title + "\" because it is blocked.");
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
    API.sendChat("Skipping song because it has exceeded the song limit (" + (songBoundary / 60) + " minutes.)");
}

function sendAnnouncement()
{
    API.sendChat(announcements[Math.floor(Math.random() * announcements.length)]);
