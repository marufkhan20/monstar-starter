import * as Icon from "react-feather";

const SidebarData = [
  { caption: "Home" },
  {
    title: "Dashboard",
    href: "/",
    id: 1,
    suffixColor: "bg-info text-dark-white",
    icon: <Icon.Home />,
    collapisble: true,
  },
  { caption: "AI Content Creator Tools List" },
  {
    title: "Fitness Plan",
    href: "/apps/fitnessplan/fitnessplan",
    icon: <Icon.MessageCircle />,
    id: 2.1,
    collapisble: false,
  },
  {
    title: "Social Media Post",
    href: "/apps/socialmedia/socialmedia",
    icon: <Icon.MessageCircle />,
    id: 2.2,
    collapisble: false,
  },
  {
    title: "Essay Outliner",
    href: "/apps/essayoutliner/essayoutliner",
    icon: <Icon.MessageCircle />,
    id: 2.3,
    collapisble: false,
  },
  {
    title: "Movie Script",
    href: "/apps/moviescript/moviescript",
    icon: <Icon.MessageCircle />,
    id: 2.4,
    collapisble: false,
  },
  {
    title: "Service Calls",
    href: "/apps/servicecalls/servicecalls",
    icon: <Icon.MessageCircle />,
    id: 2.5,
    collapisble: false,
  },
  {
    title: "Group Event Email",
    href: "/apps/eventemail/eventemail",
    icon: <Icon.MessageCircle />,
    id: 2.7,
    collapisble: false,
  },
  {
    title: "Product Review",
    href: "/apps/productreview/productreview",
    icon: <Icon.MessageCircle />,
    id: 2.8,
    collapisble: false,
  },
  {
    title: "Slogan Creator",
    href: "/apps/slogancreator/slogancreator",
    icon: <Icon.MessageCircle />,
    id: 2.9,
    collapisble: false,
  },
  {
    title: "Book Review",
    href: "/apps/bookreview/bookreview",
    icon: <Icon.MessageCircle />,
    id: 3.0,
    collapisble: false,
  },
  {
    title: "Recruiter Response",
    href: "/apps/recruiterresponse/recruiterresponse",
    icon: <Icon.MessageCircle />,
    id: 3.1,
    collapisble: false,
  },
  { caption: "Color Customizer" },
  {
    title: "Profile Settings",
    href: "/auth",
    icon: <Icon.Lock />,
    id: 6.5,
    collapisble: true,
    children: [
      {
        title: "Logout",
        href: "/auth/loginformik",
        icon: <Icon.Disc />,
      },
      {
        title: "Register",
        href: "/auth/registerformik",
        icon: <Icon.Disc />,
      },
    ],
  },
];

export default SidebarData;
