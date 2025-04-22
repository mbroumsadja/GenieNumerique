document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      email: document.getElementById("email").value,
      nom: document.getElementById("nom").value,
    };
  
    try {
      const response = await fetch("/gn/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const { success, message } = await response.json();
      if (success) {
        alert(message);
        window.location.href = "/";
      } else {
        alert("Erreur: " + message);
      }
    } catch (error) {
      alert("Erreur: " + error.message);
    }
  });