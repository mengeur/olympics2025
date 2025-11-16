const burger = document.getElementById("nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

document.querySelector(".burger").addEventListener("click", () => {
    mobileMenu.style.display = burger.checked ? "none" : "flex";
});

document.querySelectorAll(".notify-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const list = btn.parentElement.querySelector(".notify-list");
        list.style.display = list.style.display === "block" ? "none" : "block";
    });
});

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.93)";
        setTimeout(() => btn.style.transform = "", 130);
    });
});

document.querySelectorAll(".card button").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Раздел скоро будет доступен. Следите за обновлениями!");
    });
});

document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
        const w = window.open("", "_blank");
        w.document.write(`<img src="${img.src}" style="width:100%;">`);
    });
});
