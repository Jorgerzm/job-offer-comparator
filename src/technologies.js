// Base de datos de tecnologías con sus aliases y categorías
export const TECH_DB = [
  // Backend JVM
  { id: 'java',         label: 'Java',            aliases: ['java'],                           category: 'backend',  color: '#f89820' },
  { id: 'spring-boot',  label: 'Spring Boot',      aliases: ['spring boot', 'springboot', 'spring-boot', 'spring framework'], category: 'backend', color: '#6db33f' },
  { id: 'spring',       label: 'Spring',           aliases: [' spring '],                       category: 'backend',  color: '#6db33f' },
  { id: 'hibernate',    label: 'Hibernate',        aliases: ['hibernate'],                      category: 'backend',  color: '#59666c' },
  { id: 'jpa',          label: 'JPA',              aliases: ['jpa', 'spring data'],             category: 'backend',  color: '#59666c' },
  { id: 'maven',        label: 'Maven',            aliases: ['maven'],                          category: 'tools',    color: '#c71a36' },
  { id: 'gradle',       label: 'Gradle',           aliases: ['gradle'],                         category: 'tools',    color: '#02303a' },
  { id: 'junit',        label: 'JUnit',            aliases: ['junit', 'testing', 'unit test'],  category: 'testing',  color: '#25a162' },

  // Backend otros
  { id: 'node',         label: 'Node.js',          aliases: ['node.js', 'nodejs', 'node'],      category: 'backend',  color: '#339933' },
  { id: 'python',       label: 'Python',           aliases: ['python'],                         category: 'backend',  color: '#3776ab' },
  { id: 'django',       label: 'Django',           aliases: ['django'],                         category: 'backend',  color: '#092e20' },
  { id: 'fastapi',      label: 'FastAPI',          aliases: ['fastapi'],                        category: 'backend',  color: '#009688' },
  { id: 'go',           label: 'Go',               aliases: [' go ', 'golang'],                 category: 'backend',  color: '#00add8' },
  { id: 'rust',         label: 'Rust',             aliases: ['rust'],                           category: 'backend',  color: '#ce422b' },
  { id: 'php',          label: 'PHP',              aliases: ['php'],                            category: 'backend',  color: '#777bb4' },
  { id: 'laravel',      label: 'Laravel',          aliases: ['laravel'],                        category: 'backend',  color: '#ff2d20' },

  // Frontend
  { id: 'react',        label: 'React',            aliases: ['react'],                          category: 'frontend', color: '#61dafb' },
  { id: 'vue',          label: 'Vue',              aliases: ['vue', 'vue.js'],                  category: 'frontend', color: '#4fc08d' },
  { id: 'angular',      label: 'Angular',          aliases: ['angular'],                        category: 'frontend', color: '#dd0031' },
  { id: 'next',         label: 'Next.js',          aliases: ['next.js', 'nextjs', 'next js'],   category: 'frontend', color: '#000000' },
  { id: 'typescript',   label: 'TypeScript',       aliases: ['typescript', ' ts '],             category: 'frontend', color: '#3178c6' },
  { id: 'javascript',   label: 'JavaScript',       aliases: ['javascript', ' js '],             category: 'frontend', color: '#f7df1e' },
  { id: 'tailwind',     label: 'Tailwind CSS',     aliases: ['tailwind'],                       category: 'frontend', color: '#06b6d4' },
  { id: 'html-css',     label: 'HTML/CSS',         aliases: ['html', 'css'],                    category: 'frontend', color: '#e34c26' },

  // Bases de datos
  { id: 'postgresql',   label: 'PostgreSQL',       aliases: ['postgresql', 'postgres'],         category: 'database', color: '#336791' },
  { id: 'mysql',        label: 'MySQL',            aliases: ['mysql'],                          category: 'database', color: '#4479a1' },
  { id: 'mongodb',      label: 'MongoDB',          aliases: ['mongodb', 'mongo'],               category: 'database', color: '#47a248' },
  { id: 'redis',        label: 'Redis',            aliases: ['redis'],                          category: 'database', color: '#dc382d' },
  { id: 'sql',          label: 'SQL',              aliases: [' sql '],                          category: 'database', color: '#4479a1' },
  { id: 'oracle',       label: 'Oracle',           aliases: ['oracle'],                         category: 'database', color: '#f80000' },

  // DevOps / Cloud
  { id: 'docker',       label: 'Docker',           aliases: ['docker'],                         category: 'devops',   color: '#2496ed' },
  { id: 'kubernetes',   label: 'Kubernetes',       aliases: ['kubernetes', 'k8s'],              category: 'devops',   color: '#326ce5' },
  { id: 'aws',          label: 'AWS',              aliases: ['aws', 'amazon web services'],     category: 'devops',   color: '#ff9900' },
  { id: 'gcp',          label: 'GCP',              aliases: ['gcp', 'google cloud'],            category: 'devops',   color: '#4285f4' },
  { id: 'azure',        label: 'Azure',            aliases: ['azure'],                          category: 'devops',   color: '#0078d4' },
  { id: 'git',          label: 'Git',              aliases: ['git'],                            category: 'tools',    color: '#f05032' },
  { id: 'ci-cd',        label: 'CI/CD',            aliases: ['ci/cd', 'cicd', 'github actions', 'jenkins', 'gitlab ci'], category: 'devops', color: '#2088ff' },
  { id: 'linux',        label: 'Linux',            aliases: ['linux'],                          category: 'devops',   color: '#fcc624' },

  // Metodologías
  { id: 'agile',        label: 'Agile',            aliases: ['agile', 'scrum', 'kanban'],       category: 'methodology', color: '#6db33f' },
  { id: 'tdd',          label: 'TDD',              aliases: ['tdd', 'test driven'],             category: 'methodology', color: '#25a162' },
  { id: 'rest',         label: 'REST API',         aliases: ['rest api', 'restful', 'api rest'], category: 'methodology', color: '#888' },
  { id: 'microservices',label: 'Microservices',    aliases: ['microservices', 'microservicios'], category: 'methodology', color: '#888' },
]

// Stack por defecto del usuario (refleja el portfolio de Jorge)
export const DEFAULT_MY_STACK = [
  'java', 'spring-boot', 'hibernate', 'jpa', 'junit', 'maven',
  'react', 'typescript', 'javascript', 'tailwind', 'html-css',
  'postgresql', 'sql', 'docker', 'git', 'rest'
]

// Detecta tecnologías en un texto
export function detectTechnologies(text) {
  const lower = ` ${text.toLowerCase()} `
  const found = new Set()

  for (const tech of TECH_DB) {
    for (const alias of tech.aliases) {
      if (lower.includes(alias.toLowerCase())) {
        found.add(tech.id)
        break
      }
    }
  }

  return [...found]
}

// Clasifica tecnologías encontradas respecto al stack del usuario
export function classifyTechs(foundIds, myStackIds) {
  const mySet = new Set(myStackIds)
  return {
    match:   foundIds.filter(id =>  mySet.has(id)),
    missing: foundIds.filter(id => !mySet.has(id)),
  }
}

export function getTech(id) {
  return TECH_DB.find(t => t.id === id)
}

export const CATEGORY_LABELS = {
  backend:     'Backend',
  frontend:    'Frontend',
  database:    'Bases de datos',
  devops:      'DevOps / Cloud',
  tools:       'Herramientas',
  testing:     'Testing',
  methodology: 'Metodologías',
}
