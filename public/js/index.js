async function fetchMembers() {
    try {
      const response = await fetch("/gn/data", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const { success, data } = await response.json();
      if (!success) throw new Error("Erreur lors de la récupération des données");
      return data;
    } catch (error) {
      console.error("Erreur:", error);
      return { admins: [], members: [] };
    }
  }
  
  function createProfileCard(member, isAdmin) {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow flex flex-col items-center";
    card.innerHTML = `
      <img src="${member.image_profile || '/images/default.png'}" alt="Profile" class="w-24 h-24 rounded-full mb-2">
      <span class="text-lg font-semibold">${member.nom} ${member.prenom}</span>
      <span class="text-gray-600">${member.filiere}</span>
      <a href="/gn/profile?id=${member.id}" class="text-blue-500 hover:underline mt-2">Voir le profil</a>
      ${
        isAdmin
          ? `
            <button onclick="deleteMember('${member.id}')" class="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Supprimer</button>
            ${
              !member.is_admin
                ? `<button onclick="makeAdmin('${member.id}')" class="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Devenir Admin</button>`
                : ""
            }
          `
          : ""
      }
    `;
    return card;
  }
  
  async function deleteMember(id) {
    if (confirm("Voulez-vous vraiment supprimer ce membre ?")) {
      try {
        const response = await fetch(`/gn/delete/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const { success, message } = await response.json();
        if (success) {
          alert(message);
          loadMembers();
        } else {
          alert("Erreur lors de la suppression");
        }
      } catch (error) {
        alert("Erreur: " + error.message);
      }
    }
  }
  
  async function makeAdmin(id) {
    try {
      const response = await fetch("/gn/joinadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        credentials: "include",
      });
      const { success, message } = await response.json();
      if (success) {
        alert(message);
        loadMembers();
      } else {
        alert("Erreur lors de la promotion");
      }
    } catch (error) {
      alert("Erreur: " + error.message);
    }
  }
  
  async function loadMembers() {
    const { admins, members } = await fetchMembers();
    const adminList = document.getElementById("admin-list");
    const memberList = document.getElementById("member-list");
    adminList.innerHTML = "";
    memberList.innerHTML = "";
  
    const isAdmin = admins.some((admin) => admin.id === getUserIdFromCookie());
    admins.forEach((admin) => adminList.appendChild(createProfileCard(admin, isAdmin)));
    members.forEach((member) => memberList.appendChild(createProfileCard(member, isAdmin)));
  }
  
  function getUserIdFromCookie() {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        return decoded.id;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
  
  document.addEventListener("DOMContentLoaded", loadMembers);