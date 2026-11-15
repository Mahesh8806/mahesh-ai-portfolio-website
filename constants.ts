import {
  Project,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ApproachStep,
  StoryChapter,
  PipelineStage,
  Metric,
} from './types.ts';

// Everything on the site comes from Mahesh's resume and existing portfolio.
// Do not add skills, numbers or claims here that are not in the resume.

export const PROFILE = {
  name: 'Mahesh Bunage',
  role: 'Data & AI Engineer',
  email: 'mahesh.bunage21@gmail.com',
  phone: '+353 89 467 0746',
  location: 'Dublin, Ireland',
  github: 'https://github.com/Mahesh8806',
  linkedin: 'https://linkedin.com/in/maheshbunage',
  resume: '/Mahesh-Bunage-Resume.pdf',
  workAuth: 'Stamp 1G · No visa sponsorship required',
};

export const NAV_LINKS = [
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Projects', href: 'projects' },
  { name: 'Systems', href: 'systems' },
  { name: 'Stack', href: 'stack' },
  { name: 'Contact', href: 'contact' },
];

export const HERO_STATS: Metric[] = [
  { value: '2.5+', label: 'years in production data engineering at Experian' },
  { value: '~109', label: 'Airflow pipelines run by the team I worked in' },
  { value: 'TBs', label: 'of data processed by those pipelines every day' },
  { value: '<1%', label: 'LLM jailbreak success with my MSc thesis guard (was up to 77%)' },
];

export const STORY: StoryChapter[] = [
  {
    index: '01',
    label: 'Foundations',
    title: 'Computer science, then data',
    body:
      'A B-Tech in Computer Science (CGPA 8.34, Distinction), then a data engineering internship in telecom: SQL and PL/SQL reporting, Spark loading PostgreSQL into HBase, and Sqoop moving MySQL into Hive.',
  },
  {
    index: '02',
    label: 'Production scale',
    title: 'Pipelines that cannot go down',
    body:
      '2.5+ years at Experian via Caspex Tech, in a team running ~109 Airflow pipelines over terabytes a day. PySpark on EMR, Hive tuning, Snowflake loads, a CCPA compliance pipeline with field-level encryption, and the production support that keeps reporting available.',
  },
  {
    index: '03',
    label: 'Into AI',
    title: 'Intelligence on solid data',
    body:
      'An MSc in Artificial Intelligence at National College of Ireland. My thesis cut LLM jailbreak success from up to 77% to under 1%. Now I build RAG systems and tool-calling agents, treating them as systems that still need reliable data underneath.',
  },
];

export const FOCUS_AREAS = ['Data pipelines at scale', 'RAG & retrieval', 'Agentic AI', 'LLM safety', 'Data warehousing'];

export const APPROACH: ApproachStep[] = [
  {
    stage: 'Architect',
    description: 'Assess sources, volume and cost before writing code: storage format, partitioning and schedule decided up front.',
  },
  {
    stage: 'Build',
    description: 'Implement ETL in PySpark and Python, orchestrated as Airflow DAGs with explicit dependencies, logging and error handling.',
  },
  {
    stage: 'Run & support',
    description: 'Operate in production: diagnose failures and data issues quickly so downstream reporting stays available.',
  },
  {
    stage: 'Optimise',
    description: 'Tune for cost and speed: partitioning and bucketing to pull columns from terabyte-scale Hive tables in about 5 minutes.',
  },
];

export const PROJECTS: Project[] = [
  {
    slug: 'hotel-agent',
    title: 'Hotel Revenue ETL Pipeline & AI Agent',
    tagline: 'Playwright ETL into PostgreSQL, queried by a LangChain Deep Agent through a streaming chat UI.',
    category: 'Agentic AI · Data Engineering',
    featured: true,
    visual: 'agent',
    problem:
      'Reservation data sat behind a client-rendered website: not queryable, and not something a revenue manager could ask questions of directly.',
    solution:
      'A modular ETL lands the data in a modelled PostgreSQL schema, and a LangChain Deep Agent answers revenue questions (ADR, on-the-books, pickup, segments, cancellations) through 10 read-only SQL tools, streamed over FastAPI Server-Sent Events.',
    architecture: [
      'Playwright scrapes 250 reservations from a client-rendered site into raw JSON',
      'Python cleans and type-casts the data, then upserts it into PostgreSQL',
      'Relational schema: a reservations fact table with foreign keys to 3 lookup tables, a unique constraint against duplicates and 5 indexes for common query paths',
      '6 automated verification checks confirm data quality, with a verify-only mode to re-check without re-running the pipeline',
      'A LangChain Deep Agent with 10 SQL-backed tools answers questions, streamed to a chat UI over FastAPI Server-Sent Events',
    ],
    challenge:
      'Scraping a client-rendered site reliably while keeping the agent restricted to safe, read-only SQL tools, so it can answer freely without risking the underlying data.',
    outcomes: [
      { value: '250', label: 'reservations loaded' },
      { value: '10', label: 'SQL-backed agent tools' },
      { value: '6', label: 'automated quality checks' },
      { value: '5', label: 'indexes for query paths' },
    ],
    techStack: ['Python', 'Playwright', 'PostgreSQL', 'FastAPI', 'LangChain', 'GPT-4o'],
    repoLink: 'https://github.com/Mahesh8806/otel-ai-agent',
  },
  {
    slug: 'adaptive-prompt-guard',
    title: 'AdaptivePromptGuard',
    tagline: 'MSc thesis: a two-stage, inference-time defence against LLM jailbreak attacks.',
    category: 'AI Research · LLM Safety',
    featured: true,
    visual: 'shield',
    problem:
      'Open-source LLMs can be jailbroken by adversarial prompts that slip past their built-in safety training.',
    solution:
      'A fine-tuned DistilBERT classifier screens every prompt before it reaches the model, and prompts that pass are still sent with a safety system prompt as a second layer.',
    architecture: [
      'Built an 80,000-prompt dataset from JailbreakV-28K, Alpaca and hard benign prompts from ToxicChat, with separate train/validation/test splits',
      'Fine-tuned a DistilBERT classifier to screen each incoming prompt before it reaches the LLM',
      'Prompts that pass are sent with a safety system prompt as a second layer of defence',
      'Evaluated across three open-source 7B models (Mistral, Zephyr, LLaMA-2) served locally with Ollama',
    ],
    challenge:
      'Balancing jailbreak detection against false positives on benign prompts: the classifier reached F1 0.99 on the test set at a 6% false-positive rate, with results significant at p < 0.001.',
    outcomes: [
      { value: '77% → <1%', label: 'jailbreak success rate' },
      { value: '0.99', label: 'F1 on the test set' },
      { value: '80k', label: 'prompts in the dataset' },
      { value: '3', label: '7B models evaluated' },
    ],
    techStack: ['PyTorch', 'Hugging Face Transformers', 'DistilBERT', 'Ollama', 'Flask'],
    repoLink: 'https://github.com/Mahesh8806/AdaptivePromptGuard',
  },
  {
    slug: 'rag-chatbot',
    title: 'RAG Document Q&A Chatbot',
    tagline: 'Upload a PDF, ask questions, get answers grounded in the document itself.',
    category: 'Generative AI · RAG',
    visual: 'rag',
    problem: "LLMs answer from their own training data, not from the document in front of you.",
    solution:
      'Uploaded PDFs are chunked and embedded with Sentence Transformers, stored in a Dockerized Milvus vector database, and the most relevant chunks ground a Gemini-generated answer.',
    architecture: [
      'Uploaded PDFs are split into overlapping chunks and embedded with Hugging Face Sentence Transformers',
      'Embeddings are stored in a Dockerized Milvus vector database',
      'User questions retrieve the most relevant chunks, which ground a Gemini-generated answer',
      'Streamlit provides the upload and chat interface',
    ],
    challenge:
      "Keeping answers grounded in the uploaded document rather than the model's own knowledge, tuning chunk size and retrieval count to balance relevance against context limits.",
    outcomes: [],
    techStack: ['Python', 'LangChain', 'Milvus', 'Gemini', 'Streamlit', 'Docker'],
    repoLink: 'https://github.com/Mahesh8806/AI-Project1-RAG-based-AI-Chatbot',
  },
  {
    slug: 'road-collision',
    title: 'Road Collision Severity Prediction',
    tagline: 'A layered PostgreSQL pipeline feeding explainable severity models.',
    category: 'Data Engineering · ML',
    visual: 'collision',
    problem:
      'Severe road collisions are rare, which makes them hard for a model to learn, and a prediction is only useful if you can explain it.',
    solution:
      'A raw → clean → feature PostgreSQL pipeline joins UK collision, weather and population data, SMOTE rebalances the classes, and SHAP explains each XGBoost/LightGBM prediction.',
    architecture: [
      'A layered PostgreSQL pipeline (raw, clean, feature tables) combines UK DfT collision records with Met Office weather and population data',
      'Profiling, cleaning, date/time standardisation and spatial joins handled in Python',
      'SMOTE addresses class imbalance before training XGBoost/LightGBM classifiers',
      'SHAP explains which features drive each severity prediction',
    ],
    challenge:
      'Severe collisions are rare relative to minor ones, so the raw classes were heavily imbalanced: SMOTE resampling was needed before the models could learn the minority class at all.',
    outcomes: [
      { value: '3', label: 'public data sources joined' },
      { value: '3', label: 'pipeline layers' },
    ],
    techStack: ['Python', 'PostgreSQL', 'SQLAlchemy', 'Scikit-learn', 'XGBoost', 'LightGBM', 'SHAP'],
    repoLink: 'https://github.com/Mahesh8806/ML-Project3-road-collision-severity-prediction',
  },
  {
    slug: 'dublin-bikes',
    title: 'Dublin Bikes Availability Prediction',
    tagline: 'Predicting station availability and demand peaks across the Dublin Bikes network.',
    category: 'Machine Learning',
    visual: 'bikes',
    problem: 'Bike stations run empty or full at predictable times, but the patterns are buried in raw availability logs.',
    solution:
      'Engineered temporal features over Smart Dublin data, trained Random Forest and neural network classifiers for LOW/MEDIUM/HIGH availability, and clustered stations with K-Means to guide rebalancing.',
    architecture: [
      'Processed 158,574 Smart Dublin records across 117 stations, engineering temporal features (hour, weekday) and availability ratios',
      'Trained Random Forest and Neural Network classifiers for LOW/MEDIUM/HIGH availability',
      'K-Means clustered stations into downtown, neighbourhood and peripheral groups',
      'Permutation and Gini-based importance identified the strongest predictors; demand peaks at 7–9 AM and 5–7 PM',
    ],
    challenge:
      "Current bike count and hour of day dominated prediction, so it mattered to check the model was learning genuine demand patterns rather than a trivial 'same as last reading' shortcut.",
    outcomes: [
      { value: '86.1%', label: 'accuracy / F1 (Random Forest)' },
      { value: '158,574', label: 'records analysed' },
      { value: '117', label: 'stations' },
    ],
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    repoLink: 'https://github.com/Mahesh8806/ML-Project1-Dublin-Bikes-Availability-Prediction',
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Associate Software Engineer',
    company: 'Caspex Tech LLP',
    companySubtitle: 'Consultant for Experian',
    period: 'Dec 2022 – Jul 2025',
    location: 'Pune, India',
    summary:
      'Part of a data engineering team running ~109 production Airflow pipelines that process terabytes of data daily for Experian, a global credit and financial data company.',
    highlights: [
      { value: '~109', label: 'production pipelines' },
      { value: 'TBs', label: 'processed daily' },
      { value: '~5 min', label: 'column pulls from TB-scale Hive tables' },
      { value: '3–4', label: 'enterprise clients onboarded' },
    ],
    workstreams: [
      {
        title: 'CCPA compliance data pipeline',
        stack: ['PySpark', 'Airflow', 'AWS EMR', 'S3', 'Lambda', 'SNS', 'DynamoDB', 'Terraform'],
        points: [
          'Developed and maintained PySpark jobs on AWS EMR to process marketing data for CCPA compliance: converting .gz files to Parquet and running search, delete and file-reuse operations on consumer records.',
          'Orchestrated the pipeline with Airflow DAGs triggered by AWS Lambda, tracked load status in DynamoDB and sent success/failure alerts through SNS, provisioning the Lambda triggers and SNS topics with Terraform.',
          'Applied field-level encryption to sensitive fields, with exception handling and logging to keep the pipeline stable and auditable.',
          'Wrote unit tests with pytest and unittest, took part in code reviews in Bitbucket, and used Jenkins CI/CD to deploy code to S3.',
        ],
      },
      {
        title: 'Data warehousing, tuning & reporting',
        stack: ['Hive', 'Spark SQL', 'Snowflake', 'SQL', 'S3 Select'],
        points: [
          'Tuned Hive queries on terabyte-scale tables with partitioning, bucketing and Parquet/ORC; PySpark jobs pull the required columns in about 5 minutes.',
          "Loaded structured and semi-structured data (CSV, Parquet, .gz, JSON) from Hive and multiple teams' S3 buckets into Snowflake for analytics and reporting.",
          'Built a weekly S3 storage-cost report pipeline using SQL, S3 Select and the S3 API, emailed to stakeholders as an HTML report.',
          'Provided production support, investigating and resolving pipeline failures and data issues, and onboarded 3–4 new enterprise clients.',
        ],
      },
    ],
    stack: ['Python', 'SQL', 'PySpark', 'Airflow', 'Hive', 'AWS', 'Snowflake', 'Terraform', 'Jenkins'],
  },
  {
    role: 'Data Engineer Intern',
    company: 'Sayu Softech Private Limited',
    companySubtitle: 'Telecom domain',
    location: 'Pune, India',
    summary: 'Enterprise data warehouse and reporting work in the telecom domain.',
    points: [
      'Built data-driven reports, wrote stored procedures and optimised queries using SQL and PL/SQL.',
      'Loaded enterprise data from AWS RDS (PostgreSQL) into HBase using Spark and Phoenix, created Hive tables with DDL, de-duplicated the data and delivered results to S3 for reporting.',
      'Imported data from MySQL into HDFS and Hive using Sqoop, and worked across Hadoop, S3 and AWS Glue in a data lake.',
    ],
    stack: ['SQL', 'PL/SQL', 'Spark', 'HBase', 'Hive', 'Sqoop', 'AWS Glue'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'MSc Artificial Intelligence',
    institution: 'National College of Ireland',
    period: '2025 – 2026',
    modules: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Data Analytics', 'Cloud and Edge AI', 'Advanced Programming for AI', 'Research in Computing'],
    thesis: {
      title: 'AdaptivePromptGuard (solo)',
      summary: 'A two-stage LLM jailbreak defence that cut attack success from up to 77% to under 1% across three 7B models (p < 0.001), at a 6% false-positive rate on benign prompts.',
    },
  },
  {
    degree: 'B-Tech Computer Science',
    institution: 'Savitribai Phule Pune University',
    period: '2018 – 2022',
    details: ['CGPA 8.34/10, 1st Class with Distinction', 'Algorithms, database management and software engineering'],
  },
];

export const ACHIEVEMENTS: string[] = ['5-star Python on HackerRank', '5-star SQL on HackerRank'];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Programming Languages',
    blurb: 'Day-to-day languages for pipelines and analysis.',
    iconName: 'Code2',
    skills: ['Python', 'Pandas', 'NumPy', 'SQL', 'PL/SQL', 'Spark SQL', 'HiveQL', 'Linux / Unix', 'cron'],
  },
  {
    title: 'Data Engineering',
    blurb: 'Designing, orchestrating and modelling data flows.',
    iconName: 'Workflow',
    skills: ['Apache Airflow', 'ETL pipeline design', 'Data warehousing', 'Data modelling', 'Partitioning & bucketing', 'Parquet / ORC', 'Playwright scraping'],
  },
  {
    title: 'Big Data',
    blurb: 'Processing at terabyte scale.',
    iconName: 'Layers',
    skills: ['PySpark', 'Hive', 'Hadoop (HDFS, YARN)', 'MapReduce', 'Sqoop', 'AWS EMR'],
  },
  {
    title: 'Cloud & Infrastructure',
    blurb: 'AWS services and infrastructure as code.',
    iconName: 'Cloud',
    skills: ['AWS S3 / S3 Select', 'Glue', 'Lambda', 'Athena', 'Step Functions', 'EC2', 'SNS', 'Parameter Store', 'Terraform', 'Docker'],
  },
  {
    title: 'Artificial Intelligence',
    blurb: 'Classical ML, deep learning and explainability.',
    iconName: 'BrainCircuit',
    skills: ['PyTorch', 'Hugging Face Transformers', 'DistilBERT fine-tuning', 'Scikit-learn', 'XGBoost / LightGBM', 'SHAP', 'K-Means'],
  },
  {
    title: 'Generative AI',
    blurb: 'Retrieval, agents and LLM safety.',
    iconName: 'Sparkles',
    skills: ['RAG', 'LangChain', 'Deep Agents', 'GPT-4o', 'Gemini', 'Milvus / FAISS', 'Sentence Transformers', 'Ollama'],
  },
  {
    title: 'Databases',
    blurb: 'Warehouses, relational and NoSQL stores.',
    iconName: 'Database',
    skills: ['Snowflake', 'PostgreSQL', 'MySQL', 'HBase', 'MongoDB', 'DynamoDB'],
  },
  {
    title: 'Development Tools',
    blurb: 'APIs, testing, CI/CD and delivery.',
    iconName: 'Terminal',
    skills: ['FastAPI', 'Flask', 'Streamlit', 'SQLAlchemy', 'REST APIs', 'pytest / unittest', 'Jenkins CI/CD', 'Git / GitHub / Bitbucket', 'JIRA / Confluence', 'Postman', 'Jupyter'],
  },
];

export const PIPELINE: PipelineStage[] = [
  {
    id: 'sources',
    name: 'Sources',
    iconName: 'Boxes',
    what: 'Data arrives from many teams and systems, in many shapes: CSV, JSON, Parquet, .gz, relational tables and web pages.',
    tools: ['S3', 'Hive', 'AWS RDS', 'MySQL', 'Web'],
    where: [
      { label: "Experian: multiple teams' S3 buckets and Hive tables" },
      { label: 'Internship: AWS RDS (PostgreSQL) and MySQL' },
      { label: 'Hotel agent: a client-rendered website', project: 'hotel-agent' },
    ],
  },
  {
    id: 'ingest',
    name: 'Ingest',
    iconName: 'Workflow',
    what: 'Scheduled, dependency-aware ingestion with logging, retries and alerting, so failures surface instead of hiding.',
    tools: ['Airflow', 'Lambda', 'Sqoop', 'Playwright'],
    where: [
      { label: 'Experian: a team running ~109 production Airflow pipelines' },
      { label: 'CCPA pipeline: Airflow DAGs triggered by AWS Lambda' },
      { label: 'Hotel agent: Playwright ETL with upserts', project: 'hotel-agent' },
    ],
  },
  {
    id: 'transform',
    name: 'Transform',
    iconName: 'Cpu',
    what: 'Distributed transformation at terabyte scale: format conversion, cleaning, de-duplication and feature engineering.',
    tools: ['PySpark', 'AWS EMR', 'Spark SQL', 'Pandas'],
    where: [
      { label: 'CCPA pipeline: PySpark on EMR converting .gz to Parquet' },
      { label: 'Experian: column pulls from TB-scale Hive tables in ~5 min' },
      { label: 'Road collisions: cleaning and spatial joins', project: 'road-collision' },
    ],
  },
  {
    id: 'store',
    name: 'Store',
    iconName: 'Database',
    what: 'Modelled storage built for the queries that matter: partitioning, bucketing, columnar formats, keys and indexes.',
    tools: ['Snowflake', 'Hive', 'PostgreSQL', 'DynamoDB', 'HBase'],
    where: [
      { label: 'Experian: processed data loaded into Snowflake' },
      { label: 'Hotel agent: fact table, 3 lookups, 5 indexes', project: 'hotel-agent' },
      { label: 'Road collisions: raw, clean and feature layers', project: 'road-collision' },
    ],
  },
  {
    id: 'quality',
    name: 'Quality',
    iconName: 'ShieldCheck',
    what: 'Tests, checks and alerts that keep data trustworthy, plus encryption where records are sensitive.',
    tools: ['pytest', 'Jenkins', 'SNS', 'Encryption'],
    where: [
      { label: 'CCPA pipeline: field-level encryption and SNS alerts' },
      { label: 'Experian: pytest, code reviews and Jenkins CI/CD' },
      { label: 'Hotel agent: 6 automated verification checks', project: 'hotel-agent' },
    ],
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    iconName: 'Sparkles',
    what: 'Where data becomes decisions: reports, APIs, retrieval-augmented answers and agents that query live data safely.',
    tools: ['LangChain', 'RAG', 'FastAPI', 'Transformers'],
    where: [
      { label: 'Experian: weekly S3 cost reports emailed to stakeholders' },
      { label: 'Hotel agent: Deep Agent with 10 read-only SQL tools', project: 'hotel-agent' },
      { label: 'RAG chatbot: Milvus retrieval grounding Gemini', project: 'rag-chatbot' },
      { label: 'AdaptivePromptGuard: a classifier guarding the LLM', project: 'adaptive-prompt-guard' },
    ],
  },
];
