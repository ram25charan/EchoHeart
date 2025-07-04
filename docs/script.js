const feelingButtons = document.querySelectorAll(".feeling-options button");
const toneButtons = document.querySelectorAll(".tone-options button");
let selectedFeeling = "";
let selectedTone = "";

feelingButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedFeeling = button.getAttribute("data-feeling");
    feelingButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

toneButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedTone = button.getAttribute("data-tone");
    toneButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

document.getElementById("generateBtn").addEventListener("click", async () => {
  const responseBox = document.getElementById("responseBox");

  if (!selectedFeeling || !selectedTone) {
    responseBox.textContent = "Please select a feeling and a tone.";
    return;
  }

  const fakePrompt = `
You're an empathetic AI. A user is feeling "${selectedFeeling}" and wants a response in a "${selectedTone}" tone.
Your task is to write a message that:
- Understands their emotion
- Reflects the chosen tone
- Comforts or uplifts them

Respond with a short paragraph (2 to 5 lines) that feels natural and emotionally supportive.
  `;

  responseBox.textContent = "Thinking...";

  try {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: fakePrompt })
    });

    const data = await res.json();
    responseBox.textContent = data.message || "No response from Gemini.";
  } catch (err) {
    responseBox.textContent = "Oops! Something went wrong.";
  }
});
