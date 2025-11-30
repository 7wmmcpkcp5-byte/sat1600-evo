export class Router {
  constructor() {
    this.current = "home";
  }

  init() {
    const buttons = document.querySelectorAll(".nav-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (target) this.navigate(target);
      });
    });
  }

  navigate(target) {
    this.current = target;
    const views = document.querySelectorAll(".view");
    views.forEach(v => v.classList.remove("active"));
    const viewEl = document.getElementById(`view-${target}`);
    if (viewEl) viewEl.classList.add("active");
  }
}
