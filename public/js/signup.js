document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      email: document.getElementById("email").value,
      genre: document.getElementById("genre").value,
      lien_github: document.getElementById("lien_github").value || undefined,
      lien_linkedin: document.getElementById("lien_linkedin").value || undefined,
      lien_portfolio: document.getElementById("lien_portfolio").value || undefined,
      filiere: document.getElementById("filiere").value,
      competence: document.getElementById("competence").value || undefined,
    };
  
    try {
      const response = await fetch("/gn/signup", {
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