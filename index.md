---
pagetitle: "Zhenyao Sun | Probability and Stochastic Analysis"
lang: en
description-meta: "Academic homepage of Zhenyao Sun, Assistant Professor at Beijing Institute of Technology, working in probability theory and stochastic analysis."
header-includes:
  - |
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Zhenyao Sun | Probability and Stochastic Analysis" />
    <meta property="og:description" content="Academic homepage of Zhenyao Sun, Assistant Professor at Beijing Institute of Technology, working in probability theory and stochastic analysis." />
    <meta property="og:url" content="https://zhenyao-sun.github.io/" />
    <meta name="twitter:card" content="summary" />
---

<style>
.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 0 1rem;
  padding: 0.35rem 0.15rem 0.8rem;
  border-bottom: 1px solid #e0e6ec;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.82rem;
}

.site-nav-brand {
  color: #172c42 !important;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;
}

.site-nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.4rem 1rem;
}

.site-nav-links a {
  color: #465c70;
  text-decoration: none;
}

.site-nav-links a:hover {
  color: #172c42;
  text-decoration: underline;
  text-underline-offset: 0.22em;
}

.site-nav a:focus-visible {
  border-radius: 3px;
  outline: 2px solid #577b9d;
  outline-offset: 4px;
}

#preprints,
#publications {
  margin-bottom: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e1e7ec;
  color: #172c42;
  font-size: 1.55rem;
  line-height: 1.2;
}

#preprints + ol,
#publications + ol {
  margin-top: 1.15rem;
  padding-left: 2.15rem;
}

#preprints + ol > li,
#publications + ol > li {
  margin-bottom: 0.95rem;
  padding-left: 0.3rem;
  line-height: 1.5;
}

#preprints + ol > li::marker,
#publications + ol > li::marker {
  color: #6a8298;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.84em;
  font-weight: 650;
}

#preprints + ol > li > a,
#publications + ol > li > a {
  color: #263f56;
  text-decoration-color: #a9bac9;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.16em;
}

#preprints + ol > li > a:hover,
#publications + ol > li > a:hover {
  color: #123653;
  text-decoration-color: currentColor;
}

#slides {
  margin-bottom: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e1e7ec;
  color: #172c42;
  font-size: 1.55rem;
  line-height: 1.2;
}

#slides + ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.15rem;
  padding-left: 0;
  list-style: none;
}

#slides + ul > li {
  margin: 0;
}

#slides + ul > li > a {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  min-height: 7rem;
  padding: 1rem 1.05rem;
  border: 1px solid #dce4ea;
  border-radius: 10px;
  background: #fbfcfd;
  color: #263f56;
  line-height: 1.42;
  text-decoration: none;
  transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
}

#slides + ul > li > a::after {
  align-self: flex-start;
  content: "PDF";
  padding: 0.2rem 0.42rem;
  border-radius: 4px;
  background: #e9f0f5;
  color: #557088;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

#slides + ul > li > a:hover {
  border-color: #aabccc;
  box-shadow: 0 7px 18px rgba(24, 46, 72, 0.08);
  transform: translateY(-2px);
}

#slides + ul > li > a:focus-visible {
  outline: 2px solid #577b9d;
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  #slides + ul > li > a {
    transition: none;
  }
}

#events {
  margin-bottom: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e1e7ec;
  color: #172c42;
  font-size: 1.55rem;
  line-height: 1.2;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.15rem;
}

.event-card {
  padding: 1.1rem;
  border: 1px solid #dce4ea;
  border-top: 3px solid #a8b7c4;
  border-radius: 10px;
  background: #fbfcfd;
}

.event-card.event-upcoming {
  border-top-color: #537e69;
  background: #f8fbf9;
}

.event-status {
  display: inline-block;
  margin: 0 0 0.85rem;
  padding: 0.2rem 0.48rem;
  border-radius: 999px;
  background: #e8edf1;
  color: #64798b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.event-upcoming .event-status {
  background: #e5f0e9;
  color: #3d6b54;
}

.event-card time {
  display: block;
  margin-bottom: 0.45rem;
  color: #49637a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.82rem;
  font-weight: 650;
}

.event-card h3 {
  margin: 0;
  color: #20384f;
  font-size: 1.06rem;
  line-height: 1.35;
}

.event-venue {
  margin: 0.75rem 0 0;
  color: #536372;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.82rem;
  line-height: 1.4;
}

.profile-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 148px;
  grid-template-areas:
    "copy photo"
    "focus photo"
    "background background";
  gap: 1rem 2rem;
  margin: 0 0 2.75rem;
  padding: 2rem;
  border: 1px solid #d8e0e8;
  border-radius: 16px;
  background: linear-gradient(145deg, #f7fafc 0%, #ffffff 72%);
  box-shadow: 0 12px 34px rgba(24, 46, 72, 0.07);
  text-align: left;
}

.profile-copy {
  grid-area: copy;
  align-self: center;
}

.profile-photo {
  grid-area: photo;
  width: 148px;
  height: 148px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 8px 22px rgba(24, 46, 72, 0.16);
}

.profile-kicker {
  margin: 0 0 0.55rem;
  color: #47637f;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.78rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.profile-hero h1 {
  margin: 0;
  color: #172c42;
  font-size: clamp(2.15rem, 6vw, 3.15rem);
  line-height: 1.05;
}

.profile-role {
  margin: 0.65rem 0 0;
  color: #3d4c5c;
  font-size: 1.08rem;
  line-height: 1.45;
}

.profile-focus {
  grid-area: focus;
  margin: 0;
  color: #273646;
  font-size: 1.03rem;
  line-height: 1.55;
}

.profile-background {
  grid-area: background;
  padding-top: 1.35rem;
  border-top: 1px solid #e0e6ec;
  color: #354555;
}

.profile-background p {
  margin: 0;
  line-height: 1.58;
}

.profile-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1.25rem;
  margin-top: 1rem !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.88rem;
}

.profile-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.6rem;
  margin: 0.75rem 0 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.8rem;
}

.profile-links-label {
  color: #687a89;
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.profile-links a {
  color: #315b7c;
  font-weight: 600;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

.profile-links-separator {
  color: #a3afb8;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #dce4ea;
  color: #667785;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 0.78rem;
}

.site-footer a {
  color: #315b7c;
  font-weight: 600;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

.profile-hero a {
  color: #244f78;
  text-decoration-color: #a8bfd3;
  text-underline-offset: 0.16em;
}

.profile-hero a:hover {
  color: #123653;
  text-decoration-color: currentColor;
}

@media (max-width: 600px) {
  .site-nav {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;
    padding-bottom: 0.7rem;
  }

  .site-nav-links {
    justify-content: flex-start;
    width: 100%;
  }

  #preprints,
  #publications,
  #slides,
  #events {
    font-size: 1.45rem;
  }

  #preprints + ol,
  #publications + ol {
    padding-left: 1.75rem;
  }

  #preprints + ol > li,
  #publications + ol > li {
    margin-bottom: 0.85rem;
    padding-left: 0.15rem;
  }

  #slides + ul {
    grid-template-columns: 1fr;
  }

  #slides + ul > li > a {
    min-height: 0;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .profile-hero {
    grid-template-columns: 104px minmax(0, 1fr);
    grid-template-areas:
      "photo copy"
      "focus focus"
      "background background";
    gap: 1.15rem;
    margin-bottom: 2.25rem;
    padding: 1.25rem;
    border-radius: 12px;
  }

  .profile-photo {
    width: 104px;
    height: 104px;
    border-radius: 11px;
  }

  .profile-hero h1 {
    font-size: 2rem;
  }

  .profile-kicker {
    font-size: 0.66rem;
  }

  .profile-role {
    font-size: 0.94rem;
  }

  .profile-focus { font-size: 0.98rem; }

  .profile-background {
    padding-top: 1rem;
  }

  .profile-contact {
    display: grid;
    gap: 0.55rem;
  }
}
</style>

<nav class="site-nav" aria-label="Primary navigation">
<a class="site-nav-brand" href="#profile">Zhenyao Sun</a>
<div class="site-nav-links"><a href="#preprints">Papers</a><a href="#slides">Slides</a><a href="#events">Events</a><a href="#links">Links</a></div>
</nav>

<header class="profile-hero" id="profile">
<div class="profile-copy">
<p class="profile-kicker">Probability · Stochastic Analysis</p>
<h1>Zhenyao Sun</h1>
<p class="profile-role">Assistant Professor at the <a href="https://math.bit.edu.cn/">School of Mathematics and Statistics, Beijing Institute of Technology</a></p>
</div>
<p class="profile-focus">My research is in probability theory, with a focus on models related to stochastic heat equations.</p>
<img class="profile-photo" src="Files/selfie2020.jpg" alt="Portrait of Zhenyao Sun" />
<div class="profile-background">
<p>Previously, I was a postdoctoral researcher in the <a href="https://dds.technion.ac.il/">Faculty of Data and Decision Sciences at the Technion</a>, hosted by <a href="https://web.iem.technion.ac.il/site/academicstaff/leonid-mytnik/">Prof. Leonid Mytnik</a>. I received my Ph.D. from <a href="https://www.math.pku.edu.cn/puremath_en/">Peking University</a> under the supervision of <a href="http://www.math.pku.edu.cn/teachers/renyx/indexE.htm">Prof. Yan-Xia Ren</a>, and visited <a href="https://faculty.math.illinois.edu/~rsong/">Prof. Renming Song</a> at the <a href="https://math.illinois.edu/">University of Illinois Urbana-Champaign</a>. I also received my B.S. from Peking University.</p>
<p class="profile-contact"><span><strong>Email:</strong> <a href="mailto:zhenyao.sun@gmail.com">zhenyao.sun@gmail.com</a></span><span><strong>Office:</strong> 411B, Wen-Cui Building E, BIT Liangxiang Campus, Beijing</span></p>
<p class="profile-links" aria-label="Academic profiles"><span class="profile-links-label">Profiles</span><a href="https://scholar.google.com/citations?user=XHxfUSkAAAAJ&amp;hl=en">Google Scholar</a><span class="profile-links-separator" aria-hidden="true">·</span><a href="https://arxiv.org/a/sun_z_7.html">arXiv</a></p>
</div>
</header>

## Preprints
1. [L. W.-T. Fan, Z. Sun, and J. Yang, *Comparison principles for stochastic reaction-diffusion equations on metric measure spaces.*](Files/Papers/2026arXiv-comparison.pdf)
1. [H. Hou and Z. Sun, *On the subcritical self-catalytic branching Brownian motions.*](Files/Papers/2025arXiv.pdf)
1. [L. Qian, and Z. Sun, *On the spectral radius of the $(L,\kappa)$-lazy Markov chain.*](Files/Papers/2023arXiv.pdf)

## Publications

1. [C. Barnes, L. Mytnik, and Z. Sun, *Wright-Fisher stochastic heat equations with irregular drifts.* Probab. Theory Relat. Fields **194** (2026), 1711–1786.](Files/Papers/2025PTRF.pdf)
1. [C. Barnes, L. Mytnik, and Z. Sun, *Effect of small noise on the speed of reaction-diffusion equations with non-Lipschitz drift.* Ann. Inst. H. Poincaré Probab. Statist. **60** (2024), no. 4, 2382-2414](Files/Papers/2024AIHP.pdf)
2. [C. Barnes, L. Mytnik, and Z. Sun, *On the coming down from infinity of coalescing Brownian motions.* Ann. Probab. **52** (2024), no. 1, 67-92](Files/Papers/2024AP.pdf)
1. [R. Liu, Y.-X. Ren, R. Song, and Z. Sun, *Subcritical superprocesses conditioned on non-extinction.* Stochastic Process. Appl. **163** (2023), 498-534.](Files/Papers/2023SPA.pdf)
1. [Y.-X. Ren, R. Song, Z. Sun and J. Zhao: *Stable Central Limit Theorems for Super Ornstein-Uhlenbeck Processes, II.* Acta Math. Sin. (Engl. Ser.) **38** (2022), no. 3, 487-498.](Files/Papers/2022Acta.pdf) 
1. [R. Liu, Y.-X. Ren, R. Song and Z. Sun: *Quasi-stationary distributions for subcritical superprocesses.* Stochastic Process. Appl. **132** (2021), 108-134.](Files/Papers/2021SPA.pdf) 
1. [Y.-X. Ren, R. Song and Z. Sun: *Limit theorems for a class of critical superprocesses with stable branching.* Stochastic Process. Appl. **130** (2020), no. 7, 4358-4391.](Files/Papers/2020SPA.pdf) 
   - There is a mistake when we cite H. Kesten, P. Ney and F. Spitzer’s 1966 paper: we can not obtain (1.2) when $\sigma = \infty$. This does not affect the other part of the paper. 
1. [Y.-X. Ren, R. Song and Z. Sun: *Spine decompositions and limit theorems for a class of critical superprocesses.* Acta. Appl. Math. **165** (2020), 91-131.](Files/Papers/2020Acta.pdf) 
1. [Y.-X. Ren, R. Song, Z. Sun, and J. Zhao: *Stable central limit theorems for super Ornstein-Uhlenbeck processes*. Electron. J. Probab. **24** (2019), Paper no. 141, 42 pp.](Files/Papers/2019EJP.pdf)
1. [Y.-X. Ren, R. Song and Z. Sun: *A 2-spine decomposition of the critical Galton-Watson tree and a probabilistic proof of Yaglom's theorem.* Electron. Commun. Probab. **23** (2018), Paper no. 42, 12 pp.](Files/Papers/2018ECP.pdf)
1. [T. Hu and Z. Sun: *Purchase limit policy and social welfare: A theoretical exploration.*  Economic Science. **6** (2011), 42-50, in Chinese.](Files/Papers/2011jjkx.pdf)

## Slides

- [On the Subcritical Self-Catalytic Branching Brownian Motions](Files/2024HouSunPresentation.pdf)
- [Wright-Fisher stochastic heat equations with irregular drifts](Files/Irregular.pdf)
- [Subcritical superprocesses conditioned on non-extinction](Files/Qprocess.pdf)
- [On the coming down from infinity of coalescing Brownian motions](Files/ComingDown.pdf)
- [Effect of small noise on the speed of  reaction-diffusion equation with non-Lipschitz drift](Files/WaveSpeed.pdf)
- [Effect of small noise on the speed of reaction-diffusion equations (YMSC Probability Seminar)](Files/BD-conjecture-story.pdf)
- [Quasi-stationary distributions for subcritical superprocesses](Files/subyaglom_talk.pdf)
- [Stable Central Limit Theorems for Super Ornstein-Uhlenbeck Processes](Files/Zhenyao2020Oct.pdf)
- [Limit theorems for a class of critical superprocesses with stable branching](Files/2018JSNU.pdf) 
- [Spine decompositions and limit theorems for a class of critical superprocesses](Files/RenSongSun2018Spine.pdf)

## Events Organized {#events}

<div class="events-grid">
<article class="event-card">
<p class="event-status">Past</p>
<time datetime="2026-08-24">24–28 August 2026</time>
<h3><a href="Events/SSSS2026/">Summer Symposium on Stochastic Systems (𝒮⁴ 2026)</a></h3>
<p class="event-venue">Beijing Institute of Technology</p>
</article>
<article class="event-card">
<p class="event-status">Past</p>
<time datetime="2025-12-28">28–29 December 2025</time>
<h3><a href="Events/Handbook2025.pdf">Workshop on Measure-Valued Markov Processes and Related Topics</a></h3>
<p class="event-venue">Beijing Institute of Technology</p>
</article>
<article class="event-card">
<p class="event-status">Past</p>
<time datetime="2025-07-01">1–4 July 2025</time>
<h3><a href="Events/SSSS2025.pdf">Stochastic Summer Seminar Series 2025</a></h3>
<p class="event-venue">Beijing Institute of Technology</p>
</article>
<article class="event-card">
<p class="event-status">Past</p>
<time datetime="2022">2022–2023</time>
<h3>Probability Seminar</h3>
<p class="event-venue">Technion — Israel Institute of Technology</p>
</article>
<article class="event-card">
<p class="event-status">Past</p>
<time datetime="2018-09-17">17 September 2018</time>
<h3><a href="Files/Prob_Welcome_Seminar.html">Welcome Workshop for New Students in the Probability Group</a></h3>
<p class="event-venue">Peking University</p>
</article>
</div>

## Links

- Bing Map for [Beijing Institute of Technology--Liangxiang](https://cn.bing.com/maps?ty=18&q=Beijing+Institute+of+Technology+(Liangxiang+Town+Campus)&ss=ypid.YN4067x31518226&mb=39.737434~116.162528~39.725948~116.182028&description=Yard+No.8+Liangxiang+East+Rd,+Beijing&cardbg=#88979C&dt=1747990800000&tt=Beijing+Institute+of+Technology+(Liangxiang+Town+Campus)&tsts1=%26ty%3D18%26q%3DBeijing%2520Institute%2520of%2520Technology%2520%2528Liangxiang%2520Town%2520Campus%2529%26ss%3Dypid.YN4067x31518226%26mb%3D39.737434~116.162528~39.725948~116.182028%26description%3DYard%2520No.8%2520Liangxiang%2520East%2520Rd%252C%2520Beijing%26cardbg%3D%252388979C%26dt%3D1747990800000&tstt1=Beijing+Institute+of+Technology+(Liangxiang+Town+Campus)&cp=qmnrmctpdxkc&lvl=16.1&ftst=1&ftics=True&v=2&sV=2&form=S00027) and [Bosi Elegant Hotel](https://www.bing.com/maps?&ty=18&q=Building1,Yard101,YangguangNorthStreet,%20Beijing,%20Beijing&ss=ypid.YN4067x15478922572392425981&mb=39.744946~116.155293~39.732637~116.176193&description=Building1,Yard101,YangguangNorthStreet,%20Beijing,%20Beijing&cardbg=#D161C4&dt=1747990800000&tt=Bosi%20Elegant%20Hotel&tsts0=%26ty%3D18%26q%3DBuilding1%252CYard101%252CYangguangNorthStreet%252C%2520Beijing%252C%2520Beijing%26ss%3Dypid.YN4067x15478922572392425981%26mb%3D39.744946~116.155293~39.732637~116.176193%26description%3DBuilding1%252CYard101%252CYangguangNorthStreet%252C%2520Beijing%252C%2520Beijing%26cardbg%3D%2523D161C4%26dt%3D1747990800000&tstt0=Bosi%20Elegant%20Hotel&cp=39.738792~116.160421&lvl=16&pi=0&ftst=0&ftics=False&v=2&sV=2&form=S00027).
- [Beijing Institute of Technology-Liangxiang campus map (highlighting School of Mathematics and Statistics)](Files/Direction2BITMath.pdf)
- I am maintaining [the bilibili channel](https://space.bilibili.com/151014650) for [the One World Probability Seminar](https://www.owprobability.org)
- My [PhD Thesis](Files/thesis.pdf)

<footer class="site-footer"><span>Zhenyao Sun</span><a href="#profile">Back to top ↑</a></footer>
