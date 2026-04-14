// --- إعدادات الحماية والربط ---
const SHEETDB_API_URL = "https://sheetdb.io/api/v1/at5vemf764m61";
const adminCodes = [
    "ADMIN-CHOUIDIRA-01", "ADMIN-CHOUIDIRA-02", 
    "ADMIN-CHOUIDIRA-03", "ADMIN-CHOUIDIRA-04", 
    "ADMIN-CHOUIDIRA-05"
];

function getDeviceID() {
    return btoa(navigator.userAgent + screen.width).substring(0, 12);
}

async function handleActivation() {
    const input = document.getElementById('activation-input').value.trim().toUpperCase();
    const error = document.getElementById('error-msg');
    const btn = document.getElementById('activate-btn');

    if (!input) return;

    // فحص كود الأدمن (تفعيل فوري بدون قيود الجهاز)
    if (adminCodes.includes(input)) {
        localStorage.setItem("BEM_26_ACTIVE", "TRUE");
        document.getElementById('activation-overlay').style.display = 'none';
        return;
    }

    error.innerText = "Checking code... Please wait.";
    error.style.display = "block";
    error.style.color = "var(--gold-solid)";
    btn.disabled = true;

    try {
        const response = await fetch(`${SHEETDB_API_URL}/search?code=${input}`);
        const data = await response.json();

        if (data.length > 0) {
            const entry = data[0];
            if (entry.status === "USED") {
                error.innerText = "Error: Already used on another device.";
                error.style.color = "var(--wrong)";
                btn.disabled = false;
                return;
            }

            const update = await fetch(`${SHEETDB_API_URL}/code/${input}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"data": {"status": "USED", "device_id": getDeviceID()}})
            });

            if (update.ok) {
                localStorage.setItem("BEM_26_ACTIVE", "TRUE");
                document.getElementById('activation-overlay').style.display = 'none';
            }
        } else {
            error.innerText = "Invalid Code.";
            error.style.color = "var(--wrong)";
            btn.disabled = false;
        }
    } catch (e) {
        error.innerText = "Internet Connection Error!";
        error.style.color = "var(--wrong)";
        btn.disabled = false;
    }
}

window.onload = () => {
    if (localStorage.getItem("BEM_26_ACTIVE") === "TRUE") {
        document.getElementById('activation-overlay').style.display = 'none';
    }
};

// --- بنك الأسئلة والمنطق التشغيلي ---
const rawQuestionBank = [
    // --- UNIT 1: UNIVERSAL LANDMARKS & FIGURES ---
    { u: "Unit1", q: "The 'Great Mosque of Algiers' has the world's tallest ______.", o: ["Minaret", "Dome", "Garden"], a: "Minaret" },
    { u: "Unit1", q: "William Shakespeare was a famous English ______.", o: ["Playwright", "Scientist", "Painter"], a: "Playwright" },
    { u: "Unit1", q: "The 'Leaning Tower of Pisa' is located in ______.", o: ["Italy", "France", "Greece"], a: "Italy" },
    { u: "Unit1", q: "Leonardo Da Vinci ______ the Mona Lisa.", o: ["painted", "wrote", "discovered"], a: "painted" },
    { u: "Unit1", q: "Casbah of Algiers is a ______ site.", o: ["UNESCO World Heritage", "Modern", "Natural"], a: "UNESCO World Heritage" },
    { u: "Unit1", q: "A ______ is a person who designs buildings.", o: ["Architect", "Engineer", "Sculptor"], a: "Architect" },
    { u: "Unit1", q: "The Statue of Liberty was a gift from ______ to the USA.", o: ["France", "UK", "Spain"], a: "France" },
    { u: "Unit1", q: "Maqam Echahid was inaugurated in ______.", o: ["1982", "1962", "1954"], a: "1982" },
    { u: "Unit1", q: "The Pyramids of Giza are in ______.", o: ["Egypt", "Sudan", "Jordan"], a: "Egypt" },
    { u: "Unit1", q: "Moufdi Zakaria wrote the Algerian ______.", o: ["National Anthem", "Constitution", "History"], a: "National Anthem" },
    { u: "Unit1", q: "Big Ben is the nickname for the Great ______ in London.", o: ["Bell", "Bridge", "Square"], a: "Bell" },
    { u: "Unit1", q: "The 'Alhambra' is a palace in ______.", o: ["Spain", "Portugal", "Morocco"], a: "Spain" },
    { u: "Unit1", q: "The currency used in the UK is the ______.", o: ["Pound Sterling", "Euro", "Dollar"], a: "Pound Sterling" },
    { u: "Unit1", q: "Sidi M'Cid Bridge is located in ______.", o: ["Constantine", "Annaba", "Setif"], a: "Constantine" },
    { u: "Unit1", q: "Picasso is a world-famous ______.", o: ["Painter", "Singer", "Writer"], a: "Painter" },
    { u: "Unit1", q: "The 'Colosseum' is an ancient amphitheatre in ______.", o: ["Rome", "Athens", "Paris"], a: "Rome" },
    { u: "Unit1", q: "Landmarks are ______ that represent a country.", o: ["Symbols", "Foods", "Climates"], a: "Symbols" },
    { u: "Unit1", q: "The Sahara Desert is the ______ hot desert in the world.", o: ["Largest", "Smallest", "Coldest"], a: "Largest" },
    { u: "Unit1", q: "Djémila is an ancient ______ city.", o: ["Roman", "Islamic", "Ottoman"], a: "Roman" },
    { u: "Unit1", q: "The 'Taj Mahal' was built by ______.", o: ["Shah Jahan", "Akbar", "Napoleon"], a: "Shah Jahan" },
    { u: "Unit1", q: "An 'Itinerary' is a ______.", o: ["Travel plan", "Passport", "Hotel"], a: "Travel plan" },
    { u: "Unit1", q: "Pablo Picasso was born in ______.", o: ["Spain", "Italy", "France"], a: "Spain" },
    { u: "Unit1", q: "The 'Eiffel Tower' is made of ______.", o: ["Iron", "Wood", "Gold"], a: "Iron" },
    { u: "Unit1", q: "The 'Great Wall' is in China. It is very ______.", o: ["Long", "Short", "Small"], a: "Long" },
    { u: "Unit1", q: "Kateb Yacine was a famous Algerian ______.", o: ["Writer", "Doctor", "Pilot"], a: "Writer" },
    { u: "Unit1", q: "Timgad is also called 'The ______ of Africa'.", o: ["Pompeii", "Paris", "London"], a: "Pompeii" },
    { u: "Unit1", q: "A 'mausoleum' is a large ______.", o: ["Tomb", "School", "Market"], a: "Tomb" },
    { u: "Unit1", q: "Which landmark is in Algiers?", o: ["Maqam Echahid", "Big Ben", "Alhambra"], a: "Maqam Echahid" },
    { u: "Unit1", q: "William Shakespeare wrote '______'.", o: ["Hamlet", "The Stranger", "Nedjma"], a: "Hamlet" },
    { u: "Unit1", q: "The 'Tower of London' was used as a ______.", o: ["Prison", "Zoo", "Both"], a: "Both" },
    { u: "Unit1", q: "London is the ______ of England.", o: ["Capital", "Currency", "Continent"], a: "Capital" },
    { u: "Unit1", q: "An 'Explorer' is someone who ______ new places.", o: ["Discovers", "Destroys", "Hates"], a: "Discovers" },
    { u: "Unit1", q: "The 'Louvre' is a famous ______ in Paris.", o: ["Museum", "Stadium", "Airport"], a: "Museum" },
    { u: "Unit1", q: "Florence Nightingale was a famous ______.", o: ["Nurse", "Queen", "Actress"], a: "Nurse" },
    { u: "Unit1", q: "The 'Royal Palace' is where the ______ lives.", o: ["Monarch", "Student", "Farmer"], a: "Monarch" },
    { u: "Unit1", q: "The 'Great Pyramid' is one of the Seven ______.", o: ["Wonders", "Mountains", "Rivers"], a: "Wonders" },
    { u: "Unit1", q: "Landmarks help ______ recognize a city.", o: ["Tourists", "Animals", "Birds"], a: "Tourists" },
    { u: "Unit1", q: "Constantine is the city of ______ bridges.", o: ["Hanging", "Golden", "Wooden"], a: "Hanging" },
    { u: "Unit1", q: "Algiers was known as 'Algiers the ______'.", o: ["White", "Red", "Blue"], a: "White" },
    { u: "Unit1", q: "The Sahara covers ______ of Algeria.", o: ["Most", "None", "Half"], a: "Most" },
    { u: "Unit1", q: "A 'Sculptor' makes ______.", o: ["Statues", "Cakes", "Cars"], a: "Statues" },
    { u: "Unit1", q: "The 'Clock Tower' in London is known as ______.", o: ["Elizabeth Tower", "Eiffel Tower", "Pisa Tower"], a: "Elizabeth Tower" },
    { u: "Unit1", q: "Oran is famous for its 'Santa ______' fort.", o: ["Cruz", "Maria", "Rosa"], a: "Cruz" },
    { u: "Unit1", q: "Landmarks are part of our ______ heritage.", o: ["Cultural", "Future", "Weather"], a: "Cultural" },
    { u: "Unit1", q: "The 'Hoggar' mountains are in the ______.", o: ["South", "North", "East"], a: "South" },
    { u: "Unit1", q: "Which one is NOT a landmark?", o: ["A Car", "The Pyramids", "Big Ben"], a: "A Car" },
    { u: "Unit1", q: "Martyrs' Memorial is a symbol of ______.", o: ["Independence", "Sports", "Music"], a: "Independence" },
    { u: "Unit1", q: "Ibn Khaldun was a famous ______.", o: ["Historian", "Pilot", "Athlete"], a: "Historian" },
    { u: "Unit1", q: "The 'Acropolis' is in ______.", o: ["Athens", "Rome", "Cairo"], a: "Athens" },
    { u: "Unit1", q: "Marco Polo was a great ______.", o: ["Traveler", "Cook", "Singer"], a: "Traveler" },
    { u: "Unit1", q: "A travel agent helps you ______ your trip.", o: ["Book", "Forget", "Lose"], a: "Book" },
    { u: "Unit1", q: "UNESCO protects ______ sites.", o: ["Heritage", "New", "Modern"], a: "Heritage" },
    { u: "Unit1", q: "The 'Golden Gate Bridge' is in ______.", o: ["San Francisco", "London", "Paris"], a: "San Francisco" },
    { u: "Unit1", q: "Sidi Abderrahmane is a patron saint of ______.", o: ["Algiers", "Oran", "Annaba"], a: "Algiers" },
    { u: "Unit1", q: "An 'Archeologist' studies ______.", o: ["History", "Space", "Cooking"], a: "History" },
    { u: "Unit1", q: "The 'Red Square' is in ______.", o: ["Moscow", "Beijing", "Madrid"], a: "Moscow" },
    { u: "Unit1", q: "Algiers Casbah is known for its ______ streets.", o: ["Narrow", "Wide", "Fast"], a: "Narrow" },
    { u: "Unit1", q: "A 'souvenir' is something you ______ during a trip.", o: ["Buy", "Sell", "Break"], a: "Buy" },
    { u: "Unit1", q: "Mount Fuji is a famous landmark in ______.", o: ["Japan", "India", "USA"], a: "Japan" },
    { u: "Unit1", q: "The 'Petra' city is carved in ______.", o: ["Rock", "Wood", "Ice"], a: "Rock" },
    { u: "Unit1", q: "Algier's port is on the ______ Sea.", o: ["Mediterranean", "Red", "Black"], a: "Mediterranean" },
    { u: "Unit1", q: "Landmarks attract many ______.", o: ["Visitors", "Animals", "Storms"], a: "Visitors" },
    { u: "Unit1", q: "Nedjma is a novel by ______.", o: ["Kateb Yacine", "Assia Djebar", "Albert Camus"], a: "Kateb Yacine" },
    { u: "Unit1", q: "The 'Empire State Building' is in ______.", o: ["New York", "London", "Tokyo"], a: "New York" },
    { u: "Unit1", q: "London's river is called the ______.", o: ["Thames", "Nile", "Seine"], a: "Thames" },
    { u: "Unit1", q: "Which city is the 'Bridges City'?", o: ["Constantine", "Batna", "Ghardaia"], a: "Constantine" },

    // --- UNIT 2: GRAMMAR & LANGUAGE MASTERY ---
    { u: "Unit2", q: "The Eiffel Tower ______ visited by millions.", o: ["is", "was", "are"], a: "is" },
    { u: "Unit2", q: "The meal ______ by the chef.", o: ["is cooked", "was cooked", "cooks"], a: "is cooked" },
    { u: "Unit2", q: "The bridge ______ built in 1887.", o: ["was", "is", "were"], a: "was" },
    { u: "Unit2", q: "My father is as ______ as my uncle.", o: ["tall", "taller", "tallest"], a: "tall" },
    { u: "Unit2", q: "Algeria is not as ______ as Russia.", o: ["large", "larger", "largest"], a: "large" },
    { u: "Unit2", q: "The poem ______ written by the student.", o: ["was", "is", "were"], a: "was" },
    { u: "Unit2", q: "The match ______ played yesterday.", o: ["was", "is", "will"], a: "was" },
    { u: "Unit2", q: "She is ______ intelligent girl in the class.", o: ["the most", "more", "as"], a: "the most" },
    { u: "Unit2", q: "The car ______ repaired by the mechanic.", o: ["was", "were", "is"], a: "was" },
    { u: "Unit2", q: "This exercise is ______ than the last one.", o: ["easier", "easy", "easiest"], a: "easier" },
    { u: "Unit2", q: "Landmarks ______ protected by the government.", o: ["are", "is", "was"], a: "are" },
    { u: "Unit2", q: "Shakespeare's plays ______ performed worldwide.", o: ["are", "is", "was"], a: "are" },
    { u: "Unit2", q: "The novel was ______ by Kateb Yacine.", o: ["written", "wrote", "writing"], a: "written" },
    { u: "Unit2", q: "Gold is more ______ than silver.", o: ["expensive", "cheap", "heavy"], a: "expensive" },
    { u: "Unit2", q: "Active: 'They clean the rooms.' Passive: The rooms ______.", o: ["are cleaned", "is cleaned", "cleaned"], a: "are cleaned" },
    { u: "Unit2", q: "Today is as ______ as yesterday.", o: ["hot", "hotter", "hottest"], a: "hot" },
    { u: "Unit2", q: "The letters ______ sent two days ago.", o: ["were", "was", "are"], a: "were" },
    { u: "Unit2", q: "The 'Hanging Gardens' ______ in Babylon.", o: ["were", "was", "is"], a: "were" },
    { u: "Unit2", q: "Mount Everest is ______ mountain in the world.", o: ["the highest", "higher", "high"], a: "the highest" },
    { u: "Unit2", q: "The suspect ______ arrested by the police.", o: ["was", "were", "is"], a: "was" },
    { u: "Unit2", q: "Active: 'He writes a story.' Passive: A story ______.", o: ["is written", "was written", "wrote"], a: "is written" },
    { u: "Unit2", q: "A plane is ______ than a car.", o: ["faster", "fast", "fastest"], a: "faster" },
    { u: "Unit2", q: "The Taj Mahal is ______ beautiful landmark.", o: ["a", "an", "the"], a: "a" },
    { u: "Unit2", q: "Arabic is not as ______ as English.", o: ["difficult", "more difficult", "most difficult"], a: "difficult" },
    { u: "Unit2", q: "The window ______ broken by the wind.", o: ["was", "were", "is"], a: "was" },
    { u: "Unit2", q: "Active: 'She buys books.' Passive: Books ______.", o: ["are bought", "is bought", "bought"], a: "are bought" },
    { u: "Unit2", q: "My phone is ______ than yours.", o: ["better", "good", "best"], a: "better" },
    { u: "Unit2", q: "Landmarks are ______ sites.", o: ["historic", "history", "historian"], a: "historic" },
    { u: "Unit2", q: "The thief ______ caught last night.", o: ["was", "were", "are"], a: "was" },
    { u: "Unit2", q: "This cake is ______ sweet ______ honey.", o: ["as / as", "more / than", "less / than"], a: "as / as" },
    { u: "Unit2", q: "Passive Voice uses: Be + ______.", o: ["Past Participle", "Infinitive", "Gerund"], a: "Past Participle" },
    { u: "Unit2", q: "Passive: The laws ______ respected.", o: ["must be", "must", "be"], a: "must be" },
    { u: "Unit2", q: "He is as ______ as his brother.", o: ["brave", "braver", "bravest"], a: "brave" },
    { u: "Unit2", q: "The test was ______ than I expected.", o: ["harder", "hard", "hardest"], a: "harder" },
    { u: "Unit2", q: "Active: 'They build a house.' Passive: A house ______.", o: ["is built", "was built", "built"], a: "is built" },
    { u: "Unit2", q: "Oranges are ______ than apples.", o: ["cheaper", "cheap", "cheapest"], a: "cheaper" },
    { u: "Unit2", q: "The classroom ______ cleaned every day.", o: ["is", "was", "are"], a: "is" },
    { u: "Unit2", q: "She is as ______ as a bee.", o: ["busy", "busier", "busiest"], a: "busy" },
    { u: "Unit2", q: "Active: 'People use internet.' Passive: Internet ______.", o: ["is used", "was used", "used"], a: "is used" },
    { u: "Unit2", q: "London is ______ expensive than Algiers.", o: ["more", "as", "most"], a: "more" },
    { u: "Unit2", q: "The pyramids ______ built by thousands of men.", o: ["were", "was", "is"], a: "were" },
    { u: "Unit2", q: "A rabbit is not as ______ as a lion.", o: ["strong", "stronger", "strongest"], a: "strong" },
    { u: "Unit2", q: "This is ______ story I've ever read.", o: ["the best", "better", "good"], a: "the best" },
    { u: "Unit2", q: "Passive: New bridges ______ being built.", o: ["are", "is", "was"], a: "are" },
    { u: "Unit2", q: "Active: 'The police caught the thief.' Passive: The thief ______.", o: ["was caught", "is caught", "caught"], a: "was caught" },
    { u: "Unit2", q: "Maths is ______ than Art.", o: ["more complex", "as complex", "complexer"], a: "more complex" },
    { u: "Unit2", q: "The song ______ sung by a famous girl.", o: ["was", "were", "is"], a: "was" },
    { u: "Unit2", q: "History is as ______ as Geography.", o: ["interesting", "more interesting", "most interesting"], a: "interesting" },
    { u: "Unit2", q: "The computer ______ invented in the 20th century.", o: ["was", "is", "were"], a: "was" },
    { u: "Unit2", q: "My bag is as ______ as yours.", o: ["heavy", "heavier", "heaviest"], a: "heavy" },
    { u: "Unit2", q: "Passive: English ______ spoken here.", o: ["is", "was", "are"], a: "is" },
    { u: "Unit2", q: "Traveling by plane is ______ than by bus.", o: ["more comfortable", "as comfortable", "comfortabler"], a: "more comfortable" },
    { u: "Unit2", q: "Active: 'They make bread.' Passive: Bread ______.", o: ["is made", "was made", "makes"], a: "is made" },
    { u: "Unit2", q: "This car is ______ in the world.", o: ["the fastest", "faster", "fast"], a: "the fastest" },
    { u: "Unit2", q: "Active: 'He told a lie.' Passive: A lie ______.", o: ["was told", "is told", "told"], a: "was told" },
    { u: "Unit2", q: "She is not as ______ as her sister.", o: ["pretty", "prettier", "prettiest"], a: "pretty" },
    { u: "Unit2", q: "The cake ______ eaten by the kids.", o: ["was", "were", "is"], a: "was" },
    { u: "Unit2", q: "A whale is ______ than a shark.", o: ["larger", "large", "largest"], a: "larger" },
    { u: "Unit2", q: "Passive: Football ______ played everywhere.", o: ["is", "was", "are"], a: "is" },
    { u: "Unit2", q: "Active: 'I wrote a letter.' Passive: A letter ______.", o: ["was written", "is written", "wrote"], a: "was written" },
    { u: "Unit2", q: "The Sahara is ______ desert in the world.", o: ["the largest", "larger", "large"], a: "the largest" },
    { u: "Unit2", q: "Passive: Homework ______ done yesterday.", o: ["was", "is", "were"], a: "was" },
    { u: "Unit2", q: "An elephant is ______ than a horse.", o: ["heavier", "heavy", "heaviest"], a: "heavier" },
    { u: "Unit2", q: "Active: 'She likes flowers.' Passive: Flowers ______.", o: ["are liked", "is liked", "liked"], a: "are liked" },
    { u: "Unit2", q: "Active: 'They saw the film.' Passive: The film ______.", o: ["was seen", "is seen", "saw"], a: "was seen" },
    { u: "Unit2", q: "A laptop is ______ than a desktop.", o: ["more portable", "portable", "portabler"], a: "more portable" },
    { u: "Unit2", q: "The museum ______ opened last week.", o: ["was", "is", "were"], a: "was" },

    // --- UNIT 3: ME, MY COMMUNITY & CITIZENSHIP ---
    { u: "Unit3", t: "Solidarity is essential in our society.", tr: "التضامن ضروري في مجتمعنا.", q: "Solidarity means ______.", o: ["Unity", "Fighting", "Greed"], a: "Unity" },
    { u: "Unit3", q: "A ______ person always tells the truth.", o: ["Honest", "Lazy", "Selfish"], a: "Honest" },
    { u: "Unit3", q: "Citizens should ______ the environment.", o: ["protect", "pollute", "damage"], a: "protect" },
    { u: "Unit3", q: "UNICEF stands for United Nations ______ Fund.", o: ["Children's", "Money", "Health"], a: "Children's" },
    { u: "Unit3", q: "To ______ means to work without being paid.", o: ["Volunteer", "Employ", "Trade"], a: "Volunteer" },
    { u: "Unit3", t: "I have many memories of my childhood.", tr: "لدي ذكريات كثيرة عن طفولتي.", q: "Memories refer to the ______.", o: ["Past", "Future", "Present"], a: "Past" },
    { u: "Unit3", q: "A good citizen is ______.", o: ["Responsible", "Careless", "Rude"], a: "Responsible" },
    { u: "Unit3", q: "Kindness is a ______ value.", o: ["Moral", "Bad", "Physical"], a: "Moral" },
    { u: "Unit3", q: "Handicapped people need our ______.", o: ["Support", "Hate", "Neglect"], a: "Support" },
    { u: "Unit3", q: "The Red Crescent helps ______ of disasters.", o: ["Victims", "Winners", "Animals"], a: "Victims" },
    { u: "Unit3", q: "When I grow up, I ______ to be a doctor.", o: ["want", "wanted", "wants"], a: "want" },
    { u: "Unit3", q: "Charity organizations collect ______ for the poor.", o: ["Donations", "Cars", "Tickets"], a: "Donations" },
    { u: "Unit3", q: "Respecting elders is part of our ______.", o: ["Culture", "Economy", "Weather"], a: "Culture" },
    { u: "Unit3", q: "An ideal citizen ______ the laws.", o: ["follows", "breaks", "hates"], a: "follows" },
    { u: "Unit3", t: "Education is a right for every child.", tr: "التعليم حق لكل طفل.", q: "Education helps to ______ the mind.", o: ["develop", "close", "hurt"], a: "develop" },
    { u: "Unit3", q: "To be a volunteer, you must be ______.", o: ["Helpful", "Greedy", "Angry"], a: "Helpful" },
    { u: "Unit3", q: "Small acts can make a big ______.", o: ["Difference", "Problem", "Mistake"], a: "Difference" },
    { u: "Unit3", q: "We should ______ the streets clean.", o: ["keep", "make", "leave"], a: "keep" },
    { u: "Unit3", q: "Empathy is understanding others' ______.", o: ["Feelings", "Wealth", "Clothes"], a: "Feelings" },
    { u: "Unit3", q: "My dream job is to be a ______.", o: ["Teacher", "Toy", "Game"], a: "Teacher" },
    { u: "Unit3", q: "A 'Charity' is a ______ organization.", o: ["Non-profit", "Musical", "Sports"], a: "Non-profit" },
    { u: "Unit3", q: "I ______ help my neighbors every week.", o: ["always", "never", "hardly"], a: "always" },
    { u: "Unit3", q: "Children should ______ their teachers.", o: ["Respect", "Ignore", "Fight"], a: "Respect" },
    { u: "Unit3", q: "A 'Tutor' is someone who ______.", o: ["Teaches", "Cooks", "Drives"], a: "Teaches" },
    { u: "Unit3", q: "Childhood is the ______ time of life.", o: ["Best", "Worst", "Hardest"], a: "Best" },
    { u: "Unit3", q: "A 'Citizen' belongs to a ______.", o: ["Country", "Shop", "Forest"], a: "Country" },
    { u: "Unit3", q: "To 'behave' means to act ______.", o: ["Well", "Badly", "Fast"], a: "Well" },
    { u: "Unit3", q: "My primary school was ______.", o: ["Great", "Small", "Both"], a: "Both" },
    { u: "Unit3", q: "A ______ helps sick people.", o: ["Doctor", "Pilot", "Baker"], a: "Doctor" },
    { u: "Unit3", q: "We must ______ water.", o: ["Save", "Waste", "Lose"], a: "Save" },
    { u: "Unit3", q: "A ______ person shares his food.", o: ["Generous", "Mean", "Lazy"], a: "Generous" },
    { u: "Unit3", q: "I ______ to play with my friends in the past.", o: ["Used", "Use", "Using"], a: "Used" },
    { u: "Unit3", q: "A 'Community' is a group of ______.", o: ["People", "Trees", "Rocks"], a: "People" },
    { u: "Unit3", q: "Volunteering makes you ______.", o: ["Happy", "Sad", "Angry"], a: "Happy" },
    { u: "Unit3", q: "We should help ______ people.", o: ["Elderly", "Rich", "Strong"], a: "Elderly" },
    { u: "Unit3", q: "A 'Dream' is something you want to ______.", o: ["Achieve", "Forget", "Throw"], a: "Achieve" },
    { u: "Unit3", q: "Rights and ______ go together.", o: ["Duties", "Cakes", "Games"], a: "Duties" },
    { u: "Unit3", q: "Peace is better than ______.", o: ["War", "Food", "Sleep"], a: "War" },
    { u: "Unit3", q: "A ______ person works very hard.", o: ["Hardworking", "Lazy", "Slow"], a: "Hardworking" },
    { u: "Unit3", q: "Education is the ______ to success.", o: ["Key", "Door", "Box"], a: "Key" },
    { u: "Unit3", q: "We must ______ our culture.", o: ["Preserve", "Destroy", "Hate"], a: "Preserve" },
    { u: "Unit3", q: "To 'share' is to ______.", o: ["Give", "Take", "Keep"], a: "Give" },
    { u: "Unit3", q: "A ______ is a person who protects the country.", o: ["Soldier", "Tailor", "Cook"], a: "Soldier" },
    { u: "Unit3", q: "Civic values are taught at ______.", o: ["School", "The Moon", "The Sun"], a: "School" },
    { u: "Unit3", q: "I want to ______ my country.", o: ["Serve", "Leave", "Damage"], a: "Serve" },
    { u: "Unit3", q: "Tolerance means ______ others.", o: ["Accepting", "Fighting", "Ignoring"], a: "Accepting" },
    { u: "Unit3", q: "A 'Hero' is a ______ person.", o: ["Brave", "Coward", "Lazy"], a: "Brave" },
    { u: "Unit3", q: "School memories are ______.", o: ["Unforgettable", "Boring", "Sad"], a: "Unforgettable" },
    { u: "Unit3", q: "We should ______ trees.", o: ["Plant", "Cut", "Burn"], a: "Plant" },
    { u: "Unit3", q: "Poverty is a global ______.", o: ["Problem", "Game", "Sport"], a: "Problem" },
    { u: "Unit3", q: "An 'Orphan' has no ______.", o: ["Parents", "Toys", "Books"], a: "Parents" },
    { u: "Unit3", q: "I ______ my childhood friends.", o: ["Miss", "Hate", "Ignore"], a: "Miss" },
    { u: "Unit3", q: "A 'Law' is a ______.", o: ["Rule", "Song", "Meal"], a: "Rule" },
    { u: "Unit3", q: "Honesty is the best ______.", o: ["Policy", "Game", "Food"], a: "Policy" },
    { u: "Unit3", q: "I am ______ to be Algerian.", o: ["Proud", "Sad", "Scared"], a: "Proud" },
    { u: "Unit3", q: "Donating clothes is a good ______.", o: ["Deed", "Mistake", "Job"], a: "Deed" },
    { u: "Unit3", q: "Life is ______ of challenges.", o: ["Full", "Empty", "Short"], a: "Full" },
    { u: "Unit3", q: "I ______ to become an engineer.", o: ["Hope", "Fear", "Dislike"], a: "Hope" },
    { u: "Unit3", q: "Kindness costs ______.", o: ["Nothing", "Much", "Cash"], a: "Nothing" },
    { u: "Unit3", q: "A 'Neighbor' lives ______ you.", o: ["Near", "Inside", "Under"], a: "Near" },
    { u: "Unit3", q: "Equality means all people are ______.", o: ["Equal", "Different", "Rich"], a: "Equal" },
    { u: "Unit3", q: "To 'succeed', you must ______.", o: ["Study", "Sleep", "Play"], a: "Study" },
    { u: "Unit3", q: "I ______ my parents.", o: ["Love", "Fight", "Ignore"], a: "Love" },
    { u: "Unit3", q: "A 'Village' is ______ than a city.", o: ["Smaller", "Bigger", "Noisier"], a: "Smaller" },
    { u: "Unit3", q: "We should ______ animals.", o: ["Respect", "Kill", "Hurt"], a: "Respect" },
    { u: "Unit3", q: "A 'Citizen' has ______.", o: ["Rights", "Wings", "Tail"], a: "Rights" },
    { u: "Unit3", q: "Justice is ______ for all.", o: ["Fairness", "Money", "Hate"], a: "Fairness" }
];

let currentQs = []; let currIdx = 0; let corrects = 0; let wrongs = 0; let active = true;

function showHome() { 
    document.getElementById('quiz-overlay').style.display = 'none'; 
}

function startQuiz(unit) {
    const filtered = rawQuestionBank.filter(x => x.u === unit);
    currentQs = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    if(currentQs.length === 0) { alert("Coming Soon!"); return; }
    currIdx = 0; corrects = 0; wrongs = 0;
    document.getElementById('quiz-overlay').style.display = 'flex';
    render();
}

function render() {
    active = true;
    const q = currentQs[currIdx];
    document.getElementById('c-count').innerText = corrects;
    document.getElementById('w-count').innerText = wrongs;
    document.getElementById('t-count').innerText = `TASK ${currIdx + 1}/${currentQs.length}`;
    
    let html = q.t ? `<div class="paragraph-card"><p>${q.t}</p><span class="translation">${q.tr}</span></div>` : "";
    html += `<div class="question-text">${q.q}</div>`;
    
    const shuffled = [...q.o].sort(() => 0.5 - Math.random());
    html += shuffled.map(opt => `<button class="option-btn" onclick="check(this,'${opt}')">${opt}</button>`).join('');
    
    document.getElementById('quiz-box').innerHTML = html;
}

function check(btn, sel) {
    if(!active) return; 
    active = false;
    
    const cor = currentQs[currIdx].a;
    if(sel === cor) { 
        btn.classList.add('correct'); 
        corrects++; 
    } else { 
        btn.classList.add('wrong'); 
        wrongs++;
        // إظهار الإجابة الصحيحة
        document.querySelectorAll('.option-btn').forEach(b => { 
            if(b.innerText === cor) b.classList.add('correct'); 
        });
    }
    
    setTimeout(() => {
        if(currIdx < currentQs.length - 1) { 
            currIdx++; 
            render(); 
        } else { 
            finish(); 
        }
    }, 1200);
}

function finish() {
    document.getElementById('quiz-box').innerHTML = `
        <div style="text-align:center;">
            <h2 style="color:var(--gold-solid);">Finished!</h2>
            <p style="font-size:1.2rem;">Score: ${corrects} / ${currentQs.length}</p>
            <button class="option-btn" style="background:var(--gold-linear); color:black; font-weight:bold; text-align:center;" onclick="showHome()">BACK TO MENU</button>
        </div>`;
}
