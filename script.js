/* Vitala AI — client-side educational assessment. No entries are sent to a server. */
const form = document.getElementById("assessmentForm");
const errorBox = document.getElementById("formError");
const results = document.getElementById("results");
let latestReport = null;

const $ = (id) => document.getElementById(id);
const numberValue = (id) => Number($(id).value);

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  errorBox.scrollIntoView({behavior: "smooth", block: "center"});
}
function clearError() { errorBox.hidden = true; errorBox.textContent = ""; }

function validate(data) {
  if (!Number.isFinite(data.age) || !Number.isFinite(data.bmi) ||
      !Number.isFinite(data.bp) || !Number.isFinite(data.glucose) ||
      !Number.isFinite(data.sleep) || !data.age || !data.bmi ||
      !data.bp || !data.glucose || !data.sleep) {
    return "Please complete every required numeric field using valid numbers.";
  }
  if (data.age < 1 || data.age > 120) return "Please enter an age between 1 and 120 years.";
  if (data.bmi < 10 || data.bmi > 80) return "Please enter a BMI between 10 and 80.";
  if (data.bp < 50 || data.bp > 300) return "Please enter a systolic blood pressure between 50 and 300 mmHg.";
  if (data.glucose < 20 || data.glucose > 700) return "Please enter a glucose value between 20 and 700 mg/dL.";
  if (data.sleep < 0.5 || data.sleep > 24) return "Please enter sleep between 0.5 and 24 hours.";
  return "";
}

function assess(data) {
  let score = 100;
  const factors = [];
  function addFactor(label, points, detail) {
    score -= points;
    factors.push({label, points, detail});
  }
  if (data.bmi < 18.5) addFactor("BMI", 10, "Below the typical adult BMI range");
  else if (data.bmi >= 30) addFactor("BMI", 15, "BMI at or above 30");
  else if (data.bmi >= 25) addFactor("BMI", 8, "BMI between 25 and 29.9");
  else factors.push({label:"BMI", points:0, detail:"No score deduction under this project's rule"});

  if (data.bp >= 140) addFactor("Systolic blood pressure", 15, "140 mmHg or higher in this project's rule");
  else if (data.bp >= 130) addFactor("Systolic blood pressure", 10, "130–139 mmHg in this project's rule");
  else if (data.bp >= 120) addFactor("Systolic blood pressure", 5, "120–129 mmHg in this project's rule");
  else factors.push({label:"Systolic blood pressure", points:0, detail:"No score deduction under this project's rule"});

  if (data.glucose >= 126) addFactor("Blood glucose", 15, "126 mg/dL or higher; interpretation depends on test context");
  else if (data.glucose >= 100) addFactor("Blood glucose", 10, "100–125 mg/dL; interpretation depends on test context");
  else factors.push({label:"Blood glucose", points:0, detail:"Below 100 mg/dL; fasting status and context matter"});

  if (data.smoking === "yes") addFactor("Smoking", 15, "Smoking selected");
  else factors.push({label:"Smoking", points:0, detail:"No smoking selected"});

  if (data.exercise === "no") addFactor("Exercise", 10, "Rarely exercises selected");
  else factors.push({label:"Exercise", points:0, detail:"Regular exercise selected"});

  if (data.sleep < 6) addFactor("Sleep", 10, "Less than 6 hours per night");
  else if (data.sleep < 7) addFactor("Sleep", 5, "6 to under 7 hours per night");
  else factors.push({label:"Sleep", points:0, detail:"7 hours or more; individual needs vary"});

  if (data.age >= 60) addFactor("Age", 5, "Age 60 or above in this project's rule");
  else factors.push({label:"Age", points:0, detail:"No score deduction under this project's rule"});

  score = Math.max(0, Math.min(100, score));
  const category = score >= 80 ? "Higher score" : score >= 60 ? "Mid-range score" : "Lower score";
  const summary = score >= 80
    ? "Your entered values result in a higher score under this project's custom rules. This does not confirm that you are healthy."
    : score >= 60
      ? "Some entered values trigger deductions in this project's rules. Review the factor breakdown and seek professional guidance for concerns."
      : "Several entered values trigger deductions in this project's rules. This is not a diagnosis; consider reviewing concerns with a qualified healthcare professional.";
  return {score, category, summary, factors};
}

function bmiStatus(bmi) {
  if (bmi < 18.5) return "Below typical adult range";
  if (bmi < 25) return "Typical adult range";
  if (bmi < 30) return "Above typical adult range";
  return "BMI 30 or above";
}
function bpStatus(bp) {
  if (bp < 120) return "Below 120 systolic";
  if (bp < 130) return "Elevated range in this demo";
  if (bp < 140) return "Higher range in this demo";
  return "High reading; context matters";
}
function glucoseStatus(glucose) {
  if (glucose < 100) return "Below 100 mg/dL";
  if (glucose < 126) return "100–125 mg/dL";
  return "126 mg/dL or higher";
}
function sleepStatus(sleep) {
  if (sleep < 6) return "Under 6 hours";
  if (sleep < 7) return "6 to under 7 hours";
  if (sleep <= 9) return "7–9 hours";
  return "Over 9 hours";
}

function renderResults(data, assessment) {
  latestReport = {data, assessment, createdAt: new Date().toLocaleString()};
  $("resultTitle").textContent = data.name ? `${data.name}'s health snapshot.` : "Your health snapshot.";
  $("score").textContent = assessment.score;
  $("risk").textContent = assessment.category;
  $("summary").textContent = assessment.summary;
  $("scoreRing").style.background = `conic-gradient(var(--blue) 0deg, var(--purple) ${assessment.score * 3.6}deg, #ffffff0c ${assessment.score * 3.6}deg)`;
  $("bmiResult").textContent = data.bmi.toFixed(1);
  $("bmiStatus").textContent = bmiStatus(data.bmi);
  $("bpResult").textContent = `${data.bp} mmHg`;
  $("bpStatus").textContent = bpStatus(data.bp);
  $("glucoseResult").textContent = `${data.glucose} mg/dL`;
  $("glucoseStatus").textContent = glucoseStatus(data.glucose);
  $("sleepResult").textContent = `${data.sleep} hrs`;
  $("sleepStatus").textContent = sleepStatus(data.sleep);

  const factorList = $("factorList");
  factorList.replaceChildren();
  assessment.factors.forEach((factor) => {
    const row = document.createElement("div");
    row.className = "factor-item";
    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "factor-label";
    title.textContent = factor.label;
    const detail = document.createElement("small");
    detail.className = "factor-detail";
    detail.textContent = factor.detail;
    left.append(title, detail);
    const points = document.createElement("strong");
    points.className = "factor-points";
    points.textContent = factor.points ? `−${factor.points} points` : "0 points";
    const bar = document.createElement("div");
    bar.className = "factor-bar";
    const fill = document.createElement("span");
    fill.style.width = `${factor.points / 15 * 100}%`;
    bar.append(fill);
    row.append(left, points, bar);
    factorList.append(row);
  });

  const recs = [];
  if (data.smoking === "yes") recs.push("If you smoke and want to quit, a healthcare professional can help you explore evidence-based support.");
  if (data.exercise === "no") recs.push("Consider asking a professional about a safe, gradual way to add movement that suits your abilities.");
  if (data.sleep < 7) recs.push("A consistent sleep routine may help; seek advice if sleep problems persist.");
  if (data.bmi < 18.5 || data.bmi >= 25) recs.push("BMI is a broad screening measure and does not describe body composition or overall health by itself.");
  if (data.bp >= 130) recs.push("Blood pressure varies and needs proper measurement; discuss repeated high readings with a healthcare professional.");
  if (data.glucose >= 100) recs.push("Glucose interpretation depends on whether the test was fasting and on your medical context. Ask a clinician about your result.");
  if (!recs.length) recs.push("Keep building sustainable habits, use properly measured health readings, and discuss any concerns with a qualified professional.");
  $("recommendations").textContent = recs.join(" ");

  results.hidden = false;
  results.scrollIntoView({behavior: "smooth", block: "start"});
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();
  const data = {
    name: $("name").value.trim(),
    age: numberValue("age"), bmi: numberValue("bmi"),
    bp: numberValue("bp"), glucose: numberValue("glucose"),
    smoking: form.elements.smoking.value,
    exercise: form.elements.exercise.value,
    sleep: numberValue("sleep")
  };
  const error = validate(data);
  if (error) { showError(error); return; }
  const assessment = assess(data);
  renderResults(data, assessment);
});

function reportText() {
  if (!latestReport) return "";
  const {data, assessment, createdAt} = latestReport;
  return [
    "VITALA.AI — EDUCATIONAL HEALTH INDICATOR SNAPSHOT",
    `Generated: ${createdAt}`,
    `Name: ${data.name || "Not provided"}`,
    `Age: ${data.age}`,
    `BMI: ${data.bmi.toFixed(1)} (${bmiStatus(data.bmi)})`,
    `Systolic blood pressure: ${data.bp} mmHg (${bpStatus(data.bp)})`,
    `Blood glucose: ${data.glucose} mg/dL (${glucoseStatus(data.glucose)})`,
    `Smoking: ${data.smoking}`,
    `Exercise: ${data.exercise === "yes" ? "Regularly" : "Rarely"}`,
    `Sleep: ${data.sleep} hours (${sleepStatus(data.sleep)})`,
    "",
    `Custom educational score: ${assessment.score}/100`,
    `Score category: ${assessment.category}`,
    assessment.summary,
    "",
    "SCORING FACTORS:",
    ...assessment.factors.map(f => `- ${f.label}: ${f.points} points deducted. ${f.detail}.`),
    "",
    "IMPORTANT: This is a custom educational score, not a clinically validated risk score, diagnosis, or medical advice. Measurement interpretation depends on context. Consult a qualified healthcare professional for concerns."
  ].join("\n");
}
$("downloadBtn").addEventListener("click", () => {
  if (!latestReport) return;
  const blob = new Blob([reportText()], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vitala-health-snapshot.txt";
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
$("printBtn").addEventListener("click", () => window.print());
$("resetBtn").addEventListener("click", () => {
  form.reset();
  clearError();
  results.hidden = true;
  latestReport = null;
  $("assessment").scrollIntoView({behavior: "smooth"});
});
