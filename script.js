const i18n = {
  pt: {
    nav_about: "Sobre", nav_projects: "Projetos", nav_skills: "Habilidades", nav_contact: "Contato",
    hero_eyebrow: "Designer · Desenvolvedor Web · Ilustrador",
    hero_title: "Projetando Experiências Digitais.",
    hero_text: "Crio identidades visuais, sites e ediçoes com foco em clareza, exclusividade e estética autêntica.",
    hero_cta1: "Ver projetos", hero_cta2: "Fale comigo",
    about_title: "Sobre mim",
    about_p1: "Sou designer e criador de sites, apaixonado por transformar ideias em produtos digitais e físicos.",
    about_p2: "Trabalho com HTML, CSS e JavaScript, além de ilustração, desing, pixel art e criação de artes para roupas e marcas.",
    stat1: "Projetos entregues", stat2: "Anos de experiência", stat3: "Dedicação",
    p1_title: "Motion Design e Edição de Vídeo", p1_text: "Animações, vídeos e conteúdo audiovisual com ritmo e identidade.",
    p2_title: "Design e Ilustrações", p2_text: "Logos, banners e artes para marcas de streetwear.",
    p3_title: "Sites", p3_text: "Sites e lojas virtuais com design limpo, rápidos e responsivos.",
    view: "Ver projetos→",
    skills_title: "Habilidades", sk_design: "Design gráfico", sk_illus: "Ilustração digital",
    contact_title: "Vamos trabalhar juntos?", contact_text: "Conte sobre seu projeto e responderei o mais rápido possível.",
    f_name: "Nome", f_email: "E-mail", f_msg: "Mensagem", f_send: "Enviar mensagem",
    footer: "Criado em Outubro de 2026.",
    back: "← Voltar",
    motion_title: "Motion Design e Edição de Vídeo",
    motion_text: "Uma seleção dos meus vídeos e animações.",
    design_title: "Design e Ilustrações",
    design_text: "Identidades visuais, artes e ilustrações.",
    sites_title: "Sites",
    sites_text: "Sites e lojas virtuais que desenvolvi.",
  },

  en: {
    nav_about: "About", nav_projects: "Projects", nav_skills: "Skills", nav_contact: "Contact",
    hero_eyebrow: "Designer · Web Developer · Illustrator",
    hero_title: "Designing Digital Experiences.",
    hero_text: "I create visual identities, websites, and video content with a focus on clarity, exclusivity, and authentic aesthetics.",
    hero_cta1: "View projects", hero_cta2: "Get in touch",
    about_title: "About me",
    about_p1: "I'm a designer and web creator, passionate about turning ideas into digital and physical products.",
    about_p2: "I work with HTML, CSS and JavaScript, plus illustration, design, pixel art and artwork for clothing and brands.",
    stat1: "Projects delivered", stat2: "Years of experience", stat3: "Commitment",
    projects_title: "Selected projects",
    p1_title: "Motion Design & Video Editing", p1_text: "Animations, videos and audiovisual content with rhythm and identity.",
    p2_title: "Graphic Design and Illustrations", p2_text: "Logos, banners and artwork for streetwear brands.",
    p3_title: "Websites", p3_text: "Clean, fast and responsive websites and online stores.",
    view: "View projects →",
    skills_title: "Skills", sk_design: "Graphic design", sk_illus: "Digital illustration",
    contact_title: "Let's work together?", contact_text: "Tell me about your project and I'll reply as soon as possible.",
    f_name: "Name", f_email: "Email", f_msg: "Message", f_send: "Send message",
    footer: "Created in October 2026.",
    back: "← Back.",
    motion_title: "Motion Design & Video Editing",
    motion_text: "A selection of my videos and animations.",
    design_title: "Design & Illustration",
    design_text: "Visual identities, artwork and illustrations.",
    sites_title: "Websites",
    sites_text: "Websites and online stores I've built.",
  }
};
const $ = s => document.querySelector(s);
let lang = localStorage.getItem("lang") || (navigator.language.startsWith("pt") ? "pt" : "en");

function setLang(l) {
  lang = l; localStorage.setItem("lang", l);
  document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = i18n[l][el.dataset.i18n]);
  $("#langBtn").textContent = l === "pt" ? "EN" : "PT";
}
function setTheme(t) {
  document.documentElement.dataset.theme = t; localStorage.setItem("theme", t);
}
setLang(lang);
setTheme(localStorage.getItem("theme") || "light");

$("#langBtn").onclick = () => setLang(lang === "pt" ? "en" : "pt");
$("#themeBtn").onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
$("#burger")?.addEventListener("click", () => $("#menu").classList.toggle("open"));
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => $("#menu").classList.remove("open")));
const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

document.querySelectorAll(".section h2, .card, .skills").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

$("#form")?.addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const subject = encodeURIComponent("Portfolio — " + d.get("name"));
  const body = encodeURIComponent(d.get("message") + "\n\n" + d.get("email"));
  location.href = `mailto:seuemail@exemplo.com?subject=${subject}&body=${body}`;
});

const modal = $("#modal");
if (modal) {
  const gallery = $("#gallery");
  const lightbox = $("#lightbox");

  document.querySelectorAll(".open-gallery").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const title = btn.closest(".card").querySelector("h3").textContent;
      $("#modalTitle").textContent = title;
      gallery.innerHTML = "";
      btn.dataset.gallery.split(",").forEach(src => {
        const img = document.createElement("img");
        img.src = src.trim();
        img.alt = title;
        img.loading = "lazy";
        img.addEventListener("click", () => {
          $("#lightboxImg").src = img.src;
          lightbox.classList.remove("zoomed");
          lightbox.classList.add("open");
        });
        gallery.appendChild(img);
      });
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  $("#lightboxImg").addEventListener("click", e => {
    e.stopPropagation();
    lightbox.classList.toggle("zoomed");
  });
  $("#lightboxClose").addEventListener("click", e => {
    e.stopPropagation();
    lightbox.classList.remove("open", "zoomed");
  });
  lightbox.addEventListener("click", () => lightbox.classList.remove("open", "zoomed"));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightbox.classList.contains("open") ? lightbox.classList.remove("open") : closeModal();
  });
}