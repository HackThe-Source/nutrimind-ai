document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nutrition-form');
    const resultsContainer = document.getElementById('results');
    const analyzeBtn = document.getElementById('analyze-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Button loading state
        const originalBtnText = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = '<span>Analyzing...</span>';
        analyzeBtn.disabled = true;

        // Collect inputs
        const data = {
            food: document.getElementById('food-item').value,
            time: document.getElementById('time-of-day').value,
            goal: document.getElementById('goal').value,
            mood: document.getElementById('mood').value,
            activity: document.getElementById('activity-level').value,
            pattern: document.getElementById('pattern').value
        };

        // Simulate AI processing delay
        setTimeout(() => {
            const analysis = analyzeNutrition(data);
            displayResults(analysis);
            
            analyzeBtn.innerHTML = originalBtnText;
            analyzeBtn.disabled = false;
            resultsContainer.style.display = 'block';
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });

    function analyzeNutrition(data) {
        let score = 50;
        let insight = "";
        let betterChoices = [];
        let smartTip = "";
        let encouragement = "";

        const foodLower = data.food.toLowerCase();
        
        // Simple scoring logic
        const healthyKeywords = ['salad', 'kale', 'quinoa', 'chicken breast', 'salmon', 'broccoli', 'oats', 'apple', 'berry', 'egg'];
        const unhealthyKeywords = ['burger', 'pizza', 'fries', 'soda', 'donut', 'fried', 'cake', 'candy', 'chips', 'pasta'];

        if (healthyKeywords.some(k => foodLower.includes(k))) score += 30;
        if (unhealthyKeywords.some(k => foodLower.includes(k))) score -= 30;

        // Context adjustments
        if (data.activity === 'high') score += 5;
        if (data.time === 'night' && unhealthyKeywords.some(k => foodLower.includes(k))) score -= 10;

        // Clamp score
        score = Math.max(0, Math.min(100, score));

        // Insight & Suggestions based on Goal
        if (data.goal === 'weight-loss') {
            insight = score > 60 ? "Great choice for keeping calories in check while staying full." : "High calorie density makes this tough for a deficit.";
            betterChoices = ["Grilled chicken wrap with greens", "Zucchini noodles with light pesto"];
            smartTip = "Try the 'half-plate' rule: fill half your plate with non-starchy veggies before adding the main.";
        } else if (data.goal === 'muscle-gain') {
            insight = score > 60 ? "Excellent protein source to fuel your muscle recovery." : "Needs more protein to support your high activity levels.";
            betterChoices = ["Greek yogurt with mixed berries & nuts", "Steak with sweet potato and greens"];
            smartTip = "Aim for 20-30g of protein in this window to maximize muscle protein synthesis.";
        } else {
            insight = score > 60 ? "Balanced and nutritious, supporting overall longevity." : "A bit processed for a regular meal, but okay as an occasional treat.";
            betterChoices = ["Mixed grain bowl with avocado", "Baked white fish with roasted vegetables"];
            smartTip = "Hydrate before you eat! Sometimes thirst is mistaken for hunger.";
        }

        // Pattern detection
        if (data.pattern.toLowerCase().includes('twice') || data.pattern.toLowerCase().includes('again')) {
            insight += " I noticed a recurring pattern here—consistency is key to your " + data.goal.replace('-', ' ') + " goal.";
        }

        // Tone based on Mood
        if (data.mood === 'stressed') {
            encouragement = "I know things are tough right now. You're doing your best, and one meal doesn't define your progress. Stay kind to yourself.";
        } else if (data.mood === 'tired') {
            encouragement = "Focus on easy, nourishing wins today. You've got this!";
        } else {
            encouragement = "Keep that momentum going! Every small choice adds up to a big transformation.";
        }

        return {
            score,
            insight,
            betterChoices,
            smartTip,
            encouragement
        };
    }

    function displayResults(analysis) {
        document.getElementById('res-score').innerText = `Health Score: ${analysis.score}/100`;
        document.getElementById('res-insight').innerText = analysis.insight;
        
        const choicesList = document.getElementById('res-choices');
        choicesList.innerHTML = '';
        analysis.betterChoices.forEach(choice => {
            const li = document.createElement('li');
            li.innerText = choice;
            choicesList.appendChild(li);
        });

        document.querySelector('#res-tip span').innerText = analysis.smartTip;
        document.getElementById('res-encouragement').innerText = analysis.encouragement;
    }
});
