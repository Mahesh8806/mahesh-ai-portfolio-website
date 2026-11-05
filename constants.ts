import { Project, ExperienceItem, EducationItem, SkillCategory, ApproachStep } from './types.ts';

export const NAV_LINKS = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Experience', href: 'experience' },
  { name: 'Approach', href: 'approach' },
  { name: 'Projects', href: 'projects' },
  { name: 'Education', href: 'education' },
  { name: 'Contact', href: 'contact' },
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Programming Languages',
    iconName: 'Code2',
    skills: ['Python (Pandas, NumPy)', 'SQL']
  },
  {
    title: 'Big Data Technologies',
    iconName: 'Database',
    skills: ['PySpark', 'Hive', 'Hadoop (HDFS, YARN)', 'MapReduce', 'Sqoop']
  },
  {
    title: 'Databases',
    iconName: 'Server',
    skills: ['Snowflake', 'PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB']
  },
  {
    title: 'Cloud Technologies',
    iconName: 'Cloud',
    skills: ['AWS S3 / S3 Select', 'EMR', 'Glue', 'Lambda', 'Athena', 'Step Functions', 'EC2', 'SNS', 'Parameter Store', 'Terraform', 'Docker']
  },
  {
    title: 'ETL & Data Pipelines',
    iconName: 'Workflow',
    skills: ['Apache Airflow', 'ETL Pipeline Design', 'Parquet / ORC', 'Playwright (scraping/ETL)']
  },
  {
    title: 'Data Engineering Tools',
    iconName: 'Terminal',
    skills: ['Git / GitHub / Bitbucket', 'JIRA', 'Confluence', 'Postman', 'Jupyter', 'Linux']
  },
  {
    title: 'AI & Machine Learning',
    iconName: 'BrainCircuit',
    skills: ['RAG', 'LangChain (incl. Deep Agents)', 'GPT-4o / Gemini', 'Milvus / FAISS', 'PyTorch', 'Hugging Face Transformers', 'Scikit-learn', 'XGBoost / LightGBM', 'SHAP']
  },
  {
    title: 'Developer Tools',
    iconName: 'Cpu',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'SQLAlchemy', 'Streamlit']
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'Hotel Revenue ETL Pipeline & AI Agent',
    summary: 'A modular Playwright ETL that scrapes 250 reservations into PostgreSQL, served through a LangChain Deep Agent with 10 SQL-backed tools and a streaming chat UI over FastAPI Server-Sent Events.',
    architecture: [
      'Playwright scrapes 250 reservations from a client-rendered site into raw JSON',
      'Python cleans and type-casts the data, then upserts it into PostgreSQL',
      '6 automated verification checks confirm data quality, with a verify-only mode to re-check without re-running the full pipeline',
      'A LangChain Deep Agent with 10 SQL-backed tools answers revenue questions, streamed to a chat UI over FastAPI Server-Sent Events'
    ],
    challenge: 'Scraping a client-rendered site reliably while keeping the agent restricted to safe, read-only SQL tools so it can answer freely without risking the underlying data.',
    techStack: ['Python', 'Playwright', 'PostgreSQL', 'FastAPI', 'LangChain', 'GPT-4o'],
    repoLink: 'https://github.com/Mahesh8806/otel-ai-agent',
    category: 'GenAI + Data Engineering'
  },
  {
    title: 'AdaptivePromptGuard — MSc Thesis',
    summary: 'A two-stage defence against LLM jailbreaks: a fine-tuned DistilBERT classifier screens prompts before they reach the model. Cut jailbreak success from up to 77% to under 1% across three 7B models (p < 0.001).',
    architecture: [
      'Built an 80,000-prompt dataset from JailbreakV-28K, Alpaca and hard benign prompts from ToxicChat, with separate train/validation/test splits',
      'Fine-tuned a DistilBERT classifier to screen each incoming prompt before it reaches the LLM',
      'Prompts that pass are still sent with a safety system prompt as a second layer of defence',
      'Evaluated across three open-source 7B models (Mistral, Zephyr, LLaMA-2) served locally with Ollama'
    ],
    challenge: 'Balancing jailbreak detection against false positives on benign prompts — the classifier reached F1 0.99 on the test set at a 6% false-positive rate, with results statistically significant at p < 0.001.',
    techStack: ['PyTorch', 'Hugging Face Transformers', 'DistilBERT', 'Ollama', 'Flask'],
    repoLink: 'https://github.com/Mahesh8806/AdaptivePromptGuard',
    category: 'AI Research'
  },
  {
    title: 'RAG Document Q&A Chatbot',
    summary: 'A Streamlit app that chunks and embeds uploaded PDFs with Sentence Transformers, stores them in a Dockerized Milvus vector database, and answers questions grounded in the retrieved document text using Gemini.',
    architecture: [
      'Uploaded PDFs are split into overlapping chunks and embedded with Hugging Face Sentence Transformers',
      'Embeddings are stored in a Dockerized Milvus vector database',
      'User questions retrieve the most relevant chunks, which ground a Gemini-generated answer',
      'Streamlit provides the upload and chat interface'
    ],
    challenge: "Keeping answers grounded in the uploaded document rather than the model's own knowledge — tuning chunk size and retrieval count to balance relevance against context limits.",
    techStack: ['Python', 'LangChain', 'Milvus', 'Gemini', 'Streamlit', 'Docker'],
    repoLink: 'https://github.com/Mahesh8806/AI-Project1-RAG-based-AI-Chatbot',
    category: 'GenAI'
  },
  {
    title: 'Road Collision Severity Prediction',
    summary: 'An end-to-end PostgreSQL pipeline combining UK collision, weather and population data, with SMOTE class-imbalance handling and SHAP-based model explainability.',
    architecture: [
      'A layered PostgreSQL pipeline (raw, clean, feature tables) combines UK DfT collision records with Met Office weather and population data',
      'Profiling, cleaning, date/time standardisation and spatial joins handled in Python',
      'SMOTE addresses class imbalance before training XGBoost/LightGBM classifiers',
      'SHAP explains which features drive each severity prediction'
    ],
    challenge: "Severe collisions are rare relative to minor ones, so the raw classes were heavily imbalanced — SMOTE resampling was needed before the models could learn the minority class at all.",
    techStack: ['Python', 'PostgreSQL', 'SQLAlchemy', 'Scikit-Learn', 'XGBoost', 'LightGBM', 'SHAP'],
    repoLink: 'https://github.com/Mahesh8806/ML-Project3-road-collision-severity-prediction',
    category: 'Data Engineering + ML'
  },
  {
    title: 'Dublin Bikes Availability Prediction',
    summary: 'Analysed 158,574 Smart Dublin records across 117 stations to predict station availability and locate demand peaks. Random Forest reached 86.1% accuracy/F1; K-Means clustered stations to guide rebalancing.',
    architecture: [
      'Processed 158,574 Smart Dublin records across 117 stations, engineering temporal features (hour, weekday) and availability ratios',
      'Trained Random Forest and Neural Network classifiers for LOW/MEDIUM/HIGH availability',
      'K-Means clustered stations into downtown, neighbourhood and peripheral groups',
      'Permutation and Gini-based importance identified the strongest predictors'
    ],
    challenge: "Current bike count and hour-of-day dominated prediction, making it important to check the model was learning genuine demand patterns rather than a trivial 'same as last reading' shortcut.",
    techStack: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Seaborn'],
    repoLink: 'https://github.com/Mahesh8806/ML-Project1-Dublin-Bikes-Availability-Prediction',
    category: 'ML'
  }
];

export const APPROACH: ApproachStep[] = [
  {
    stage: 'Architect',
    iconName: 'Compass',
    description: 'Assess the data sources, volume and cost before writing code — deciding storage format, partitioning strategy and schedule up front.'
  },
  {
    stage: 'Build',
    iconName: 'Hammer',
    description: 'Implement ETL in PySpark and Python, orchestrated as Airflow DAGs with explicit task dependencies, logging and error handling.'
  },
  {
    stage: 'Run & Support',
    iconName: 'Activity',
    description: 'Operate in production — within a team running ~109 Airflow pipelines processing terabytes daily, diagnosing failures to keep reporting available.'
  },
  {
    stage: 'Optimize',
    iconName: 'Gauge',
    description: 'Tune for cost and speed: partitioning and bucketing to pull columns from terabyte-scale Hive tables in ~5 minutes, and automated S3 storage-cost reporting.'
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Associate Software Engineer',
    company: 'Caspex Tech LLP',
    companySubtitle: 'Consultant for Experian',
    period: 'Dec 2022 – Jul 2025',
    location: 'Pune, India',
    description: [
      'Maintained and enhanced Airflow pipelines in a team running ~109 production pipelines that process terabytes of data daily for Experian.',
      'Developed and managed Airflow DAGs for scheduling, task dependencies and execution, with logging and error handling for reliability.',
      'Ingested data from Hive and from multiple teams’ S3 buckets arriving in different file formats, loading processed data into Snowflake for downstream analytics and reporting.',
      'Built PySpark jobs that pull the required columns from terabyte-scale Hive tables in about 5 minutes, backed by partitioning, bucketing and Parquet/ORC storage.',
      'Built a weekly S3 storage-cost report pipeline: queried storage metrics via the S3 API and S3 Select, processed them in Python/SQL and emailed formatted HTML reports to stakeholders.',
      'Provided production support for the pipelines, diagnosing failures and data issues to keep reporting available.',
      'Onboarded 3–4 new enterprise clients by configuring data environments and validating system integrations.',
      'Worked in Agile/Scrum with cross-functional teams, using JIRA, Confluence and Bitbucket.'
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'MSc Artificial Intelligence',
    institution: 'National College of Ireland',
    period: '2025 – 2026',
    modules: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Neural Networks', 'Reinforcement Learning', 'Data Analytics', 'Cloud and Edge AI', 'AI Ethics and Governance'],
    thesis: {
      title: 'AdaptivePromptGuard (solo)',
      summary: 'A two-stage LLM jailbreak defence that cut attack success from up to 77% to under 1% across three 7B models (p < 0.001), at a 6% false-positive rate on benign prompts.'
    }
  },
  {
    degree: 'B-Tech Computer Science',
    institution: 'Savitribai Phule Pune University',
    period: '2018 – 2022',
    details: [
      'CGPA 8.34/10 — 1st Class with Distinction.',
      'Foundation in Algorithms, Database Management and Software Engineering.'
    ]
  }
];

export const ACHIEVEMENTS: string[] = [
  '5-star rating in Python on HackerRank',
  '5-star rating in SQL on HackerRank'
];
