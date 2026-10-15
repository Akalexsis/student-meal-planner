// Defines questions and response types for user preferences form
export const preferencesMetadata = [
    {
        question : "What's Your Name?",
        subheading : "For a personalized experience, what would you like to be called?",
        input_type : "text",
        required : "true"
    },
    {
        question : "Preferred Cuisines",
        subheading : "To improve meal recommendations, select the cuisines you like most.",
        input_type : ["American", "Mexican", "Quick and Easy", "Indian", "Mediterranean", "Inexpensive", "Italian"],
        required : "true"
    },
    {
        question : "Monthly Budget",
        subheading : "To reach your financial goals, please enter your monthly budget.",
        input_type : "text",
        required : "true"
    },
]