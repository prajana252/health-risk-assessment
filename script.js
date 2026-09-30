```javascript
function assessHealth() {

    // Get values from the form
    const name = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);
    const bmi = Number(document.getElementById("bmi").value);
    const bp = Number(document.getElementById("bp").value);
    const glucose = Number(document.getElementById("glucose").value);
    const smoking = document.getElementById("smoking").value;
    const exercise = document.getElementById("exercise").value;
    const sleep = Number(document.getElementById("sleep").value);

    // Basic validation
    if (
        !name ||
        !age ||
        !bmi ||
        !bp ||
        !glucose ||
        !sleep
    ) {
        alert("Please complete all the fields before analyzing your health.");
        return;
    }

    if (
        age <= 0 ||
        bmi <= 0 ||
        bp <= 0 ||
        glucose <= 0 ||
        sleep <= 0
    ) {
        alert("Please enter valid positive values.");
        return;
    }

    // ==========================================
    // HEALTH SCORE
    // ==========================================

    let score = 100;

    // BMI
    if (bmi < 18.5) {
        score -= 10;
    } else if (bmi >= 25 && bmi < 30) {
        score -= 8;
    } else if (bmi >= 30) {
        score -= 15;
    }

    // Blood pressure
    if (bp >= 120 && bp < 130) {
        score -= 5;
    } else if (bp >= 130 && bp < 140) {
        score -= 10;
    } else if (bp >= 140) {
        score -= 15;
    }

    // Blood glucose
    if (glucose >= 100 && glucose < 126) {
        score -= 10;
    } else if (glucose >= 126) {
        score -= 15;
    }

    // Smoking
    if (smoking === "yes") {
        score -= 15;
    }

    // Exercise
    if (exercise === "no") {
        score -= 10;
    }

    // Sleep
    if (sleep < 6) {
        score -= 10;
    } else if (sleep < 7) {
        score -= 5;
    }

    // Age factor
    if (age >= 60) {
        score -= 5;
    }

    // Keep score between 0 and 100
    score = Math.max(0, Math.min(100, score));

    // ==========================================
    // RISK CATEGORY
    // ==========================================

    let risk;
    let summary;

    if (score >= 80) {

        risk = "LOW RISK";

        summary =
            "Your reported indicators are generally within healthier ranges. " +
            "Continue maintaining balanced habits and monitor your health regularly.";

    } else if (score >= 60) {

        risk = "MODERATE RISK";

        summary =
            "Some of your reported indicators could benefit from attention. " +
            "Consider improving lifestyle habits and discussing persistent concerns " +
            "with a qualified healthcare professional.";

    } else {

        risk = "HIGHER RISK";

        summary =
            "Several reported indicators may warrant closer attention. " +
            "Consider speaking with a qualified healthcare professional for " +
            "appropriate evaluation.";
    }

    // ==========================================
    // BMI STATUS
    // ==========================================

    let bmiStatus;

    if (bmi < 18.5) {
        bmiStatus = "Below typical range";
    } else if (bmi < 25) {
        bmiStatus = "Typical range";
    } else if (bmi < 30) {
        bmiStatus = "Above typical range";
    } else {
        bmiStatus = "High range";
    }

    // ==========================================
    // GLUCOSE STATUS
    // ==========================================

    let glucoseStatus;

    if (glucose < 100) {
        glucoseStatus = "Typical fasting range";
    } else if (glucose < 126) {
        glucoseStatus = "Elevated";
    } else {
        glucoseStatus = "High";
    }

    // ==========================================
    // BLOOD PRESSURE STATUS
    // ==========================================

    let bpStatus;

    if (bp < 120) {
        bpStatus = "Typical range";
    } else if (bp < 130) {
        bpStatus = "Elevated";
    } else if (bp < 140) {
        bpStatus = "High range";
    } else {
        bpStatus = "Very high range";
    }

    // ==========================================
    // SLEEP STATUS
    // ==========================================

    let sleepStatus;

    if (sleep >= 7 && sleep <= 9) {
        sleepStatus = "Recommended range";
    } else if (sleep < 7) {
        sleepStatus = "Below recommended range";
    } else {
        sleepStatus = "Above typical range";
    }

    // ==========================================
    // UPDATE RESULTS
    // ==========================================

    document.getElementById("score").textContent = score;
    document.getElementById("risk").textContent = risk;
    document.getElementById("summary").textContent = summary;

    document.getElementById("bmiResult").textContent = bmi.toFixed(1);
    document.getElementById("bmiStatus").textContent = bmiStatus;

    document.getElementById("glucoseResult").textContent = glucose;
    document.getElementById("glucoseStatus").textContent = glucoseStatus;

    document.getElementById("bpResult").textContent = bp;
    document.getElementById("bpStatus").textContent = bpStatus;

    document.getElementById("sleepResult").textContent = sleep + " hrs";
    document.getElementById("sleepStatus").textContent = sleepStatus;

    // ==========================================
    // SHOW RESULTS
    // ==========================================

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}
```
