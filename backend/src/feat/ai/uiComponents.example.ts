export const uiComponents = [
    {
        "componentId": "button-01",
        "name": "Primary Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["submit", "form", "cta", "primary", "confirm"],
        "description": "Used for the main call-to-action on a page. It should be used for the most important, positive action.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["solid", "filled", "minimalist"],
        "code": {
            "tailwind": "<button class=\"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out\">Primary Action</button>"
        }
    },
    {
        "componentId": "button-02",
        "name": "Secondary Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["secondary", "alternative", "action"],
        "description": "Used for secondary actions that are less important than the primary one. Often used for 'cancel' or 'go back' options.",
        "category": "Action",
        "uxPattern": "Alternative Action",
        "visualStyle": ["outline", "minimalist"],
        "code": {
            "tailwind": "<button class=\"bg-transparent hover:bg-gray-100 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded transition duration-300 ease-in-out\">Secondary Action</button>"
        }
    },
    {
        "componentId": "button-03",
        "name": "Destructive Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["delete", "remove", "destructive", "danger"],
        "description": "Used for actions that cause a permanent or significant data loss, such as deleting an item. The red color warns the user.",
        "category": "Action",
        "uxPattern": "Destructive Operation",
        "visualStyle": ["solid", "warning", "filled"],
        "code": {
            "tailwind": "<button class=\"bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out\">Delete</button>"
        }
    },
    {
        "componentId": "button-04",
        "name": "Ghost Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["subtle", "minimal", "ghost", "tertiary"],
        "description": "A very low-emphasis button, often used for tertiary actions. It has no border or background until hovered.",
        "category": "Action",
        "uxPattern": "Tertiary Action",
        "visualStyle": ["minimalist", "transparent"],
        "code": {
            "tailwind": "<button class=\"bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded transition duration-300 ease-in-out\">Learn More</button>"
        }
    },
    {
        "componentId": "button-05",
        "name": "Pill Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["pill", "rounded", "tag", "filter"],
        "description": "A button with fully rounded corners, often used for tags, filters, or less formal actions.",
        "category": "Filter",
        "uxPattern": "Tag",
        "visualStyle": ["rounded", "soft"],
        "code": {
            "tailwind": "<button class=\"bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out\">Accept</button>"
        }
    },
    {
        "componentId": "button-06",
        "name": "Button with Leading Icon",
        "sourceDesignSystem": "Tailwind",
        "tags": ["icon", "action", "leading-icon"],
        "description": "A standard button with an icon placed before the text to provide a quick visual cue about the button's action.",
        "category": "Action",
        "uxPattern": "Iconography",
        "visualStyle": ["solid", "iconic"],
        "code": {
            "tailwind": "<button class=\"bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out\"><svg class=\"fill-current w-4 h-4 mr-2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\"><path d=\"M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z\"/></svg><span>Download</span></button>"
        }
    },
    {
        "componentId": "button-07",
        "name": "Disabled Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["disabled", "inactive", "form"],
        "description": "A button in a disabled state, indicating it cannot be clicked. Often used in forms before validation is complete.",
        "category": "State",
        "uxPattern": "Progressive Disclosure",
        "visualStyle": ["disabled", "muted"],
        "code": {
            "tailwind": "<button class=\"bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed\" disabled>Submit</button>"
        }
    },
    {
        "componentId": "button-08",
        "name": "3D Push Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["3d", "cta", "interactive", "push"],
        "description": "A button with a bottom border that creates a 3D effect. The active state makes it look like it's being pushed down.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["3d", "skeuomorphic"],
        "code": {
            "tailwind": "<button class=\"bg-indigo-500 text-white font-bold py-2 px-4 rounded border-b-4 border-indigo-700 hover:border-indigo-500 hover:bg-indigo-400 active:translate-y-px active:border-b-2\">Click Me</button>"
        }
    },
    {
        "componentId": "button-09",
        "name": "Gradient Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["gradient", "cta", "modern"],
        "description": "A visually appealing button with a gradient background. Moves from one color to another.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["gradient", "vibrant"],
        "code": {
            "tailwind": "<button class=\"bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300\">Sign Up</button>"
        }
    },
    {
        "componentId": "button-10",
        "name": "Icon Only Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["icon", "minimal", "action", "settings"],
        "description": "A button that contains only an icon, without any text. Used for common actions in compact UIs, like settings or closing a modal.",
        "category": "Navigation",
        "uxPattern": "Iconography",
        "visualStyle": ["minimalist", "iconic"],
        "code": {
            "tailwind": "<button class=\"bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded-full transition duration-300 ease-in-out\" aria-label=\"Settings\"><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\"></path><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\"></path></svg></button>"
        }
    }, {
        "componentId": "button-11",
        "name": "Success Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["success", "confirm", "complete", "save"],
        "description": "Indicates a successful or positive action, like completing a form or saving changes. Typically green.",
        "category": "Action",
        "uxPattern": "Confirmation",
        "visualStyle": ["solid", "positive", "filled"],
        "code": {
            "tailwind": "<button class=\"bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out\">Save Changes</button>"
        }
    },
    {
        "componentId": "button-12",
        "name": "Warning Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["warning", "caution", "alert"],
        "description": "For actions that require user caution but are not necessarily destructive, like archiving an item instead of deleting it.",
        "category": "Action",
        "uxPattern": "Cautionary Action",
        "visualStyle": ["solid", "warning"],
        "code": {
            "tailwind": "<button class=\"bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out\">Archive</button>"
        }
    },
    {
        "componentId": "button-13",
        "name": "Link Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["link", "inline", "text-button"],
        "description": "A button styled to look like a hyperlink. Useful for actions that are secondary and exist within or alongside text content.",
        "category": "Navigation",
        "uxPattern": "Inline Action",
        "visualStyle": ["minimalist", "text-based"],
        "code": {
            "tailwind": "<button class=\"bg-transparent text-blue-500 hover:underline font-semibold py-2 px-1\">Go to Settings</button>"
        }
    },
    {
        "componentId": "button-14",
        "name": "Loading Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["loading", "spinner", "form", "submitting"],
        "description": "A button that shows a loading spinner to indicate that a process is running in the background after being clicked.",
        "category": "State",
        "uxPattern": "Asynchronous Feedback",
        "visualStyle": ["disabled", "iconic"],
        "code": {
            "tailwind": "<button type=\"button\" class=\"bg-indigo-500 text-white font-bold py-2 px-4 rounded inline-flex items-center\" disabled><svg class=\"animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"><circle class=\"opacity-25\" cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"4\"></circle><path class=\"opacity-75\" fill=\"currentColor\" d=\"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z\"></path></svg>Processing...</button>"
        }
    },
    {
        "componentId": "button-15",
        "name": "Social Media Button - Twitter",
        "sourceDesignSystem": "Tailwind",
        "tags": ["social", "twitter", "login", "share"],
        "description": "A branded button for Twitter actions, such as 'Login with Twitter' or 'Share on Twitter'.",
        "category": "Login",
        "uxPattern": "Social Login",
        "visualStyle": ["branded", "iconic"],
        "code": {
            "tailwind": "<button class=\"bg-[#1DA1F2] hover:bg-[#0c85d0] text-white font-bold py-2 px-4 rounded inline-flex items-center\"><svg class=\"fill-current w-5 h-5 mr-2\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.523 3.379 4.752 3.419a9.89 9.89 0 01-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.963 13.963 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.213 0-.425-.015-.637A9.954 9.954 0 0024 4.59z\"/></svg><span>Share on Twitter</span></button>"
        }
    },
    {
        "componentId": "button-16",
        "name": "Full-Width Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["full-width", "block", "responsive", "cta"],
        "description": "A button that expands to the full width of its parent container. Commonly used in mobile views or in modals.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["solid", "block"],
        "code": {
            "tailwind": "<button class=\"bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded w-full\">Proceed to Checkout</button>"
        }
    },
    {
        "componentId": "button-17",
        "name": "Button with Trailing Icon",
        "sourceDesignSystem": "Tailwind",
        "tags": ["icon", "action", "trailing-icon"],
        "description": "A button with an icon placed after the text, often a chevron or arrow to indicate moving forward or navigation.",
        "category": "Navigation",
        "uxPattern": "Forward Navigation",
        "visualStyle": ["solid", "iconic"],
        "code": {
            "tailwind": "<button class=\"bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out\"><span>Continue</span><svg class=\"fill-current w-4 h-4 ml-2\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\"><path d=\"M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z\"/></svg></button>"
        }
    },
    {
        "componentId": "button-18",
        "name": "Neumorphic Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["neumorphic", "soft-ui", "3d"],
        "description": "A button designed with the neumorphism style, creating a soft, extruded look from the background.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["neumorphic", "soft"],
        "code": {
            "tailwind": "<button class=\"bg-gray-100 text-gray-700 font-semibold py-2 px-6 rounded-lg shadow-[7px_7px_15px_#bebebe,_-7px_-7px_15px_#ffffff] active:shadow-[inset_7px_7px_15px_#bebebe,_inset_-7px_-7px_15px_#ffffff] transition-all duration-150\">Neumorphic</button>"
        }
    },
    {
        "componentId": "button-19",
        "name": "Glassmorphism Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["glass", "glassmorphism", "blur", "modern"],
        "description": "A button that mimics frosted glass, using a semi-transparent background and a backdrop blur.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["glassmorphic", "transparent", "modern"],
        "code": {
            "tailwind": "<button class=\"bg-white/30 backdrop-blur-md text-white font-bold py-2 px-4 rounded-lg border border-white/20 shadow-lg hover:bg-white/40 transition-all duration-300\">Glass Button</button>"
        }
    },
    {
        "componentId": "button-20",
        "name": "Brutalist Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["brutalist", "sharp", "edgy"],
        "description": "A button with a brutalist aesthetic, characterized by sharp corners, a solid border, and a shadow that doesn't blur.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["brutalist", "minimalist", "retro"],
        "code": {
            "tailwind": "<button class=\"bg-yellow-300 text-black font-bold py-2 px-4 border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all\">Get Started</button>"
        }
    },
    {
        "componentId": "button-21",
        "name": "Pill Outline Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["pill", "rounded", "tag", "filter", "outline"],
        "description": "An outline-style button with fully rounded corners, combining the pill shape with a lighter secondary style.",
        "category": "Filter",
        "uxPattern": "Tag",
        "visualStyle": ["rounded", "soft", "outline"],
        "code": {
            "tailwind": "<button class=\"bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-full transition-all duration-300\">Category</button>"
        }
    },
    {
        "componentId": "button-22",
        "name": "Split Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["split", "dropdown", "actions"],
        "description": "A composite component with a primary action button and an attached secondary button that reveals a dropdown of more options.",
        "category": "Action",
        "uxPattern": "Split Button",
        "visualStyle": ["composite", "functional"],
        "code": {
            "tailwind": "<div class=\"inline-flex rounded-md shadow-sm\"><button class=\"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-md transition duration-300\">Save</button><button class=\"bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-r-md border-l border-blue-400\"><svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\" /></svg></button></div>"
        }
    },
    {
        "componentId": "button-23",
        "name": "Raised Button with Shadow",
        "sourceDesignSystem": "Tailwind",
        "tags": ["raised", "shadow", "material", "cta"],
        "description": "A standard button with a subtle shadow that becomes more pronounced on hover, making it feel like it's lifting off the page.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["material", "shadow"],
        "code": {
            "tailwind": "<button class=\"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-150\">Read More</button>"
        }
    },
    {
        "componentId": "button-24",
        "name": "Underline Hover Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["minimal", "subtle", "text"],
        "description": "An extremely subtle button, typically just text, that reveals an underline on hover to indicate interactivity.",
        "category": "Navigation",
        "uxPattern": "Inline Action",
        "visualStyle": ["minimalist", "text-based"],
        "code": {
            "tailwind": "<button class=\"bg-transparent text-gray-600 py-2 px-1 hover:text-black decoration-2 hover:underline underline-offset-4\">Skip this step</button>"
        }
    },
    {
        "componentId": "button-25",
        "name": "Color Fill Animation Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["animated", "hover", "effect", "cta"],
        "description": "An outline button where the background color animates, filling up the button on hover.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["animated", "outline"],
        "code": {
            "tailwind": "<button class=\"relative inline-block px-6 py-2 font-medium text-blue-600 border border-blue-600 rounded-md group hover:text-white transition-colors duration-300\"><span class=\"absolute inset-0 w-full h-full transition-all duration-300 ease-out transform scale-x-0 bg-blue-600 group-hover:scale-x-100 origin-left\"></span><span class=\"relative\">Animate Fill</span></button>"
        }
    },
    {
        "componentId": "button-26",
        "name": "Toggle Button (On)",
        "sourceDesignSystem": "Tailwind",
        "tags": ["toggle", "active", "state", "filter"],
        "description": "Represents a button in an 'on' or 'active' state, such as a selected filter. Provides strong visual feedback of its state.",
        "category": "Filter",
        "uxPattern": "Toggle Switch",
        "visualStyle": ["solid", "active-state"],
        "code": {
            "tailwind": "<button class=\"bg-indigo-600 text-white font-semibold py-2 px-4 border border-indigo-600 rounded-lg shadow-inner\" aria-pressed=\"true\">Notifications On</button>"
        }
    },
    {
        "componentId": "button-27",
        "name": "Toggle Button (Off)",
        "sourceDesignSystem": "Tailwind",
        "tags": ["toggle", "inactive", "state", "filter"],
        "description": "Represents a button in an 'off' or 'inactive' state. The companion to the active toggle button.",
        "category": "Filter",
        "uxPattern": "Toggle Switch",
        "visualStyle": ["outline", "inactive-state"],
        "code": {
            "tailwind": "<button class=\"bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg\" aria-pressed=\"false\">Notifications Off</button>"
        }
    },
    {
        "componentId": "button-28",
        "name": "Animated Border Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["animated", "hover", "border", "cta"],
        "description": "A button with a creative animated border effect that appears or moves on hover, drawing attention to the action.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["animated", "minimalist"],
        "code": {
            "tailwind": "<button class=\"relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500\"><span class=\"relative px-5 py-2.5 transition-all ease-in duration-150 bg-white group-hover:bg-opacity-0 rounded-md\">Get Started</span></button>"
        }
    },
    {
        "componentId": "button-29",
        "name": "Social Media Button - GitHub",
        "sourceDesignSystem": "Tailwind",
        "tags": ["social", "github", "login", "code"],
        "description": "A branded button for GitHub actions, like 'Sign in with GitHub' or 'View on GitHub'.",
        "category": "Login",
        "uxPattern": "Social Login",
        "visualStyle": ["branded", "iconic"],
        "code": {
            "tailwind": "<button class=\"bg-[#333] hover:bg-[#444] text-white font-bold py-2 px-4 rounded inline-flex items-center\"><svg class=\"fill-current w-5 h-5 mr-2\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z\"></path></svg><span>View on GitHub</span></button>"
        }
    },
    {
        "componentId": "button-30",
        "name": "Soft Shadow Button",
        "sourceDesignSystem": "Tailwind",
        "tags": ["soft-ui", "shadow", "subtle", "cta"],
        "description": "A button with a very soft, diffused shadow that provides depth without being as pronounced as a standard material design shadow.",
        "category": "Action",
        "uxPattern": "Call to Action",
        "visualStyle": ["soft", "minimalist", "shadow"],
        "code": {
            "tailwind": "<button class=\"bg-white text-gray-700 font-medium py-2 px-5 rounded-lg shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-shadow duration-300\">Book a Demo</button>"
        }
    }
]

export const moreComponents = [
    {
        "componentId": "accordion-01",
        "name": "Simple Accordion",
        "sourceDesignSystem": "Tailwind",
        "tags": ["faq", "toggle", "content"],
        "description": "A standard, clean accordion for hiding and showing content. Uses a subtle background change on hover and a smooth transition for the panel.",
        "category": "Content",
        "uxPattern": "Accordion",
        "visualStyle": ["minimalist", "clean"],
        "code": {
            "html": "<div class=\"w-full max-w-md mx-auto font-sans\">\n  <div x-data=\"{ open: false }\">\n    <h2>\n      <button type=\"button\" @click=\"open = !open\" class=\"flex items-center justify-between w-full p-4 font-semibold text-left text-gray-700 bg-gray-100 rounded-t-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300\">\n        <span>What is Tailwind CSS?</span>\n        <svg class=\"w-5 h-5 shrink-0 transition-transform duration-300\" :class=\"{ 'rotate-180': open }\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\">\n          <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m19.5 8.25-7.5 7.5-7.5-7.5\" />\n        </svg>\n      </button>\n    </h2>\n    <div x-show=\"open\" x-transition:enter=\"transition ease-out duration-300\" x-transition:enter-start=\"opacity-0 -translate-y-2\" x-transition:enter-end=\"opacity-100 translate-y-0\" x-transition:leave=\"transition ease-in duration-200\" x-transition:leave-start=\"opacity-100 translate-y-0\" x-transition:leave-end=\"opacity-0 -translate-y-2\" class=\"p-4 text-gray-600 bg-white border border-t-0 border-gray-200 rounded-b-lg\">\n      <p>Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.</p>\n    </div>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "accordion-02",
        "name": "Border-Accent Accordion",
        "sourceDesignSystem": "Tailwind",
        "tags": ["faq", "questions", "info"],
        "description": "An accordion that adds a colored border to the left of the header when opened, providing a clear visual indicator of the active item.",
        "category": "Content",
        "uxPattern": "Accordion",
        "visualStyle": ["modern", "accented"],
        "code": {
            "html": "<div class=\"w-full max-w-md mx-auto font-sans space-y-2\">\n  <div x-data=\"{ open: false }\" class=\"border border-gray-200 rounded-md shadow-sm\">\n    <button @click=\"open = !open\" class=\"w-full flex justify-between items-center p-4 text-gray-800 transition-all duration-300 focus:outline-none\" :class=\"{ 'bg-violet-50 border-l-4 border-violet-500': open, 'hover:bg-gray-50': !open }\">\n      <span class=\"font-medium\">How do I install Alpine.js?</span>\n      <svg class=\"w-5 h-5 text-gray-500 transform transition-transform duration-300\" :class=\"{ '-rotate-180': open }\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\" />\n      </svg>\n    </button>\n    <div x-show=\"open\" x-collapse class=\"p-4 pt-0 text-gray-600\">\n      <p>You can include Alpine.js by adding a script tag to the end of your `<head>` section. It's lightweight and easy to get started with!</p>\n    </div>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "accordion-03",
        "name": "Plus/Minus Icon Accordion",
        "sourceDesignSystem": "Tailwind",
        "tags": ["faq", "toggle", "details"],
        "description": "Uses plus and minus icons to indicate the collapsed and expanded states, respectively. A common and intuitive UX pattern.",
        "category": "Content",
        "uxPattern": "Accordion",
        "visualStyle": ["corporate", "clean"],
        "code": {
            "html": "<div class=\"w-full max-w-lg mx-auto font-sans divide-y divide-gray-200\">\n  <div x-data=\"{ open: false }\">\n    <h3>\n      <button @click=\"open = !open\" class=\"group flex justify-between items-center w-full py-4 text-left text-lg font-semibold text-gray-800 hover:text-blue-600 focus:outline-none\">\n        <span>Why use a design system?</span>\n        <div class=\"relative w-6 h-6 flex items-center justify-center\">\n          <span class=\"absolute w-4 h-0.5 bg-gray-500 group-hover:bg-blue-600 transition-all duration-300\" :class=\"{ 'rotate-90': open }\"></span>\n          <span class=\"absolute w-4 h-0.5 bg-gray-500 group-hover:bg-blue-600 transition-all duration-300\"></span>\n        </div>\n      </button>\n    </h3>\n    <div x-show=\"open\" x-transition class=\"pb-4 pr-10 text-gray-600\">\n      <p>A design system ensures consistency, speeds up development, improves collaboration between designers and developers, and enhances the overall user experience by providing a unified and predictable interface.</p>\n    </div>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "accordion-04",
        "name": "Contained Accordion",
        "sourceDesignSystem": "Tailwind",
        "tags": ["faq", "help", "support"],
        "description": "A styled accordion where each item is a distinct, contained unit with a box shadow, creating separation between questions.",
        "category": "Content",
        "uxPattern": "Accordion",
        "visualStyle": ["card", "shadow"],
        "code": {
            "html": "<div class=\"w-full max-w-md mx-auto font-sans space-y-4\">\n  <div x-data=\"{ open: false }\" class=\"bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300\">\n    <button @click=\"open = !open\" class=\"w-full p-5 flex justify-between items-center text-left text-gray-700 focus:outline-none\">\n      <span class=\"text-md font-medium\">Can I customize Tailwind's theme?</span>\n      <svg class=\"w-6 h-6 text-gray-400 transform transition-transform duration-300\" :class=\"{ 'rotate-45': open }\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 4.5v15m7.5-7.5h-15\" />\n      </svg>\n    </button>\n    <div x-show=\"open\" x-collapse class=\"px-5 pb-5 text-gray-500\">\n      <p>Yes, absolutely. The `tailwind.config.js` file is where you can customize everything, from your color palette and spacing scale to fonts and breakpoints.</p>\n    </div>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "accordion-05",
        "name": "Nested Accordion",
        "sourceDesignSystem": "Tailwind",
        "tags": ["nested", "complex", "faq"],
        "description": "An accordion that contains another accordion within its panel, useful for organizing complex, hierarchical information.",
        "category": "Content",
        "uxPattern": "Accordion",
        "visualStyle": ["hierarchical", "detailed"],
        "code": {
            "html": "<div class=\"w-full max-w-xl mx-auto p-4 bg-slate-50 rounded-lg font-sans\">\n  <div x-data=\"{ open: false }\" class=\"border-b border-slate-200\">\n    <button @click=\"open = !open\" class=\"w-full flex justify-between items-center p-3 hover:bg-slate-100 focus:outline-none\">\n      <span class=\"font-bold text-slate-800\">Level 1: General Settings</span>\n      <span class=\"text-xl text-slate-500 transition-transform\" :class=\"{'-rotate-90': !open}\">›</span>\n    </button>\n    <div x-show=\"open\" x-collapse class=\"px-3 pb-3\">\n      <p class=\"text-slate-600 mb-3\">Manage general application settings here.</p>\n      \n      <div x-data=\"{ nestedOpen: false }\" class=\"border-t border-slate-200 pt-2\">\n        <button @click=\"nestedOpen = !nestedOpen\" class=\"w-full flex justify-between items-center p-2 text-sm hover:bg-slate-200 rounded focus:outline-none\">\n          <span class=\"font-semibold text-slate-700\">Level 2: Advanced Options</span>\n          <span class=\"text-lg text-slate-500 transition-transform\" :class=\"{'-rotate-90': !nestedOpen}\">›</span>\n        </button>\n        <div x-show=\"nestedOpen\" x-collapse class=\"px-2 pb-2 mt-1 text-sm text-slate-500\">\n          <p>Here are more granular options for power users. Be careful!</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"
        }
    },

    {
        "componentId": "alert-01",
        "name": "Success Alert with Icon",
        "sourceDesignSystem": "Tailwind",
        "tags": ["notification", "success", "feedback"],
        "description": "A success alert with a prominent icon and a colored background to confirm a user's action was completed successfully.",
        "category": "Feedback",
        "uxPattern": "Alert",
        "visualStyle": ["positive", "icon-driven"],
        "code": {
            "html": "<div role=\"alert\" class=\"w-full max-w-lg p-4 flex items-center space-x-4 bg-green-50 border border-green-200 rounded-lg shadow-sm\">\n  <div class=\"flex-shrink-0\">\n    <svg class=\"w-6 h-6 text-green-500\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\" />\n    </svg>\n  </div>\n  <div>\n    <p class=\"font-semibold text-green-800\">Profile Updated!</p>\n    <p class=\"text-sm text-green-700\">Your changes have been saved successfully.</p>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "alert-02",
        "name": "Dismissible Warning Alert",
        "sourceDesignSystem": "Tailwind",
        "tags": ["warning", "dismiss", "attention"],
        "description": "A warning alert that can be dismissed by the user. Includes an 'x' button and a subtle animation on removal.",
        "category": "Feedback",
        "uxPattern": "Alert",
        "visualStyle": ["interactive", "cautionary"],
        "code": {
            "html": "<div x-data=\"{ show: true }\" x-show=\"show\" x-transition:leave=\"transition ease-in duration-300\" x-transition:leave-start=\"opacity-100 translate-x-0\" x-transition:leave-end=\"opacity-0 translate-x-8\" role=\"alert\" class=\"w-full max-w-lg flex items-center justify-between p-4 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400\">\n  <div class=\"flex items-center\">\n    <svg class=\"w-6 h-6 mr-3 text-yellow-500\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z\" />\n    </svg>\n    <span>Your trial period is ending in 3 days.</span>\n  </div>\n  <button @click=\"show = false\" class=\"p-1 rounded-full hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400\">\n    <svg class=\"w-4 h-4\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n      <path d=\"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z\" clip-rule=\"evenodd\" fill-rule=\"evenodd\"></path>\n    </svg>\n  </button>\n</div>"
        }
    },
    {
        "componentId": "alert-03",
        "name": "Error Alert with Title",
        "sourceDesignSystem": "Tailwind",
        "tags": ["error", "failure", "critical"],
        "description": "A high-priority error alert with a distinct color, icon, and a bolded title to draw immediate user attention to a critical issue.",
        "category": "Feedback",
        "uxPattern": "Alert",
        "visualStyle": ["bold", "critical"],
        "code": {
            "html": "<div role=\"alert\" class=\"w-full max-w-lg p-4 text-red-800 bg-red-100 border border-red-300 rounded-md\">\n  <div class=\"flex items-start space-x-3\">\n    <div class=\"flex-shrink-0\">\n      <svg class=\"w-5 h-5 text-red-500\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\" />\n      </svg>\n    </div>\n    <div class=\"flex-1\">\n      <h3 class=\"font-bold text-md\">Submission Failed</h3>\n      <p class=\"text-sm mt-1\">Please check the fields for errors and try again. The 'Email' field seems to be invalid.</p>\n    </div>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "alert-04",
        "name": "Info Alert with Actions",
        "sourceDesignSystem": "Tailwind",
        "tags": ["info", "actions", "cta"],
        "description": "An informational alert that includes action buttons, prompting the user to take a next step, such as viewing details or dismissing.",
        "category": "Feedback",
        "uxPattern": "Alert",
        "visualStyle": ["actionable", "modern"],
        "code": {
            "html": "<div role=\"alert\" class=\"w-full max-w-lg p-5 bg-blue-50 border-t-4 border-blue-400 rounded-b shadow-md font-sans\">\n  <div class=\"flex items-start\">\n    <svg class=\"w-6 h-6 mr-4 text-blue-500\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.852l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z\" />\n    </svg>\n    <div class=\"flex-grow\">\n      <p class=\"font-semibold text-blue-900\">New Feature Available</p>\n      <p class=\"text-sm text-blue-800 mt-1\">We've launched a new dashboard view. Explore it now!</p>\n      <div class=\"mt-4 space-x-3\">\n        <button class=\"px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\">Take a Tour</button>\n        <button class=\"px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\">Dismiss</button>\n      </div>\n    </div>\n  </div>\n</div>"
        }
    },
    {
        "componentId": "alert-05",
        "name": "Modern Neutral Alert",
        "sourceDesignSystem": "Tailwind",
        "tags": ["neutral", "update", "minimalist"],
        "description": "A subtle, neutral-colored alert for general information that doesn't require strong emotional emphasis. Blends smoothly with modern UIs.",
        "category": "Feedback",
        "uxPattern": "Alert",
        "visualStyle": ["minimalist", "subtle"],
        "code": {
            "html": "<div role=\"alert\" class=\"w-full max-w-lg flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-x-3\">\n  <div class=\"p-2 bg-gray-100 rounded-full\">\n    <svg class=\"w-5 h-5 text-gray-600\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n    </svg>\n  </div>\n  <p class=\"text-sm text-gray-700 font-medium\">System maintenance is scheduled for Sunday at 2 AM.</p>\n</div>"
        }
    },
    [
        {
            "componentId": "avatar-01",
            "name": "Avatar with Status Indicator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["profile", "user", "status"],
            "description": "A circular user avatar with a small dot indicating online/offline status. Useful for chat applications and user lists.",
            "category": "Display",
            "uxPattern": "Avatar",
            "visualStyle": ["clean", "informative"],
            "code": {
                "html": "<div class=\"relative inline-block\">\n  <img class=\"h-12 w-12 rounded-full object-cover ring-2 ring-white\" src=\"https://randomuser.me/api/portraits/women/44.jpg\" alt=\"User avatar\">\n  <span class=\"absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-white ring-1 ring-green-400\"></span>\n</div>"
            }
        },
        {
            "componentId": "avatar-02",
            "name": "Initials Avatar",
            "sourceDesignSystem": "Tailwind",
            "tags": ["profile", "placeholder", "user"],
            "description": "An avatar that displays a user's initials. A common fallback when a profile picture is not available. Includes a subtle hover effect.",
            "category": "Display",
            "uxPattern": "Avatar",
            "visualStyle": ["minimalist", "typography"],
            "code": {
                "html": "<div class=\"relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-indigo-500 rounded-full ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all duration-300 cursor-pointer\">\n  <span class=\"font-bold text-xl text-white\">JD</span>\n</div>"
            }
        },
        {
            "componentId": "avatar-03",
            "name": "Stacked Avatar Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["group", "team", "users"],
            "description": "A group of overlapping avatars used to represent a team or multiple users associated with an item. The last element shows a count of additional users.",
            "category": "Display",
            "uxPattern": "Avatar",
            "visualStyle": ["collaborative", "compact"],
            "code": {
                "html": "<div class=\"flex -space-x-4 rtl:space-x-reverse items-center\">\n  <img class=\"w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover\" src=\"https://randomuser.me/api/portraits/women/22.jpg\" alt=\"\">\n  <img class=\"w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover\" src=\"https://randomuser.me/api/portraits/men/32.jpg\" alt=\"\">\n  <img class=\"w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover\" src=\"https://randomuser.me/api/portraits/women/65.jpg\" alt=\"\">\n  <a class=\"flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800\" href=\"#\">+9</a>\n</div>"
            }
        },
        {
            "componentId": "avatar-04",
            "name": "Square Avatar with Hover Effect",
            "sourceDesignSystem": "Tailwind",
            "tags": ["profile", "image", "interactive"],
            "description": "A modern, square-shaped avatar that reveals a subtle zoom and shadow effect on hover, adding a touch of interactivity.",
            "category": "Display",
            "uxPattern": "Avatar",
            "visualStyle": ["modern", "sharp"],
            "code": {
                "html": "<div class=\"w-16 h-16 rounded-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer\">\n  <img class=\"w-full h-full object-cover\" src=\"https://randomuser.me/api/portraits/men/75.jpg\" alt=\"Profile picture of John Doe\">\n</div>"
            }
        },
        {
            "componentId": "avatar-05",
            "name": "Editable Avatar",
            "sourceDesignSystem": "Tailwind",
            "tags": ["profile", "edit", "upload"],
            "description": "An avatar with an icon overlay that appears on hover, indicating that the user can click to edit or upload a new picture.",
            "category": "Input",
            "uxPattern": "Avatar",
            "visualStyle": ["interactive", "functional"],
            "code": {
                "html": "<div class=\"relative group w-24 h-24\">\n  <img class=\"w-full h-full rounded-full object-cover\" src=\"https://randomuser.me/api/portraits/lego/1.jpg\" alt=\"Editable avatar\" />\n  <div class=\"absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer\">\n    <svg class=\"w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\">\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z\" />\n      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z\" />\n    </svg>\n  </div>\n</div>"
            }
        }
    ],
    [
        {
            "componentId": "badge-01",
            "name": "Pill Badge",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tag", "status", "label"],
            "description": "A standard, soft-colored pill-shaped badge for displaying status or category. Includes a subtle hover state.",
            "category": "Display",
            "uxPattern": "Badge",
            "visualStyle": ["soft", "pill"],
            "code": {
                "html": "<span class=\"inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors cursor-default\">\n  Active\n</span>"
            }
        },
        {
            "componentId": "badge-02",
            "name": "Badge with Dot",
            "sourceDesignSystem": "Tailwind",
            "tags": ["status", "indicator", "label"],
            "description": "A badge that includes a colored dot for a more visual representation of status, like 'Live' or 'In Progress'.",
            "category": "Display",
            "uxPattern": "Badge",
            "visualStyle": ["indicator", "modern"],
            "code": {
                "html": "<span class=\"inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800\">\n  <svg class=\"-ml-0.5 mr-1.5 h-2 w-2 text-blue-500\" fill=\"currentColor\" viewBox=\"0 0 8 8\">\n    <circle cx=\"4\" cy=\"4\" r=\"3\" />\n  </svg>\n  In Progress\n</span>"
            }
        },
        {
            "componentId": "badge-03",
            "name": "Removable Badge",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tag", "filter", "remove"],
            "description": "An interactive badge, often used for tags or filters, that includes a small 'x' icon to remove it.",
            "category": "Input",
            "uxPattern": "Badge",
            "visualStyle": ["interactive", "functional"],
            "code": {
                "html": "<span class=\"inline-flex items-center gap-x-1.5 rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-900\">\n  <span>Design</span>\n  <button type=\"button\" class=\"group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20\">\n    <span class=\"sr-only\">Remove</span>\n    <svg viewBox=\"0 0 14 14\" class=\"h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75\">\n      <path d=\"M4 4l6 6m0-6l-6 6\" />\n    </svg>\n    <span class=\"absolute -inset-1\"></span>\n  </button>\n</span>"
            }
        },
        {
            "componentId": "badge-04",
            "name": "Outline Badge",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tag", "label", "subtle"],
            "description": "A badge with a transparent background and a colored border, offering a more subtle alternative to filled badges.",
            "category": "Display",
            "uxPattern": "Badge",
            "visualStyle": ["minimalist", "outline"],
            "code": {
                "html": "<span class=\"inline-flex items-center px-3 py-1 text-sm font-semibold text-red-600 border-2 border-red-500 rounded-lg\">\n  Archived\n</span>"
            }
        },
        {
            "componentId": "badge-05",
            "name": "Icon-Only Badge",
            "sourceDesignSystem": "Tailwind",
            "tags": ["icon", "notification", "status"],
            "description": "A small, circular badge, often positioned on another element (like a button or tab) to indicate a notification or status update.",
            "category": "Display",
            "uxPattern": "Badge",
            "visualStyle": ["minimalist", "indicator"],
            "code": {
                "html": "<div class=\"relative inline-block\">\n  <button type=\"button\" class=\"px-4 py-2 font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700\">Inbox</button>\n  <span class=\"absolute top-0 right-0 flex h-5 w-5 -mt-2 -mr-2\">\n    <span class=\"animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75\"></span>\n    <span class=\"relative inline-flex rounded-full h-5 w-5 bg-sky-500 items-center justify-center text-xs text-white\">3</span>\n  </span>\n</div>"
            }
        }
    ],
    [
        {
            "componentId": "breadcrumb-01",
            "name": "Slash Separator Breadcrumb",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navigation", "path", "hierarchy"],
            "description": "The most common breadcrumb style, using a simple slash character to separate navigation links. Current page is not a link.",
            "category": "Navigation",
            "uxPattern": "Breadcrumb",
            "visualStyle": ["standard", "minimalist"],
            "code": {
                "html": "<nav aria-label=\"Breadcrumb\">\n  <ol class=\"flex items-center space-x-2 text-sm font-medium text-gray-500\">\n    <li>\n      <a href=\"#\" class=\"hover:text-gray-900 hover:underline\">Home</a>\n    </li>\n    <li class=\"flex items-center\">\n      <span class=\"mx-2\">/</span>\n      <a href=\"#\" class=\"hover:text-gray-900 hover:underline\">Products</a>\n    </li>\n    <li class=\"flex items-center\">\n      <span class=\"mx-2\">/</span>\n      <span class=\"text-gray-800\" aria-current=\"page\">Laptops</span>\n    </li>\n  </ol>\n</nav>"
            }
        },
        {
            "componentId": "breadcrumb-02",
            "name": "Chevron Separator Breadcrumb",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navigation", "path", "trail"],
            "description": "Uses chevron icons as separators for a more graphical and modern appearance. The current page is highlighted.",
            "category": "Navigation",
            "uxPattern": "Breadcrumb",
            "visualStyle": ["modern", "iconic"],
            "code": {
                "html": "<nav class=\"flex\" aria-label=\"Breadcrumb\">\n  <ol class=\"inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse\">\n    <li class=\"inline-flex items-center\">\n      <a href=\"#\" class=\"inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600\">\n        <svg class=\"w-3 h-3 me-2.5\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n          <path d=\"m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z\"/>\n        </svg>\n        Home\n      </a>\n    </li>\n    <li>\n      <div class=\"flex items-center\">\n        <svg class=\"rtl:rotate-180 w-3 h-3 text-gray-400 mx-1\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 6 10\">\n          <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 9 4-4-4-4\"/>\n        </svg>\n        <a href=\"#\" class=\"ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2\">Projects</a>\n      </div>\n    </li>\n    <li aria-current=\"page\">\n      <div class=\"flex items-center\">\n        <svg class=\"rtl:rotate-180 w-3 h-3 text-gray-400 mx-1\" aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 6 10\">\n          <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 9 4-4-4-4\"/>\n        </svg>\n        <span class=\"ms-1 text-sm font-medium text-gray-500 md:ms-2\">Flowbite</span>\n      </div>\n    </li>\n  </ol>\n</nav>"
            }
        },
        {
            "componentId": "breadcrumb-03",
            "name": "Contained Breadcrumb",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navigation", "path", "ui"],
            "description": "Each breadcrumb item is visually contained in a 'chip' or 'tag', with the current page being more prominent. Offers a clear visual structure.",
            "category": "Navigation",
            "uxPattern": "Breadcrumb",
            "visualStyle": ["contained", "structured"],
            "code": {
                "html": "<nav aria-label=\"Breadcrumb\">\n  <ol class=\"flex flex-wrap items-center gap-1.5 sm:gap-2.5\">\n    <li>\n      <a class=\"flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-gray-900 transition hover:bg-gray-200\" href=\"#\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\"/></svg>\n        <span class=\"text-sm font-medium\">Home</span>\n      </a>\n    </li>\n    <li class=\"flex items-center text-gray-500\">›</li>\n    <li>\n      <a class=\"flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-gray-900 transition hover:bg-gray-200\" href=\"#\">\n        <span class=\"text-sm font-medium\">Categories</span>\n      </a>\n    </li>\n    <li class=\"flex items-center text-gray-500\">›</li>\n    <li>\n      <span class=\"flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-white\" aria-current=\"page\">\n        <span class=\"text-sm font-medium\">Smartphones</span>\n      </span>\n    </li>\n  </ol>\n</nav>"
            }
        },
        {
            "componentId": "breadcrumb-04",
            "name": "Dot Separator Breadcrumb",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navigation", "minimal", "path"],
            "description": "A minimalist breadcrumb style that uses a simple dot as a separator, creating a very clean and unobtrusive navigation trail.",
            "category": "Navigation",
            "uxPattern": "Breadcrumb",
            "visualStyle": ["minimalist", "subtle"],
            "code": {
                "html": "<nav aria-label=\"Breadcrumb\">\n  <ol class=\"flex items-center text-sm text-gray-500\">\n    <li class=\"flex items-center\">\n      <a href=\"#\" class=\"transition hover:text-gray-700\"> Dashboard </a>\n      <span class=\"mx-2\" role=\"presentation\">·</span>\n    </li>\n    <li class=\"flex items-center\">\n      <a href=\"#\" class=\"transition hover:text-gray-700\"> Settings </a>\n      <span class=\"mx-2\" role=\"presentation\">·</span>\n    </li>\n    <li class=\"block transition text-gray-700 font-medium\" aria-current=\"page\">\n      Account\n    </li>\n  </ol>\n</nav>"
            }
        },
        {
            "componentId": "breadcrumb-05",
            "name": "Full-Width Background Breadcrumb",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navigation", "header", "path"],
            "description": "A breadcrumb that sits inside a full-width container with a background color, often used directly below a primary header.",
            "category": "Navigation",
            "uxPattern": "Breadcrumb",
            "visualStyle": ["integrated", "sectioned"],
            "code": {
                "html": "<nav aria-label=\"Breadcrumb\" class=\"w-full bg-gray-50 p-4 dark:bg-gray-800\">\n  <ol class=\"flex items-center space-x-4 text-sm\">\n    <li>\n      <a href=\"#\" class=\"flex items-center text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-white\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"mr-2 h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\" /></svg>\n        <span>Home</span>\n      </a>\n    </li>\n    <li class=\"text-gray-400\">></li>\n    <li>\n      <a href=\"#\" class=\"text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-white\"> Library </a>\n    </li>\n    <li class=\"text-gray-400\">></li>\n    <li><span class=\"font-medium text-gray-700 dark:text-gray-200\" aria-current=\"page\">Data</span></li>\n  </ol>\n</nav>"
            }
        }
    ],
    [
        {
            "componentId": "card-01",
            "name": "Standard Article Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["blog", "article", "content"],
            "description": "A classic card for displaying content like a blog post or news article, with an image, category tags, title, and a short excerpt.",
            "category": "Content",
            "uxPattern": "Card",
            "visualStyle": ["classic", "content-focused"],
            "code": {
                "html": "<div class=\"max-w-sm rounded-lg overflow-hidden shadow-lg bg-white font-sans transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300\">\n  <img class=\"w-full h-48 object-cover\" src=\"https://images.unsplash.com/photo-1523961131990-5EA7c61b2107?q=80&w=1974&auto=format&fit=crop\" alt=\"Tech landscape\">\n  <div class=\"p-6\">\n    <div class=\"flex items-baseline\">\n      <span class=\"inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide\">New</span>\n    </div>\n    <h4 class=\"mt-2 font-bold text-xl leading-tight truncate text-gray-800\">The Future of Web Development</h4>\n    <div class=\"mt-1 text-gray-600\">\n      <p>An in-depth look at the trends shaping modern web and app creation in the coming years.</p>\n    </div>\n    <div class=\"mt-4 flex items-center\">\n      <span class=\"text-teal-600 font-semibold\">5 min read</span>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-02",
            "name": "Product Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["ecommerce", "product", "shop"],
            "description": "A card designed for e-commerce sites, featuring a product image, name, rating, price, and a call-to-action button.",
            "category": "Content",
            "uxPattern": "Card",
            "visualStyle": ["commercial", "vibrant"],
            "code": {
                "html": "<div class=\"relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md\">\n  <a class=\"relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl\" href=\"#\">\n    <img class=\"object-cover w-full\" src=\"https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop\" alt=\"product image\" />\n    <span class=\"absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white\">39% OFF</span>\n  </a>\n  <div class=\"mt-4 px-5 pb-5\">\n    <a href=\"#\">\n      <h5 class=\"text-xl tracking-tight text-slate-900\">Luxe Sports Car Model</h5>\n    </a>\n    <div class=\"mt-2 mb-5 flex items-center justify-between\">\n      <p>\n        <span class=\"text-3xl font-bold text-slate-900\">$799</span>\n        <span class=\"text-sm text-slate-900 line-through\">$1299</span>\n      </p>\n      <div class=\"flex items-center\">\n        \n        <span class=\"mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold\">5.0</span>\n      </div>\n    </div>\n    <a href=\"#\" class=\"flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"mr-2 h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z\" />\n      </svg>\n      Add to cart</a\n    >\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-03",
            "name": "Horizontal User Profile Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["profile", "user", "contact"],
            "description": "A horizontal card layout, perfect for user profiles in a list or directory. It combines an avatar, user details, and action buttons.",
            "category": "Content",
            "uxPattern": "Card",
            "visualStyle": ["list-item", "profile"],
            "code": {
                "html": "<div class=\"w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors\">\n  <div class=\"flex-shrink-0\">\n    <img class=\"w-16 h-16 rounded-full object-cover\" src=\"https://randomuser.me/api/portraits/women/79.jpg\" alt=\"Jane Doe's avatar\">\n  </div>\n  <div class=\"flex-1 min-w-0\">\n    <p class=\"text-lg font-bold text-gray-900 truncate\">Jane Doe</p>\n    <p class=\"text-sm text-gray-500 truncate\">Product Designer @ Acme Inc.</p>\n    <p class=\"text-sm text-gray-500 truncate mt-1\">jane.doe@example.com</p>\n  </div>\n  <button class=\"inline-flex items-center px-3 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\">\n    Follow\n  </button>\n</div>"
            }
        },
        {
            "componentId": "card-04",
            "name": "Interactive Card with Overlay",
            "sourceDesignSystem": "Tailwind",
            "tags": ["gallery", "portfolio", "image"],
            "description": "An image-focused card that reveals an overlay with text and a button on hover. Ideal for portfolio or gallery items.",
            "category": "Content",
            "uxPattern": "Card",
            "visualStyle": ["interactive", "overlay"],
            "code": {
                "html": "<div class=\"group relative max-w-sm rounded-xl overflow-hidden cursor-pointer shadow-lg\">\n  <img class=\"w-full h-80 object-cover\" src=\"https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2070&auto=format&fit=crop\" alt=\"Mountain landscape\">\n  <div class=\"absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent\"></div>\n  <div class=\"absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-1/4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out\">\n    <h3 class=\"text-2xl font-bold\">Serene Landscapes</h3>\n    <p class=\"mt-2 text-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100\">Explore the beauty of untouched nature through our gallery.</p>\n    <button class=\"mt-4 self-start px-4 py-2 bg-white text-black font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200\">View Project</button>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-05",
            "name": "Glassmorphism Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["ui", "modern", "glass"],
            "description": "A card that uses a frosted-glass effect (glassmorphism) with a background blur and transparency. It creates a sense of depth and modernity.",
            "category": "Content",
            "uxPattern": "Card",
            "visualStyle": ["glassmorphism", "futuristic"],
            "code": {
                "html": "<div class=\"relative w-full max-w-sm h-56 flex items-center justify-center p-4 bg-cover bg-center rounded-xl\" style=\"background-image: url('https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop');\">\n  \n  <div class=\"w-full max-w-xs p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-xl text-center text-white\">\n    <h2 class=\"text-2xl font-bold\">Glass UI</h2>\n    <p class=\"mt-2 text-sm\">This card demonstrates the glassmorphism effect using Tailwind CSS.</p>\n    <button class=\"mt-4 px-5 py-2 bg-white/30 text-white font-semibold rounded-full hover:bg-white/50 transition-colors duration-300\">Learn More</button>\n  </div>\n</div>"
            }
        }
    ],
    [
        {
            "componentId": "carousel-01",
            "name": "Carousel with Arrow Controls",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "gallery", "image"],
            "description": "A classic image carousel with 'Previous' and 'Next' arrow buttons for manual navigation. Relies on JavaScript for functionality.",
            "category": "Content",
            "uxPattern": "Carousel",
            "visualStyle": ["standard", "interactive"],
            "code": {
                "html": "\n<div x-data=\"{ activeSlide: 1, slides: [1, 2, 3, 4] }\" class=\"relative w-full max-w-2xl mx-auto\">\n  \n  <div class=\"relative h-72 overflow-hidden rounded-lg\">\n    <div x-show=\"activeSlide === 1\" class=\"absolute inset-0 transition-opacity duration-700 ease-in-out\">\n      <img src=\"https://images.unsplash.com/photo-1560707328-9320455205b3?q=80&w=2070&auto=format&fit=crop\" class=\"block w-full h-full object-cover\" alt=\"Slide 1\">\n    </div>\n    <div x-show=\"activeSlide === 2\" class=\"absolute inset-0 transition-opacity duration-700 ease-in-out\">\n      <img src=\"https://images.unsplash.com/photo-1559827260-dc66b3506e76?q=80&w=2070&auto=format&fit=crop\" class=\"block w-full h-full object-cover\" alt=\"Slide 2\">\n    </div>\n    <div x-show=\"activeSlide === 3\" class=\"absolute inset-0 transition-opacity duration-700 ease-in-out\">\n      <img src=\"https://images.unsplash.com/photo-1549925243-7501254247e9?q=80&w=1932&auto=format&fit=crop\" class=\"block w-full h-full object-cover\" alt=\"Slide 3\">\n    </div>\n    <div x-show=\"activeSlide === 4\" class=\"absolute inset-0 transition-opacity duration-700 ease-in-out\">\n      <img src=\"https://images.unsplash.com/photo-1561629259-4f9391afe8a4?q=80&w=2070&auto=format&fit=crop\" class=\"block w-full h-full object-cover\" alt=\"Slide 4\">\n    </div>\n  </div>\n  \n  <button @click=\"activeSlide = activeSlide === 1 ? slides.length : activeSlide - 1\" type=\"button\" class=\"absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none\">\n    <span class=\"inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none\">\n      <svg class=\"w-4 h-4 text-white\" fill=\"none\" viewBox=\"0 0 6 10\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 1 1 5l4 4\"/></svg>\n    </span>\n  </button>\n  <button @click=\"activeSlide = activeSlide === slides.length ? 1 : activeSlide + 1\" type=\"button\" class=\"absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none\">\n    <span class=\"inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none\">\n      <svg class=\"w-4 h-4 text-white\" fill=\"none\" viewBox=\"0 0 6 10\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m1 9 4-4-4-4\"/></svg>\n    </span>\n  </button>\n</div>"
            }
        },
        {
            "componentId": "carousel-02",
            "name": "Carousel with Dot Indicators",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "gallery", "indicators"],
            "description": "A carousel that uses dot indicators at the bottom for navigation, allowing users to jump directly to a specific slide.",
            "category": "Content",
            "uxPattern": "Carousel",
            "visualStyle": ["minimalist", "clean"],
            "code": {
                "html": "\n<div x-data=\"{ activeSlide: 1, slides: [1, 2, 3, 4, 5] }\" class=\"relative w-full max-w-3xl mx-auto shadow-lg\">\n  \n  <div class=\"relative h-80 md:h-96 overflow-hidden rounded-lg\">\n    <template x-for=\"slide in slides\" :key=\"slide\">\n      <div x-show=\"activeSlide === slide\" class=\"absolute inset-0 bg-gray-500 flex items-center justify-center text-white text-5xl font-bold transition-all duration-700 ease-custom\">\n        <img :src=\"`https://picsum.photos/id/${slide+10}/1200/800`\" class=\"w-full h-full object-cover\" />\n        <div class=\"absolute inset-0 bg-black/20\"></div>\n        <span class=\"absolute\" x-text=\"`Slide ${slide}`\"></span>\n      </div>\n    </template>\n  </div>\n  \n  <div class=\"absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex space-x-3\">\n    <template x-for=\"slide in slides\" :key=\"slide\">\n      <button @click=\"activeSlide = slide\" class=\"w-3 h-3 rounded-full transition-all\" :class=\"{ 'bg-white scale-125': activeSlide === slide, 'bg-white/50 hover:bg-white/75': activeSlide !== slide }\"></button>\n    </template>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "carousel-03",
            "name": "Carousel with Thumbnail Previews",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "product", "gallery"],
            "description": "An advanced carousel, often used for product pages, that shows thumbnail previews of all slides, allowing for quick selection.",
            "category": "Content",
            "uxPattern": "Carousel",
            "visualStyle": ["ecommerce", "preview"],
            "code": {
                "html": "\n<div class=\"w-full max-w-lg mx-auto\">\n  \n  <div class=\"mb-4 h-96 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden\">\n    <img id=\"main-carousel-image\" src=\"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop\" alt=\"Main product view\" class=\"w-full h-full object-cover transition-opacity duration-300\">\n  </div>\n  \n  <div class=\"grid grid-cols-5 gap-2\">\n    <button class=\"h-20 rounded-md overflow-hidden ring-2 ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500\">\n      <img src=\"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop\" alt=\"Thumbnail 1\" class=\"w-full h-full object-cover\">\n    </button>\n    <button class=\"h-20 rounded-md overflow-hidden ring-1 ring-transparent hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500\">\n      <img src=\"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop\" alt=\"Thumbnail 2\" class=\"w-full h-full object-cover\">\n    </button>\n    <button class=\"h-20 rounded-md overflow-hidden ring-1 ring-transparent hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500\">\n      <img src=\"https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1974&auto=format&fit=crop\" alt=\"Thumbnail 3\" class=\"w-full h-full object-cover\">\n    </button>\n    <button class=\"h-20 rounded-md overflow-hidden ring-1 ring-transparent hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500\">\n      <img src=\"https://images.unsplash.com/photo-1587563871167-1bee9c391a92?q=80&w=2070&auto=format&fit=crop\" alt=\"Thumbnail 4\" class=\"w-full h-full object-cover\">\n    </button>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "carousel-04",
            "name": "Full-Width Hero Carousel",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "hero", "landing-page"],
            "description": "A full-width carousel designed to be a hero section on a landing page. It includes text overlay and a call-to-action button.",
            "category": "Content",
            "uxPattern": "Carousel",
            "visualStyle": ["immersive", "promotional"],
            "code": {
                "html": "\n<div class=\"relative w-full h-screen overflow-hidden\">\n  \n  <div class=\"absolute inset-0 bg-cover bg-center transition-opacity duration-1000\" style=\"background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop');\">\n    <div class=\"absolute inset-0 bg-black/50 flex items-center justify-center\">\n      <div class=\"text-center text-white p-4\">\n        <h1 class=\"text-4xl md:text-6xl font-bold drop-shadow-lg\">Discover New Horizons</h1>\n        <p class=\"mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md\">Explore our curated collection of amazing destinations.</p>\n        <button class=\"mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors\">Get Started</button>\n      </div>\n    </div>\n  </div>\n  \n  \n</div>"
            }
        },
        {
            "componentId": "carousel-05",
            "name": "Card Carousel (CSS Snap)",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "cards", "css-only"],
            "description": "A horizontal scrolling container of cards that uses CSS Scroll Snap for a smooth, app-like swiping experience on touch devices. No JS required for the snapping behavior.",
            "category": "Content",
            "uxPattern": "Carousel",
            "visualStyle": ["modern", "mobile-friendly"],
            "code": {
                "html": "<div class=\"w-full max-w-4xl mx-auto\">\n  <div class=\"relative flex gap-6 snap-x snap-mandatory overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200\">\n    \n    <div class=\"snap-center shrink-0 w-80\">\n      <div class=\"bg-white rounded-lg shadow-xl p-6\">\n        <h3 class=\"text-xl font-bold\">Feature One</h3>\n        <p class=\"mt-2 text-gray-600\">Description for the first feature card goes here. It's snappy!</p>\n      </div>\n    </div>\n    \n    <div class=\"snap-center shrink-0 w-80\">\n      <div class=\"bg-white rounded-lg shadow-xl p-6\">\n        <h3 class=\"text-xl font-bold\">Feature Two</h3>\n        <p class=\"mt-2 text-gray-600\">Description for the second feature card goes here. It's snappy!</p>\n      </div>\n    </div>\n    \n    <div class=\"snap-center shrink-0 w-80\">\n      <div class=\"bg-white rounded-lg shadow-xl p-6\">\n        <h3 class=\"text-xl font-bold\">Feature Three</h3>\n        <p class=\"mt-2 text-gray-600\">Description for the third feature card goes here. It's snappy!</p>\n      </div>\n    </div>\n    \n    <div class=\"snap-center shrink-0 w-80\">\n      <div class=\"bg-white rounded-lg shadow-xl p-6\">\n        <h3 class=\"text-xl font-bold\">Feature Four</h3>\n        <p class=\"mt-2 text-gray-600\">Description for the fourth feature card goes here. It's snappy!</p>\n      </div>\n    </div>\n  </div>\n</div>"
            }
        }
    ],
    [
        {
            "componentId": "chart-01",
            "name": "Simple Bar Chart",
            "sourceDesignSystem": "Tailwind",
            "tags": ["data", "visualization", "stats"],
            "description": "A vertical bar chart built with divs and flexbox. Bars have a hover state to highlight data points, and a simple transition for visual feedback.",
            "category": "Data Visualization",
            "uxPattern": "Chart",
            "visualStyle": ["minimalist", "data-driven"],
            "code": {
                "html": "<div class=\"w-full max-w-lg p-6 bg-white rounded-lg shadow-md font-sans\">\n  <h3 class=\"text-lg font-semibold text-gray-700\">Monthly Sales</h3>\n  <div class=\"mt-4 flex items-end justify-between h-48 space-x-4 text-center\">\n    \n    <div class=\"flex flex-col items-center w-full\">\n      <div class=\"w-full h-full flex items-end\">\n        <div class=\"w-full bg-blue-400 rounded-t-md hover:bg-blue-500 transition-all duration-300\" style=\"height: 60%;\"></div>\n      </div>\n      <span class=\"mt-2 text-xs text-gray-500\">Jan</span>\n    </div>\n    \n    <div class=\"flex flex-col items-center w-full\">\n      <div class=\"w-full h-full flex items-end\">\n        <div class=\"w-full bg-blue-400 rounded-t-md hover:bg-blue-500 transition-all duration-300\" style=\"height: 80%;\"></div>\n      </div>\n      <span class=\"mt-2 text-xs text-gray-500\">Feb</span>\n    </div>\n    \n    <div class=\"flex flex-col items-center w-full\">\n      <div class=\"w-full h-full flex items-end\">\n        <div class=\"w-full bg-blue-400 rounded-t-md hover:bg-blue-500 transition-all duration-300\" style=\"height: 45%;\"></div>\n      </div>\n      <span class=\"mt-2 text-xs text-gray-500\">Mar</span>\n    </div>\n    \n    <div class=\"flex flex-col items-center w-full\">\n      <div class=\"w-full h-full flex items-end\">\n        <div class=\"w-full bg-blue-400 rounded-t-md hover:bg-blue-500 transition-all duration-300\" style=\"height: 95%;\"></div>\n      </div>\n      <span class=\"mt-2 text-xs text-gray-500\">Apr</span>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "chart-02",
            "name": "Donut Chart with Center Text",
            "sourceDesignSystem": "Tailwind",
            "tags": ["data", "pie-chart", "stats"],
            "description": "A donut chart created with CSS conic-gradient. It includes a text label in the center to display a key metric or total.",
            "category": "Data Visualization",
            "uxPattern": "Chart",
            "visualStyle": ["modern", "circular"],
            "code": {
                "html": "<div class=\"relative w-48 h-48 flex items-center justify-center\">\n  <div class=\"absolute w-full h-full rounded-full\" style=\"background: conic-gradient(#4f46e5 0% 70%, #a5b4fc 70% 100%);\"></div>\n  <div class=\"relative w-36 h-36 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-inner\">\n    <span class=\"text-3xl font-bold text-indigo-700\">70%</span>\n    <span class=\"text-sm text-gray-500\">Complete</span>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "chart-03",
            "name": "Horizontal Bar Chart with Labels",
            "sourceDesignSystem": "Tailwind",
            "tags": ["data", "stats", "comparison"],
            "description": "A horizontal bar chart, ideal for comparing values across different categories. Each bar includes a label and its corresponding value.",
            "category": "Data Visualization",
            "uxPattern": "Chart",
            "visualStyle": ["informative", "horizontal"],
            "code": {
                "html": "<div class=\"w-full max-w-md p-4 bg-white rounded-lg shadow-md font-sans space-y-4\">\n  <h3 class=\"font-semibold text-gray-800\">Project Progress</h3>\n  \n  <div class=\"space-y-1\">\n    <div class=\"flex justify-between text-sm font-medium text-gray-600\">\n      <span>Design</span>\n      <span>100%</span>\n    </div>\n    <div class=\"w-full bg-gray-200 rounded-full h-2.5\">\n      <div class=\"bg-green-500 h-2.5 rounded-full\" style=\"width: 100%\"></div>\n    </div>\n  </div>\n  \n  <div class=\"space-y-1\">\n    <div class=\"flex justify-between text-sm font-medium text-gray-600\">\n      <span>Development</span>\n      <span>75%</span>\n    </div>\n    <div class=\"w-full bg-gray-200 rounded-full h-2.5\">\n      <div class=\"bg-blue-500 h-2.5 rounded-full transition-all duration-500\" style=\"width: 75%\"></div>\n    </div>\n  </div>\n  \n  <div class=\"space-y-1\">\n    <div class=\"flex justify-between text-sm font-medium text-gray-600\">\n      <span>Testing</span>\n      <span>30%</span>\n    </div>\n    <div class=\"w-full bg-gray-200 rounded-full h-2.5\">\n      <div class=\"bg-yellow-400 h-2.5 rounded-full transition-all duration-500\" style=\"width: 30%\"></div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "chart-04",
            "name": "Radial Progress Chart",
            "sourceDesignSystem": "Tailwind",
            "tags": ["progress", "circle", "stats"],
            "description": "A circular progress chart made with SVG and Tailwind classes. The stroke-dasharray and stroke-dashoffset properties are used to create the progress effect.",
            "category": "Data Visualization",
            "uxPattern": "Chart",
            "visualStyle": ["technical", "indicator"],
            "code": {
                "html": "<div class=\"relative w-32 h-32\">\n  <svg class=\"w-full h-full\" viewBox=\"0 0 36 36\">\n    <path class=\"text-gray-200 stroke-current\" stroke-width=\"3.8\" fill=\"none\"\n          d=\"M18 2.0845\n             a 15.9155 15.9155 0 0 1 0 31.831\n             a 15.9155 15.9155 0 0 1 0 -31.831\" />\n    <path class=\"text-teal-500 stroke-current\" stroke-width=\"3.8\" stroke-dasharray=\"85, 100\" stroke-linecap=\"round\" fill=\"none\"\n          d=\"M18 2.0845\n             a 15.9155 15.9155 0 0 1 0 31.831\n             a 15.9155 15.9155 0 0 1 0 -31.831\" />\n  </svg>\n  <div class=\"absolute inset-0 flex flex-col items-center justify-center\">\n    <span class=\"text-2xl font-bold text-gray-700\">85%</span>\n    <span class=\"text-xs text-gray-500\">Capacity</span>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "chart-05",
            "name": "Stacked Bar Chart",
            "sourceDesignSystem": "Tailwind",
            "tags": ["data", "stats", "comparison"],
            "description": "A single bar composed of multiple colored segments to show the breakdown of a total. Includes a legend to describe each segment.",
            "category": "Data Visualization",
            "uxPattern": "Chart",
            "visualStyle": ["segmented", "informative"],
            "code": {
                "html": "<div class=\"w-full max-w-sm p-4 bg-white rounded-lg shadow font-sans\">\n  <h4 class=\"font-semibold mb-3\">Traffic Sources</h4>\n  <div class=\"flex w-full h-6 rounded-full overflow-hidden\">\n    <div class=\"flex items-center justify-center text-xs text-white font-semibold bg-sky-500 hover:opacity-90 transition-opacity\" style=\"width: 50%\" title=\"Organic - 50%\"></div>\n    <div class=\"flex items-center justify-center text-xs text-white font-semibold bg-emerald-500 hover:opacity-90 transition-opacity\" style=\"width: 30%\" title=\"Referral - 30%\"></div>\n    <div class=\"flex items-center justify-center text-xs text-white font-semibold bg-amber-500 hover:opacity-90 transition-opacity\" style=\"width: 20%\" title=\"Direct - 20%\"></div>\n  </div>\n  <div class=\"mt-4 flex justify-center space-x-4 text-xs text-gray-600\">\n    <div class=\"flex items-center\"><span class=\"w-2 h-2 rounded-full bg-sky-500 mr-1.5\"></span>Organic</div>\n    <div class=\"flex items-center\"><span class=\"w-2 h-2 rounded-full bg-emerald-500 mr-1.5\"></span>Referral</div>\n    <div class=\"flex items-center\"><span class=\"w-2 h-2 rounded-full bg-amber-500 mr-1.5\"></span>Direct</div>\n  </div>\n</div>"
            }
        }
    ],
    [
        {
            "componentId": "checkbox-01",
            "name": "Styled Checkbox",
            "sourceDesignSystem": "Tailwind",
            "tags": ["form", "input", "select"],
            "description": "A custom-styled checkbox that replaces the browser default. It includes focus and checked states for better usability and aesthetics.",
            "category": "Input",
            "uxPattern": "CheckBox",
            "visualStyle": ["modern", "clean"],
            "code": {
                "html": "<div class=\"flex items-center\">\n  <input id=\"checkbox-1\" type=\"checkbox\" class=\"h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-pointer\">\n  <label for=\"checkbox-1\" class=\"ml-3 text-sm font-medium text-gray-700 select-none cursor-pointer\">Accept terms and conditions</label>\n</div>"
            }
        }
    ],
    [
        {
            "componentId": "card-01",
            "name": "User Profile Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["profile", "user", "avatar", "contact", "social"],
            "description": "A clean card to display user information, including an avatar, name, title, and a follow button. Ideal for social networking or team pages.",
            "category": "Display",
            "uxPattern": "Profile Summary",
            "visualStyle": ["minimalist", "clean", "light-mode"],
            "code": {
                "tailwind": "<div class=\"max-w-xs w-full bg-white rounded-lg shadow-md p-6 text-center\">\n  <img class=\"w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white\" src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop\" alt=\"User avatar\">\n  <h2 class=\"text-xl font-bold text-gray-800 mt-4\">Alex Johnson</h2>\n  <p class=\"text-sm text-gray-500\">Lead Developer</p>\n  <p class=\"text-gray-600 mt-4 text-sm\">Building beautiful interfaces and experiences. Fan of clean code and minimalist design.</p>\n  <button class=\"mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300\">Follow</button>\n</div>"
            }
        },
        {
            "componentId": "card-02",
            "name": "E-commerce Product Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["product", "ecommerce", "shop", "item", "sale"],
            "description": "Displays a product with an image, name, rating, price, and an 'Add to Cart' button. Includes a sale badge positioned over the image.",
            "category": "Container",
            "uxPattern": "Product Tile",
            "visualStyle": ["commercial", "vibrant", "shadow"],
            "code": {
                "tailwind": "<div class=\"w-72 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300\">\n  <div class=\"relative\">\n    <img class=\"w-full h-48 object-cover\" src=\"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop\" alt=\"Product Image\">\n    <div class=\"absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 m-2 rounded-md\">SALE</div>\n  </div>\n  <div class=\"p-4\">\n    <h3 class=\"text-lg font-semibold text-gray-800\">Luxury Watch</h3>\n    <div class=\"flex items-center mt-1\">\n      <span class=\"text-yellow-400\">★★★★☆</span>\n      <span class=\"text-gray-500 text-sm ml-2\">4.5 (120 reviews)</span>\n    </div>\n    <div class=\"flex justify-between items-center mt-4\">\n      <span class=\"text-2xl font-bold text-gray-900\">$299</span>\n      <button class=\"bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold py-2 px-4 rounded-lg\">Add to Cart</button>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-03",
            "name": "Blog Post Card (Horizontal)",
            "sourceDesignSystem": "Tailwind",
            "tags": ["blog", "article", "post", "content", "news"],
            "description": "A horizontal layout for a blog post preview, with the feature image on the left and content on the right. Ideal for content-rich lists.",
            "category": "Informational",
            "uxPattern": "Content Feed Item",
            "visualStyle": ["content-focused", "structured", "light"],
            "code": {
                "tailwind": "<div class=\"max-w-2xl w-full bg-white rounded-lg shadow-md overflow-hidden md:flex\">\n  <div class=\"md:w-1/3\">\n    <img class=\"h-48 w-full object-cover md:h-full\" src=\"https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop\" alt=\"Blog post image\">\n  </div>\n  <div class=\"p-6 md:w-2/3\">\n    <span class=\"text-xs font-semibold text-blue-500 uppercase\">Productivity</span>\n    <h2 class=\"text-2xl font-bold text-gray-800 mt-2\">How to Stay Focused in a Distracted World</h2>\n    <p class=\"text-gray-600 mt-2 text-sm\">Discover key strategies to improve your focus and get more done, even when everything is competing for your attention.</p>\n    <div class=\"flex items-center mt-4\">\n      <img class=\"w-10 h-10 rounded-full mr-4\" src=\"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop\" alt=\"Author avatar\">\n      <div>\n        <p class=\"text-gray-900 font-semibold\">Jane Doe</p>\n        <p class=\"text-gray-500 text-sm\">July 22, 2025</p>\n      </div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-04",
            "name": "Highlighted Pricing Plan",
            "sourceDesignSystem": "Tailwind",
            "tags": ["pricing", "saas", "plan", "subscribe", "business"],
            "description": "A pricing card designed to be highlighted as the 'most popular' choice. It uses a different background and a badge to stand out.",
            "category": "Interactive",
            "uxPattern": "Pricing Tier",
            "visualStyle": ["gradient-accent", "bold", "commercial"],
            "code": {
                "tailwind": "<div class=\"relative w-80 bg-gray-800 text-white rounded-xl shadow-2xl p-8 transform scale-105\">\n  <div class=\"absolute top-0 right-0 -mt-3 mr-3\">\n    <div class=\"bg-yellow-400 text-gray-900 font-bold text-xs py-1 px-3 rounded-full\">POPULAR</div>\n  </div>\n  <h3 class=\"text-xl font-bold uppercase\">Pro Plan</h3>\n  <p class=\"text-gray-400 mt-2\">For growing businesses</p>\n  <div class=\"mt-6\">\n    <span class=\"text-5xl font-extrabold\">$49</span>\n    <span class=\"text-gray-400 text-lg\">/month</span>\n  </div>\n  <ul class=\"mt-8 space-y-4 text-gray-300\">\n    <li class=\"flex items-center\"><svg class=\"w-6 h-6 text-green-400 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg>Unlimited Projects</li>\n    <li class=\"flex items-center\"><svg class=\"w-6 h-6 text-green-400 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg>Team Collaboration</li>\n    <li class=\"flex items-center\"><svg class=\"w-6 h-6 text-green-400 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M5 13l4 4L19 7\"></path></svg>Priority Support</li>\n  </ul>\n  <button class=\"w-full mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-lg\">Choose Plan</button>\n</div>"
            }
        },
        {
            "componentId": "card-05",
            "name": "Testimonial Card (Dark)",
            "sourceDesignSystem": "Tailwind",
            "tags": ["testimonial", "quote", "review", "social-proof"],
            "description": "An elegant, dark-themed card for displaying customer testimonials. Uses quotation marks as a decorative background element.",
            "category": "Informational",
            "uxPattern": "Social Proof",
            "visualStyle": ["dark-mode", "elegant", "typographic"],
            "code": {
                "tailwind": "<div class=\"relative max-w-md bg-gray-900 text-white rounded-lg shadow-xl p-8\">\n    <svg class=\"absolute top-0 left-0 -mt-3 -ml-3 w-16 h-16 text-gray-700\" fill=\"currentColor\" viewBox=\"0 0 32 32\">\n        <path d=\"M9.333 8h-4c-1.473 0-2.667 1.194-2.667 2.667v8c0 1.473 1.194 2.667 2.667 2.667h4c1.473 0 2.667-1.194 2.667-2.667v-5.333h-4v2.667h1.333v-2.667h-1.333v-2.667h4v-2.667c0-1.473-1.194-2.667-2.667-2.667zM25.333 8h-4c-1.473 0-2.667 1.194-2.667 2.667v8c0 1.473 1.194 2.667 2.667 2.667h4c1.473 0 2.667-1.194 2.667-2.667v-5.333h-4v2.667h1.333v-2.667h-1.333v-2.667h4v-2.667c0-1.473-1.194-2.667-2.667-2.667z\"></path>\n    </svg>\n    <p class=\"text-lg italic text-gray-300\">This product has completely transformed my workflow. The attention to detail is outstanding, and the support is second to none. Highly recommended!</p>\n    <div class=\"flex items-center mt-6\">\n        <img class=\"w-12 h-12 rounded-full\" src=\"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop\" alt=\"Reviewer's avatar\">\n        <div class=\"ml-4\">\n            <p class=\"font-bold text-white\">Michael Chen</p>\n            <p class=\"text-sm text-gray-400\">CEO, Innovate Inc.</p>\n        </div>\n    </div>\n</div>"
            }
        },
        {
            "componentId": "card-06",
            "name": "Dashboard Stats Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["stats", "dashboard", "kpi", "data-viz", "metric"],
            "description": "A compact card for dashboards displaying a key metric with a large number, a label, an icon, and a subtle accent border.",
            "category": "Data Display",
            "uxPattern": "Dashboard Widget",
            "visualStyle": ["data-viz", "minimalist", "iconography"],
            "code": {
                "tailwind": "<div class=\"w-64 bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500\">\n  <div class=\"flex items-center justify-between\">\n    <div>\n      <p class=\"text-sm font-medium text-gray-500 uppercase\">Revenue</p>\n      <p class=\"text-3xl font-bold text-gray-800 mt-1\">$4,650</p>\n      <p class=\"text-xs text-gray-500 mt-1\"><span class=\"text-green-500\">+12%</span> vs last month</p>\n    </div>\n    <div class=\"bg-green-100 p-3 rounded-full\">\n      <svg class=\"w-6 h-6 text-green-500\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01\"></path></svg>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-07",
            "name": "Glassmorphism Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["glassmorphism", "ui", "modern", "frosted"],
            "description": "A card with a frosted glass effect using backdrop blur and semi-transparent background. Best used over a colorful background.",
            "category": "Container",
            "uxPattern": "Layered Interface",
            "visualStyle": ["glassmorphism", "modern", "translucent"],
            "code": {
                "tailwind": "<div class=\"w-80 h-48 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-6 text-white\">\n  <h3 class=\"text-xl font-bold\">Glassmorphism UI</h3>\n  <p class=\"mt-2 text-sm font-light\">This card uses backdrop-blur and semi-transparent colors to create a 'frosted glass' effect. Place it on a vibrant background image or gradient for the best look.</p>\n  <button class=\"mt-4 text-xs bg-white/30 hover:bg-white/50 font-semibold py-2 px-4 rounded-full transition duration-300\">Learn More</button>\n</div>"
            }
        },
        {
            "componentId": "card-08",
            "name": "Weather Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["weather", "forecast", "dashboard", "info"],
            "description": "A card showing the current weather for a location, including a large icon for the weather condition, temperature, and day.",
            "category": "Informational",
            "uxPattern": "Data Snapshot",
            "visualStyle": ["gradient", "colorful", "icon-heavy"],
            "code": {
                "tailwind": "<div class=\"w-64 text-white p-6 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl\">\n  <div class=\"flex justify-between items-start\">\n    <div>\n      <p class=\"text-lg font-semibold\">New York, USA</p>\n      <p class=\"text-sm opacity-80\">Tuesday, 22 July</p>\n    </div>\n    <p class=\"text-lg font-bold\">24°C</p>\n  </div>\n  <div class=\"flex flex-col items-center mt-4 mb-2\">\n    <svg class=\"w-20 h-20\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M3 12h1m8-9v1m8.657 2.343l-.707.707M21 12h-1m-2.343 8.657l-.707-.707M12 21v-1m-8.657-2.343l.707-.707M12 3a9 9 0 11-9 9m9-9a9 9 0 00-9 9m9-9c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z\"></path></svg>\n    <p class=\"text-xl font-semibold mt-2\">Sunny</p>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-09",
            "name": "Event Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["event", "schedule", "calendar", "meeting"],
            "description": "Card for displaying event details. It features a prominent date block, title, location, and an action button.",
            "category": "Display",
            "uxPattern": "Event Listing",
            "visualStyle": ["structured", "informational", "clean"],
            "code": {
                "tailwind": "<div class=\"w-96 bg-white rounded-lg shadow-md flex p-4 hover:shadow-xl transition-shadow duration-300\">\n  <div class=\"flex flex-col items-center justify-center bg-red-100 text-red-600 rounded-lg p-4 mr-4\">\n    <span class=\"text-sm font-bold uppercase\">JUL</span>\n    <span class=\"text-3xl font-extrabold\">25</span>\n  </div>\n  <div class=\"flex-grow\">\n    <h3 class=\"text-lg font-bold text-gray-800\">Annual Tech Conference 2025</h3>\n    <p class=\"text-sm text-gray-500 mt-1\">10:00 AM - 5:00 PM</p>\n    <div class=\"flex items-center text-gray-600 mt-2\">\n      <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z\" clip-rule=\"evenodd\"></path></svg>\n      <span class=\"text-sm\">Grand Convention Center</span>\n    </div>\n    <button class=\"text-sm mt-4 text-blue-500 hover:text-blue-700 font-semibold\">View Details →</button>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-10",
            "name": "Notification Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["notification", "alert", "message", "status"],
            "description": "A simple notification card with an icon, message, and timestamp. A blue dot indicates it's unread.",
            "category": "Informational",
            "uxPattern": "Notification Item",
            "visualStyle": ["subtle", "minimalist", "ui-element"],
            "code": {
                "tailwind": "<div class=\"max-w-sm w-full bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4 border border-gray-200\">\n  <div class=\"flex-shrink-0\">\n    <div class=\"w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center\">\n      <svg class=\"w-6 h-6 text-blue-500\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z\"></path></svg>\n    </div>\n  </div>\n  <div class=\"flex-grow\">\n    <p class=\"text-sm text-gray-800\"><span class=\"font-bold\">New Message</span> from Sarah. She mentioned you in a comment.</p>\n    <p class=\"text-xs text-gray-400 mt-1\">2 minutes ago</p>\n  </div>\n  <div class=\"w-3 h-3 bg-blue-500 rounded-full flex-shrink-0\"></div>\n</div>"
            }
        },
        {
            "componentId": "card-11",
            "name": "Course Progress Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["course", "education", "progress", "lms"],
            "description": "A card for an online course, showing the title, instructor, and a visual progress bar indicating completion status.",
            "category": "Display",
            "uxPattern": "Progress Indicator",
            "visualStyle": ["educational", "clean", "motivational"],
            "code": {
                "tailwind": "<div class=\"w-80 bg-white p-5 rounded-xl shadow-lg border border-gray-100\">\n  <span class=\"text-xs font-semibold text-purple-500 uppercase\">Design</span>\n  <h3 class=\"text-lg font-bold text-gray-900 mt-2\">Advanced Figma Prototyping</h3>\n  <p class=\"text-sm text-gray-500\">by Maria Garcia</p>\n  <div class=\"mt-4\">\n    <div class=\"flex justify-between text-sm text-gray-600 mb-1\">\n      <span>Progress</span>\n      <span>75%</span>\n    </div>\n    <div class=\"w-full bg-gray-200 rounded-full h-2\">\n      <div class=\"bg-purple-500 h-2 rounded-full\" style=\"width: 75%;\"></div>\n    </div>\n  </div>\n  <button class=\"w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition duration-300\">Continue Learning</button>\n</div>"
            }
        },
        {
            "componentId": "card-12",
            "name": "Neumorphic Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["neumorphism", "soft-ui", "modern", "minimal"],
            "description": "A card designed with the neumorphism (soft UI) aesthetic, using inset and outset shadows to create a soft, extruded look.",
            "category": "Container",
            "uxPattern": "Soft UI Element",
            "visualStyle": ["neumorphic", "minimalist", "soft"],
            "code": {
                "tailwind": "<div class=\"w-72 h-40 bg-gray-100 rounded-2xl p-6 flex flex-col justify-center items-center shadow-[8px_8px_16px_#d1d1d1,_-8px_-8px_16px_#ffffff]\">\n  <h3 class=\"text-xl font-bold text-gray-700\">Neumorphism</h3>\n  <p class=\"text-sm text-gray-500 mt-2\">Soft UI with subtle shadows.</p>\n  <div class=\"flex space-x-4 mt-4\">\n    <button class=\"w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shadow-[inset_4px_4px_8px_#d1d1d1,_inset_-4px_-4px_8px_#ffffff] hover:text-blue-500\">\n        <svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z\"></path><path d=\"M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z\"></path></svg>\n    </button>\n    <button class=\"w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shadow-[inset_4px_4px_8px_#d1d1d1,_inset_-4px_-4px_8px_#ffffff] hover:text-red-500\">\n        <svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z\" clip-rule=\"evenodd\"></path></svg>\n    </button>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-13",
            "name": "Team Member Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["team", "member", "profile", "social", "contact"],
            "description": "A profile card for a team member, featuring a large photo, name, role, and icons linking to their social media profiles.",
            "category": "Display",
            "uxPattern": "Profile Summary",
            "visualStyle": ["corporate", "clean", "professional"],
            "code": {
                "tailwind": "<div class=\"w-72 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in-out\">\n  <img class=\"w-full h-56 object-cover object-center\" src=\"https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop\" alt=\"Team member photo\">\n  <div class=\"p-6\">\n    <h3 class=\"text-xl font-semibold text-gray-800\">David Lee</h3>\n    <p class=\"text-sm text-gray-600\">Marketing Director</p>\n    <div class=\"mt-4 flex justify-center space-x-4\">\n      <a href=\"#\" class=\"text-gray-400 hover:text-blue-500\"><svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.01-.06C3.91 19.33 6.32 20 8.98 20c7.1 0 11-5.88 11-11v-.5c.8-.57 1.48-1.27 2-2.04z\"></path></svg></a>\n      <a href=\"#\" class=\"text-gray-400 hover:text-blue-700\"><svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z\"></path></svg></a>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-14",
            "name": "Image Gallery Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["image", "gallery", "photo", "portfolio"],
            "description": "A card that reveals information and actions on hover. The overlay contains the image title and a link.",
            "category": "Interactive",
            "uxPattern": "Hover Reveal",
            "visualStyle": ["image-centric", "minimalist", "interactive"],
            "code": {
                "tailwind": "<div class=\"relative w-80 h-80 group rounded-lg overflow-hidden\">\n  <img src=\"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop\" alt=\"Landscape\" class=\"w-full h-full object-cover transition-transform duration-500 group-hover:scale-110\">\n  <div class=\"absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center\">\n    <h3 class=\"text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500\">Mountain Views</h3>\n    <p class=\"mt-2 text-sm text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100\">A breathtaking view from the peak.</p>\n    <a href=\"#\" class=\"mt-4 py-2 px-4 border border-white text-white text-sm font-semibold rounded-full hover:bg-white hover:text-black transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200\">Explore</a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-15",
            "name": "CTA Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["cta", "call-to-action", "marketing", "signup"],
            "description": "A bold, attention-grabbing card designed to drive a specific user action, with a strong headline and a prominent button.",
            "category": "Action",
            "uxPattern": "Call to Action",
            "visualStyle": ["bold", "high-contrast", "gradient", "dark-mode"],
            "code": {
                "tailwind": "<div class=\"max-w-xl w-full p-10 rounded-2xl bg-gradient-to-tr from-gray-900 to-gray-800 text-center shadow-2xl\">\n  <h2 class=\"text-3xl font-extrabold text-white sm:text-4xl\">Ready to Dive In?</h2>\n  <p class=\"mt-4 text-lg text-gray-300\">Start your free trial today. No credit card required.</p>\n  <a href=\"#\" class=\"mt-8 inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105\">Get Started Now</a>\n</div>"
            }
        },
        {
            "componentId": "card-16",
            "name": "File/Document Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["file", "document", "download", "asset"],
            "description": "A card for representing a file or document. It includes a filetype icon, name, size, and download/preview actions.",
            "category": "Container",
            "uxPattern": "File Item",
            "visualStyle": ["utilitarian", "clean", "iconography"],
            "code": {
                "tailwind": "<div class=\"w-96 bg-gray-50 rounded-lg p-4 flex items-center space-x-4 border border-gray-200\">\n  <div class=\"flex-shrink-0\">\n    <div class=\"w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center\">\n      <svg class=\"w-8 h-8 text-blue-500\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\"></path></svg>\n    </div>\n  </div>\n  <div class=\"flex-grow min-w-0\">\n    <p class=\"text-sm font-semibold text-gray-800 truncate\">project_brief_final_v3.docx</p>\n    <p class=\"text-xs text-gray-500\">1.2 MB - Uploaded 3 days ago</p>\n  </div>\n  <div class=\"flex-shrink-0 flex items-center space-x-2\">\n    <button class=\"p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full\">\n      <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4\"></path></svg>\n    </button>\n    <button class=\"p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full\">\n      <svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z\"></path></svg>\n    </button>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-17",
            "name": "Video Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["video", "player", "media", "tutorial"],
            "description": "A card for a video, featuring a thumbnail with a play icon overlay. Clicking it would typically open a video player.",
            "category": "Media",
            "uxPattern": "Media Thumbnail",
            "visualStyle": ["media-centric", "dark-overlay", "interactive"],
            "code": {
                "tailwind": "<div class=\"w-80 rounded-lg overflow-hidden shadow-lg bg-gray-800\">\n  <div class=\"relative cursor-pointer group\">\n    <img class=\"w-full h-44 object-cover\" src=\"https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto=format&fit=crop\" alt=\"Video thumbnail\">\n    <div class=\"absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity\">\n        <div class=\"w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform\">\n          <svg class=\"w-8 h-8 text-white\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z\" clip-rule=\"evenodd\"></path></svg>\n        </div>\n    </div>\n  </div>\n  <div class=\"p-4\">\n    <h3 class=\"font-semibold text-white\">Introduction to Tailwind CSS</h3>\n    <p class=\"text-sm text-gray-400 mt-1\">By CodeCrafters ・ 1.2M views</p>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-18",
            "name": "Category Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["category", "collection", "navigation", "ecommerce"],
            "description": "A visually driven card for navigating to a product category. Uses a background image and a semi-transparent overlay for the title.",
            "category": "Navigation",
            "uxPattern": "Visual Navigation Tile",
            "visualStyle": ["image-driven", "bold-typography", "commercial"],
            "code": {
                "tailwind": "<div class=\"relative w-72 h-48 rounded-xl overflow-hidden group shadow-lg\">\n  <img src=\"https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop\" alt=\"Category: Electronics\" class=\"w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500\">\n  <div class=\"absolute inset-0 bg-gradient-to-t from-black/80 to-transparent\"></div>\n  <div class=\"absolute bottom-0 left-0 p-4\">\n    <h3 class=\"text-2xl font-extrabold text-white\">Electronics</h3>\n    <a href=\"#\" class=\"text-sm text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300\">Shop Now &rarr;</a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-19",
            "name": "Job Posting Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["job", "hiring", "career", "listing"],
            "description": "A card for a job board, listing key information like title, company, location, and job type. Includes an 'Apply' button.",
            "category": "Listing",
            "uxPattern": "List Item",
            "visualStyle": ["professional", "clean", "structured"],
            "code": {
                "tailwind": "<div class=\"w-full max-w-lg bg-white p-5 rounded-lg border border-gray-200 flex items-center space-x-5 hover:border-blue-500 hover:shadow-sm transition-all duration-300\">\n  <div class=\"flex-shrink-0\">\n    <img class=\"w-16 h-16 rounded-md object-contain\" src=\"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600\" alt=\"Company Logo\">\n  </div>\n  <div class=\"flex-grow\">\n    <div class=\"flex justify-between items-start\">\n      <div>\n        <h3 class=\"font-bold text-gray-800\">Senior Frontend Engineer</h3>\n        <p class=\"text-sm text-gray-600\">Innovate Solutions Inc.</p>\n      </div>\n      <span class=\"text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full\">Full-time</span>\n    </div>\n    <div class=\"flex items-center space-x-4 text-sm text-gray-500 mt-2\">\n      <span><svg class=\"w-4 h-4 inline mr-1\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z\" clip-rule=\"evenodd\"></path></svg>Remote (US)</span>\n      <span><svg class=\"w-4 h-4 inline mr-1\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 004 0V7.151c.22.071.412.164.567.267l1.108.74c.286.19.286.631 0 .822l-1.108.74c-.155.103-.346.196-.567.267v1.698a2.5 2.5 0 00-4 0V9.982c-.22-.071-.412-.164-.567-.267L6.25 8.975a.5.5 0 010-.822l1.108-.74.075-.05zM10 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z\"></path><path d=\"M3 4a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V4z\"></path></svg>$120k - $150k</span>\n    </div>\n  </div>\n  <div class=\"flex-shrink-0\">\n    <button class=\"px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg text-sm hover:bg-blue-600\">Apply</button>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-20",
            "name": "Recipe Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["recipe", "food", "cooking", "card"],
            "description": "A card for displaying a recipe, including a photo, title, cooking time, and difficulty level.",
            "category": "Informational",
            "uxPattern": "Summary Card",
            "visualStyle": ["lifestyle", "warm", "image-centric"],
            "code": {
                "tailwind": "<div class=\"w-80 rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100\">\n  <img class=\"w-full h-40 object-cover\" src=\"https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=2070&auto=format&fit=crop\" alt=\"Pizza\">\n  <div class=\"p-5\">\n    <h3 class=\"text-xl font-bold text-gray-800\">Homemade Margherita Pizza</h3>\n    <p class=\"text-sm text-gray-500 mt-2\">A classic Italian pizza that's simple yet incredibly delicious. Perfect for a family dinner.</p>\n    <div class=\"flex justify-between items-center mt-4 border-t pt-4\">\n      <div class=\"flex items-center text-gray-600\">\n        <svg class=\"w-5 h-5 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg>\n        <span class=\"text-sm font-medium\">45 min</span>\n      </div>\n      <div class=\"flex items-center text-gray-600\">\n        <svg class=\"w-5 h-5 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z\"></path></svg>\n        <span class=\"text-sm font-medium\">Easy</span>\n      </div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-21",
            "name": "Brutalist Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["brutalism", "bold", "design", "edgy"],
            "description": "A card with a brutalist design aesthetic, characterized by bold outlines, sharp corners, and a raw, functional appearance.",
            "category": "Container",
            "uxPattern": "Brutalist Element",
            "visualStyle": ["brutalist", "high-contrast", "raw"],
            "code": {
                "tailwind": "<div class=\"w-72 p-5 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_#000000]\">\n  <h3 class=\"text-2xl font-extrabold text-black uppercase\">Attention!</h3>\n  <p class=\"mt-2 font-mono text-black\">This is a brutalist card. It is intentionally raw, unrefined, and functional. No rounded corners. No soft shadows. Just pure structure.</p>\n  <button class=\"w-full mt-4 py-2 px-4 bg-white border-2 border-black font-bold text-black hover:bg-black hover:text-white active:bg-black active:text-white transform hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 transition-all\">CLICK ME</button>\n</div>"
            }
        },
        {
            "componentId": "card-22",
            "name": "Card with Tabs",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tabs", "interactive", "container", "segmented-control"],
            "description": "A card that contains tabbed content, allowing the user to switch between different views within the same component.",
            "category": "Interactive",
            "uxPattern": "Tabbed Interface",
            "visualStyle": ["functional", "ui-element", "clean"],
            "code": {
                "tailwind": "<div class=\"w-96 bg-white rounded-lg shadow-md\">\n  <div class=\"border-b border-gray-200\">\n    <nav class=\"-mb-px flex space-x-6 px-6\" aria-label=\"Tabs\">\n      <a href=\"#\" class=\"shrink-0 border-b-2 border-indigo-500 px-1 py-3 text-sm font-medium text-indigo-600\">Profile</a>\n      <a href=\"#\" class=\"shrink-0 border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700\">Settings</a>\n      <a href=\"#\" class=\"shrink-0 border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700\">Notifications</a>\n    </nav>\n  </div>\n  <div class=\"p-6\">\n    <h4 class=\"font-bold text-gray-800\">About</h4>\n    <p class=\"mt-2 text-sm text-gray-600\">Enjoys long walks on the beach and creating intuitive, user-friendly web interfaces. Currently exploring the intersection of design and artificial intelligence.</p>\n    <h4 class=\"font-bold text-gray-800 mt-4\">Contact Information</h4>\n    <p class=\"mt-2 text-sm text-gray-600\">Email: contact@example.com</p>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-23",
            "name": "Music Player Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["music", "player", "media", "audio"],
            "description": "A compact music player card showing album art, song title, artist, and basic playback controls.",
            "category": "Media",
            "uxPattern": "Media Player",
            "visualStyle": ["dark-mode", "sleek", "media-centric"],
            "code": {
                "tailwind": "<div class=\"w-80 bg-gray-800 rounded-lg shadow-2xl p-4 flex space-x-4\">\n  <img class=\"w-24 h-24 rounded-md\" src=\"https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop\" alt=\"Album Art\">\n  <div class=\"flex-1 flex flex-col justify-between\">\n    <div>\n      <h3 class=\"text-lg font-semibold text-white\">Cosmic Drift</h3>\n      <p class=\"text-sm text-gray-400\">Synthwave Kid</p>\n    </div>\n    <div class=\"flex items-center justify-between text-gray-300\">\n      <button class=\"hover:text-white\"><svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M8.445 14.832A1 1 0 0010 14V6a1 1 0 00-1.555-.832L4 9.168a1 1 0 000 1.664l4.445 4z\"></path></svg></button>\n      <button class=\"w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600\"><svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M6.25 5C5.56 5 5 5.56 5 6.25v7.5C5 14.44 5.56 15 6.25 15h7.5c.69 0 1.25-.56 1.25-1.25v-7.5C15 5.56 14.44 5 13.75 5h-7.5z\"></path></svg></button>\n      <button class=\"hover:text-white\"><svg class=\"w-6 h-6\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M11.555 5.168A1 1 0 0010 6v8a1 1 0 001.555.832l4.445-4a1 1 0 000-1.664l-4.445-4z\"></path></svg></button>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-24",
            "name": "Gradient Border Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["gradient", "border", "modern", "decorative"],
            "description": "A card with a vibrant gradient border, achieved by placing a padded inner element inside a gradient background parent.",
            "category": "Container",
            "uxPattern": "Decorative Container",
            "visualStyle": ["gradient", "modern", "vibrant"],
            "code": {
                "tailwind": "<div class=\"w-80 p-1 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-xl\">\n  <div class=\"bg-white rounded-lg p-6\">\n    <h3 class=\"text-xl font-bold text-gray-900\">Gradient Borders</h3>\n    <p class=\"mt-2 text-gray-600\">This effect is created by using a gradient parent as the border and placing a solid color child inside with padding.</p>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-25",
            "name": "NFT Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["nft", "crypto", "collectible", "blockchain"],
            "description": "A card for displaying an NFT, highlighting the artwork, name, creator, and current price or bid.",
            "category": "Display",
            "uxPattern": "Collectible Tile",
            "visualStyle": ["dark-mode", "futuristic", "crypto"],
            "code": {
                "tailwind": "<div class=\"w-72 rounded-2xl bg-gray-800 p-4 border border-gray-700 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300\">\n  <img class=\"w-full rounded-xl\" src=\"https://images.unsplash.com/photo-1634683525222-330138245164?q=80&w=2000&auto=format&fit=crop\" alt=\"NFT artwork\" />\n  <div class=\"mt-4\">\n    <h3 class=\"text-lg font-bold text-white\">Cyber Orb #77</h3>\n    <p class=\"text-sm text-gray-400\">by <span class=\"text-cyan-400\">@pixelartist</span></p>\n    <div class=\"mt-4 flex justify-between items-center bg-gray-900 p-3 rounded-lg\">\n      <div>\n        <p class=\"text-xs text-gray-400\">Current Bid</p>\n        <p class=\"text-md font-bold text-white flex items-center\"><svg class=\"w-4 h-4 mr-1\" viewBox=\"0 0 320 512\" fill=\"currentColor\"><path d=\"M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z\"></path></svg> 2.5 ETH</p>\n      </div>\n      <button class=\"bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-bold py-2 px-4 rounded-lg\">Place Bid</button>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-26",
            "name": "Map Location Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["map", "location", "contact", "address"],
            "description": "A card that includes an embedded map for a location, along with address details and a 'Get Directions' link.",
            "category": "Informational",
            "uxPattern": "Location Detail",
            "visualStyle": ["functional", "map-centric", "clean"],
            "code": {
                "tailwind": "<div class=\"w-96 rounded-lg overflow-hidden shadow-lg bg-white\">\n  <div class=\"h-48 bg-gray-200\">\n    <img class=\"w-full h-full object-cover\" src=\"https://map.as/map.png?z=15&ll=40.7128,-74.0060&w=384&h=192&marker=40.7128,-74.0060\" alt=\"Map of New York City\"/>\n  </div>\n  <div class=\"p-5\">\n    <h3 class=\"text-lg font-bold text-gray-800\">Our Headquarters</h3>\n    <p class=\"text-sm text-gray-600 mt-2\">123 Market Street, Suite 500<br>New York, NY 10001</p>\n    <a href=\"#\" class=\"inline-block mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800\">Get Directions &rarr;</a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-27",
            "name": "Task/Todo Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["task", "todo", "kanban", "project-management"],
            "description": "A card for a task in a project management or to-do list application. Includes status, priority, and assigned user.",
            "category": "Interactive",
            "uxPattern": "Kanban Card",
            "visualStyle": ["productive", "utilitarian", "compact"],
            "code": {
                "tailwind": "<div class=\"w-72 bg-white rounded-md p-4 shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing\">\n  <div class=\"flex justify-between items-start\">\n    <p class=\"text-sm font-medium text-gray-800\">Design the new landing page hero section.</p>\n    <span class=\"text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full\">High</span>\n  </div>\n  <div class=\"flex items-center justify-between mt-4\">\n    <div class=\"flex items-center space-x-2 text-sm text-gray-500\">\n      <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4\"></path></svg>\n      <span>3/5 Subtasks</span>\n    </div>\n    <div class=\"flex -space-x-2\">\n      <img class=\"w-7 h-7 rounded-full border-2 border-white\" src=\"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop\" alt=\"User 1\">\n      <img class=\"w-7 h-7 rounded-full border-2 border-white\" src=\"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop\" alt=\"User 2\">\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-28",
            "name": "Flipping Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["flipping", "interactive", "3d", "animation"],
            "description": "An interactive card that flips on hover or click to reveal content on the back side. Uses 3D transforms.",
            "category": "Interactive",
            "uxPattern": "Flip Card",
            "visualStyle": ["animated", "interactive", "playful"],
            "code": {
                "tailwind": "<div class=\"w-72 h-48 perspective-1000 group\">\n  <div class=\"relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-1000 transition-transform\">\n    \n    <div class=\"absolute w-full h-full backface-hidden bg-blue-500 rounded-lg shadow-lg flex flex-col justify-center items-center text-white p-4\">\n      <h3 class=\"text-2xl font-bold\">Hover to Flip</h3>\n      <p>Card Front</p>\n    </div>\n    \n    <div class=\"absolute w-full h-full backface-hidden rotate-y-180 bg-gray-700 rounded-lg shadow-lg flex flex-col justify-center items-center text-white p-4\">\n      <h3 class=\"text-2xl font-bold\">Revealed!</h3>\n      <p>Card Back</p>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "card-29",
            "name": "Login Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["login", "authentication", "form", "input"],
            "description": "A card containing a login form with fields for email and password, a submit button, and a link for forgotten passwords.",
            "category": "Form",
            "uxPattern": "Login Form",
            "visualStyle": ["clean", "functional", "minimalist"],
            "code": {
                "tailwind": "<div class=\"w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-gray-200\">\n  <h2 class=\"text-2xl font-bold text-center text-gray-800\">Welcome Back!</h2>\n  <p class=\"text-center text-sm text-gray-500 mt-2\">Sign in to continue</p>\n  <form class=\"mt-8 space-y-6\">\n    <div>\n      <label for=\"email\" class=\"text-sm font-medium text-gray-700\">Email Address</label>\n      <input id=\"email\" name=\"email\" type=\"email\" required class=\"mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm\">\n    </div>\n    <div>\n      <div class=\"flex justify-between items-center\">\n        <label for=\"password\" class=\"text-sm font-medium text-gray-700\">Password</label>\n        <a href=\"#\" class=\"text-sm text-indigo-600 hover:text-indigo-500\">Forgot?</a>\n      </div>\n      <input id=\"password\" name=\"password\" type=\"password\" required class=\"mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm\">\n    </div>\n    <button type=\"submit\" class=\"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500\">Sign In</button>\n  </form>\n</div>"
            }
        },
        {
            "componentId": "card-30",
            "name": "Expandable/Accordion Card",
            "sourceDesignSystem": "Tailwind",
            "tags": ["accordion", "expandable", "faq", "collapsible"],
            "description": "A card that can be expanded to reveal more detailed content. Commonly used for FAQs or nested information.",
            "category": "Interactive",
            "uxPattern": "Accordion",
            "visualStyle": ["functional", "minimalist", "interactive"],
            "code": {
                "tailwind": "<div class=\"w-full max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden\">\n  <details class=\"group\">\n    <summary class=\"flex justify-between items-center p-4 cursor-pointer list-none\">\n      <h3 class=\"font-medium text-gray-800\">What is Tailwind CSS?</h3>\n      <div class=\"text-gray-500 group-open:rotate-180 transition-transform duration-300\">\n        <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>\n      </div>\n    </summary>\n    <div class=\"p-4 border-t border-gray-200 bg-gray-50\">\n      <p class=\"text-sm text-gray-600\">\n        Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It's a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.\n      </p>\n    </div>\n  </details>\n</div>"
            }
        }
    ],

    [
        {
            "componentId": "dropdown-01",
            "name": "Classic Dropdown",
            "sourceDesignSystem": "Tailwind",
            "tags": ["menu", "options", "select"],
            "description": "A standard dropdown menu that reveals a list of options when clicked. Ideal for navigation or action lists.",
            "category": "Navigation",
            "uxPattern": "Dropdown Menu",
            "visualStyle": ["classic", "corporate"],
            "code": {
                "html": "<div class=\"relative inline-block text-left\">\n  <div>\n    <button type=\"button\" class=\"inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600\" id=\"menu-button\" aria-expanded=\"true\" aria-haspopup=\"true\">\n      Options\n      <svg class=\"-mr-1 h-5 w-5 text-gray-400\" viewBox=\"0 0 20 20\" fill=\"currentColor\" aria-hidden=\"true\">\n        <path fill-rule=\"evenodd\" d=\"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z\" clip-rule=\"evenodd\" />\n      </svg>\n    </button>\n  </div>\n  \n  <div class=\"absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-0 scale-95\" role=\"menu\" aria-orientation=\"vertical\" aria-labelledby=\"menu-button\" tabindex=\"-1\">\n    <div class=\"py-1\" role=\"none\">\n      <a href=\"#\" class=\"text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100\" role=\"menuitem\" tabindex=\"-1\" id=\"menu-item-0\">Account settings</a>\n      <a href=\"#\" class=\"text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100\" role=\"menuitem\" tabindex=\"-1\" id=\"menu-item-1\">Support</a>\n      <a href=\"#\" class=\"text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100\" role=\"menuitem\" tabindex=\"-1\" id=\"menu-item-2\">License</a>\n      <form method=\"POST\" action=\"#\" role=\"none\">\n        <button type=\"submit\" class=\"text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100\" role=\"menuitem\" tabindex=\"-1\" id=\"menu-item-3\">Sign out</button>\n      </form>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "dropdown-02",
            "name": "Profile Dropdown",
            "sourceDesignSystem": "Tailwind",
            "tags": ["avatar", "user", "account"],
            "description": "A dropdown menu attached to a user's avatar, commonly used for account-related actions like profile, settings, and sign out.",
            "category": "Navigation",
            "uxPattern": "Dropdown Menu",
            "visualStyle": ["modern", "minimalist"],
            "code": {
                "html": "<div class=\"relative inline-block\">\n  <button class=\"flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800\">\n    <span class=\"sr-only\">Open user menu</span>\n    <img class=\"h-10 w-10 rounded-full\" src=\"https://i.pravatar.cc/150?u=a042581f4e29026704d\" alt=\"\">\n  </button>\n  \n  <div class=\"absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-200 transform opacity-0 scale-95\" role=\"menu\" aria-orientation=\"vertical\" tabindex=\"-1\">\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\" role=\"menuitem\">Your Profile</a>\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\" role=\"menuitem\">Settings</a>\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\" role=\"menuitem\">Sign out</a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "dropdown-03",
            "name": "Animated Action Dropdown",
            "sourceDesignSystem": "Tailwind",
            "tags": ["actions", "button", "animated"],
            "description": "A compact dropdown triggered by an icon, with a subtle animation. Used for a list of contextual actions.",
            "category": "Action",
            "uxPattern": "Dropdown Menu",
            "visualStyle": ["icon-driven", "sleek"],
            "code": {
                "html": "<div class=\"relative inline-block text-left group\">\n  <button class=\"p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500\">\n    <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z\"></path></svg>\n  </button>\n\n  <div class=\"absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform scale-95 group-hover:scale-100\">\n    <div class=\"py-1\">\n      <a href=\"#\" class=\"flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">\n        <svg class=\"w-5 h-5 mr-2 text-gray-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z\"></path></svg>\n        Edit\n      </a>\n      <a href=\"#\" class=\"flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">\n        <svg class=\"w-5 h-5 mr-2 text-gray-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z\"></path></svg>\n        Duplicate\n      </a>\n    </div>\n    <div class=\"py-1\">\n      <a href=\"#\" class=\"flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50\">\n        <svg class=\"w-5 h-5 mr-2 text-red-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\"></path></svg>\n        Delete\n      </a>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "dropdown-04",
            "name": "Split Button Dropdown",
            "sourceDesignSystem": "Tailwind",
            "tags": ["split-button", "actions", "primary"],
            "description": "A split button combines a primary action button with a dropdown for secondary actions. Clicking the main button performs the action, while the arrow reveals more options.",
            "category": "Action",
            "uxPattern": "Split Button",
            "visualStyle": ["functional", "corporate"],
            "code": {
                "html": "<div class=\"relative inline-flex align-middle\">\n  <button type=\"button\" class=\"px-4 py-2 text-sm font-semibold text-white bg-blue-600 border border-blue-600 rounded-l-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\">\n    Save Changes\n  </button>\n  <div class=\"relative\">\n    <button type=\"button\" class=\"h-full px-2 text-white bg-blue-600 border-l border-blue-500 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\" id=\"split-menu-button\">\n      <span class=\"sr-only\">Open options</span>\n      <svg class=\"w-5 h-5\" viewBox=\"0 0 20 20\" fill=\"currentColor\" aria-hidden=\"true\">\n        <path fill-rule=\"evenodd\" d=\"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z\" clip-rule=\"evenodd\" />\n      </svg>\n    </button>\n    \n    <div class=\"absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden\">\n      <div class=\"py-1\">\n        <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Save as Draft</a>\n        <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Save and new</a>\n        <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Export</a>\n      </div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "dropdown-05",
            "name": "Notification Dropdown",
            "sourceDesignSystem": "Tailwind",
            "tags": ["notifications", "messages", "feed"],
            "description": "A dropdown typically found in a header, used to display recent notifications or messages, often indicated by a badge.",
            "category": "Navigation",
            "uxPattern": "Dropdown Menu",
            "visualStyle": ["rich-content", "modern"],
            "code": {
                "html": "<div class=\"relative inline-block\">\n  <button class=\"relative p-2 text-gray-600 rounded-full hover:bg-gray-200 hover:text-gray-800 focus:outline-none\">\n    <span class=\"sr-only\">View notifications</span>\n    <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9\"></path></svg>\n    <span class=\"absolute top-0 right-0 flex h-3 w-3\">\n      <span class=\"animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75\"></span>\n      <span class=\"relative inline-flex rounded-full h-3 w-3 bg-red-500\"></span>\n    </span>\n  </button>\n  \n  <div class=\"absolute right-0 z-10 mt-2 w-80 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 hidden\">\n    <div class=\"p-4 font-bold border-b\">Notifications</div>\n    <div class=\"divide-y\">\n      <a href=\"#\" class=\"flex items-start px-4 py-3 hover:bg-gray-100\">\n        <img class=\"object-cover w-10 h-10 mr-4 rounded-full\" src=\"https://i.pravatar.cc/150?u=a042581f4e29026704d\" alt=\"avatar\">\n        <div class=\"text-sm\">\n          <p class=\"text-gray-800\">Steve Rogers mentioned you</p>\n          <p class=\"text-gray-500\">2 hours ago</p>\n        </div>\n      </a>\n      <a href=\"#\" class=\"flex items-start px-4 py-3 hover:bg-gray-100\">\n        <img class=\"object-cover w-10 h-10 mr-4 rounded-full\" src=\"https://i.pravatar.cc/150?u=a042581f4e29026704b\" alt=\"avatar\">\n        <div class=\"text-sm\">\n          <p class=\"text-gray-800\">New event: Standup Meeting</p>\n          <p class=\"text-gray-500\">Yesterday</p>\n        </div>\n      </a>\n    </div>\n    <a href=\"#\" class=\"block py-2 text-sm font-medium text-center text-blue-600 bg-gray-50 hover:bg-gray-100 rounded-b-lg\">View all</a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "input-01",
            "name": "Standard Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["form", "text", "field"],
            "description": "A standard, universally recognized text input field with a border and a colored focus ring.",
            "category": "Input",
            "uxPattern": "Text Input",
            "visualStyle": ["classic", "corporate"],
            "code": {
                "html": "<input type=\"text\" placeholder=\"Enter your name\" class=\"w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed\" />"
            }
        },
        {
            "componentId": "input-02",
            "name": "Underline Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["form", "material-design", "minimalist"],
            "description": "A minimalist input field with only a bottom border that becomes thicker and changes color on focus.",
            "category": "Input",
            "uxPattern": "Text Input",
            "visualStyle": ["minimalist", "modern"],
            "code": {
                "html": "<input type=\"text\" placeholder=\"Topic\" class=\"w-full px-1 py-2 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 transition duration-300 disabled:border-gray-200 disabled:text-gray-400\" />"
            }
        },
        {
            "componentId": "input-03",
            "name": "Input with Leading Icon",
            "sourceDesignSystem": "Tailwind",
            "tags": ["form", "icon", "search", "email"],
            "description": "An input field with a decorative or functional icon positioned at the start, providing visual context.",
            "category": "Input",
            "uxPattern": "Text Input",
            "visualStyle": ["functional", "sleek"],
            "code": {
                "html": "<div class=\"relative\">\n  <div class=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n    <svg class=\"w-5 h-5 text-gray-400\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n      <path d=\"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z\" />\n      <path d=\"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z\" />\n    </svg>\n  </div>\n  <input type=\"email\" placeholder=\"your@email.com\" class=\"w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:opacity-75\" />\n</div>"
            }
        },
        {
            "componentId": "input-04",
            "name": "Floating Label Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["form", "animated", "label"],
            "description": "An input where the placeholder text animates to become a floating label above the input field when the user starts typing.",
            "category": "Input",
            "uxPattern": "Floating Label",
            "visualStyle": ["modern", "interactive"],
            "code": {
                "html": "<div class=\"relative\">\n    <input type=\"text\" id=\"username\" class=\"block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer\" placeholder=\" \" />\n    <label for=\"username\" class=\"absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1\">\n      Username\n    </label>\n</div>"
            }
        },
        {
            "componentId": "input-05",
            "name": "Brutalist Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["form", "brutalism", "bold"],
            "description": "A bold, high-contrast input field with a thick border and a solid shadow that disappears on focus, embodying brutalist design principles.",
            "category": "Input",
            "uxPattern": "Text Input",
            "visualStyle": ["brutalist", "edgy"],
            "code": {
                "html": "<input type=\"text\" placeholder=\"Enter command...\" class=\"w-full p-3 font-mono text-lg text-black bg-yellow-300 border-2 border-black rounded-none appearance-none focus:outline-none focus:bg-white focus:shadow-none transition-all duration-200 shadow-[8px_8px_0_#000] hover:shadow-[4px_4px_0_#000] focus:translate-x-1 focus:translate-y-1 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed\" />"
            }
        },
        {
            "componentId": "otp-01",
            "name": "Boxed OTP Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["otp", "verification", "security"],
            "description": "A set of individual input boxes for entering a One-Time Password. Each box accepts a single digit and focuses the next box automatically (requires JS).",
            "category": "Input",
            "uxPattern": "OTP Input",
            "visualStyle": ["secure", "classic"],
            "code": {
                "html": "<div class=\"flex justify-center gap-2\">\n  <input type=\"text\" maxlength=\"1\" class=\"w-12 h-14 text-center text-2xl font-bold text-gray-800 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-12 h-14 text-center text-2xl font-bold text-gray-800 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-12 h-14 text-center text-2xl font-bold text-gray-800 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-12 h-14 text-center text-2xl font-bold text-gray-800 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500\" />\n</div>"
            }
        },
        {
            "componentId": "otp-02",
            "name": "Underlined OTP Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["otp", "verification", "minimalist"],
            "description": "A minimalist OTP input style where each digit is entered into a space with only a bottom border, creating a clean look.",
            "category": "Input",
            "uxPattern": "OTP Input",
            "visualStyle": ["minimalist", "modern"],
            "code": {
                "html": "<div class=\"flex justify-center gap-3\">\n  <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-3xl font-semibold bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 transition\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-3xl font-semibold bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 transition\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-3xl font-semibold bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 transition\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-3xl font-semibold bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 transition\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-3xl font-semibold bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 transition\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-3xl font-semibold bg-transparent border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-green-500 transition\" />\n</div>"
            }
        },
        {
            "componentId": "otp-03",
            "name": "Circular OTP Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["otp", "verification", "playful"],
            "description": "A playful and friendly OTP input using circular fields for each digit.",
            "category": "Input",
            "uxPattern": "OTP Input",
            "visualStyle": ["playful", "rounded"],
            "code": {
                "html": "<div class=\"flex justify-center gap-2\">\n  <input type=\"text\" maxlength=\"1\" class=\"w-14 h-14 text-center text-2xl font-bold text-gray-800 bg-gray-100 border-2 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-14 h-14 text-center text-2xl font-bold text-gray-800 bg-gray-100 border-2 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-14 h-14 text-center text-2xl font-bold text-gray-800 bg-gray-100 border-2 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all\" />\n  <input type=\"text\" maxlength=\"1\" class=\"w-14 h-14 text-center text-2xl font-bold text-gray-800 bg-gray-100 border-2 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all\" />\n</div>"
            }
        },
        {
            "componentId": "otp-04",
            "name": "Split Group OTP Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["otp", "verification", "2fa"],
            "description": "An OTP input that visually groups digits, for example, into two sets of three, which can improve readability.",
            "category": "Input",
            "uxPattern": "OTP Input",
            "visualStyle": ["functional", "clear"],
            "code": {
                "html": "<div class=\"flex items-center justify-center gap-4\">\n  <div class=\"flex gap-2\">\n    <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-xl bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500\" />\n    <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-xl bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500\" />\n    <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-xl bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500\" />\n  </div>\n  <span class=\"text-xl font-semibold text-gray-400\">-</span>\n  <div class=\"flex gap-2\">\n    <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-xl bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500\" />\n    <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-xl bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500\" />\n    <input type=\"text\" maxlength=\"1\" class=\"w-10 h-12 text-center text-xl bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500\" />\n  </div>\n</div>"
            }
        },
        {
            "componentId": "otp-05",
            "name": "Hidden Dots OTP Input",
            "sourceDesignSystem": "Tailwind",
            "tags": ["otp", "verification", "password"],
            "description": "An OTP input style that mimics a password field, showing dots instead of numbers for added privacy on shared screens.",
            "category": "Input",
            "uxPattern": "OTP Input",
            "visualStyle": ["secure", "discreet"],
            "code": {
                "html": "<div class=\"flex justify-center gap-2\">\n  <input type=\"password\" maxlength=\"1\" class=\"w-10 h-10 text-center text-4xl font-extrabold text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-400 focus:ring-0\" style=\"-webkit-text-security: disc;\" />\n  <input type=\"password\" maxlength=\"1\" class=\"w-10 h-10 text-center text-4xl font-extrabold text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-400 focus:ring-0\" style=\"-webkit-text-security: disc;\" />\n  <input type=\"password\" maxlength=\"1\" class=\"w-10 h-10 text-center text-4xl font-extrabold text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-400 focus:ring-0\" style=\"-webkit-text-security: disc;\" />\n  <input type=\"password\" maxlength=\"1\" class=\"w-10 h-10 text-center text-4xl font-extrabold text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:bg-white focus:border-gray-400 focus:ring-0\" style=\"-webkit-text-security: disc;\" />\n</div>"
            }
        },
        {
            "componentId": "label-01",
            "name": "Standard Label",
            "sourceDesignSystem": "Tailwind",
            "tags": ["label", "form", "text"],
            "description": "A standard, accessible label for a form input. It's simple, clear, and has a medium font weight for emphasis.",
            "category": "Input",
            "uxPattern": "Label",
            "visualStyle": ["classic", "functional"],
            "code": {
                "html": "<label for=\"email\" class=\"block text-sm font-medium text-gray-700\">Email Address</label>"
            }
        },
        {
            "componentId": "label-02",
            "name": "Label with Required Indicator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["label", "form", "required"],
            "description": "A label that includes a visual indicator (an asterisk) to signify that the associated input field is required.",
            "category": "Input",
            "uxPattern": "Label",
            "visualStyle": ["clear", "informative"],
            "code": {
                "html": "<label for=\"password\" class=\"block text-sm font-medium text-gray-900\">Password <span class=\"text-red-500\">*</span></label>"
            }
        },
        {
            "componentId": "label-03",
            "name": "Label with Help Tooltip",
            "sourceDesignSystem": "Tailwind",
            "tags": ["label", "tooltip", "help"],
            "description": "A label that includes an information icon with a tooltip on hover, providing users with extra context or help for the input field.",
            "category": "Input",
            "uxPattern": "Label",
            "visualStyle": ["helpful", "interactive"],
            "code": {
                "html": "<div class=\"flex items-center\">\n  <label for=\"api-key\" class=\"block text-sm font-medium text-gray-700\">API Key</label>\n  <div class=\"relative group ml-1.5\">\n    <button class=\"text-gray-400 hover:text-gray-600\">\n      <svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z\" clip-rule=\"evenodd\"></path></svg>\n    </button>\n    <div class=\"absolute bottom-full left-1/2 z-20 w-48 mb-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2\">\n        Your API key can be found in your account settings.\n        <div class=\"absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900\"></div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "label-04",
            "name": "Inline Label",
            "sourceDesignSystem": "Tailwind",
            "tags": ["label", "form", "inline"],
            "description": "A label positioned on the same line as its input control, typically used in compact forms or for controls like checkboxes and radio buttons.",
            "category": "Input",
            "uxPattern": "Label",
            "visualStyle": ["compact", "aligned"],
            "code": {
                "html": "<div class=\"flex items-center\">\n  <input id=\"remember-me\" name=\"remember-me\" type=\"checkbox\" class=\"h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500\">\n  <label for=\"remember-me\" class=\"ml-2 block text-sm text-gray-900\">Remember me</label>\n</div>"
            }
        },
        {
            "componentId": "label-05",
            "name": "Visually Hidden Label",
            "sourceDesignSystem": "Tailwind",
            "tags": ["label", "accessibility", "a11y"],
            "description": "A label that is visually hidden but remains accessible to screen readers. This is used when a visual label is redundant, such as in a search bar with a prominent search icon.",
            "category": "Input",
            "uxPattern": "Label",
            "visualStyle": ["accessible", "minimalist"],
            "code": {
                "html": "<div>\n  <label for=\"search\" class=\"sr-only\">Search</label>\n  <div class=\"relative\">\n    <div class=\"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none\">\n      <svg class=\"h-5 w-5 text-gray-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z\" clip-rule=\"evenodd\"></path></svg>\n    </div>\n    <input id=\"search\" name=\"search\" class=\"block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm\" placeholder=\"Search\" type=\"search\">\n  </div>\n</div>"
            }
        },
        {
            "componentId": "menu-01",
            "name": "Vertical Icon Menu",
            "sourceDesignSystem": "Tailwind",
            "tags": ["menu", "navigation", "sidebar"],
            "description": "A static vertical menu, often used in sidebars, where each item has an icon and text. The active item is highlighted.",
            "category": "Navigation",
            "uxPattern": "Menu",
            "visualStyle": ["modern", "icon-driven"],
            "code": {
                "html": "<nav class=\"w-64 p-4 bg-gray-800 text-white rounded-lg\">\n  <ul class=\"space-y-2\">\n    <li>\n      <a href=\"#\" class=\"flex items-center p-3 text-base font-normal text-white rounded-lg bg-gray-700\">\n        <svg class=\"w-6 h-6 text-gray-300\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z\"></path></svg>\n        <span class=\"ml-3\">Dashboard</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"#\" class=\"flex items-center p-3 text-base font-normal rounded-lg hover:bg-gray-700 transition-colors duration-200\">\n        <svg class=\"w-6 h-6 text-gray-400 group-hover:text-white\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z\"></path></svg>\n        <span class=\"ml-3\">Team</span>\n      </a>\n    </li>\n    <li>\n      <a href=\"#\" class=\"flex items-center p-3 text-base font-normal rounded-lg hover:bg-gray-700 transition-colors duration-200\">\n        <svg class=\"w-6 h-6 text-gray-400 group-hover:text-white\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z\"></path></svg>\n        <span class=\"ml-3\">Projects</span>\n      </a>\n    </li>\n  </ul>\n</nav>"
            }
        },
        {
            "componentId": "menu-02",
            "name": "Horizontal Tab Menu",
            "sourceDesignSystem": "Tailwind",
            "tags": ["menu", "tabs", "navigation"],
            "description": "A horizontal menu styled as tabs, where the active tab has a distinct bottom border and text color, indicating the current view.",
            "category": "Navigation",
            "uxPattern": "Tabs",
            "visualStyle": ["clean", "minimalist"],
            "code": {
                "html": "<div class=\"border-b border-gray-200\">\n  <nav class=\"-mb-px flex space-x-8\" aria-label=\"Tabs\">\n    <a href=\"#\" class=\"border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm\" aria-current=\"page\">\n      Profile\n    </a>\n    <a href=\"#\" class=\"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200\">\n      Account\n    </a>\n    <a href=\"#\" class=\"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200\">\n      Notifications\n    </a>\n  </nav>\n</div>"
            }
        },
        {
            "componentId": "menu-03",
            "name": "Menu with Dividers",
            "sourceDesignSystem": "Tailwind",
            "tags": ["menu", "actions", "context-menu"],
            "description": "A simple list menu with sections separated by dividers, used for organizing different groups of actions.",
            "category": "Action",
            "uxPattern": "Menu",
            "visualStyle": ["organized", "functional"],
            "code": {
                "html": "<div class=\"w-56 bg-white border border-gray-200 rounded-md shadow-md divide-y divide-gray-100\">\n  <div class=\"py-1\">\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Edit</a>\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Duplicate</a>\n  </div>\n  <div class=\"py-1\">\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Archive</a>\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100\">Move</a>\n  </div>\n  <div class=\"py-1\">\n    <a href=\"#\" class=\"block px-4 py-2 text-sm text-red-600 hover:bg-red-50\">Delete</a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "menu-04",
            "name": "Pill-Shaped Menu",
            "sourceDesignSystem": "Tailwind",
            "tags": ["menu", "pills", "navigation"],
            "description": "A horizontal navigation menu where items are styled as pills. The active item has a solid background color, and others have a hover state.",
            "category": "Navigation",
            "uxPattern": "Menu",
            "visualStyle": ["playful", "modern", "rounded"],
            "code": {
                "html": "<div class=\"flex space-x-2 p-1.5 bg-gray-200 rounded-full\">\n  <a href=\"#\" class=\"px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-md\">Home</a>\n  <a href=\"#\" class=\"px-4 py-2 text-sm font-semibold text-gray-600 rounded-full hover:bg-white hover:text-blue-500 transition-all duration-200\">Profile</a>\n  <a href=\"#\" class=\"px-4 py-2 text-sm font-semibold text-gray-600 rounded-full hover:bg-white hover:text-blue-500 transition-all duration-200\">Messages</a>\n  <a href=\"#\" class=\"px-4 py-2 text-sm font-semibold text-gray-600 rounded-full hover:bg-white hover:text-blue-500 transition-all duration-200\">Settings</a>\n</div>"
            }
        },
        {
            "componentId": "menu-05",
            "name": "Minimalist Action Menu",
            "sourceDesignSystem": "Tailwind",
            "tags": ["menu", "minimalist", "actions"],
            "description": "An ultra-minimalist menu with no borders or dividers, relying only on spacing and hover states for clarity. Ideal for clean, modern UIs.",
            "category": "Action",
            "uxPattern": "Menu",
            "visualStyle": ["minimalist", "clean"],
            "code": {
                "html": "<div class=\"w-48 bg-white rounded-lg p-2 shadow-xl ring-1 ring-gray-900/5\">\n  <a href=\"#\" class=\"block px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 transition-colors\">View Profile</a>\n  <a href=\"#\" class=\"block px-3 py-2 text-sm text-gray-800 rounded-md hover:bg-gray-100 transition-colors\">Add to team</a>\n  <a href=\"#\" class=\"block px-3 py-2 text-sm text-red-500 rounded-md hover:bg-red-50 transition-colors\">Remove</a>\n</div>"
            }
        },
        {
            "componentId": "nav-menu-01",
            "name": "Classic Header Navbar",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navbar", "header", "top-nav"],
            "description": "A standard, responsive top navigation bar with a logo, navigation links, and a call-to-action button.",
            "category": "Navigation",
            "uxPattern": "Navigation Menu",
            "visualStyle": ["classic", "corporate"],
            "code": {
                "html": "<nav class=\"bg-white shadow-md\">\n  <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <div class=\"flex items-center justify-between h-16\">\n      <div class=\"flex-shrink-0\">\n        <a href=\"#\" class=\"text-2xl font-bold text-indigo-600\">Logo</a>\n      </div>\n      <div class=\"hidden md:block\">\n        <div class=\"ml-10 flex items-baseline space-x-4\">\n          <a href=\"#\" class=\"bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium\">Home</a>\n          <a href=\"#\" class=\"text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors\">Features</a>\n          <a href=\"#\" class=\"text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors\">Pricing</a>\n          <a href=\"#\" class=\"text-gray-500 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors\">About</a>\n        </div>\n      </div>\n      <div class=\"hidden md:block\">\n         <button class=\"px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500\">Get Started</button>\n      </div>\n    </div>\n  </div>\n</nav>"
            }
        },
        {
            "componentId": "nav-menu-02",
            "name": "Underline Navigation Menu",
            "sourceDesignSystem": "Tailwind",
            "tags": ["navbar", "underline", "modern"],
            "description": "A modern navigation menu where an animated underline effect highlights the link on hover and marks the active page.",
            "category": "Navigation",
            "uxPattern": "Navigation Menu",
            "visualStyle": ["modern", "animated"],
            "code": {
                "html": "<nav class=\"flex justify-center space-x-10 bg-white p-4 border-b\">\n  <a href=\"#\" class=\"text-gray-900 relative font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-full after:bg-blue-500\">Overview</a>\n  <a href=\"#\" class=\"text-gray-500 hover:text-gray-900 relative font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full\">Integrations</a>\n  <a href=\"#\" class=\"text-gray-500 hover:text-gray-900 relative font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full\">Activity</a>\n  <a href=\"#\" class=\"text-gray-500 hover:text-gray-900 relative font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full\">Domains</a>\n</nav>"
            }
        },
        {
            "componentId": "nav-menu-03",
            "name": "Sidebar Navigation",
            "sourceDesignSystem": "Tailwind",
            "tags": ["sidebar", "dashboard", "vertical-nav"],
            "description": "A vertical navigation menu for dashboards and applications. It features icons and text, with a clear active state and hover effects.",
            "category": "Navigation",
            "uxPattern": "Navigation Menu",
            "visualStyle": ["functional", "app-ui"],
            "code": {
                "html": "<div class=\"flex flex-col w-64 h-screen px-4 py-8 bg-white border-r\">\n  <h2 class=\"text-3xl font-semibold text-gray-800\">Brand</h2>\n  <div class=\"flex flex-col justify-between flex-1 mt-6\">\n    <nav>\n      <a class=\"flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md\" href=\"#\">\n        <svg class=\"w-5 h-5\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n        <span class=\"mx-4 font-medium\">Dashboard</span>\n      </a>\n      <a class=\"flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200 transition-colors\" href=\"#\">\n        <svg class=\"w-5 h-5\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n        <span class=\"mx-4 font-medium\">Accounts</span>\n      </a>\n      <a class=\"flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200 transition-colors\" href=\"#\">\n        <svg class=\"w-5 h-5\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n        <span class=\"mx-4 font-medium\">Settings</span>\n      </a>\n    </nav>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "nav-menu-04",
            "name": "Breadcrumb Navigation",
            "sourceDesignSystem": "Tailwind",
            "tags": ["breadcrumbs", "hierarchy", "location"],
            "description": "A breadcrumb trail that shows the user's location in a site or app hierarchy, allowing for easy navigation back to parent pages.",
            "category": "Navigation",
            "uxPattern": "Breadcrumbs",
            "visualStyle": ["functional", "hierarchical"],
            "code": {
                "html": "<nav class=\"flex\" aria-label=\"Breadcrumb\">\n  <ol class=\"inline-flex items-center space-x-1 md:space-x-3\">\n    <li class=\"inline-flex items-center\">\n      <a href=\"#\" class=\"inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600\">\n        <svg class=\"w-4 h-4 mr-2\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z\"></path></svg>\n        Home\n      </a>\n    </li>\n    <li>\n      <div class=\"flex items-center\">\n        <svg class=\"w-6 h-6 text-gray-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z\" clip-rule=\"evenodd\"></path></svg>\n        <a href=\"#\" class=\"ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2\">Projects</a>\n      </div>\n    </li>\n    <li aria-current=\"page\">\n      <div class=\"flex items-center\">\n        <svg class=\"w-6 h-6 text-gray-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z\" clip-rule=\"evenodd\"></path></svg>\n        <span class=\"ml-1 text-sm font-medium text-gray-500 md:ml-2\">Flowbite</span>\n      </div>\n    </li>\n  </ol>\n</nav>"
            }
        },
        {
            "componentId": "nav-menu-05",
            "name": "Floating Icon Navigation",
            "sourceDesignSystem": "Tailwind",
            "tags": ["mobile", "bottom-nav", "app-ui"],
            "description": "A floating navigation bar, often used at the bottom of the screen on mobile devices. It provides quick access to primary app sections using icons.",
            "category": "Navigation",
            "uxPattern": "Navigation Menu",
            "visualStyle": ["modern", "mobile-first"],
            "code": {
                "html": "<div class=\"fixed bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-sm px-4\">\n  <div class=\"flex items-center justify-center space-x-2 bg-white/70 backdrop-blur-xl rounded-full p-2 shadow-lg ring-1 ring-black/5\">\n    <a href=\"#\" class=\"p-3 rounded-full hover:bg-gray-200 transition-colors\">\n      <svg class=\"w-6 h-6 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\"></path></svg>\n    </a>\n    <a href=\"#\" class=\"p-3 rounded-full bg-blue-500 text-white shadow\">\n      <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\"></path></svg>\n    </a>\n    <a href=\"#\" class=\"p-3 rounded-full hover:bg-gray-200 transition-colors\">\n      <svg class=\"w-6 h-6 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"></path></svg>\n    </a>\n    <a href=\"#\" class=\"p-3 rounded-full hover:bg-gray-200 transition-colors\">\n      <svg class=\"w-6 h-6 text-gray-700\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z\"></path><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\"></path></svg>\n    </a>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "popover-01",
            "name": "Simple Text Popover",
            "sourceDesignSystem": "Tailwind",
            "tags": ["popover", "tooltip", "info"],
            "description": "A basic popover that appears on hover, displaying informational text. It includes a small arrow pointing to the trigger element.",
            "category": "Action",
            "uxPattern": "Popover",
            "visualStyle": ["minimalist", "informative"],
            "code": {
                "html": "<div class=\"relative group inline-block\">\n  <button class=\"px-4 py-2 text-white bg-blue-500 rounded-md\">Hover me</button>\n  <div class=\"absolute bottom-full left-1/2 z-10 w-64 mb-3 -translate-x-1/2 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300\">\n    This is a simple popover with some helpful text.\n    <div class=\"absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900\"></div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "popover-02",
            "name": "Actionable Popover",
            "sourceDesignSystem": "Tailwind",
            "tags": ["popover", "confirm", "actions"],
            "description": "A popover that contains actions, such as a confirmation button. Often used for destructive actions to prevent accidental clicks.",
            "category": "Action",
            "uxPattern": "Popover",
            "visualStyle": ["functional", "interactive"],
            "code": {
                "html": "<div class=\"relative inline-block text-left group\">\n  <button class=\"px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700\">Delete Item</button>\n  <div class=\"absolute left-0 z-10 w-64 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300\">\n    <p class=\"text-sm text-gray-800\">Are you sure you want to delete this? This action cannot be undone.</p>\n    <div class=\"mt-4 flex justify-end space-x-2\">\n      <button class=\"px-3 py-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md\">Cancel</button>\n      <button class=\"px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md\">Confirm</button>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "popover-03",
            "name": "Rich Content Popover",
            "sourceDesignSystem": "Tailwind",
            "tags": ["popover", "profile", "card"],
            "description": "A popover that displays rich content, like an image, title, and description. Useful for showing user profiles or product previews.",
            "category": "Display",
            "uxPattern": "Popover",
            "visualStyle": ["rich-content", "modern"],
            "code": {
                "html": "<div class=\"relative group inline-block\">\n  <a href=\"#\" class=\"font-medium text-blue-600 hover:underline\">@tonystark</a>\n  <div class=\"absolute z-10 w-72 p-3 mt-2 bg-white rounded-lg shadow-2xl ring-1 ring-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/4 scale-95 group-hover:scale-100\">\n    <div class=\"flex\">\n      <img class=\"w-16 h-16 rounded-full mr-4\" src=\"https://i.pravatar.cc/150?u=a042581f4e29026704a\" alt=\"Tony Stark\">\n      <div>\n        <p class=\"font-bold text-gray-900\">Tony Stark</p>\n        <p class=\"text-sm text-gray-500\">Genius, Billionaire, Playboy, Philanthropist.</p>\n        <button class=\"mt-2 px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600\">Follow</button>\n      </div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "popover-04",
            "name": "Filter Popover",
            "sourceDesignSystem": "Tailwind",
            "tags": ["popover", "filter", "form"],
            "description": "A popover used to house filtering options, such as checkboxes and sliders, for refining a list of data.",
            "category": "Input",
            "uxPattern": "Popover",
            "visualStyle": ["form-based", "functional"],
            "code": {
                "html": "<div class=\"relative inline-block text-left group\">\n  <button class=\"inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50\">\n    <svg class=\"w-5 h-5 mr-2 -ml-1 text-gray-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M3 3a1 1 0 000 2h14a1 1 0 100-2H3zM3 7a1 1 0 000 2h14a1 1 0 100-2H3zM3 11a1 1 0 100 2h14a1 1 0 100-2H3zM3 15a1 1 0 100 2h14a1 1 0 100-2H3z\" clip-rule=\"evenodd\"></path></svg>\n    Filters\n  </button>\n  <div class=\"absolute z-10 w-64 p-4 mt-2 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300\">\n    <h3 class=\"text-lg font-medium text-gray-900\">Status</h3>\n    <div class=\"mt-4 space-y-2\">\n      <div class=\"flex items-center\">\n        <input id=\"filter-active\" type=\"checkbox\" class=\"h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500\">\n        <label for=\"filter-active\" class=\"ml-3 text-sm text-gray-600\">Active</label>\n      </div>\n      <div class=\"flex items-center\">\n        <input id=\"filter-inactive\" type=\"checkbox\" class=\"h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500\">\n        <label for=\"filter-inactive\" class=\"ml-3 text-sm text-gray-600\">Inactive</label>\n      </div>\n      <div class=\"flex items-center\">\n        <input id=\"filter-archived\" type=\"checkbox\" class=\"h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500\">\n        <label for=\"filter-archived\" class=\"ml-3 text-sm text-gray-600\">Archived</label>\n      </div>\n    </div>\n    <div class=\"mt-4 flex justify-end\">\n      <button class=\"px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700\">Apply</button>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "popover-05",
            "name": "Click-Trigger Popover",
            "sourceDesignSystem": "Tailwind",
            "tags": ["popover", "menu", "settings"],
            "description": "A popover that appears when a trigger (like a settings icon) is clicked, not hovered. Requires JavaScript to toggle visibility.",
            "category": "Action",
            "uxPattern": "Popover",
            "visualStyle": ["interactive", "icon-driven"],
            "code": {
                "html": "\n<div class=\"relative inline-block\">\n  <button class=\"p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400\">\n    <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z\"></path></svg>\n  </button>\n  <div class=\"absolute right-0 z-10 w-56 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg hidden\">\n    <p class=\"font-semibold\">Panel Content</p>\n    <p class=\"text-sm text-gray-600 mt-1\">This popover is triggered by a click event.</p>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "progress-01",
            "name": "Standard Progress Bar",
            "sourceDesignSystem": "Tailwind",
            "tags": ["progress", "loader", "bar"],
            "description": "A standard, simple progress bar with rounded corners to indicate the completion status of a task.",
            "category": "Feedback",
            "uxPattern": "Progress Bar",
            "visualStyle": ["classic", "clean"],
            "code": {
                "html": "<div class=\"w-full bg-gray-200 rounded-full h-2.5\">\n  <div class=\"bg-blue-600 h-2.5 rounded-full\" style=\"width: 45%\"></div>\n</div>"
            }
        },
        {
            "componentId": "progress-02",
            "name": "Progress Bar with Label",
            "sourceDesignSystem": "Tailwind",
            "tags": ["progress", "label", "percentage"],
            "description": "A progress bar that includes a text label, typically showing the percentage of completion, for better user feedback.",
            "category": "Feedback",
            "uxPattern": "Progress Bar",
            "visualStyle": ["informative", "functional"],
            "code": {
                "html": "<div class=\"w-full\">\n  <div class=\"flex justify-between mb-1\">\n    <span class=\"text-base font-medium text-purple-700\">Loading...</span>\n    <span class=\"text-sm font-medium text-purple-700\">75%</span>\n  </div>\n  <div class=\"w-full bg-gray-200 rounded-full h-4\">\n    <div class=\"bg-purple-600 h-4 rounded-full transition-all duration-500\" style=\"width: 75%\"></div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "progress-03",
            "name": "Animated Striped Progress Bar",
            "sourceDesignSystem": "Tailwind",
            "tags": ["progress", "animated", "striped"],
            "description": "A progress bar with a striped, animated background, often used for tasks where the progress is indeterminate or ongoing.",
            "category": "Feedback",
            "uxPattern": "Progress Bar",
            "visualStyle": ["animated", "dynamic"],
            "code": {
                "html": "<div class=\"w-full bg-gray-200 rounded-full h-6 overflow-hidden\">\n    <div class=\"h-full rounded-full bg-green-500 bg-stripes bg-stripes-white animate-progress-stripes\" style=\"width: 60%; background-size: 1rem 1rem;\"></div>\n</div>\n"
            }
        },
        {
            "componentId": "progress-04",
            "name": "Multi-step Progress Indicator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["progress", "steps", "wizard"],
            "description": "A progress indicator for multi-step processes like wizards or checkouts. It shows completed, current, and upcoming steps.",
            "category": "Feedback",
            "uxPattern": "Progress Steps",
            "visualStyle": ["stepped", "informative"],
            "code": {
                "html": "<ol class=\"flex items-center w-full\">\n    <li class=\"flex w-full items-center text-blue-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-600 after:border-4 after:inline-block\">\n        <span class=\"flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full lg:h-12 lg:w-12 shrink-0\">\n            <svg class=\"w-4 h-4 text-white lg:w-6 lg:h-6\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clip-rule=\"evenodd\"></path></svg>\n        </span>\n    </li>\n    <li class=\"flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block\">\n        <span class=\"flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full lg:h-12 lg:w-12 shrink-0\">\n            <span class=\"font-bold text-gray-600\">2</span>\n        </span>\n    </li>\n    <li class=\"flex items-center w-full\">\n        <span class=\"flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full lg:h-12 lg:w-12 shrink-0\">\n            <span class=\"font-bold text-gray-600\">3</span>\n        </span>\n    </li>\n</ol>"
            }
        },
        {
            "componentId": "progress-05",
            "name": "Slim Loading Bar",
            "sourceDesignSystem": "Tailwind",
            "tags": ["progress", "loader", "top-loader"],
            "description": "A very thin progress bar, often placed at the top of a page or container to indicate loading status without being obtrusive.",
            "category": "Feedback",
            "uxPattern": "Progress Bar",
            "visualStyle": ["minimalist", "subtle"],
            "code": {
                "html": "<div class=\"w-full bg-transparent h-1\">\n  <div class=\"bg-gradient-to-r from-cyan-400 to-violet-500 h-1\" style=\"width: 80%\"></div>\n</div>"
            }
        },
        {
            "componentId": "select-01",
            "name": "Custom Styled Select",
            "sourceDesignSystem": "Tailwind",
            "tags": ["select", "dropdown", "form"],
            "description": "A custom-styled select input that replaces the native browser dropdown with a styled button and a custom chevron icon.",
            "category": "Input",
            "uxPattern": "Select",
            "visualStyle": ["modern", "custom"],
            "code": {
                "html": "<div class=\"relative w-64\">\n  <select class=\"w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500\">\n    <option>United States</option>\n    <option>Canada</option>\n    <option>Mexico</option>\n  </select>\n  <div class=\"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none\">\n    <svg class=\"w-5 h-5 text-gray-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 9l4-4 4 4m0 6l-4 4-4-4\"></path></svg>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "select-02",
            "name": "Minimalist Select",
            "sourceDesignSystem": "Tailwind",
            "tags": ["select", "form", "minimalist"],
            "description": "A clean, minimalist select input with no borders, relying on a subtle background and a simple chevron for its appearance.",
            "category": "Input",
            "uxPattern": "Select",
            "visualStyle": ["minimalist", "clean"],
            "code": {
                "html": "<div class=\"relative w-64\">\n  <select class=\"w-full pl-3 pr-10 py-2 text-base text-gray-800 bg-gray-100 border-transparent rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white\">\n    <option>Sort by: Relevance</option>\n    <option>Sort by: Newest</option>\n    <option>Sort by: Price</option>\n  </select>\n  <div class=\"absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none\">\n    <svg class=\"w-4 h-4 text-gray-500\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\"></path></svg>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "select-03",
            "name": "Select with Floating Label",
            "sourceDesignSystem": "Tailwind",
            "tags": ["select", "form", "floating-label"],
            "description": "A select input that incorporates the floating label pattern, providing a modern and space-efficient user experience.",
            "category": "Input",
            "uxPattern": "Select",
            "visualStyle": ["modern", "interactive"],
            "code": {
                "html": "<div class=\"relative w-full\">\n    <select id=\"country-select\" class=\"block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer\">\n        <option value=\"\" selected></option>\n        <option value=\"USA\">United States</option>\n        <option value=\"CAN\">Canada</option>\n        <option value=\"MEX\">Mexico</option>\n    </select>\n    <label for=\"country-select\" class=\"absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1\">\n      Select a Country\n    </label>\n</div>"
            }
        },
        {
            "componentId": "select-04",
            "name": "Select with Leading Icon",
            "sourceDesignSystem": "Tailwind",
            "tags": ["select", "form", "icon"],
            "description": "A select input that features a leading icon, adding visual context to the type of data being selected.",
            "category": "Input",
            "uxPattern": "Select",
            "visualStyle": ["functional", "sleek"],
            "code": {
                "html": "<div class=\"relative w-64\">\n  <div class=\"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none\">\n    <svg class=\"w-5 h-5 text-gray-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527 1.907 6.011 6.011 0 01-1.631 3.033 1.5 1.5 0 01-2.121.13c-.58-.46-1.44-.46-2.02 0a1.5 1.5 0 01-2.121-.13c-.63-.503-1.261-1.144-1.765-1.858a6.007 6.007 0 01-.11-1.077z\" clip-rule=\"evenodd\"></path></svg>\n  </div>\n  <select class=\"w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500\">\n    <option>English</option>\n    <option>Español</option>\n    <option>Français</option>\n  </select>\n  <div class=\"absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none\">\n    <svg class=\"w-4 h-4 text-gray-400\" fill=\"currentColor\" viewBox=\"0 0 20 20\"><path d=\"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z\"></path></svg>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "select-05",
            "name": "Brutalist Select",
            "sourceDesignSystem": "Tailwind",
            "tags": ["select", "form", "brutalist"],
            "description": "A bold and high-contrast select input with a thick border and solid shadow, reflecting a brutalist aesthetic.",
            "category": "Input",
            "uxPattern": "Select",
            "visualStyle": ["brutalist", "edgy"],
            "code": {
                "html": "<div class=\"relative w-64\">\n  <select class=\"w-full p-3 font-mono text-lg text-black bg-lime-300 border-2 border-black rounded-none appearance-none cursor-pointer focus:outline-none focus:bg-white focus:shadow-none transition-all duration-200 shadow-[8px_8px_0_#000] hover:shadow-[4px_4px_0_#000] focus:translate-x-1 focus:translate-y-1\">\n    <option>STATUS: PENDING</option>\n    <option>STATUS: APPROVED</option>\n    <option>STATUS: REJECTED</option>\n  </select>\n  <div class=\"absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-black\">\n    <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "radio-01",
            "name": "Standard Radio Button",
            "sourceDesignSystem": "Tailwind",
            "tags": ["radio", "form", "option"],
            "description": "A classic, standard radio button. A circular input that fills with a solid color when selected.",
            "category": "Input",
            "uxPattern": "Radio Group",
            "visualStyle": ["classic", "functional"],
            "code": {
                "html": "<fieldset>\n  <legend class=\"text-lg font-medium text-gray-900\">Notification Frequency</legend>\n  <div class=\"mt-4 space-y-4\">\n    <div class=\"flex items-center\">\n      <input id=\"radio-daily\" name=\"notification-frequency\" type=\"radio\" class=\"h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer\">\n      <label for=\"radio-daily\" class=\"ml-3 block text-sm font-medium text-gray-700 cursor-pointer\">Daily</label>\n    </div>\n    <div class=\"flex items-center\">\n      <input id=\"radio-weekly\" name=\"notification-frequency\" type=\"radio\" class=\"h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer\">\n      <label for=\"radio-weekly\" class=\"ml-3 block text-sm font-medium text-gray-700 cursor-pointer\">Weekly</label>\n    </div>\n    <div class=\"flex items-center\">\n      <input id=\"radio-monthly\" name=\"notification-frequency\" type=\"radio\" class=\"h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer\" disabled>\n      <label for=\"radio-monthly\" class=\"ml-3 block text-sm font-medium text-gray-500 cursor-not-allowed\">Monthly (Coming Soon)</label>\n    </div>\n  </div>\n</fieldset>"
            }
        },
        {
            "componentId": "radio-02",
            "name": "Card-Based Radio Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["radio", "card", "plan-selection"],
            "description": "A radio group where each option is presented as a clickable card. The selected card gets a prominent border and other visual feedback.",
            "category": "Input",
            "uxPattern": "Radio Group",
            "visualStyle": ["rich-content", "modern"],
            "code": {
                "html": "<fieldset class=\"grid grid-cols-1 gap-4 sm:grid-cols-3\">\n  <legend class=\"sr-only\">Select a plan</legend>\n  <div>\n    <label for=\"plan-hobby\" class=\"block cursor-pointer rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm has-[:checked]:border-blue-500 has-[:checked]:ring-2 has-[:checked]:ring-blue-500 transition hover:bg-gray-50\">\n      <input type=\"radio\" id=\"plan-hobby\" name=\"plan\" value=\"Hobby\" class=\"sr-only\" />\n      <p class=\"text-gray-900\">Hobby Plan</p>\n      <p class=\"mt-1 text-gray-700\">$10 / month</p>\n    </label>\n  </div>\n  <div>\n    <label for=\"plan-pro\" class=\"block cursor-pointer rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm has-[:checked]:border-blue-500 has-[:checked]:ring-2 has-[:checked]:ring-blue-500 transition hover:bg-gray-50\">\n      <input type=\"radio\" id=\"plan-pro\" name=\"plan\" value=\"Pro\" class=\"sr-only\" checked />\n      <p class=\"text-gray-900\">Pro Plan</p>\n      <p class=\"mt-1 text-gray-700\">$25 / month</p>\n    </label>\n  </div>\n  <div>\n    <label for=\"plan-enterprise\" class=\"block cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm font-medium shadow-sm has-[:checked]:border-blue-500 has-[:checked]:ring-2 has-[:checked]:ring-blue-500 transition\">\n      <input type=\"radio\" id=\"plan-enterprise\" name=\"plan\" value=\"Enterprise\" class=\"sr-only\" disabled />\n      <p class=\"text-gray-400\">Enterprise</p>\n      <p class=\"mt-1 text-gray-400\">Contact us</p>\n    </label>\n  </div>\n</fieldset>"
            }
        },
        {
            "componentId": "radio-03",
            "name": "Pill-Style Radio Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["radio", "pills", "segmented-control"],
            "description": "A radio group styled to look like a set of connected pills or a segmented control, often used for view switching or simple option selection.",
            "category": "Input",
            "uxPattern": "Segmented Control",
            "visualStyle": ["modern", "compact"],
            "code": {
                "html": "<fieldset class=\"flex items-center rounded-full bg-gray-100 p-1\">\n  <legend class=\"sr-only\">Select View</legend>\n  <div>\n    <label for=\"view-list\" class=\"cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition has-[:checked]:bg-white has-[:checked]:text-gray-800 has-[:checked]:shadow text-gray-500 hover:text-gray-700\">List\n      <input type=\"radio\" name=\"view\" id=\"view-list\" class=\"sr-only\" checked>\n    </label>\n  </div>\n  <div>\n    <label for=\"view-grid\" class=\"cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition has-[:checked]:bg-white has-[:checked]:text-gray-800 has-[:checked]:shadow text-gray-500 hover:text-gray-700\">Grid\n      <input type=\"radio\" name=\"view\" id=\"view-grid\" class=\"sr-only\">\n    </label>\n  </div>\n  <div>\n    <label for=\"view-board\" class=\"cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition has-[:checked]:bg-white has-[:checked]:text-gray-800 has-[:checked]:shadow text-gray-500 hover:text-gray-700\">Board\n      <input type=\"radio\" name=\"view\" id=\"view-board\" class=\"sr-only\">\n    </label>\n  </div>\n</fieldset>"
            }
        },
        {
            "componentId": "radio-04",
            "name": "Radio with Checkmark Style",
            "sourceDesignSystem": "Tailwind",
            "tags": ["radio", "form", "custom"],
            "description": "A custom radio button that displays a checkmark inside a box when selected, rather than the traditional filled circle.",
            "category": "Input",
            "uxPattern": "Radio Group",
            "visualStyle": ["clean", "modern"],
            "code": {
                "html": "<fieldset class=\"space-y-3\">\n  <legend class=\"sr-only\">Delivery Method</legend>\n  <div class=\"relative flex items-start\">\n    <div class=\"flex h-6 items-center\">\n      <input id=\"delivery-standard\" name=\"delivery-method\" type=\"radio\" class=\"peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:bg-green-500 checked:border-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2\">\n      <svg class=\"pointer-events-none absolute top-1/2 left-2.5 h-3 w-3 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 6l3 3 5-5\" /></svg>\n    </div>\n    <div class=\"ml-3 text-sm leading-6\">\n      <label for=\"delivery-standard\" class=\"font-medium text-gray-900 cursor-pointer\">Standard Delivery</label>\n    </div>\n  </div>\n  <div class=\"relative flex items-start\">\n    <div class=\"flex h-6 items-center\">\n      <input id=\"delivery-express\" name=\"delivery-method\" type=\"radio\" class=\"peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:bg-green-500 checked:border-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2\">\n      <svg class=\"pointer-events-none absolute top-1/2 left-2.5 h-3 w-3 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 12 12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 6l3 3 5-5\" /></svg>\n    </div>\n    <div class=\"ml-3 text-sm leading-6\">\n      <label for=\"delivery-express\" class=\"font-medium text-gray-900 cursor-pointer\">Express Delivery</label>\n    </div>\n  </div>\n</fieldset>"
            }
        },
        {
            "componentId": "radio-05",
            "name": "Descriptive Radio Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["radio", "form", "description"],
            "description": "A radio group where each option includes a label and a longer description, providing more context for the user's choice.",
            "category": "Input",
            "uxPattern": "Radio Group",
            "visualStyle": ["informative", "clear"],
            "code": {
                "html": "<fieldset>\n  <legend class=\"sr-only\">Privacy Setting</legend>\n  <div class=\"space-y-5\">\n    <div class=\"relative flex items-start\">\n      <div class=\"flex h-6 items-center\">\n        <input id=\"privacy-public\" name=\"privacy\" type=\"radio\" class=\"h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600 cursor-pointer\">\n      </div>\n      <div class=\"ml-3 text-sm leading-6\">\n        <label for=\"privacy-public\" class=\"font-semibold text-gray-900 cursor-pointer\">Public access</label>\n        <p class=\"text-gray-500\">Everyone can see this project.</p>\n      </div>\n    </div>\n    <div class=\"relative flex items-start\">\n      <div class=\"flex h-6 items-center\">\n        <input id=\"privacy-private-members\" name=\"privacy\" type=\"radio\" class=\"h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600 cursor-pointer\" checked>\n      </div>\n      <div class=\"ml-3 text-sm leading-6\">\n        <label for=\"privacy-private-members\" class=\"font-semibold text-gray-900 cursor-pointer\">Private to project members</label>\n        <p class=\"text-gray-500\">Only members of this project can see it.</p>\n      </div>\n    </div>\n    <div class=\"relative flex items-start\">\n      <div class=\"flex h-6 items-center\">\n        <input id=\"privacy-private-you\" name=\"privacy\" type=\"radio\" class=\"h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600 cursor-pointer\">\n      </div>\n      <div class=\"ml-3 text-sm leading-6\">\n        <label for=\"privacy-private-you\" class=\"font-semibold text-gray-900 cursor-pointer\">Private to you</label>\n        <p class=\"text-gray-500\">You are the only one who can see this project.</p>\n      </div>\n    </div>\n  </div>\n</fieldset>"
            }
        }
    ],
    [
        {
            "componentId": "button-01",
            "name": "Primary Button",
            "sourceDesignSystem": "Tailwind",
            "tags": ["submit", "form", "cta", "primary", "confirm"],
            "description": "Used for the main call-to-action on a page. It should be used for the most important, positive action.",
            "category": "Action",
            "uxPattern": "Call to Action",
            "visualStyle": ["solid", "filled", "minimalist"],
            "code": {
                "tailwind": "<button class=\"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed\">Primary Action</button>"
            }
        },
        {
            "componentId": "separator-01",
            "name": "Simple Separator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["divider", "line", "separator", "horizontal-rule"],
            "description": "A basic horizontal line to separate content sections.",
            "category": "Layout",
            "uxPattern": "Divider",
            "visualStyle": ["minimalist", "subtle"],
            "code": {
                "tailwind": "<div class=\"w-full border-t border-gray-300\"></div>"
            }
        },
        {
            "componentId": "separator-02",
            "name": "Separator with Text",
            "sourceDesignSystem": "Tailwind",
            "tags": ["divider", "or", "separator", "label"],
            "description": "A separator with centered text, often used in forms or option lists.",
            "category": "Layout",
            "uxPattern": "Divider",
            "visualStyle": ["labeled", "minimalist"],
            "code": {
                "tailwind": "<div class=\"flex items-center w-full\">\n  <div class=\"flex-grow border-t border-gray-300\"></div>\n  <span class=\"flex-shrink mx-4 text-gray-500 text-sm\">OR</span>\n  <div class=\"flex-grow border-t border-gray-300\"></div>\n</div>"
            }
        },
        {
            "componentId": "separator-03",
            "name": "Gradient Separator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["divider", "line", "gradient", "decorative"],
            "description": "A decorative separator that uses a gradient for a modern, colorful look.",
            "category": "Layout",
            "uxPattern": "Divider",
            "visualStyle": ["gradient", "colorful", "modern"],
            "code": {
                "tailwind": "<div class=\"h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent\"></div>"
            }
        },
        {
            "componentId": "separator-04",
            "name": "Dashed Separator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["divider", "line", "dashed", "separator"],
            "description": "A separator with a dashed line style for a lighter visual touch.",
            "category": "Layout",
            "uxPattern": "Divider",
            "visualStyle": ["minimalist", "dashed"],
            "code": {
                "tailwind": "<div class=\"w-full border-t-2 border-dashed border-gray-300\"></div>"
            }
        },
        {
            "componentId": "separator-05",
            "name": "Vertical Separator",
            "sourceDesignSystem": "Tailwind",
            "tags": ["divider", "line", "vertical", "separator"],
            "description": "A vertical line used to separate content side-by-side, typically within a flex container.",
            "category": "Layout",
            "uxPattern": "Divider",
            "visualStyle": ["minimalist"],
            "code": {
                "tailwind": "<div class=\"h-16 w-px bg-gray-300 mx-4\"></div>"
            }
        },
        {
            "componentId": "skeleton-01",
            "name": "Pulsing Line Skeleton",
            "sourceDesignSystem": "Tailwind",
            "tags": ["skeleton", "loader", "placeholder", "loading"],
            "description": "A simple, pulsing gray bar used as a placeholder for a line of text while content is loading.",
            "category": "Feedback",
            "uxPattern": "Skeleton Screen",
            "visualStyle": ["loading", "animated"],
            "code": {
                "tailwind": "<div class=\"animate-pulse bg-gray-300 rounded-md h-4 w-full\"></div>"
            }
        },
        {
            "componentId": "skeleton-02",
            "name": "Shimmer Effect Skeleton",
            "sourceDesignSystem": "Tailwind",
            "tags": ["skeleton", "loader", "placeholder", "shimmer"],
            "description": "A skeleton loader with a shimmering wave animation that provides a more dynamic loading feel. Requires a `shimmer` keyframe animation to be configured in `tailwind.config.js`.",
            "category": "Feedback",
            "uxPattern": "Skeleton Screen",
            "visualStyle": ["loading", "animated", "modern"],
            "code": {
                "tailwind": "<div class=\"relative overflow-hidden bg-gray-200 rounded-md h-24 w-full\">\n  <div class=\"absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]\"></div>\n</div>"
            }
        },
        {
            "componentId": "skeleton-03",
            "name": "Profile Card Skeleton",
            "sourceDesignSystem": "Tailwind",
            "tags": ["skeleton", "loader", "profile", "card"],
            "description": "A skeleton placeholder structured to look like a user profile card, with an avatar and lines of text.",
            "category": "Feedback",
            "uxPattern": "Skeleton Screen",
            "visualStyle": ["loading", "layout"],
            "code": {
                "tailwind": "<div class=\"flex items-center space-x-4 animate-pulse w-full\">\n  <div class=\"bg-gray-300 rounded-full h-12 w-12\"></div>\n  <div class=\"flex-1 space-y-2 py-1\">\n    <div class=\"bg-gray-300 rounded h-4 w-3/4\"></div>\n    <div class=\"bg-gray-300 rounded h-4 w-1/2\"></div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "skeleton-04",
            "name": "Article Skeleton",
            "sourceDesignSystem": "Tailwind",
            "tags": ["skeleton", "loader", "article", "content"],
            "description": "A more complex skeleton placeholder representing a blog post or article layout.",
            "category": "Feedback",
            "uxPattern": "Skeleton Screen",
            "visualStyle": ["loading", "content"],
            "code": {
                "tailwind": "<div class=\"w-full space-y-4 animate-pulse\">\n  <div class=\"h-8 bg-gray-300 rounded w-1/2\"></div>\n  <div class=\"space-y-2\">\n    <div class=\"h-4 bg-gray-300 rounded w-full\"></div>\n    <div class=\"h-4 bg-gray-300 rounded w-full\"></div>\n    <div class=\"h-4 bg-gray-300 rounded w-5/6\"></div>\n  </div>\n  <div class=\"h-48 bg-gray-300 rounded w-full\"></div>\n</div>"
            }
        },
        {
            "componentId": "skeleton-05",
            "name": "Dark Mode Skeleton",
            "sourceDesignSystem": "Tailwind",
            "tags": ["skeleton", "loader", "dark", "placeholder"],
            "description": "A pulsing skeleton loader designed for dark-themed interfaces.",
            "category": "Feedback",
            "uxPattern": "Skeleton Screen",
            "visualStyle": ["loading", "dark-mode"],
            "code": {
                "tailwind": "<div class=\"p-4 rounded-lg bg-gray-800 animate-pulse w-full space-y-4\">\n  <div class=\"h-6 bg-gray-700 rounded w-1/3\"></div>\n  <div class=\"h-4 bg-gray-700 rounded w-full\"></div>\n  <div class=\"h-4 bg-gray-700 rounded w-3/4\"></div>\n</div>"
            }
        },
        {
            "componentId": "slider-01",
            "name": "Modern Range Slider",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "range", "input", "form"],
            "description": "A modern range slider using `accent-color` for easy theming of the track and thumb. Provides a clean, updated look in modern browsers.",
            "category": "Input",
            "uxPattern": "Slider",
            "visualStyle": ["minimalist", "modern"],
            "code": {
                "tailwind": "<input type=\"range\" min=\"0\" max=\"100\" class=\"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed\">"
            }
        },
        {
            "componentId": "slider-02",
            "name": "Thick Custom Slider",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "range", "input", "custom"],
            "description": "A range slider with a thicker track and a distinct, circular thumb for better visibility and touch-friendliness. Note: Thumb styling may require plugins or custom CSS for full cross-browser consistency.",
            "category": "Input",
            "uxPattern": "Slider",
            "visualStyle": ["chunky", "modern"],
            "code": {
                "tailwind": "<input type=\"range\" class=\"w-full h-3 bg-indigo-200 rounded-full appearance-none cursor-pointer focus:outline-none disabled:bg-gray-300\n[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-indigo-200\n[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none\">"
            }
        },
        {
            "componentId": "slider-03",
            "name": "Slider with Steps",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "range", "input", "steps"],
            "description": "A range slider that snaps to specific values using the `step` attribute, useful for discrete selection.",
            "category": "Input",
            "uxPattern": "Slider",
            "visualStyle": ["functional", "discrete"],
            "code": {
                "tailwind": "<div class=\"w-full\">\n  <input type=\"range\" min=\"0\" max=\"100\" step=\"25\" class=\"w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500\">\n  <div class=\"w-full flex justify-between text-xs text-gray-500 mt-1\">\n    <span>|</span>\n    <span>|</span>\n    <span>|</span>\n    <span>|</span>\n    <span>|</span>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "slider-04",
            "name": "Disabled Slider",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "range", "input", "disabled"],
            "description": "A visually disabled slider that is non-interactive.",
            "category": "Input",
            "uxPattern": "Slider",
            "visualStyle": ["disabled", "faded"],
            "code": {
                "tailwind": "<input type=\"range\" disabled class=\"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-not-allowed [&::-webkit-slider-thumb]:bg-gray-400\">"
            }
        },
        {
            "componentId": "slider-05",
            "name": "Vertical Slider",
            "sourceDesignSystem": "Tailwind",
            "tags": ["slider", "range", "input", "vertical"],
            "description": "A slider oriented vertically. Requires a non-standard `appearance` property and `writing-mode` for cross-browser support.",
            "category": "Input",
            "uxPattern": "Slider",
            "visualStyle": ["vertical", "minimalist"],
            "code": {
                "tailwind": "<input type=\"range\" class=\"h-48 w-2 appearance-none cursor-pointer bg-gray-200 rounded-full accent-green-500 [writing-mode:bt-lr] [-webkit-appearance:slider-vertical]\">"
            }
        },
        {
            "componentId": "table-01",
            "name": "Striped Hover Table",
            "sourceDesignSystem": "Tailwind",
            "tags": ["table", "data", "grid", "striped"],
            "description": "A table with alternating row colors (zebra-striping) for readability and a hover effect on rows.",
            "category": "Data Display",
            "uxPattern": "Data Table",
            "visualStyle": ["clean", "structured"],
            "code": {
                "tailwind": "<div class=\"w-full overflow-hidden rounded-lg shadow-xs\">\n  <table class=\"w-full whitespace-no-wrap\">\n    <thead>\n      <tr class=\"text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50\">\n        <th class=\"px-4 py-3\">Name</th>\n        <th class=\"px-4 py-3\">Role</th>\n        <th class=\"px-4 py-3\">Status</th>\n      </tr>\n    </thead>\n    <tbody class=\"bg-white divide-y\">\n      <tr class=\"text-gray-700 hover:bg-gray-100\">\n        <td class=\"px-4 py-3\">Jane Doe</td>\n        <td class=\"px-4 py-3\">Developer</td>\n        <td class=\"px-4 py-3 text-green-500\">Active</td>\n      </tr>\n      <tr class=\"text-gray-700 bg-gray-50 hover:bg-gray-100\">\n        <td class=\"px-4 py-3\">John Smith</td>\n        <td class=\"px-4 py-3\">Designer</td>\n        <td class=\"px-4 py-3 text-yellow-500\">Pending</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
            }
        },
        {
            "componentId": "table-02",
            "name": "Bordered Grid Table",
            "sourceDesignSystem": "Tailwind",
            "tags": ["table", "data", "grid", "bordered"],
            "description": "A table where all cells have borders, creating a clear grid structure.",
            "category": "Data Display",
            "uxPattern": "Data Table",
            "visualStyle": ["grid", "structured"],
            "code": {
                "tailwind": "<table class=\"w-full border-collapse border border-gray-300\">\n  <thead>\n    <tr>\n      <th class=\"border border-gray-300 p-2 text-left bg-gray-100\">ID</th>\n      <th class=\"border border-gray-300 p-2 text-left bg-gray-100\">Product</th>\n      <th class=\"border border-gray-300 p-2 text-left bg-gray-100\">Price</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class=\"hover:bg-blue-50\">\n      <td class=\"border border-gray-300 p-2\">#101</td>\n      <td class=\"border border-gray-300 p-2\">Widget A</td>\n      <td class=\"border border-gray-300 p-2\">$19.99</td>\n    </tr>\n    <tr class=\"hover:bg-blue-50\">\n      <td class=\"border border-gray-300 p-2\">#102</td>\n      <td class=\"border border-gray-300 p-2\">Gadget B</td>\n      <td class=\"border border-gray-300 p-2\">$29.99</td>\n    </tr>\n  </tbody>\n</table>"
            }
        },
        {
            "componentId": "table-03",
            "name": "Minimalist Table",
            "sourceDesignSystem": "Tailwind",
            "tags": ["table", "data", "minimalist", "clean"],
            "description": "A clean, minimalist table that only uses horizontal dividers between rows.",
            "category": "Data Display",
            "uxPattern": "Data Table",
            "visualStyle": ["minimalist", "flat"],
            "code": {
                "tailwind": "<table class=\"w-full text-left\">\n  <thead class=\"border-b-2 border-gray-200\">\n    <tr>\n      <th class=\"py-3 px-4 font-semibold text-sm\">User</th>\n      <th class=\"py-3 px-4 font-semibold text-sm\">Last Login</th>\n      <th class=\"py-3 px-4 font-semibold text-sm\">Actions</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class=\"border-b border-gray-200 hover:bg-gray-100\">\n      <td class=\"py-3 px-4\">user1@example.com</td>\n      <td class=\"py-3 px-4\">2 hours ago</td>\n      <td class=\"py-3 px-4 text-blue-500 cursor-pointer\">Edit</td>\n    </tr>\n    <tr class=\"border-b border-gray-200 hover:bg-gray-100\">\n      <td class=\"py-3 px-4\">user2@example.com</td>\n      <td class=\"py-3 px-4\">1 day ago</td>\n      <td class=\"py-3 px-4 text-blue-500 cursor-pointer\">Edit</td>\n    </tr>\n  </tbody>\n</table>"
            }
        },
        {
            "componentId": "table-04",
            "name": "Sticky Header Table",
            "sourceDesignSystem": "Tailwind",
            "tags": ["table", "data", "sticky", "scroll"],
            "description": "A table with a header that remains visible at the top as the user scrolls through the data. Requires a container with a set height and overflow.",
            "category": "Data Display",
            "uxPattern": "Data Table",
            "visualStyle": ["functional", "scrolling"],
            "code": {
                "tailwind": "<div class=\"h-64 w-full overflow-auto rounded-lg border\">\n  <table class=\"w-full text-sm text-left text-gray-500\">\n    <thead class=\"text-xs text-gray-700 uppercase bg-gray-100 sticky top-0\">\n      <tr>\n        <th scope=\"col\" class=\"px-6 py-3\">Date</th>\n        <th scope=\"col\" class=\"px-6 py-3\">Transaction ID</th>\n        <th scope=\"col\" class=\"px-6 py-3\">Amount</th>\n      </tr>\n    </thead>\n    <tbody>\n      \n      <tr class=\"bg-white border-b hover:bg-gray-50\">\n        <td class=\"px-6 py-4\">2025-07-22</td>\n        <td class=\"px-6 py-4\">TXN12345</td>\n        <td class=\"px-6 py-4\">$50.00</td>\n      </tr>\n      <tr class=\"bg-white border-b hover:bg-gray-50\">\n        <td class=\"px-6 py-4\">2025-07-21</td>\n        <td class=\"px-6 py-4\">TXN12346</td>\n        <td class=\"px-6 py-4\">$75.50</td>\n      </tr>\n    </tbody>\n  </table>\n</div>"
            }
        },
        {
            "componentId": "table-05",
            "name": "Responsive Card Table",
            "sourceDesignSystem": "Tailwind",
            "tags": ["table", "data", "responsive", "mobile"],
            "description": "A table that reflows into a 'card' layout on smaller screens for better mobile readability. Uses `hidden` and `flex` utilities with responsive prefixes.",
            "category": "Data Display",
            "uxPattern": "Responsive Data Table",
            "visualStyle": ["responsive", "adaptive"],
            "code": {
                "tailwind": "<div class=\"w-full\">\n  \n  <table class=\"min-w-full hidden md:table\">\n    <thead class=\"bg-gray-100\">\n      <tr><th class=\"p-3 text-left\">Name</th><th class=\"p-3 text-left\">Email</th></tr>\n    </thead>\n    <tbody>\n      <tr class=\"border-b hover:bg-gray-50\"><td class=\"p-3\">Alice</td><td class=\"p-3\">alice@email.com</td></tr>\n    </tbody>\n  </table>\n  \n  <div class=\"grid grid-cols-1 gap-4 md:hidden\">\n    <div class=\"bg-white p-4 rounded-lg shadow space-y-2\">\n      <div class=\"flex items-center space-x-2 text-sm\">\n        <div class=\"text-gray-500\">Name:</div>\n        <div>Alice</div>\n      </div>\n      <div class=\"flex items-center space-x-2 text-sm\">\n        <div class=\"text-gray-500\">Email:</div>\n        <div class=\"text-blue-500\">alice@email.com</div>\n      </div>\n    </div>\n  </div>\n</div>"
            }
        },
        {
            "componentId": "tabs-01",
            "name": "Underline Tabs",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tabs", "navigation", "selection"],
            "description": "Classic tabs where the active tab is indicated by a colored underline. State is managed by adding/removing the 'active' classes.",
            "category": "Navigation",
            "uxPattern": "Tabs",
            "visualStyle": ["minimalist", "classic"],
            "code": {
                "tailwind": "<div class=\"border-b border-gray-200\">\n  <nav class=\"-mb-px flex space-x-8\" aria-label=\"Tabs\">\n    \n    <a href=\"#\" class=\"whitespace-nowrap py-4 px-1 border-b-2 border-indigo-500 font-medium text-sm text-indigo-600\">Profile</a>\n    \n    <a href=\"#\" class=\"whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300\">Settings</a>\n    \n    <a href=\"#\" class=\"whitespace-nowrap py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-400 cursor-not-allowed\">Notifications</a>\n  </nav>\n</div>"
            }
        },
        {
            "componentId": "tabs-02",
            "name": "Pill-style Tabs",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tabs", "navigation", "pills", "selection"],
            "description": "Tabs where the active item has a solid, rounded background, resembling a pill.",
            "category": "Navigation",
            "uxPattern": "Tabs",
            "visualStyle": ["modern", "rounded"],
            "code": {
                "tailwind": "<div class=\"flex space-x-2 rounded-lg bg-gray-100 p-1\">\n  <button class=\"px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 transition\">Day</button>\n  <button class=\"px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm\">Week</button>\n  <button class=\"px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200 transition\">Month</button>\n</div>"
            }
        },
        {
            "componentId": "tabs-03",
            "name": "Tabs with Icons",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tabs", "navigation", "icons", "selection"],
            "description": "Tabs that include an icon alongside the text label for better visual communication.",
            "category": "Navigation",
            "uxPattern": "Tabs",
            "visualStyle": ["iconic", "functional"],
            "code": {
                "tailwind": "<div class=\"flex border-b\">\n  \n  <button class=\"flex items-center text-blue-600 border-b-2 border-blue-600 py-2 px-4 gap-2\">\n    <svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"></svg> My Account\n  </button>\n  \n  <button class=\"flex items-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 py-2 px-4 gap-2 transition\">\n     <svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"></svg> Company\n  </button>\n</div>"
            }
        },
        {
            "componentId": "tabs-04",
            "name": "Vertical Tabs",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tabs", "navigation", "vertical", "selection"],
            "description": "Tabs arranged vertically, often used in dashboard sidebars or complex settings pages.",
            "category": "Navigation",
            "uxPattern": "Tabs",
            "visualStyle": ["vertical", "sidebar"],
            "code": {
                "tailwind": "<div class=\"flex flex-col space-y-1\">\n  \n  <a href=\"#\" class=\"text-white bg-gray-900 rounded-md px-3 py-2 text-sm font-medium\">Dashboard</a>\n  \n  <a href=\"#\" class=\"text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium\">Team</a>\n  <a href=\"#\" class=\"text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium\">Projects</a>\n</div>"
            }
        },
        {
            "componentId": "tabs-05",
            "name": "Full-width Bar Tabs",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tabs", "navigation", "full-width"],
            "description": "Tabs that stretch to fill the full width of their container, with each tab taking up an equal amount of space.",
            "category": "Navigation",
            "uxPattern": "Tabs",
            "visualStyle": ["modern", "uniform"],
            "code": {
                "tailwind": "<div class=\"w-full bg-gray-200 rounded-lg\">\n  <nav class=\"flex justify-around space-x-1\">\n    <button class=\"text-gray-800 text-center flex-1 py-2 px-4 rounded-lg font-medium hover:bg-gray-300\">24h</button>\n    <button class=\"bg-white text-gray-900 shadow text-center flex-1 py-2 px-4 rounded-lg font-medium\">7d</button>\n    <button class=\"text-gray-800 text-center flex-1 py-2 px-4 rounded-lg font-medium hover:bg-gray-300\">30d</button>\n  </nav>\n</div>"
            }
        },
        {
            "componentId": "textarea-01",
            "name": "Standard Textarea",
            "sourceDesignSystem": "Tailwind",
            "tags": ["textarea", "input", "form", "text"],
            "description": "A standard textarea with styling for focus, hover, and disabled states.",
            "category": "Input",
            "uxPattern": "Textarea",
            "visualStyle": ["standard", "form"],
            "code": {
                "tailwind": "<textarea rows=\"4\" class=\"w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed\" placeholder=\"Enter your comment...\"></textarea>"
            }
        },
        {
            "componentId": "textarea-02",
            "name": "Invalid Textarea",
            "sourceDesignSystem": "Tailwind",
            "tags": ["textarea", "input", "form", "error", "validation"],
            "description": "A textarea styled to indicate an error or invalid input, typically used with form validation.",
            "category": "Input",
            "uxPattern": "Textarea",
            "visualStyle": ["error", "validation"],
            "code": {
                "tailwind": "<textarea rows=\"4\" class=\"w-full px-3 py-2 text-gray-700 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent\" placeholder=\"This field is required\"></textarea>"
            }
        },
        {
            "componentId": "textarea-03",
            "name": "Textarea with Character Counter",
            "sourceDesignSystem": "Tailwind",
            "tags": ["textarea", "input", "form", "counter"],
            "description": "A textarea component that includes a character count. Requires JavaScript to update the count.",
            "category": "Input",
            "uxPattern": "Character Counter",
            "visualStyle": ["functional", "form"],
            "code": {
                "tailwind": "<div>\n  <textarea rows=\"4\" maxlength=\"200\" class=\"w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400\" placeholder=\"Write a message...\"></textarea>\n  <p class=\"text-right text-sm text-gray-500 mt-1\">0/200</p>\n</div>"
            }
        },
        {
            "componentId": "textarea-04",
            "name": "Underline Textarea",
            "sourceDesignSystem": "Tailwind",
            "tags": ["textarea", "input", "form", "minimalist"],
            "description": "A minimalist textarea with no borders except for an underline, which becomes highlighted on focus.",
            "category": "Input",
            "uxPattern": "Textarea",
            "visualStyle": ["minimalist", "material-design"],
            "code": {
                "tailwind": "<textarea rows=\"3\" class=\"w-full bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600\" placeholder=\"Your thoughts...\"></textarea>"
            }
        },
        {
            "componentId": "textarea-05",
            "name": "Dark Mode Textarea",
            "sourceDesignSystem": "Tailwind",
            "tags": ["textarea", "input", "form", "dark"],
            "description": "A textarea specifically styled for use in dark-themed UIs.",
            "category": "Input",
            "uxPattern": "Textarea",
            "visualStyle": ["dark-mode", "form"],
            "code": {
                "tailwind": "<textarea rows=\"4\" class=\"w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-700 disabled:cursor-not-allowed\" placeholder=\"Type in the darkness...\"></textarea>"
            }
        },
        {
            "componentId": "togglegroup-01",
            "name": "Standard Toggle Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["toggle", "button-group", "segmented-control", "selection"],
            "description": "A group of buttons where one can be selected at a time, often used for view switching or filtering. JS is required to toggle the active class.",
            "category": "Input",
            "uxPattern": "Toggle Button",
            "visualStyle": ["button-group", "segmented"],
            "code": {
                "tailwind": "<div class=\"inline-flex rounded-md shadow-sm\" role=\"group\">\n  <button type=\"button\" class=\"px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500\">Left</button>\n  <button type=\"button\" class=\"px-4 py-2 text-sm font-medium text-white bg-blue-600 border-t border-b border-gray-200 hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-500\">Middle</button>\n  <button type=\"button\" class=\"px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500\">Right</button>\n</div>"
            }
        },
        {
            "componentId": "togglegroup-02",
            "name": "Icon-only Toggle Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["toggle", "button-group", "icon", "selection"],
            "description": "A compact toggle group using only icons, suitable for toolbars.",
            "category": "Input",
            "uxPattern": "Toggle Button",
            "visualStyle": ["iconic", "toolbar"],
            "code": {
                "tailwind": "<div class=\"inline-flex rounded-md bg-gray-100 p-1 space-x-1\">\n  \n  <button class=\"p-2 rounded bg-white text-blue-500 shadow-sm\"><svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"></svg></button>\n  \n  <button class=\"p-2 rounded text-gray-500 hover:bg-white hover:text-blue-500\"><svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"></svg></button>\n  <button class=\"p-2 rounded text-gray-500 hover:bg-white hover:text-blue-500\"><svg class=\"w-5 h-5\" fill=\"currentColor\" viewBox=\"0 0 20 20\"></svg></button>\n</div>"
            }
        },
        {
            "componentId": "togglegroup-03",
            "name": "Pill Outline Toggle Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["toggle", "button-group", "pill", "selection"],
            "description": "A toggle group with a pill shape where the selected item is filled and others are outlined.",
            "category": "Input",
            "uxPattern": "Toggle Button",
            "visualStyle": ["pill", "outline"],
            "code": {
                "tailwind": "<div class=\"flex space-x-2\">\n  \n  <button class=\"px-4 py-1.5 text-sm font-semibold text-gray-700 bg-transparent border-2 border-gray-300 rounded-full hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500\">Monthly</button>\n  \n  <button class=\"px-4 py-1.5 text-sm font-semibold text-white bg-gray-800 border-2 border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800\">Annually</button>\n</div>"
            }
        },
        {
            "componentId": "togglegroup-04",
            "name": "Vertical Toggle Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["toggle", "button-group", "vertical", "selection"],
            "description": "A set of toggle buttons stacked vertically, useful in sidebars or forms.",
            "category": "Input",
            "uxPattern": "Toggle Button",
            "visualStyle": ["vertical", "segmented"],
            "code": {
                "tailwind": "<div class=\"flex flex-col rounded-md shadow-sm\">\n  <button class=\"px-4 py-2 text-sm text-left font-medium text-gray-900 bg-white border border-gray-200 rounded-t-lg hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-blue-500\">Profile</button>\n  <button class=\"px-4 py-2 text-sm text-left font-medium text-white bg-blue-600 border-x border-gray-200 hover:bg-blue-700 focus:z-10 focus:ring-1 focus:ring-blue-500\">Settings</button>\n  <button class=\"px-4 py-2 text-sm text-left font-medium text-gray-900 bg-white border border-gray-200 rounded-b-lg hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-blue-500\">Billing</button>\n</div>"
            }
        },
        {
            "componentId": "togglegroup-05",
            "name": "Underline Toggle Group",
            "sourceDesignSystem": "Tailwind",
            "tags": ["toggle", "button-group", "underline", "selection"],
            "description": "A minimalist toggle group where the active state is indicated by a colored underline, similar to some tab designs.",
            "category": "Input",
            "uxPattern": "Toggle Button",
            "visualStyle": ["minimalist", "flat"],
            "code": {
                "tailwind": "<div class=\"flex items-center gap-x-6 border-b\">\n  \n  <button class=\"py-2 px-1 text-green-600 border-b-2 border-green-600 font-semibold\">Active</button>\n  \n  <button class=\"py-2 px-1 text-gray-500 font-medium hover:text-green-600\">Draft</button>\n  \n  <button class=\"py-2 px-1 text-gray-500 font-medium hover:text-green-600\">Archived</button>\n</div>"
            }
        },
        {
            "componentId": "tooltip-01",
            "name": "Basic Tooltip",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tooltip", "hint", "popover", "info"],
            "description": "A simple tooltip that appears on hover, providing brief, contextual information. Uses `group` and `group-hover` utilities.",
            "category": "Feedback",
            "uxPattern": "Tooltip",
            "visualStyle": ["minimalist", "on-hover"],
            "code": {
                "tailwind": "<span class=\"relative group\">\n  <button class=\"px-4 py-2 bg-gray-200 rounded-md\">Hover me</button>\n  <span class=\"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none\">\n    This is a tooltip.\n  </span>\n</span>"
            }
        },
        {
            "componentId": "tooltip-02",
            "name": "Tooltip with Arrow",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tooltip", "hint", "popover", "arrow"],
            "description": "A tooltip that includes a small triangular arrow pointing to the element it describes.",
            "category": "Feedback",
            "uxPattern": "Tooltip",
            "visualStyle": ["classic", "on-hover"],
            "code": {
                "tailwind": "<span class=\"relative group\">\n  <svg class=\"w-6 h-6 text-gray-500 cursor-pointer\" fill=\"currentColor\" viewBox=\"0 0 20 20\"></svg>\n  <span class=\"absolute -top-10 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-black text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none\">\n    Tooltip with arrow\n    <span class=\"absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black\"></span>\n  </span>\n</span>"
            }
        },
        {
            "componentId": "tooltip-03",
            "name": "Accessible Tooltip",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tooltip", "hint", "popover", "a11y", "focus"],
            "description": "A tooltip that appears on both hover and focus, making it accessible to keyboard users.",
            "category": "Feedback",
            "uxPattern": "Tooltip",
            "visualStyle": ["accessible", "functional"],
            "code": {
                "tailwind": "<span class=\"relative group\">\n  <button class=\"p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500\">?</button>\n  <span role=\"tooltip\" class=\"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none\">\n    Accessible for both keyboard and mouse users.\n  </span>\n</span>"
            }
        },
        {
            "componentId": "tooltip-04",
            "name": "Delayed Animated Tooltip",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tooltip", "hint", "popover", "animation", "delay"],
            "description": "A tooltip with a subtle animation and delay, preventing it from appearing distractingly on brief mouse-overs.",
            "category": "Feedback",
            "uxPattern": "Tooltip",
            "visualStyle": ["animated", "modern"],
            "code": {
                "tailwind": "<span class=\"relative group\">\n  <span class=\"underline decoration-dotted cursor-help\">Help</span>\n  <span class=\"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-white text-gray-800 text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 delay-200 pointer-events-none\">\n    This provides extra help.\n  </span>\n</span>"
            }
        },
        {
            "componentId": "tooltip-05",
            "name": "Right-aligned Tooltip",
            "sourceDesignSystem": "Tailwind",
            "tags": ["tooltip", "hint", "popover", "right"],
            "description": "A tooltip that appears to the right of the element, useful for items in a vertical list.",
            "category": "Feedback",
            "uxPattern": "Tooltip",
            "visualStyle": ["aligned", "on-hover"],
            "code": {
                "tailwind": "<span class=\"relative group\">\n  <button class=\"w-full text-left p-2 bg-gray-100 rounded\">Item</button>\n  <span class=\"absolute left-full top-1/2 -translate-y-1/2 ml-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none\">\n    Details for this item\n    <span class=\"absolute top-1/2 right-full -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-gray-800\"></span>\n  </span>\n</span>"
            }
        }
    ]






]

export const evenMoreButtons = [
    {
        "componentId": "neon-button-01",
        "name": "Neon Pink Inset Shadow Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "shadow"],
        "description": "A button that, on hover, expands its neon pink shadow and adds an inset white shadow, creating a subtle glow effect.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-1 bg-[#ff9aff] shadow-[0_0_5px_#ef97e8] hover:shadow-[0_0_10px_#ef97e8,_0_0_20px_#ef97e8,_inset_0_0_20px_#fff]\">Read More</button>"
        }
    },
    {
        "componentId": "neon-button-02",
        "name": "Neon Blue Inset Shadow Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "inset shadow"],
        "description": "A button with a neon blue border and shadow that, on hover, fills with a white background and expands the inset neon blue shadow.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-2 text-[#0bf4f3] border border-[#0bf4f3] shadow-[0_0_5px_#0bf4f3,_inset_0_0_5px_#0bf4f3] hover:text-white hover:shadow-[inset_0_0_10px_#0bf4f3,_inset_0_0_20px_#0bf4f3,_inset_0_0_20px_#0bf4f3]\">Read More</button>"
        }
    },
    {
        "componentId": "neon-button-03",
        "name": "Neon Blue Split Fill Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "fill"],
        "description": "A button with a solid neon blue background that, on hover, splits vertically and reveals the text, while adding a subtle shadow.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-3 bg-[#00aced] shadow-[0_0_5px_#00aced,_0_0_8px_#00aced] relative z-20 overflow-hidden group\">\n  Read More\n  <span class=\"absolute top-0 left-0 w-full h-1/2 bg-[#00aced] shadow-[0_0_5px_#00aced] transition-all duration-300 group-hover:h-0\"></span>\n  <span class=\"absolute bottom-0 left-0 w-full h-1/2 bg-[#00aced] shadow-[0_0_5px_#00aced] transition-all duration-300 group-hover:h-0\"></span>\n</button>",
            "css_for_tailwind_variants": "/* Additional CSS for Tailwind to handle pseudo-elements not directly convertible to utility classes */\n.btn-3:hover {\n  background-color: transparent;\n  color: #00aced;\n  box-shadow: 0 5px 3px -3px #00aced, 0 -5px 3px -3px #00aced,\n    0 5px 3px -3px #00aced, 0 -5px 3px -3px #00aced;\n}"
        }
    },
    {
        "componentId": "neon-button-04",
        "name": "Neon Green Outline Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "outline"],
        "description": "A button with a neon green border that, on hover, reveals an inner neon green outline.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-4 text-[#8ce436] border border-[#8ce436] shadow-[0_0_5px_#8ce436,_inset_0_0_5px_#8ce436] relative overflow-hidden group\">\n  Read More\n  <span class=\"absolute top-[5px] left-[6px] w-[90%] h-[70%] border border-[#8ce436] shadow-[inset_0_0_5px_#8ce436] opacity-0 transition-all duration-300 group-hover:opacity-100\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-05",
        "name": "Neon Cyan Border Expand Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "border"],
        "description": "A solid neon cyan button that, on hover, becomes transparent and expands top and bottom neon cyan borders.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-5 bg-[#21ebff] relative group hover:bg-transparent hover:text-[#21ebff]\">\n  <span>Read More</span>\n  <span class=\"absolute top-0 right-0 h-[2px] bg-[#21ebff] w-0 shadow-[0_0_5px_#21ebff,_inset_0_0_5px_#21ebff] transition-all duration-400 ease-all group-hover:w-full\"></span>\n  <span class=\"absolute bottom-0 left-0 h-[2px] bg-[#21ebff] w-0 shadow-[0_0_5px_#21ebff,_inset_0_0_5px_#21ebff] transition-all duration-400 ease-all group-hover:w-full\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-06",
        "name": "Neon Green Corner Expand Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "border"],
        "description": "A solid neon green button that, on hover, becomes transparent and expands neon green borders from its corners.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-6 bg-[#8ce436] shadow-[0_0_5px_#8ce436] relative group hover:bg-transparent\">\n  <span class=\"relative block w-full h-full\">\n    <span class=\"absolute right-0 top-0 h-0 w-[2px] bg-[#8ce436] shadow-[0_0_5px_#8ce436] transition-all duration-500 ease group-hover:h-full\"></span>\n    <span class=\"absolute left-0 bottom-0 h-0 w-[2px] bg-[#8ce436] shadow-[0_0_5px_#8ce436] transition-all duration-500 ease group-hover:h-full\"></span>\n    <span class=\"absolute left-0 top-0 w-0 h-[2px] bg-[#8ce436] shadow-[0_0_5px_#8ce436] transition-all duration-500 ease group-hover:w-full\"></span>\n    <span class=\"absolute right-0 bottom-0 w-0 h-[2px] bg-[#8ce436] shadow-[0_0_5px_#8ce436] transition-all duration-500 ease group-hover:w-full\"></span>\n    Read More\n  </span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-07",
        "name": "Neon Cyan L-Shape Reveal Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "border"],
        "description": "A transparent button with neon cyan text that, on hover, reveals L-shaped borders from its top-left and bottom-right corners.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-7 text-[#21ebff] relative group\">\n  <span class=\"relative block w-full h-full\">\n    <span class=\"absolute right-0 bottom-0 bg-[#21ebff] shadow-[0_0_5px_#21ebff] transition-all duration-300 ease w-[2px] h-1/2 group-hover:h-full\"></span>\n    <span class=\"absolute right-0 bottom-0 bg-[#21ebff] shadow-[0_0_5px_#21ebff] transition-all duration-300 ease w-[20%] h-[2px] group-hover:w-full\"></span>\n    <span class=\"absolute left-0 top-0 bg-[#21ebff] shadow-[0_0_5px_#21ebff] transition-all duration-300 ease w-[2px] h-1/2 group-hover:h-full\"></span>\n    <span class=\"absolute left-0 top-0 bg-[#21ebff] shadow-[0_0_5px_#21ebff] transition-all duration-300 ease w-[20%] h-[2px] group-hover:w-full\"></span>\n    Read More\n  </span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-08",
        "name": "Neon Pink Flip Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "3d", "flip"],
        "description": "A button with a neon pink border that, on hover, flips 180 degrees on its X-axis to reveal a solid neon pink background.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "3d"],
        "code": {
            "html": "<button class=\"custom-btn btn-8 text-white border border-[#ff9aff] shadow-[0_0_5px_#ff9aff,_inset_0_0_5px_#ff9aff] relative z-20 hover:text-[#ff9aff] group preserve-3d\">\n  Read More\n  <span class=\"absolute inset-0 bg-[#ff9aff] shadow-[0_0_5px_#ff9aff] z-[-1] origin-bottom transform-gpu rotate-x-0 transition-all duration-300 ease group-hover:rotate-x-[-180deg]\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-09",
        "name": "Neon Yellow Scale Rotate Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "scale", "rotate"],
        "description": "A button with a neon yellow border that, on hover, reveals a solid neon yellow background by scaling and rotating an overlay.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-9 text-[#fff352] border border-[#fff352] shadow-[0_0_5px_#fff352,_inset_0_0_5px_#fff352] relative z-20 overflow-hidden group hover:text-black\">\n  Read More\n  <span class=\"absolute inset-0 bg-transparent z-[-1] transition-all duration-300 ease group-hover:bg-[#fff352] group-hover:scale-[2] group-hover:rotate-180 group-hover:shadow-[4px_4px_6px_0_rgba(255,255,255,1),_-4px_-4px_6px_0_rgba(116,125,136,.2),_inset_-4px_-4px_6px_0_rgba(255,255,255,1),_inset_4px_4px_6px_0_rgba(116,125,136,.3)]\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-10",
        "name": "Neon Pink Scale Fill Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "scale", "fill"],
        "description": "A button with a neon pink border that, on hover, fills with a solid neon pink background by scaling an overlay from the center.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-10 border border-[#ff9aff] shadow-[0_0_5px_#ff9aff,_inset_0_0_5px_#ff9aff] text-[#ff9aff] bg-black relative z-20 overflow-hidden group hover:text-white\">\n  Read More\n  <span class=\"absolute inset-0 bg-[#ff9aff] z-[-1] transform-gpu scale-0 transition-all duration-300 ease group-hover:scale-100\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-11",
        "name": "Neon Cyan Text Glow Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "text glow"],
        "description": "A button with neon cyan text and border that, on hover, intensifies the text's neon glow effect.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-11 border border-[#21ebff] text-[#21ebff] shadow-[0_0_5px_#21ebff,_inset_0_0_5px_#21ebff] transition-all duration-300 ease hover:text-shadow-neon-cyan\">\n  Read More\n</button>",
            "css_for_tailwind_variants": "/* Custom Tailwind CSS for specific text shadow */\n.text-shadow-neon-cyan {\n  text-shadow:\n    0 0 20px #21ebff,\n    0 0 50px rgba(33, 235, 255, .9),\n    0 0 75px rgba(33, 235, 255, .8),\n    0 0 76px rgba(33, 235, 255, .7),\n    0 0 77px rgba(33, 235, 255, .6),\n    0 0 78px rgba(33, 235, 255, .5),\n    0 0 79px rgba(33, 235, 255, .4),\n    0 0 80px rgba(33, 235, 255, .3),\n    0 0 85px rgba(33, 235, 255, .2),\n    0 0 99px rgba(33, 235, 255, .1);\n}"
        }
    },
    {
        "componentId": "neon-button-12",
        "name": "Neon Blue 3D Flip Text Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "3d", "flip"],
        "description": "A button with neon blue text that, on hover, performs a 3D flip to reveal a different text, with a neon blue border and shadow.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "3d"],
        "code": {
            "html": "<button class=\"custom-btn btn-12 text-[#0bf4f3] relative right-[20px] bottom-[20px] border-none w-[130px] h-[40px] leading-[40px] perspective-[230px]\">\n  <span class=\"block absolute w-[130px] h-[40px] border border-[#0bf4f3] shadow-[0_0_5px_#0bf4f3,_inset_0_0_5px_#0bf4f3] text-center box-border transition-all duration-300 origin-[50%_50%_-20px] rotate-x-90 hover:rotate-x-0\">Click!</span>\n  <span class=\"block absolute w-[130px] h-[40px] border border-[#0bf4f3] shadow-[0_0_5px_#0bf4f3,_inset_0_0_5px_#0bf4f3] text-center box-border transition-all duration-300 origin-[50%_50%_-20px] rotate-x-0 group-hover:bg-black group-hover:text-black group-hover:rotate-x-[-90deg]\">Read More</span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-13",
        "name": "Neon Blue Bottom Fill Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "fill"],
        "description": "A button with neon blue text and border that, on hover, fills with a solid neon blue background from the bottom up.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-13 text-[#0bf4f3] shadow-[0_0_5px_#0bf4f3,_inset_0_0_5px_#0bf4f3] border border-[#0bf4f3] relative z-10 active:top-[2px] group\">\n  Read More\n  <span class=\"absolute bottom-0 left-0 w-full h-0 bg-transparent z-[-1] shadow-[0_0_5px_#0bf4f3,_inset_0_0_5px_#0bf4f3] transition-all duration-300 ease group-hover:top-0 group-hover:h-full\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-14",
        "name": "Neon Blue Expanding Corners Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "corners", "expand"],
        "description": "A transparent button with neon blue text that, on hover, expands its top-left and bottom-right corner borders to fill the entire button.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-14 relative text-[#00aced] border-none z-20 group\">\n  Read More\n  <span class=\"absolute top-0 left-0 w-1/5 h-1/5 border border-transparent border-t-[#00aced] border-l-[#00aced] z-[-1] transition-all duration-300 ease group-hover:border-[#00aced] group-hover:w-full group-hover:h-full group-hover:shadow-[0_0_5px_#00aced,_inset_0_0_5px_#00aced]\"></span>\n  <span class=\"absolute bottom-0 right-0 w-1/5 h-1/5 border border-transparent border-b-[#00aced] border-r-[#00aced] z-[-1] transition-all duration-300 ease group-hover:border-[#00aced] group-hover:w-full group-hover:h-full group-hover:shadow-[0_0_5px_#00aced,_inset_0_0_5px_#00aced]\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-15",
        "name": "Neon Pink Right Fill Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "fill"],
        "description": "A button with neon pink text and border that, on hover, fills with a solid neon pink background from right to left.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-15 text-[#ff9aff] border border-[#ff9aff] shadow-[0_0_5px_#ff9aff,_inset_0_0_5px_#ff9aff] relative z-10 active:top-[2px] group hover:text-white\">\n  Read More\n  <span class=\"absolute top-0 right-0 w-0 h-full bg-[#ff9aff] z-[-1] shadow-[0_0_20px_#ff9aff] transition-all duration-300 ease group-hover:left-0 group-hover:w-full\"></span>\n</button>"
        }
    },
    {
        "componentId": "neon-button-16",
        "name": "White Neon Inverse Fill Button",
        "sourceDesignSystem": "Tailwind CSS",
        "tags": ["hover", "neon", "fill"],
        "description": "A button with white neon text and border that, on hover, fills with a solid white background from right to left, creating an inverse neon effect.",
        "category": "Action",
        "uxPattern": "Hover Effect",
        "visualStyle": ["neon", "glowing"],
        "code": {
            "html": "<button class=\"custom-btn btn-16 border border-white shadow-[0_0_5px_#fff,_inset_0_0_5px_#fff] relative active:top-[2px] group hover:shadow-multiple-inset\">\n  <span>Read More</span>\n  <span class=\"absolute top-0 left-0 w-0 h-full bg-white z-[-1] direction-rtl shadow-[-7px_-7px_20px_0px_#fff9,_-4px_-4px_5px_0px_#fff9,_7px_7px_20px_0px_#0002,_4px_4px_5px_0px_#0001] transition-all duration-300 ease group-hover:left-auto group-hover:right-0 group-hover:w-full\"></span>\n</button>",
            "css_for_tailwind_variants": "/* Custom Tailwind CSS for multiple inset shadows on hover */\n.hover\\:shadow-multiple-inset:hover {\n  box-shadow: rgba(255,255,255, 1) -1px -1px, -2px -2px, rgba(255,255,255, 1) -3px -3px, rgba(255,255,255, .9) -4px -4px,\n    rgba(255,255,255,.8) -5px -5px, rgba(255,255,255,.7) -6px -6px, rgba(255,255,255,.6) -7px -7px, rgba(255,255,255,.5) -8px -8px,\n    rgba(255,255,255,.4) -9px -9px, rgba(255,255,255,.3) -10px -10px, rgba(255,255,255,.2) -11px -11px, rgba(255,255,255,.1) -12px -12px;\n}"
        }
    }
]