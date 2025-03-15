let verses = [];

// Sample verses in Hebrew (BHS) and Greek (Nestle-Aland 28)
const hebrewVerses = [
    { original: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ", translation: "In the beginning God created the heavens and the earth", reference: "Genesis 1:1" },
    { original: "כִּי אֲנִי יְהוָה אֱלֹהֵיכֶן", translation: "For I am the Lord your God", reference: "Exodus 20:2" },
    { original: "שְׁמַע יִשְׂרָאֵל", translation: "Hear, O Israel", reference: "Deuteronomy 6:4" },
    { original: "וַיְהִי עֶרֶב וַיְהִי בֹקֶר", translation: "And there was evening, and there was morning", reference: "Genesis 1:5" }
];

const greekVerses = [
    { original: "Ἐγώ εἰμι ἡ ὁδός", translation: "I am the way", reference: "John 14:6" },
    { original: "Ἐγώ εἰμι ἡ ἀλήθεια", translation: "I am the truth", reference: "John 14:6" },
    { original: "Ἐγώ εἰμι ἡ ζωή", translation: "I am the life", reference: "John 14:6" },
    { original: "Ἀγάπη ἐστίν", translation: "Love is", reference: "1 John 4:8" },
    { original: "Πάντα ἔχω ἐν τῷ ἐνδυναμοῦντί με", translation: "I can do all things through Him who strengthens me", reference: "Philippians 4:13" },
    { original: "ὁ θεὸς ἀγάπη ἐστίν", translation: "God is love", reference: "1 John 4:8" },
    { original: "Ἐν ἀρχῇ ἦν ὁ Λόγος", translation: "In the beginning was the Word", reference: "John 1:1" },
    { original: "Ἐγὼ ἀναστὴσομαι", translation: "I will rise again", reference: "John 11:25" }
];

// Combine Hebrew and Greek verses into one array
verses = [...hebrewVerses, ...greekVerses];

function initializeQuiz() {
    let currentVerse = getRandomVerse();
    const verseElement = document.getElementById("verse");
    const translationInput = document.getElementById("translation-input");
    const feedbackElement = document.getElementById("feedback");
    const showAnswerButton = document.getElementById("show-answer");
    const refreshButton = document.getElementById("refresh-verse");

    verseElement.textContent = currentVerse.original;

    document.getElementById("submit-translation").addEventListener("click", () => {
        submitTranslation();
    });

    // Add event listener for Enter key
    translationInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action (new line)
            document.getElementById("submit-translation").click(); // Trigger the submit button
        }
    });

    function submitTranslation() {
        const userTranslation = translationInput.value;
        const feedback = analyzeTranslation(userTranslation, currentVerse.translation);
        
        feedbackElement.innerHTML = `
            <h3>Feedback:</h3>
            <p>${feedback.vocabulary.join(", ")}</p>
            <p>${feedback.grammar.join(", ")}</p>
        `;
        
        // Show the "Show Answer" button after submission
        showAnswerButton.style.display = "inline-block"; 
    }

    let answerShown = false; // Flag to track if the answer has been shown

    showAnswerButton.addEventListener("click", () => {
        if (!answerShown) { // Check if the answer has not been shown yet
            feedbackElement.innerHTML += `
                <h3>Correct Answer:</h3>
                <p>${currentVerse.translation} (${currentVerse.reference})</p>
            `;
            answerShown = true; // Set the flag to true after showing the answer
        }
    });

    refreshButton.addEventListener("click", () => {
        currentVerse = getRandomVerse();
        verseElement.textContent = currentVerse.original;
        translationInput.value = ""; // Clear the input
        feedbackElement.innerHTML = ""; // Clear feedback
        showAnswerButton.style.display = "none"; // Hide the show answer button
        answerShown = false; // Reset the flag for the new verse
    });
}

function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
}

function analyzeTranslation(userTranslation, correctTranslation) {
    // Basic analysis logic (you can expand this)
    const feedback = {
        vocabulary: [],
        grammar: []
    };

    // Normalize both translations to lowercase for comparison
    const normalizedUserTranslation = userTranslation.toLowerCase();
    const normalizedCorrectTranslation = correctTranslation.toLowerCase();

    // Example: Check for vocabulary accuracy
    if (normalizedUserTranslation !== normalizedCorrectTranslation) {
        feedback.vocabulary.push("Check your vocabulary.");
    }

    // Example: Check for grammar (this is a placeholder)
    if (userTranslation.split(" ").length !== correctTranslation.split(" ").length) {
        feedback.grammar.push("Check your grammar.");
    }

    // Allow for a range of lexical meanings (simple example)
    const userWords = normalizedUserTranslation.split(" ");
    const correctWords = normalizedCorrectTranslation.split(" ");
    const lexicalVariations = ["created", "made", "formed"]; // Example variations for "created"

    userWords.forEach(word => {
        if (lexicalVariations.includes(word)) {
            feedback.vocabulary.push(`"${word}" is a valid variation.`);
        }
    });

    return feedback;
}

// Initialize the quiz with the first verse
initializeQuiz(); 