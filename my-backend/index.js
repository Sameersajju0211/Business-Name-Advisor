const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

// Existing prefixes and suffixes
const styleBasedPrefixes = {
    "Tech": [
        "Byte", "Nano", "Cyber", "Techno", "Sys", "Techify", "Giga", "Future", "Aero", "Evo", 
        "Opti", "Vortex", "Data", "Electro", "Robo", "Info", "Logic"
    ],
    "Health": [
        "Well", "Nutrient", "Healthify", "Active", "Vigor", "Pure", "Smart", "Thrive", "Fit", 
        "Vitality", "Nature", "Bloom", "Glow", "Medi", "Bio", "Nutra"
    ],
    "Toy": [
        "Wonder", "Magic", "Bright", "Adventure", "Creative", "Mini", "Imagination", "Happy", 
        "Fantasy", "Dream", "Giggles", "Kiddo", "FunTime", "Joyful", "Pint-sized", "Playful"
    ],
    "Mobile Shop": [
        "Smart", "Quick", "Techie", "Cellular", "Fast", "Connect", "MobileX", "MobileTech", 
        "On-the-Go", "Rapid", "Instant", "Direct", "Wireless", "Gadget", "Device", "Fone"
    ],
    "Food & Beverage": [
        "Tasty", "Savor", "Bite", "Harvest", "Farm", "Homegrown", "Delectable", "Sweet", 
        "Artisan", "Flavorful", "Gourmet", "Nourish", "Sizzle", "Nosh", "Delish", "Crave"
    ],
    "Fitness": [
        "Well", "Active", "Peak", "Endure", "Body", "Fit", "Dynamic", "Power", "Flex", 
        "Pure", "Energize", "Tone", "Elevate", "Vital", "Core", "Zenith"
    ],
    "Fashion": [
        "Trend", "Classic", "Chic", "Sleek", "Glam", "Style", "Vogue", "Couture", "Posh", 
        "Dapper", "Urban", "Elegant", "Haute", "Fabulous", "Flash", "Runway"
    ],
    "Education": [
        "Scholar", "Tutor", "Academy", "Mentor", "Skill", "Bright", "Cognitive", "Learning", 
        "Instruct", "Future", "Mind", "Wise", "Creative", "Path", "Achieve", "Innovate"
    ],
    "Real Estate": [
        "Urban", "Premier", "Estate", "Legacy", "Sky", "Property", "Home", "Venture", 
        "Nest", "Haven", "Village", "Lot", "Dwelling", "Vista", "Domain", "Landmark"
    ],
    "Travel": [
        "Journey", "Wander", "Explore", "Nomad", "Advent", "Odyssey", "Voyage", "Roam", 
        "Quest", "Trail", "Getaway", "Excursion", "Discovery", "Escape", "Globetrotter", "Trip"
    ],
    "E-commerce": [
        "Market", "Trade", "Commerce", "Shop", "Select", "Click", "Deal", "Basket", 
        "Find", "Fetch", "Bargain", "Outlet", "Cart", "Bazaar", "Hub", "Connection"
    ],
    "Finance": [
        "Asset", "Secure", "Fortune", "Wealth", "Capital", "Trust", "Prime", "Strategic", 
        "Invest", "Prosper", "Income", "Growth", "Economy", "Cash", "Funds", "Risk"
    ],
    "Entertainment": [
        "Media", "Spectacle", "Showtime", "Fun", "Vibe", "Epic", "Joy", "Fusion", 
        "Stream", "Star", "Cine", "Buzz", "Performance", "Gather", "Act", "Event"
    ],
    "Consulting": [
        "Insight", "Strategic", "Guide", "Tactica", "Advisory", "Visionary", "Compass", 
        "Elevate", "Pinnacle", "Elite", "Pathway", "Collaborate", "Dynamic", "Synergy", "Focus"
    ],
    "Gaming": [
        "Quest", "Pixel", "Epic", "GameOn", "Arena", "Hero", "Champion", "Play", 
        "LevelUp", "Gamer", "Byte", "Ninja", "Boss", "Pixelated", "Adventure", "Realm"
    ],
};


const styleBasedSuffixes = {
    "Tech": [
        "Lab", "Group", "Solutions", "Hub", "Corp", "Dynamics", "Innovations", "Sphere", 
        "Networks", "Center", "Systems", "Hive", "Forge", "Collective", "Point", "Zone"
    ],
    "Health": [
        "Hub", "Wellness", "Care", "Vitality", "Life", "Fit", "Cure", "Zone", 
        "Therapy", "Clinic", "Solutions", "Sphere", "Nest", "Essence", "Balance", "Nurture"
    ],
    "Toy": [
        "Land", "World", "Zone", "Space", "Nest", "Workshop", "Galaxy", "Hub", 
        "Realm", "Market", "Wonderland", "Craft", "Playhouse", "Paradise", "Village", "Park"
    ],
    "Mobile Shop": [
        "Center", "Depot", "Store", "Mart", "Hub", "World", "Base", 
        "Express", "Place", "Solutions", "Tech", "Zone", "Market", "Supply", "City", "Network"
    ],
    "Food & Beverage": [
        "Market", "Café", "Bistro", "Kitchen", "Bar", "Spot", "House", 
        "Diner", "Corner", "Haven", "Table", "Delights", "Craft", "Hub", "Joint", "Place"
    ],
    "Fitness": [
        "Club", "Zone", "Hub", "Center", "Academy", "Force", "Lab", 
        "Arena", "Studio", "Workshop", "Network", "Institute", "Core", "Path", "Collective", "Pro"
    ],
    "Fashion": [
        "Boutique", "House", "Lab", "Style", "Market", "Couture", 
        "Trends", "Shop", "Collective", "Corner", "Essence", "Way", "Lane", "Edge", "Culture"
    ],
    "Education": [
        "Center", "Academy", "Solutions", "Pathway", "Focus", "Institute", 
        "Sphere", "Academia", "Innovations", "Insight", "Hub", "Corner", "Place", "Zone", "Co."
    ],
    "Real Estate": [
        "Partners", "Group", "Solutions", "Hub", "Network", "Consultants", 
        "Pros", "Land", "Estates", "Advisors", "Services", "Experts", "Team", "Collective", "House"
    ],
    "Travel": [
        "Tours", "Company", "Services", "Group", "Adventures", "Journeys", 
        "Nexus", "Spot", "Escape", "Haven", "Expedition", "Collective", "Atlas", "Way", "World"
    ],
    "E-commerce": [
        "Market", "Zone", "Store", "Hub", "Depot", "Warehouse", "Cart", 
        "Shop", "Exchange", "Point", "Deals", "Outlet", "Bazaar", "Connection", "Center", "Point"
    ],
    "Finance": [
        "Advisors", "Partners", "Group", "Consultants", "Hub", "Solutions", 
        "Trust", "Collective", "Academy", "Network", "Bank", "Wealth", "Invest", "Zone", "Lab"
    ],
    "Entertainment": [
        "Studios", "Collective", "Events", "Media", "Productions", "Hub", 
        "Vision", "Industry", "Network", "Sphere", "Realm", "Epic", "Works", "Circuit", "Vibe"
    ],
    "Consulting": [
        "Partners", "Collective", "Group", "Insight", "Solutions", "Firm", 
        "Edge", "Services", "Strategists", "Consult", "Advisors", "Alliance", "Experts", "Vision"
    ],
    "Gaming": [
        "Arena", "World", "Collective", "Empire", "Guild", "Hub", 
        "Nexus", "Verse", "Realm", "Play", "Quest", "Society", "Forge", "Camp", "Saga"
    ],
};


function generateBusinessName(category, style, randomness) {
    const prefixes = styleBasedPrefixes[category] || [];
    const suffixes = styleBasedSuffixes[category] || [];
    
    if (prefixes.length === 0 || suffixes.length === 0) {
        return ['Invalid category'];
    }

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    let name;

    // Name styles based on the selected style
    switch(style) {
        case 'Brandable':
            name = `${randomPrefix} ${randomSuffix}`;
            break;
        case 'Evocative':
            name = `The ${randomPrefix} ${randomSuffix}`;
            break;
        case 'ShortPhrase':
            name = `${randomPrefix} & ${randomSuffix}`;
            break;
        case 'CompoundWords':
            name = `${randomPrefix}${randomSuffix}`;
            break;
        case 'AlternateSpelling':
            name = randomPrefix.replace(/[aeiou]/g, (c) => (c === 'a' ? 'e' : c === 'e' ? 'i' : c === 'i' ? 'o' : c === 'o' ? 'u' : 'a')) + randomSuffix;
            break;
        case 'Non-EnglishWords':
            name = `${randomPrefix}é`;
            break;
        case 'RealWords':
            name = `${randomPrefix} ${randomSuffix}`;
            break;
        default:
            name = `${randomPrefix} ${randomSuffix}`;
    }

    // Add randomness only for specific styles, excluding 'Brandable' and 'RealWords'
    if (randomness === 'Low') {
        name = `${randomPrefix} ${randomSuffix}`; // Direct combination
    } else if (randomness === 'Medium') {
        // Add a twist by using an alternate prefix from another category
        const alternateCategory = Object.keys(styleBasedPrefixes).filter(cat => cat !== category);
        const randomAlternateCategory = alternateCategory[Math.floor(Math.random() * alternateCategory.length)];
        const alternatePrefix = styleBasedPrefixes[randomAlternateCategory][Math.floor(Math.random() * styleBasedPrefixes[randomAlternateCategory].length)];
        name = `${randomPrefix} ${randomSuffix}`; // Adding an alternate prefix
    } else if (randomness === 'High') {
        // Generate a name with more varied combinations
        const mixedPrefix = `${randomPrefix}${randomSuffix}`; // Combine without space
        const randomAddOn = Math.random() < 0.5 ? ` ${randomSuffix}` : ` ${randomPrefix}`; // Randomly add a suffix or prefix
        name = `${mixedPrefix}`; // Combine to form a high-randomness name
    }

    return name; // Return the generated name
}

app.get('/generate-name', (req, res) => {
    const { category, numNames, style, randomness } = req.query;

    const count = parseInt(numNames, 10) || 1;
    const names = [];
    
    for (let i = 0; i < count; i++) {
        names.push(generateBusinessName(category, style, randomness));
    }

    res.json({ names });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
