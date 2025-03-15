const verses = [
    { original: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ", translation: "In the beginning God created the heavens and the earth", reference: "Genesis 1:1" },
    { original: "כִּי אֲנִי יְהוָה אֱלֹהֵיכֶן", translation: "For I am the Lord your God", reference: "Exodus 20:2" },
    // Add more verses as needed
];

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

    // Example: Check for vocabulary accuracy
    if (userTranslation !== correctTranslation) {
        feedback.vocabulary.push("Check your vocabulary.");
    }

    // Example: Check for grammar (this is a placeholder)
    if (userTranslation.split(" ").length !== correctTranslation.split(" ").length) {
        feedback.grammar.push("Check your grammar.");
    }

    return feedback;
}

document.addEventListener("DOMContentLoaded", () => {
    const verseElement = document.getElementById("verse");
    const translationInput = document.getElementById("translation-input");
    const feedbackElement = document.getElementById("feedback");
    const showAnswerButton = document.getElementById("show-answer");
    const refreshButton = document.getElementById("refresh-verse");

    let currentVerse = getRandomVerse();
    verseElement.textContent = currentVerse.original;

    document.getElementById("submit-translation").addEventListener("click", () => {
        submitTranslation();
    });

    // Add event listener for Enter key
    translationInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default action (new line)
            submitTranslation();
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
        
        // Show the "Show Answer" and "Refresh" buttons after submission
        showAnswerButton.style.display = "inline-block"; 
        refreshButton.style.display = "inline-block"; 
    }

    showAnswerButton.addEventListener("click", () => {
        feedbackElement.innerHTML += `
            <h3>Correct Answer:</h3>
            <p>${currentVerse.translation} (${currentVerse.reference})</p>
        `;
    });

    refreshButton.addEventListener("click", () => {
        currentVerse = getRandomVerse();
        verseElement.textContent = currentVerse.original;
        translationInput.value = ""; // Clear the input
        feedbackElement.innerHTML = ""; // Clear feedback
        showAnswerButton.style.display = "none"; // Hide the show answer button
        refreshButton.style.display = "none"; // Hide the refresh button
    });
}); 