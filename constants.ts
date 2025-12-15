import { Project, ExperienceItem, SkillCategory } from './types.ts';

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Generative AI & ML',
    iconName: 'BrainCircuit',
    skills: ['RAG Architecture', 'LangChain', 'LLMs (GPT/Gemini)', 'Vector DB (Milvus)', 'NLP (NLTK/Spacy)', 'Deep Learning (CNN/ANN)']
  },
  {
    title: 'Data Engineering',
    iconName: 'Database',
    skills: ['PySpark', 'Apache Airflow', 'Hadoop (HDFS/YARN)', 'ETL Pipelines', 'Hive', 'Data Modeling']
  },
  {
    title: 'Cloud & DevOps',
    iconName: 'Cloud',
    skills: ['AWS (EMR, S3, Lambda)', 'Terraform', 'Jenkins CI/CD', 'AWS Glue', 'Docker', 'Linux']
  },
  {
    title: 'Programming & DB',
    iconName: 'Code2',
    skills: ['Python', 'SQL', 'DynamoDB', 'MongoDB', 'Snowflake', 'FastAPI']
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'RAG-based AI Chatbot',
    summary: 'Intelligent Knowledge Base Chatbot using Retrieval-Augmented Generation (RAG) and Milvus vector database for automated customer support.',
    techStack: ['Python', 'LangChain', 'Milvus', 'OpenAI API', 'FastAPI'],
    repoLink: 'https://github.com/Mahesh8806/AI-Project1-RAG-based-AI-Chatbot',
    category: 'GenAI'
  },
  {
    title: 'Dublin Bikes Availability Prediction',
    summary: 'Predicts Dublin Bikes station availability (LOW/MEDIUM/HIGH) using historical data and machine learning models.',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'Git'],
    repoLink:'https://github.com/Mahesh8806/ML-Project1-Dublin-Bikes-Availability-Prediction',
    category: 'ML'
  },
  {
    title: 'Customer Churn Prediction',
    summary: 'Built an end-to-end machine learning project in Python to predict customer churn using Logistic Regression and Random Forest, including data preprocessing, model optimization, and business insight generation.',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'Git'],
    repoLink: 'https://github.com/Mahesh8806/ML-Project2-ML-Project2-Customer-Churn-Prediction',
    category: 'ML'
  },
  {
    title: 'Road Collision Severity Prediction',
    summary: 'Built an end-to-end machine learning pipeline to predict road collision severity using UK accident, weather, and population data, including data engineering, model training, class imbalance handling, and explainability with SHAP.',
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'PostgreSQL', 'SHAP'],
    repoLink: 'https://github.com/Mahesh8806/ML-Project3-road-collision-severity-prediction',
    category: 'ML'
  },
  {
    title: 'S3 Storage Cost Optimization',
    summary: 'Automated storage analysis pipeline using AWS S3 Select and Python to generate weekly cost-optimization reports via email.',
    techStack: ['Python', 'AWS S3', 'Airflow', 'AWS SES', 'Pandas'],
    repoLink: 'https://github.com/Mahesh8806',
    category: 'Cloud'
  },
  {
    title: 'Enterprise Warehouse Analysis',
    summary: 'Big Data migration project moving RDS data to HBase and Hive for downstream analytics using Apache Spark and Phoenix.',
    techStack: ['Spark', 'HBase', 'Hive', 'AWS RDS', 'Linux'],
    repoLink: 'https://github.com/Mahesh8806',
    category: 'Big Data'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'MSc Artificial Intelligence',
    company: 'National College of Ireland',
    period: '2025 - Present',
    description: [
      'Pursuing Master’s degree specializing in Artificial Intelligence.',
      'Focus areas: Machine Learning, Deep Learning, Data Mining, and Natural Language Processing..',
      'Based in Dublin, Ireland.'
    ],
    type: 'education'
  },
  {
    role: 'Software Engineer',
    company: 'Caspex Tech LLP (Client: Experian)',
    period: 'Dec 2022 - July 2025',
    description: [
      'Designed and implemented RAG-based chatbots integrating LLMs with Milvus, enhancing product documentation queries.',
      'Built scalable PySpark ETL pipelines on AWS EMR for CCPA compliance, handling millions of records.',
      'Automated infrastructure deployment using Terraform and managed workflow orchestration with Apache Airflow.',
      'Optimized AWS S3 storage costs by developing automated reporting tools using Python and AWS SDKs.'
    ],
    type: 'work'
  },
  {
    role: 'Data Engineer Intern',
    company: 'Sayu Softech Private Limited',
    period: 'Internship',
    description: [
      'Developed data-driven reports and stored procedures to support business intelligence.',
      'Optimized complex SQL queries and PL/SQL scripts for better performance.'
    ],
    type: 'work'
  },
  {
    role: 'Bachelor of Computer Science',
    company: 'Savitribai Phule Pune University',
    period: '2018 - 2022',
    description: [
      'Graduated with First Class Distinction (CGPA 8.33).',
      'Foundation in Algorithms, Database Management, and Software Engineering.',
      '5-Star Rating in Python and SQL on HackerRank.'
    ],
    type: 'education'
  }
];