document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category-card');
    const riddleDisplay = document.querySelector('.bg-gray-50');
    const copyButton = document.getElementById('copy-riddle');
    const shareButton = document.getElementById('share-riddle');
    const generateButton = document.getElementById('generate-riddle');
    const recentRiddlesContainer = document.getElementById('recent-riddles');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryName = category.querySelector('h3').innerText;
            generateRiddle(categoryName);
        });
    });

    copyButton.addEventListener('click', () => {
        const riddleText = riddleDisplay.querySelector('p').innerText;
        navigator.clipboard.writeText(riddleText).then(() => {
            alert('Riddle copied to clipboard!');
        });
    });

    shareButton.addEventListener('click', () => {
        const riddleText = riddleDisplay.querySelector('p').innerText;
        if (navigator.share) {
            navigator.share({
                title: 'Riddle Generator',
                text: riddleText,
                url: window.location.href
            }).then(() => {
                console.log('Riddle shared successfully!');
            }).catch(err => {
                console.error('Error sharing the riddle:', err);
            });
        } else {
            alert('Sharing not supported in this browser.');
        }
    });

    generateButton.addEventListener('click', () => {
        const categoryName = 'Random'; // Placeholder for random category
        generateRiddle(categoryName);
    });

    function generateRiddle(category) {
        // Placeholder for riddle generation logic
        const riddles = {
            Logic: '"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"',
            Funny: '"What has keys but no locks, space but no room, and you can enter but not go in?"',
            Educational: '"I am taken from a mine and shut up in a wooden case, from which I am never released, and yet I am used by everyone. What am I?"',
            Spooky: '"What has a heart that doesn’t beat?"'
        };

        const riddle = riddles[category] || 'No riddle available for this category.';
        riddleDisplay.querySelector('#riddle-text').innerText = riddle;
        riddleDisplay.querySelector('#riddle-answer').innerText = `Answer: ${getAnswer(riddle)}`;
        riddleDisplay.querySelector('#riddle-category').innerText = `Category: ${category}`;

        addRecentRiddle(category, riddle);
    }

    function getAnswer(riddle) {
        const answers = {
            '"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"': 'An echo',
            '"What has keys but no locks, space but no room, and you can enter but not go in?"': 'A keyboard',
            '"I am taken from a mine and shut up in a wooden case, from which I am never released, and yet I am used by everyone. What am I?"': 'A pencil lead',
            '"What has a heart that doesn’t beat?"': 'An artichoke'
        };
        return answers[riddle] || 'Unknown';
    }

    function addRecentRiddle(category, riddle) {
        const recentRiddle = document.createElement('div');
        recentRiddle.className = 'bg-white rounded-lg shadow-sm border border-gray-200 p-4';
        recentRiddle.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-custom">
                    ${category}
                </span>
                <button class="text-gray-400 hover:text-gray-500">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <p class="text-gray-800 mb-2">${riddle}</p>
            <p class="text-gray-600 italic text-sm">Answer: ${getAnswer(riddle)}</p>
        `;
        recentRiddlesContainer.prepend(recentRiddle);
    }
});