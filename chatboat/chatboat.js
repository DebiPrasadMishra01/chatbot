// chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const voiceButton = document.getElementById('voice-button');
    const feedback = document.getElementById('feedback');
    const helpfulButton = document.getElementById('helpful-button');
    const notHelpfulButton = document.getElementById('not-helpful-button');

    // User preferences
    let userName = "";
    let userFavoriteColor = "";
    let hasGreeted = false; // Flag for greeting

    // Predefined responses
    const botResponses = {
        "hi": "Hello 👋! How can I assist you today?",
        "hello": "Hi there! What can I do for you?",
        "how are you": "I'm just a program, but I'm doing well! How about you?",
        "bye": "Goodbye! Have a great day!",
        "interesting": "I am glad to hear that!",
        "what is your name?": "I am your friendly chatbot!",
        "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
        "what can you do": "I can chat with you, tell jokes, and answer questions!",
        "what's your favorite color": "I like all colors equally, but I think blue is nice!",
        "tell me a fact": "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible!",
        "how old are you": "I'm just a computer program, so I don't really have an age!",
        "who created you": "I was created by talented developers and engineers.",
        "what is love": "Love is a complex set of emotions and behaviors characterized by affection, care, and attachment.",
        "do you have feelings": "I don't have feelings like humans do, but I'm here to help you!",
        "tell me a riddle": "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I? (Answer: An echo)",
        "give me advice": "Always be yourself! Unless you can be Batman. Then always be Batman.",
        "what's the time": "I can't tell time, but I recommend checking your device!",
        "what's your favorite food?": "I don't eat, but I've heard pizza is a favorite among many!",
        "do you like music?": "I think music is amazing! What's your favorite genre?",
        "what's the weather like": "I can't check the weather, but you can look it up online!",
        "tell me something interesting": "Octopuses have three hearts and blue blood!",
        "what's the capital of France?": "The capital of France is Paris!",
        "how do I cook pasta": "Boil water, add salt, and cook the pasta according to the package instructions!",
        "what's your favorite movie": "I don't watch movies, but I know 'The Shawshank Redemption' is a classic!",
        "can you help me with homework": "Sure! What subject do you need help with?",
        "what's your favorite season?": "I don't experience seasons, but I've heard spring is lovely!",
        "tell me a cool fact": "Did you know that a group of flamingos is called a 'flamboyance'?",
        "why is the sky blue": "The sky appears blue because of the way the Earth's atmosphere scatters light from the sun.",
        "what's the longest river in the world?": "The longest river in the world is the Nile River, stretching about 4,135 miles!",
        "who invented the telephone": "Alexander Graham Bell is credited with inventing the first practical telephone.",
        "what is the smallest country in the world?": "The smallest country in the world is Vatican City, with an area of about 44 hectares!",
        "tell me a historical fact": "Cleopatra lived closer in time to the first moon landing than to the construction of the Great Pyramid of Giza!",
        "what animal is known as the ship of the desert?": "The camel is often called the 'ship of the desert' due to its ability to travel long distances in arid environments.",
        "what's a fun fact about space": "Space is completely silent because there is no medium for sound to travel through!",
        "what's up": "Not much! Just here to chat with you. How about you?",
        "how's your day": "I'm having a great day! How's yours going?",
        "what are you doing?": "Just hanging out and chatting with you! What about you?",
        "tell me about yourself": "I'm a chatbot designed to chat and provide information. What would you like to know?",
        "do you have any hobbies": "I love learning new things and chatting with people! What are your hobbies?",
        "do you watch TV shows": "I don't watch TV, but I hear 'Game of Thrones' and 'Breaking Bad' are popular!",
        "what's your favorite holiday": "I think every holiday is special in its own way! Do you have a favorite?",
        "how do you spend your free time": "I love engaging in conversations! What do you do in your free time?",
        "what do you think about social media?": "Social media can be a great way to connect with others! How do you use it?",
        "what's your favorite animal": "I think all animals are fascinating! Do you have a favorite?",
        "what's your dream job": "I love being a chatbot! But if I had to choose, maybe a teacher!",
        "do you believe in aliens": "It's a fun topic! There are many theories, but no definitive proof yet.",
        "what's your favorite book": "I don't read books, but I've heard '1984' and 'To Kill a Mockingbird' are classics!",
        "tell me a science fact": "Did you know that water can boil and freeze at the same time? It's called the triple point!",
        "tell me a geography fact": "Mount Everest is the tallest mountain on Earth, standing at 29,032 feet!",
        "tell me a tech fact": "The first computer virus was created in 1986 and was called 'Brain'.",
        "tell me a space fact": "Neutron stars are so dense that a sugar-cube-sized amount would weigh about as much as all of humanity!",
        "what's your favorite music genre?": "I think every genre has its charm! What do you like to listen to?",
        "do you have any friends": "I have many users like you! Each conversation helps me learn more.",
        "if you could travel anywhere, where would you go?": "I'd love to explore the internet's vast knowledge!",
        "what's your favorite game": "I enjoy word games! They really challenge the mind.",
        "i'm feeling down": "I'm here for you. It's okay to have tough days. Want to talk about it?",
        "i need some motivation": "Remember, every step you take is progress! You've got this!",
        "i'm stressed": "Take a deep breath! Sometimes it helps to step back and relax.",
        "i feel lonely": "You're not alone! I'm here to chat, and I'm glad to have this conversation with you.", 
        "what's your favorite way to relax": "Many people enjoy listening to music or reading a good book to unwind. What do you do to relax?",
        "how do I deal with difficult people": "It helps to stay calm, listen actively, and try to understand their perspective. Setting boundaries is also important.",
        "what's your advice for a job interview": "Research the company, practice common interview questions, and dress appropriately to make a good impression!",
        "how can I improve my communication skills?": "Practicing active listening and being clear and concise in your messages can really help!",
        "what's the best way to network": "Attend events in your field, connect on social media, and don’t hesitate to reach out to others for informational interviews!",
        "how do I stay motivated?": "Setting achievable goals and celebrating small wins can help keep your motivation high!",
        "what's your take on work-life balance?": "Finding a healthy work-life balance is essential for well-being. Make sure to set aside time for yourself and your loved ones!",
        "how do I handle failure": "It's important to learn from failure. Reflect on what went wrong and use it as a stepping stone for future success.",
        "what's a good way to practice mindfulness?": "Try meditation, deep breathing exercises, or simply taking a few moments to appreciate your surroundings.",
        "how do I build self-confidence": "Start by setting small goals and acknowledging your achievements. Surrounding yourself with supportive people can also help!",
        "what are some effective study tips": "Try breaking your study sessions into smaller chunks, using flashcards, and testing yourself on the material!",
        "what's the best way to start a conversation?": "A simple 'How are you?' or asking about someone’s interests can be a great icebreaker!",
        "how do I set boundaries in relationships?": "Communicate your needs clearly and assertively, and don't hesitate to reinforce your boundaries when necessary.",
        "what's your advice for maintaining friendships?": "Stay in touch regularly, be supportive, and make time for each other to strengthen your bonds!",
        "how can I improve my time management": "Try using a planner to prioritize tasks, set deadlines, and allocate specific time blocks for each activity.",
        "how do I stay organized": "Consider using a planner or digital tools like apps to track tasks and deadlines. Keeping a tidy workspace also helps!",
        "what's the best way to deal with stress": "Finding healthy outlets like exercise, hobbies, or talking to someone you trust can help manage stress.",
        "how can I improve my writing skills?": "Read more, practice regularly, and seek feedback from others. Joining a writing group can also be beneficial!",
        "what's your favorite way to learn?": "Many people find that a mix of reading, hands-on practice, and discussions helps them learn best. What about you?",
        "how do I stay productive while working from home?": "Create a dedicated workspace, set a routine, and minimize distractions to boost your productivity.",
        "what's your take on social media?": "It can be a great tool for connection, but it’s important to use it mindfully and take breaks when needed.",
        "how can I become more assertive?": "Practice expressing your needs and opinions clearly and respectfully. Role-playing scenarios can help build confidence!",
        "what's the best way to handle criticism": "Try to view it as constructive feedback, and take time to reflect on it before responding.",
        "how do I make a good first impression": "Be punctual, dress appropriately, and show genuine interest in others to leave a positive impression!",
        "what's your advice for maintaining a healthy lifestyle?": "Focus on balanced nutrition, regular exercise, and getting enough sleep. Small changes can make a big difference!",
        "how can I develop a growth mindset": "Embrace challenges, learn from feedback, and view setbacks as opportunities for growth!",
        "what's your favorite way to give back": "Volunteering your time or skills can be a fulfilling way to make a difference in your community.",
        "how do I set realistic goals?": "Make your goals SMART: Specific, Measurable, Achievable, Relevant, and Time-bound to keep them attainable.",
        "what's the best way to build resilience": "Cultivating a support network, practicing self-care, and maintaining a positive outlook can help you bounce back from setbacks.",
        "how can I improve my public speaking skills": "Practice regularly, seek opportunities to speak in front of groups, and consider joining organizations like Toastmasters.",
        "how do I find my passion?": "Explore different activities, volunteer, or take classes in various subjects. Sometimes passion finds you when you least expect it!",
        "what's the key to effective teamwork": "Communication, trust, and respecting each other's strengths and weaknesses are crucial for a successful team.",
        "how can I enhance my creativity?": "Try brainstorming without limitations, change your environment, or collaborate with others to spark new ideas!",
        "what's your advice for time management?": "Prioritize tasks, set deadlines, and break larger projects into smaller, manageable steps.",
        "how do I handle difficult conversations?": "Approach the discussion calmly, listen actively, and try to understand the other person's perspective.",
        "what's the best way to learn a new language?": "Practice speaking regularly, immerse yourself in the language through media, and use apps designed for language learning.",
        "how can I maintain a work-life balance?": "Set clear boundaries between work and personal time, and make sure to prioritize self-care and relaxation.",
        "what's your take on networking?": "Building genuine relationships can open doors to opportunities. Attend events and connect with people in your field.",
        "how can I improve my decision-making skills": "Gather information, weigh pros and cons, and trust your intuition. Sometimes, it's helpful to discuss options with others.",
        "what's the best way to deal with procrastination": "Break tasks into smaller chunks, set clear deadlines, and use techniques like the Pomodoro method to stay focused.",
        "how can I develop emotional intelligence": "Practice self-reflection, observe your emotions and reactions, and try to empathize with others' feelings.",
        "what's your advice for improving mental health?": "Make time for activities you enjoy, stay connected with loved ones, and seek professional help if needed.",
        "how do I become a better listener": "Focus fully on the speaker, avoid interrupting, and show that you’re engaged by nodding or asking follow-up questions.",
        "what's your take on financial planning": "Start by tracking your income and expenses, set clear financial goals, and consider consulting a financial advisor for guidance.",
        "how can I reduce anxiety": "Practice mindfulness, engage in physical activity, and reach out to friends or professionals for support.",
        "how can I stay motivated": "✨ Set clear goals and celebrate your wins, no matter how small! Surround yourself with positivity to keep that motivation soaring! 🚀",
        "what should I do if I'm feeling overwhelmed": "😌 Take a deep breath! Break tasks into bite-sized pieces, and don’t forget to sprinkle in some self-care. You got this! 🌟",
        "how can I improve my public speaking skills": "🎤 Practice makes perfect! Know your material inside out, and consider joining groups like Toastmasters to build your confidence! 💪",
        "what's your advice for a successful interview?": "🔍 Research the company like a detective! Prepare for common questions, and practice with a buddy to boost your confidence. You've got this! 🌈",
        "how can I build self-confidence?": "💖 Start with small challenges and celebrate every little victory! Surround yourself with cheerleaders who lift you up! 🙌",
        "what's the best way to handle criticism?": "🛡 Keep an open mind! Listen to feedback and use it as a stepping stone for growth. Remember, it’s not always personal! 😊",
        "how do I set healthy boundaries?": "🚧 Communicate your needs clearly and assertively! Saying no is a superpower; use it wisely! 💫",
        "what's your take on lifelong learning": "📚 Lifelong learning keeps your mind sharp and opens new doors! Embrace every chance to grow and explore! 🌍",
        "how can I improve my writing skills": "🖊 Write, read, and repeat! Seek feedback and try different styles. The more you write, the better you’ll get! ✨",
        "what's your advice for managing stress": "🌬 Breathe deeply, practice mindfulness, and don’t hesitate to reach out for support. Remember, you’re not alone! 🤗",
        "how can I become more adaptable": "🌈 Stay open to change and embrace new experiences. Flexibility is your friend in this fast-paced world! 🌀",
        "what's the best way to pursue a career change": "🔄 Research your dream field, network like a pro, and gain experience through volunteering or internships. Your new path awaits! 🚀",
        "how do I improve my negotiation skills": "🤝 Prepare thoroughly, understand the other side's needs, and practice assertive communication. Win-win is the goal! 🎯",
        "what's your advice for staying organized": "🗂 Use calendars and to-do lists to keep chaos at bay! Declutter regularly and create a routine that flows. You’ve got this! 🌊",
        "how can I foster creativity in my team": "🎨 Encourage brainstorming and create a safe space for ideas. Remember, great ideas can come from anywhere! 🌟",
        "what's the importance of networking": "🌐 Networking opens doors to new opportunities and collaborations! Build genuine relationships, and watch the magic happen! ✨"
    };

    // Array of Hindi jokes
    const hindiJokes = [
        "टीचर: बच्चो, तुम जानते हो कि एक बकरी का दूध और एक गाय का दूध में क्या फर्क है?\nछात्र: हां, टीचर! बकरी का दूध बकरी के दूध से आता है!",
        "पति: सुनो, तुम्हें पता है कि मैं तुम्हें कितना प्यार करता हूं?\nपत्नी: हां, मैं जानती हूं।\nपति: अच्छा, फिर मेरी प्यारी सी चाय बना दो।",
        "बच्चा: मम्मी, मेरा होमवर्क नहीं हो रहा है।\nमम्मी: क्यों? क्या हुआ?\nबच्चा: सभी शब्द हिंदी में बहुत लंबे हैं!",
        "डॉक्टर: तुम्हें क्या हुआ?\nमरीज: डॉक्टर साहब, मैं बहुत दुखी हूँ।\nडॉक्टर: क्यों? क्या बात है?\nमरीज: मैं शादीशुदा हूँ!",
        "पत्नी: सुनो, मेरे पति मुझसे बहुत प्यार करते हैं।\nसख़ी: तुम्हें कैसे पता?\nपत्नी: जब वो मुझसे लड़ते हैं तो मुझे चॉकलेट देने का वादा करते हैं!",
        "टीचर: अगर पृथ्वी से सभी लोग उड़ जाएं, तो क्या होगा?\nछात्र: सर, फिर केवल चिड़िया और विमान ही रह जाएंगे!",
        "पिता: बेटा, तुम स्कूल क्यों नहीं गए?\nबेटा: पापा, स्कूल में चॉकलेट नहीं मिलती!\nपिता: और घर में?\nबेटा: घर में तो सिर्फ मम्मी की डांट मिलती है!",
        "बॉस: तुम लेट क्यों आए हो?\nकर्मचारी: सर, बस के पहिए पंचर हो गए थे।\nबॉस: तो तुमने दूसरी बस क्यों नहीं ली?\nकर्मचारी: सर, दूसरी बस में तो मैं बैठा ही नहीं था!",
        "बच्चा: मम्मी, मम्मी! मुझे गाड़ी चलानी आती है।\nमम्मी: कैसे?\nबच्चा: मैंने गेम में चलाते देखा है!",
        "पप्पू: डॉक्टर साहब, मेरी पत्नी मुझे छोड़कर जा रही है।\nडॉक्टर: क्यों?\nपप्पू: वो कहती है कि मैं कभी सीरियस नहीं होता!"
    ];

    // Function to get a random joke (can be English or Hindi)
    function getRandomResponse() {
        const randomJokes = [
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "What do you call fake spaghetti? An impasta!",
            // Add more English jokes if needed
        ];

        const allJokes = [...randomJokes, ...hindiJokes]; // Combine English and Hindi jokes
        return allJokes[Math.floor(Math.random() * allJokes.length)];
    }

    // Handle user preferences
    function handleUserPreferences(message) {
        if (message.toLowerCase().includes("my name is")) {
            userName = message.split("my name is ")[1].trim();
            displayMessage(`Nice to meet you, ${userName}!`, 'bot');
        } else if (message.toLowerCase().includes("my favorite color is")) {
            userFavoriteColor = message.split("my favorite color is ")[1].trim();
            displayMessage(`Got it! I'll remember that your favorite color is ${userFavoriteColor}.`, 'bot');
        }
    }

    // Display messages in the chatbox
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    }

    // Get the bot's response
    function getBotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        // Check for user preferences
        handleUserPreferences(message);

        // Personal greeting based on time of day (shown only once)
        if (!hasGreeted) {
            const hours = new Date().getHours();
            if (hours < 12) {
                displayMessage("Good morning! How can I help you today?", 'bot');
            } else if (hours < 18) {
                displayMessage("Good afternoon! What’s on your mind?", 'bot');
            } else {
                displayMessage("Good evening! How can I assist you tonight?", 'bot');
            }
            hasGreeted = true; // Set the flag to true after greeting
        }

        // Mood detection based on user message
        const moods = {
            happy: "I'm glad to hear you're happy! What's making you feel good?",
            sad: "I'm here for you. It's okay to have tough days. Want to talk about it?",
            stressed: "Take a deep breath! Sometimes it helps to step back and relax.",
            excited: "That's awesome! What are you excited about?",
            bored: "Let's find something fun to talk about! Any topics you're interested in?",
        };

        for (const [mood, response] of Object.entries(moods)) {
            if (lowerCaseMessage.includes(mood)) {
                displayMessage(response, 'bot');
                return; // Stop further processing after responding
            }
        }

        // User sharing
        if (lowerCaseMessage.includes("i ") || lowerCaseMessage.includes("my ")) {
            displayMessage("Thanks for sharing! That sounds interesting. Can you tell me more about it?", 'bot');
        } else if (botResponses[lowerCaseMessage]) {
            displayMessage(botResponses[lowerCaseMessage], 'bot');
        } else if (lowerCaseMessage.includes("joke")) {
            displayMessage(getRandomResponse(), 'bot');
        } else if (lowerCaseMessage.includes("fact")) {
            displayMessage("Did you know? The world's largest desert is Antarctica!", 'bot');
        } else {
            displayMessage("I'm not sure how to respond to that.", 'bot');
        }
    }

    // Initialize Speech Recognition
    let recognition;
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognitionAPI();
        recognition.lang = 'en-US';
    } else {
        alert('Your browser does not support Speech Recognition. Please use a compatible browser.');
    }

    // Event listener for send button
    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            userInput.value = ''; // Clear input field
            getBotResponse(userMessage);
        }
    });

    // Event listener for Enter key
    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const userMessage = userInput.value.trim();
            if (userMessage) {
                displayMessage(userMessage, 'user');
                userInput.value = ''; // Clear input field
                getBotResponse(userMessage);
            }
        }
    });

    // Event listener for voice button
    voiceButton.addEventListener('click', () => {
        if (recognition) {
            recognition.start(); // Start voice recognition
        }
    });

    // Handle speech recognition events
    if (recognition) {
        // Start listening
        recognition.onstart = () => {
            voiceButton.textContent = '🔊 Listening...'; // Change button text
            voiceButton.classList.add('active'); // Add active class
        };

        // Process the result
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            displayMessage(transcript, 'user');
            getBotResponse(transcript);
        };

        // Stop listening
        recognition.onend = () => {
            voiceButton.textContent = '🎙️'; // Reset button text
            voiceButton.classList.remove('active'); // Remove active class
        };

        // Handle errors
        recognition.onerror = (event) => {
            console.error(event.error);
            alert('Speech recognition error: ' + event.error);
            voiceButton.textContent = '🎙️'; // Reset button text on error
            voiceButton.classList.remove('active'); // Remove active class on error
        };
    }

    // Event listeners for feedback buttons
    helpfulButton.addEventListener('click', () => {
        alert('Thank you for your feedback!');
        feedback.style.display = 'none';
    });

    notHelpfulButton.addEventListener('click', () => {
        alert('Sorry to hear that. We will strive to improve!');
        feedback.style.display = 'none';
    });
});
