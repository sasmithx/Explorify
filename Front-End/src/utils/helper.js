export const validateEmail = (email) => {
    const regex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};    

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};    

export const getEmptyCardMessage = (filterType) => {
    switch (filterType) {
        case "search":
            return `No results found for your search.`;

        case "date":
            return `No results found for your date range.`;    

        default:
            return `Start creating your first Travel Story! Click the 'Add' button to jot down your thoughts, ideas, and memories. Let's get started!`;
    }            
};