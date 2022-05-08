

This estimation is famous. Here we give a proof which I'm sure many people knew already.

Define $G_{s,y;t,x}$ the transition density for the 1-d Brownian motion, i.e. for any bounded continuous function $f$ on $\mathbb R$,
$$
\int G_{s,y;t,x}f(x)\mathrm dx = \mathbb E[f(B_t)|B_s=y], \quad 0\leq s<t<\infty, y\in \mathbb R.
$$
For convention, define $G_{s,y;t,x}=0$ if $s\geq t$. (In the previous notes, we used notation $p_{t-s}(y,x)$ for $G_{s,y;t,x}$.) Now we have the following estimation. 

**Theorem:** For any $(t,x), (t',x') \in \mathbb R_+\times \mathbb R$, it holds that
$$
\iint_0^\infty (G_{s,y;t',x'}-G_{s,y;t,x})^2  \mathrm ds \mathrm dy \leq |x'-x|+\sqrt{|t'-t|}.
$$
**Proof:** From the fact that the squares of the sum of two numbers is bounded by twice the sum of the squares of those tow numbers, we have $\iint_0^\infty (G_{s,y;t',x'}-G_{s,y;t,x})^2 \mathrm ds\mathrm dy \leq \text{I}+\text{II}$ where $\text{I}=2\iint_0^\infty (G_{s,y;t',x'}-G_{s,y;t,x'})^2 \mathrm ds\mathrm dy$ and $\text{II}:=2\iint_0^\infty (G_{s,y;t,x'}-G_{s,y;t,x})^2 \mathrm ds\mathrm dy.$  Also notice that, as Louis pointed out, by appling the Chapman-Kolmogorov identity,
$$
\iint_0^\infty G_{s,y;t,x}G_{s,y;t',x'} \mathrm ds\mathrm dy = \iint_0^\infty G_{2s,x;t+s,y}G_{s+t,y;t'+t,x'} \mathrm ds\mathrm dy 
= \int_0^\infty G_{2s,x;t'+t,x'} \mathrm ds,
$$
and therefore
$$
\iint_0^\infty (G_{s,y;t',x'}-G_{s,y;t,x})^2 \mathrm ds\mathrm dy 
= \int_0^\infty(G_{2s,x';2t',x'}-2G_{2s,x;t'+t,x'}+G_{2s,x;2t,x} )\mathrm ds.
$$

In particular,

$$
\begin{align}
&\text{I} = 2\int_0^\infty (G_{2s,x;2t,x}-G_{2s,x;2t,x'})\mathrm ds = 2\int_0^t \frac{1-e^{-\frac{|x'-x|^2}{8(t-s)}}}{\sqrt{8\pi(t-s)}}\mathrm ds \leq 2\int_0^\infty \frac{1-e^{-\frac{|x'-x|^2}{8 s}}}{\sqrt{8\pi s}} \mathrm ds
\\&=2|x'-x|\int_0^\infty \frac{1-e^{-\frac{1}{8z}}}{\sqrt{8\pi z}}\mathrm dz = \frac{1}{2}|x'-x|,
\end{align}
$$

and
$$
\begin{align}
&\text{II} = 2\int_0^\infty (G_{2s,x';2t',x'}-2G_{2s,x';t'+t,x'}+G_{2s,x';2t,x'})\mathrm ds
\\&=2\int_0^\infty \Big(\frac{\mathbf 1_{t'-s\geq 0}}{\sqrt{8\pi(t'-s)}}-\frac{2\mathbf 1_{t'+t-2s\geq 0}}{\sqrt{4\pi (t+t'-2s)}}+\frac{\mathbf 1_{t-s\geq 0}}{\sqrt{8\pi(t-s)}} \Big)\mathrm ds
\\&= \frac{2}{\sqrt{2\pi}}(\sqrt{t'}-2\sqrt{\frac{t+t'}{2}}+\sqrt{t})
\leq \frac{4}{\sqrt{2\pi}}\sqrt{\frac{|t'-t|}{2}} = \frac{2}{\sqrt{\pi}} \sqrt{|t'-t|}. \qquad \Box
\end{align}
$$
