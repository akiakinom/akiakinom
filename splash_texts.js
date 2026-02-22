const subtitle = document.getElementById('splash');
const subtitles = [
    ":3", "a friendly neighbourhood puppygirl",
    "i have no idea what to type here",
    "mizuki akiyama is my twin", "i am the original starwalker",
    "beware of the cutie who speaks with paws",
    "why do i share my spotify status up there? idk", "roll the katamari!!!", "update: mafuyu is now my twin",
    "blahajs power or something idk", "why are you here.", "update: update: i think mizuki is again my twin",
    "mizuena my beloved :3", "random cs student", "i am so dead inside", "domainn update!!!!", "updated this website",
    "just monika.", "arf", "hello random person visiting this website for uni purposes",
    "i love my beautiful fox wife", "i habe a  lovely wife :3c", "those meds rellly kicked in",
    "I GOT FUCKN DIAGNOSED!!!", "certified adhd & autism", "when will cities skylines 2 finally work",
    "i hate this fucking university", "isn't it funny how i-", "trans rights!!!", "that's a nice argument but idc",
    "i'm proud of this website :3c", "i rember", "jebać amplitron", "dawajcie mi kurwa medikinet",
    "PW? more like paws at u OwO"
]

function isBirthday() {

    const today = new Date()
    return today.getMonth() == 11 && today.getDate() == 6

}

function isHRTBrithday() {

    const today = new Date()
    return today.getMonth() == 1 && today.getDate() == 3

}


function shuffleSubtitle() {
    let newSubtitle;

    if (isBirthday()) {
        subtitle.innerText = "🎂 it's my birthday :3";
        return;
    }

    if (isHRTBrithday()) {
        subtitle.innerText = "🎂 hrt anniversary :3c";
        return;
    }

    // holy hell i used a do.while loop
    do {
        newSubtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
    } while (newSubtitle === subtitle.innerText && subtitles.length > 1);

    subtitle.innerText = newSubtitle;
}

// shuffleSubtitle();

const shuffleButton = document.getElementById('shuffle_button');
shuffleButton.addEventListener('click', () => shuffleSubtitle());