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

  responseBox.textContent = "Thinking...";

  try {
    const res = await fetch("https://echoheart.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feeling: selectedFeeling,
        tone: selectedTone
      })
    });

    const data = await res.json();
    responseBox.textContent = data.message || "No response from server.";
  } catch (err) {
    responseBox.textContent = "Oops! Something went wrong.";
  }
});
