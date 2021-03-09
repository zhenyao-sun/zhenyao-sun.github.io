 #### Criteria for a family of probability measure to be kernel

**Lemma.** Let $(E,\mathscr E)$ and $(F, \mathscr F)$ be two measurable spaces. Suppose that for each $x\in E$, $Q_x$ is a $\sigma$-finite measure on $(F,\mathscr F)$. Let $(\mathbb R, \mathscr B)$ be the real line equipped with Borel sigma field. Denote by $\mathrm b\mathscr F$ the collection of bounded measurable maps from $(F, \mathscr F)$ to $ (\mathbb R, \mathscr B)$. Suppose that there exists a family of bounded maps $\mathscr A \subset \mathrm b\mathscr F$ such that (1) $\mathscr A$ is closed under multipllication;  (2) $\sigma(\mathscr A) = \mathscr F$; and (3) for each $A\in \mathscr A$, map $x\mapsto Q_x(A)$ is a measurable function from $(E,\mathscr E)$ to $(\mathbb R, \mathscr B)$. Then $Q$ is a kernel from $(E, \mathscr E)$ to $(F,\mathscr F)$. 

Proof: Denote by 
$$
\mathscr L:= \{f\in \mathrm b\mathscr F: \text{map $x\mapsto Q_x(f)$ is a measurable function from $(E,\mathscr E)$ to $(\mathbb R, \mathscr B)$}\}.
$$

Then it is not hard to verify that $\mathscr L$ is a monotone vector space on $(F, \mathscr F)$, (See Section A.1 of [^Li2011Measure] ). Observe that $\mathscr A\subset \mathscr L$ and $\mathscr A$ is a collection of bounded real functions on the set $F$ which is closed under multiplication. So from Proposition A.1 of [^Li2011Measure] we know that $\mathrm b\sigma(\mathscr A) \subset \mathscr L$. Now from the fact that $\sigma(\mathscr A) = \mathscr F$ we know $\mathscr L = \mathrm b\sigma(\mathscr A)$. $\Box$

[^Li2011Measure]: Z. Li: *Measure-Valued Branching Markov Processes.* 2011.  






