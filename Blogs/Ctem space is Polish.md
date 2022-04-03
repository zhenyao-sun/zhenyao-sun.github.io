# Ctem space is Polish

Zhenyao Sun, last edit: Apr 3, 2020.

Let $\mathcal C(\mathbb R)$ be the space of real-valued continuous functions on $\mathbb R$. Define $\|f\|_{(p)} := \sup_{x\in \mathbb R} |e^{p|x|}f(x)|$ for every $p\in \mathbb R, f\in \mathcal C(\mathbb R)$. Define $\mathcal C_{\mathrm{tem}}(\mathbb R):=\{f\in \mathcal C(\mathbb R): \forall p > 0,\|f\|_{(-p)}<\infty\}.$ Define $d_{\mathrm{tem}}(f,g) := \sum_{k=1}^\infty 2^{-k}  (\|f-g\|_{(-k^{-1})}\wedge 1)$ for every $f,g\in \mathcal C_{\mathrm {tem}}(\mathbb R).$

**Lemma:** $d_{\mathrm{tem}}$ is a seperable compelete metric on space $\mathcal C_{\mathrm{tem}}(\mathbb R)$. $\Box$

**Proof:** *Step 1.* We notice that $d_{\mathrm{tem}}$ is a well-defined map from $C_{\mathrm{tem}}(\mathbb R)^2$ to $\mathbb R$ satisfying the identity of indiscernibles and the symmetry properties. One can also verify that $d_{\mathrm{tem}}$ satisfy the triangle inequality since it is easy to verify that 
$$
\|f+g\|_{(p)}\leq \|f\|_{(p)}+\|g\|_{(p)}, \quad f,g\in \mathcal C_{\mathrm {tem}}(\mathbb R), p\in \mathbb R;
$$
and that, for every $x,y,z \in \mathbb R_+$, if $z\leq x+y$, then $z\wedge 1 \leq x\wedge 1+y\wedge 1$. Therefore, $d_{\mathrm{tem}}$ is a metric on $\mathcal C_{\mathrm{tem}}(\mathbb R)$.

*Step 2.* We can verify that $d_{\mathrm{tem}}$ is compelete. To show this, we take a sequence of $d_{\mathrm{tem}}$-Cauchy sequence $(f_n)_{n\in \mathbb N}$. Then for any $p>0$ and $\epsilon > 0$, taking the smallest $k\in \mathbb N$ such that $1/k<p$, there exists an $N=N(p,\epsilon)$ such that for any $m,n\geq N$, it holds that
$$
2^{-k}(\|f-g\|_{(-k^{-1})}\wedge 1)\leq d_{\mathrm{tem}}(f_n,f_m) \leq 2^{-k}\epsilon,
$$
which implies that $\|f_n-f_m\|_{(-p)} \leq \|f_n-f_m\|_{(-k^{-1})}\leq \epsilon$. In other word, for any $p>0$, $(f_n)_{n\in \mathbb N}$ is a Cauchy sequence with respect to the norm $\|\cdot\|_{(-p)}$. For every $p>0$, we now have that $(e^{-p|\cdot|}f_n)_{n\in \mathbb N}$ is Cauchy sequence in $\mathrm b\mathcal C(\mathbb R)$, the space of bounded real-valued continuous functions on $\mathbb R$, with respect to the supremum $\|\cdot\|_{(0)}$. It is famously known that $\mathrm b\mathcal C(\mathbb R)$ is a Banach space (and therefore compelete) under the supremum. So, for every $p>0$, there exists a limiting function $g_p\in \mathrm b\mathcal C(\mathbb R)$, such that $\|e^{-p|\cdot|}f_n - g_p\|_{(0)}$ converges to $0$. Define a real-valued function $f$ on $\mathbb R$ so that $f(x):= \limsup_{n\to\infty}f_n(x)$ for every $x\in \mathbb R$. Then it is clear that for every $p>0$, we have $g_p(x) = e^{-p|x|}f(x)$ for every $x\in \mathbb R$. Therefore, $f_n$ convergece to $f$ with respect to the norm $\|\cdot\|_{(-p)}$, for every $p>0$. It is then easy to see that  $f_n$ convergece to $f$ with respect to the metric $d_{\mathrm{tem}}$.

*Step 3.* Denote by $\mathcal P$ the space of polynomials on $\mathbb R$ with ratinal coefficient. Then clearly $\mathcal P \subset \mathcal C_{\mathrm{tem}}(\mathbb R)$. For any $g\in \mathcal P$ and $n\in \mathbb N$, let us define $g_n\in \mathcal C_{\mathrm{tem}}$ such that $g_n(x) = g(-n)\mathbf 1_{x<-n}+g(x)\mathbf 1_{|x|\leq n} + g(n)\mathbf 1_{x>n}$. Define $\tilde {\mathcal P}:= \{g_n:g\in \mathcal P, n\in \mathbb N\}$ which is clearly a contable subset of $\mathcal C_{\mathrm{tem}}$. We will prove in this step that 
$$
\inf\{\|f-g\|_{(-p)}:g\in \tilde{\mathcal P}\} = 0, \quad f\in \mathcal C_{\mathrm{tem}},p>0. 
$$

In order to do this, fixing arbitrary $f\in \mathcal C_{\mathrm {tem}}$, $p>0$ and  $\epsilon>0$, we only have to show that there exist $g\in \mathcal P$ and $n\in \mathbb N$ such that $\|f-g_n\|_{(-p)} \leq \epsilon$. To show this, we first take $n\in \mathbb N$ large enough such that $2e^{-pn/2}\|f\|_{(-p/2)}\leq \epsilon/6$; and then take $g\in \mathcal P$ such that $\sup_{|x|\leq n}\|f-g\|\leq \epsilon/6$. The existence of such $g$ is given by Weierstrass approximation theorem. Now for every $x<-n$, we have
$$
\begin{split}
&e^{-p|x|}|f(x)-g_n(x)| \leq e^{-p|x|}(|f(x)|+|f(-n)|+\epsilon/6) 
\leq e^{-pn/2}(e^{-p|x|/2}|f(x)|+e^{-pn/2}|f(-n)|)+\epsilon/6
\\&\leq 2e^{-pn/2}\|f\|_{(-p/2)} +\epsilon/6\leq \epsilon/3;
\end{split}
$$
for every $x\in [-n,n]$, we have
$$
e^{-p|x|}|f(x)-g_n(x)| \leq \epsilon/3;
$$
and for every $x>n$, we have
$$
\begin{split}
&e^{-p|x|}|f(x)-g_n(x)| \leq e^{-p|x|}(|f(x)|+|f(n)|+\epsilon/6) 
\leq e^{-pn/2}(e^{-p|x|/2}|f(x)|+e^{-pn/2}|f(n)|)+\epsilon/6
\\&\leq 2e^{-pn/2}\|f\|_{(-p/2)} +\epsilon/6 \leq \epsilon/3.
\end{split}
$$
Therefore,
$$
\|f-g_n\|_{(-p)} \leq (\sup_{x<-n}+\sup_{x\in [-n,n]} + \sup_{x>n}) \big(e^{-p|x|}|f(x)-g_n(x)|\big) \leq \epsilon
$$
as desired for this step.

*Step 4.* We can verify that $d_{\mathrm {tem}}$ is seperable by showing that $\tilde {\mathcal P}$ is a dense subset. To see this, for every $\epsilon > 0$ and $f\in \mathcal C_{\mathrm{tem}}$, taking the smallest $n=n(\epsilon)\in \mathbb N$ such that $\sum_{k>n} 2^{-k} \leq \epsilon/2$, we notice from Step 3 that there exists a $g\in \tilde{\mathcal P}$ such that $n(\|f-g\|_{(-n^{-1})}\wedge 1|) \leq \epsilon/2$, which implies that 
$$
d_{\mathrm {tem}}(f,g) \leq n(\|f-g\|_{(-n^{-1})}\wedge 1|)+ \sum_{k>n} \frac{1}{2^k} \leq \epsilon.
$$
$\Box$

Let $\mathcal C(\mathbb R,[0,1])$ be the space of $[0,1]$-valued continuous functions on $\mathbb R$, equipped with the unique metrizable topology such that $(f_n)_{n\in \mathbb N}$ converges to $f$ if and only if $f_n$ converges to $f$ uniformly on every compact set. Such topology can be induced by the metric
$$
d_{\text{com}}(f,g) = \sum_{k\in \mathbb N} 2^{-k} \sup_{x\in [-k,k]}|f(x)-g(x)|, \quad f,g\in \mathcal C(\mathbb R,[0,1]).
$$
Since $\mathcal C(\mathbb R,[0,1])$ is a subset of $\mathcal C_{\text{tem}}(\mathbb R)$, there is another topology of $\mathcal C(\mathbb R,[0,1])$ inherited from the distance $d_{\text{tem}}$.

**Lemma:** The two topologies of $\mathcal C(\mathbb R,[0,1])$ induced by $d_{\text{com}}$ and $d_{\text{tem}}$ are equivalent. $\Box$

**Proof:** Recall that for any metric space, its topology is uniquely determined by their sequtial limits/divergence.  Let $(f_n)_{n\in \mathbb N}$ is an arbitrary $\mathcal C(\mathbb R,[0,1])$-sequence and $f$ an arbitrary element in $\mathcal C(\mathbb R,[0,1])$. 

*Step 1.* Suppose that $(f_n)_{n\in \mathbb N}$ converges to $f$ uniformly on every compact sets, we show that $(f_n)_{n\in \mathbb N}$ convergence to $f$ in $d_{\text{tem}}$. To do this, for every $p>0$ and $\epsilon <0$, we firstly take $k>0$ large enough so that $2e^{-pk}\leq \epsilon/3$, secondly take $N>0$ large enough so that $\sup_{n\geq N}\sup_{x\in [-k,k]}|f_n-f|\leq \epsilon/3$,  then we get that
$$
\|f_n-f\|_{(-p)} \leq (\sup_{x<-k}+\sup_{x\in [-k,k]} + \sup_{x>k}) \big(e^{-p|x|}|f_n(x)-f(x)|\big) \leq \epsilon.
$$
Therefore $f_n$ convergence to $f$ in the $\|\cdot\|_{(-p)}$ norm, for every $p>0$. The desired result in this step follows.

*Step 2.* Suppose that $(f_n)_{n\in \mathbb N}$ converges to $f$ in $d_{\text{tem}}$, we show that $(f_n)_{n\in \mathbb N}$ convergence to $f$ uniformly on every compact sets. To do this, we take an arbitrary $k>0$ and $p>0$ and verify that
$$
\sup_{x\in [-k,k]}|f_n(x)-f(x)| \leq e^{pk}\sup_{x\in [-k,k]}e^{-pk}|f_n(x)-f(x)|\leq e^{pk}\sup_{x\in [-k,k]}e^{-p|x|}|f_n(x)-f(x)|
\\\leq e^{pk}\sup_{x\in \mathbb R}e^{-p|x|}|f_n(x)-f(x)| \to 0.
$$
$\Box$