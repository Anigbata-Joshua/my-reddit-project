import {
    Accessibility, BookOpenText, BriefcaseBusiness, CircleArrowOutUpRight,
    CircleQuestionMark, Clock3, Compass, Hexagon, Home, Languages, LucideMicVocal,
    Megaphone, Mic, MicVocal, MicVocalIcon, Newspaper, Plus, Rocket, User2Icon
} from "lucide-react";


export const sidebarLinks = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/popular", icon: <CircleArrowOutUpRight size={20} />, label: "Popular" },
    { to: "/news", icon: <Newspaper size={20} />, label: "News" },
    { to: "/explore", icon: <Compass size={20} />, label: "Explore" },
    { to: "/create-community", icon: <Plus size={20} />, label: "Start a community" }
];

export const resources = [
    { to: '#', label: "About Reddit", icon: <User2Icon size={20} /> },
    { to: '#', label: "Advertise", icon: <Megaphone size={20} /> },
    { to: '#', label: "Developer Platform ", icon: <Hexagon size={20} /> },
    { to: '#', label: "Reddit Pro", icon: <Clock3 size={20} /> },
    { to: '#', label: "Help", icon: <CircleQuestionMark size={20} /> },
    { to: '#', label: "Blog", icon: <BookOpenText size={20} /> },
    { to: '#', label: "Careers", icon: <BriefcaseBusiness size={20} /> },
    { to: '#', label: "Press", icon: <MicVocal size={20} /> },

];
export const resources2 = [
    { to: '#', label: "Best of Reddit", icon: <Rocket size={20} /> },
    { to: '#', label: "Best of Reddit in Portug...", icon: <Languages size={20} /> },
    { to: '#', label: "Best of Reddit in German", icon: <Languages size={20} /> },
];
export const resources3 = [
    { to: '#', label: "Reddit Rules", icon: <BookOpenText size={20} /> },
    { to: '#', label: "Privacy Policy", icon: <BookOpenText size={20} /> },
    { to: '#', label: "User Agreement", icon: <BookOpenText size={20} /> },
    { to: '#', label: "Accessibility", icon: <Accessibility size={20} /> },
];