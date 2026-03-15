# Job Offer Comparator

Herramienta para comparar ofertas de trabajo con tu stack tecnológico. Pega una descripción de oferta, detecta automáticamente las tecnologías mencionadas y muestra qué porcentaje encaja con tu perfil.

**Demo:** [job-offer-comparator.vercel.app](https://job-offer-comparator.vercel.app)

---

## Por qué existe

Cuando empecé a buscar trabajo, comparaba las ofertas manualmente: copiaba el texto, buscaba cada tecnología, intentaba recordar si la conocía o no. Con varias ofertas al día ese proceso se vuelve tedioso y fácil de equivocar.

Hice esta herramienta para resolverlo en 5 segundos en lugar de 5 minutos.

---

## Qué hace

- **Detecta tecnologías** en el texto de la oferta mediante matching de términos y aliases (ej. "Spring Boot", "springboot" y "spring-boot" apuntan a la misma tecnología)
- **Clasifica las encontradas** en dos grupos: las que dominas y las que no tienes en tu stack
- **Calcula un % de encaje** y muestra un veredicto
- **Stack configurable** — puedes seleccionar exactamente qué tecnologías tienes

---

## Tecnologías detectadas

Cubre más de 40 tecnologías en 7 categorías:

| Categoría | Ejemplos |
|---|---|
| Backend | Java, Spring Boot, Node.js, Python, Go |
| Frontend | React, Vue, Angular, TypeScript, Tailwind |
| Bases de datos | PostgreSQL, MySQL, MongoDB, Redis |
| DevOps / Cloud | Docker, Kubernetes, AWS, GCP |
| Herramientas | Git, Maven, Gradle |
| Testing | JUnit, TDD |
| Metodologías | Agile, Scrum, REST API, Microservices |

---

## Instalación

```bash
git clone https://github.com/Jorgerzm/job-offer-comparator
cd job-offer-comparator
npm install
npm run dev
```

---

## Decisiones técnicas

**Sin backend, sin API.** Todo el análisis ocurre en el cliente con JavaScript puro. La base de datos de tecnologías es un array de objetos con aliases — suficiente para este caso, sin sobreingeniería.

**Sin dependencias de UI.** Solo React y Vite. El CSS está escrito a mano porque no hay razón para añadir Tailwind a un proyecto de un solo componente.

**Matching por texto, no por IA.** Deliberadamente. El matching de palabras clave es predecible, rápido y funciona sin conexión. Una oferta que menciona "Spring Boot" siempre se detecta igual — sin alucinaciones, sin coste por token.

---

## Stack

React 18 · Vite · CSS puro · sin dependencias de UI
