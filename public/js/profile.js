async function fetchProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    try {
      const response = await fetch(`/gn/profile${id ? `?id=${id}` : ""}`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const { success, data } = await response.json();
      if (!success) throw new Error("Erreur lors de la récupération du profil");
      return data;
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur: " + error.message);
      return null;
    }
  }
  
  function populateProfile(profile) {
    document.getElementById("profile-image").src = profile.image_profile || "/images/default.png";
    document.getElementById("profile-name").textContent = `${profile.nom} ${profile.prenom}`;
    document.getElementById("profile-filiere").textContent = profile.filiere;
    document.getElementById("profile-email").textContent = profile.email;
    document.getElementById("profile-genre").textContent = profile.genre;
    document.getElementById("profile-github").textContent = profile.lien_github || "Non défini";
    document.getElementById("profile-github").href = profile.lien_github || "#";
    document.getElementById("profile-linkedin").textContent = profile.lien_linkedin || "Non défini";
    document.getElementById("profile-linkedin").href = profile.lien_linkedin || "#";
    document.getElementById("profile-portfolio").textContent = profile.lien_portfolio || "Non défini";
    document.getElementById("profile-portfolio").href = profile.lien_portfolio || "#";
    document.getElementById("profile-competence").textContent = profile.competence || "Aucune";
  
    document.getElementById("edit-nom").value = profile.nom;
    document.getElementById("edit-prenom").value = profile.prenom;
    document.getElementById("edit-email").value = profile.email;
    document.getElementById("edit-genre").value = profile.genre;
    document.getElementById("edit-github").value = profile.lien_github || "";
    document.getElementById("edit-linkedin").value = profile.lien_linkedin || "";
    document.getElementById("edit-portfolio").value = profile.lien_portfolio || "";
    document.getElementById("edit-filiere").value = profile.filiere;
    document.getElementById("edit-competence").value = profile.competence || "";
  }
  
  async function updateProfile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", document.getElementById("edit-nom").value);
    formData.append("prenom", document.getElementById("edit-prenom").value);
    formData.append("email", document.getElementById("edit-email").value);
    formData.append("genre", document.getElementById("edit-genre").value);
    formData.append("lien_github", document.getElementById("edit-github").value);
    formData.append("lien_linkedin", document.getElementById("edit-linkedin").value);
    formData.append("lien_portfolio", document.getElementById("edit-portfolio").value);
    formData.append("filiere", document.getElementById("edit-filiere").value);
    formData.append("competence", document.getElementById("edit-competence").value);
    const photo = document.getElementById("edit-photo").files[0];
    if (photo) formData.append("photo", photo);
  
    try {
      const response = await fetch(`/gn/update/${(await fetchProfile()).id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      const { success, message, data } = await response.json();
      if (success) {
        alert(message);
        populateProfile(data);
        document.getElementById("edit-form").classList.add("hidden");
        document.getElementById("profile").classList.remove("hidden");
      } else {
        alert("Erreur lors de la mise à jour");
      }
    } catch (error) {
      alert("Erreur: " + error.message);
    }
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const profile = await fetchProfile();
    if (profile) {
      populateProfile(profile);
    }
  
    document.getElementById("edit-profile").addEventListener("click", () => {
      document.getElementById("profile").classList.add("hidden");
      document.getElementById("edit-form").classList.remove("hidden");
    });
  
    document.getElementById("cancel-edit").addEventListener("click", () => {
      document.getElementById("edit-form").classList.add("hidden");
      document.getElementById("profile").classList.remove("hidden");
    });
  
    document.getElementById("edit-form").addEventListener("submit", updateProfile);
  });