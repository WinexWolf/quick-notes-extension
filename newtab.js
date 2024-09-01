const noteArea = document.getElementById("noteArea");
const toggleThemeBtn = document.getElementById("toggleTheme");

// Load saved note and theme from local storage
chrome.storage.local.get(["quickNote", "darkMode"], function (result) {
  if (result.quickNote) {
    noteArea.value = result.quickNote;
  }

  // Apply dark mode if it was set previously
  if (result.darkMode) {
    document.body.classList.add("dark-mode");
    noteArea.classList.add("dark-mode");
    toggleThemeBtn.classList.add("dark-mode");
    toggleThemeBtn.textContent = "Switch to Light Mode";
  }
});

// Save note to local storage when it's changed
noteArea.addEventListener("input", function () {
  const note = noteArea.value;
  chrome.storage.local.set({ quickNote: note });
});

// Toggle theme when the button is clicked
toggleThemeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  noteArea.classList.toggle("dark-mode");
  toggleThemeBtn.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");
  chrome.storage.local.set({ darkMode: isDarkMode });

  if (isDarkMode) {
    toggleThemeBtn.textContent = "Switch to Light Mode";
  } else {
    toggleThemeBtn.textContent = "Switch to Dark Mode";
  }
});
