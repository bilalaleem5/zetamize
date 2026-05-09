export interface Project {
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  views: number;
  rating: number;
  time: string;
  image: string;
  videos?: string[];
  stats?: { label: string; val: string };
  metric?: string;
}

export const projects: Project[] = [
  {
    title: "ZetaFin",
    category: "N8n Automation",
    shortDesc: "An AI-powered Financial Intelligence System for real-time Profit & Loss tracking.",
    fullDesc: `Know exactly where every rupee goes.

ZetaFin provides real-time Profit & Loss tracking, client management, vendor management, expense monitoring, employee tracking, and net profit estimation — all in one unified platform. It also includes automated auditing and intelligent financial insights to help you manage your entire business operations efficiently.`,
    tags: ["Financial AI", "Profit Tracking", "Automation"],
    views: 1250, rating: 5.0, time: "6 weeks",
    image: "/portfolio-assets/zetafin.jpeg",
    stats: { label: "AUDITING", val: "Automated" },
    metric: "Finance Intelligence"
  },
  {
    title: "ZetAI",
    category: "Voice AI",
    shortDesc: "An AI-powered Voice Agent that executes tasks based on spoken commands.",
    fullDesc: `ZetAI is a smart voice-driven assistant that executes tasks based on your spoken commands. You can instruct it to perform research, send messages, read emails, and handle various operational tasks automatically — acting as your personal AI execution agent.`,
    tags: ["Voice AI", "Personal Assistant", "Task Automation"],
    views: 1800, rating: 4.9, time: "8 weeks",
    image: "/portfolio-assets/zetaai assistant.png",
    stats: { label: "LATENCY", val: "Ultra-Low" },
    metric: "Voice Command Engine"
  },
  {
    title: "ZetaAgent",
    category: "Autonomous Agents",
    shortDesc: "Autonomous AI Agent System for lead generation and business growth.",
    fullDesc: `ZetaAgent is a multi-agent system where you simply define your business type, and the system automatically builds and deploys intelligent agents for you. These agents independently perform lead generation, target research, outreach, and follow-ups — creating a fully automated business growth engine.`,
    tags: ["Multi-Agent", "Lead Gen", "Scaling"],
    views: 2100, rating: 5.0, time: "10 weeks",
    image: "/portfolio-assets/zetaagent.jpeg",
    stats: { label: "OUTREACH", val: "Fully Auto" },
    metric: "Growth Engine"
  },
  {
    title: "Vehicle AI Listing System",
    category: "AI Marketplace",
    shortDesc: "AI-powered vehicle marketplace platform with automated scheduling and safety.",
    fullDesc: `This system allows users to list vehicles for sale while buyers can book meetings directly with sellers. It includes AI-driven automation for scheduling, chatbot support, WhatsApp integration, and fake listing detection to ensure trust and safety in transactions.`,
    tags: ["Marketplace", "Fraud Detection", "Scheduling"],
    views: 1550, rating: 4.8, time: "7 weeks",
    image: "/portfolio-assets/vehiclewaly.jpeg",
    stats: { label: "TRUST_SCORE", val: "AI-Verified" },
    metric: "Marketplace OS"
  },
  {
    title: "Facebook Marketplace Posting Bot",
    category: "Social Automation",
    shortDesc: "Automated bulk listing system for Facebook Marketplace with anti-ban tech.",
    fullDesc: `This bot enables users to post multiple listings automatically on Facebook Marketplace. It is designed with advanced optimization techniques to minimize the risk of account bans while maximizing posting efficiency and reach.`,
    tags: ["Bulk Posting", "Anti-Ban", "FB Automation"],
    views: 940, rating: 4.7, time: "4 weeks",
    image: "/portfolio-assets/faceboook marketplace listing bot.png",
    stats: { label: "POST_SPEED", val: "Optimized" },
    metric: "FB Scaling Engine"
  },
  {
    title: "Message Reply Bot",
    category: "Social Automation",
    shortDesc: "AI-powered customer communication automation for marketplace inquiries.",
    fullDesc: `This bot reads incoming customer messages from marketplace listings and responds instantly with intelligent, context-aware replies within seconds. It ensures fast communication, improved engagement, and higher conversion rates through automated responses.`,
    tags: ["Fast Reply", "Context AI", "Engagement"],
    views: 1120, rating: 4.9, time: "3 weeks",
    image: "/portfolio-assets/FB marketplace reply bot.png",
    stats: { label: "RESPONSE_TIME", val: "< 10s" },
    metric: "Conversion Layer"
  },
  {
    title: "Aixen AI",
    category: "N8n Automation",
    shortDesc: "Unified AI Communication & Lead Management System powered by LLMs.",
    fullDesc: `Overview
Aixen AI is an all-in-one AI-powered automation platform designed to centralize and streamline business communication across multiple channels.
It eliminates the need to manage WhatsApp, Instagram, Facebook, and TikTok separately by bringing everything into a single intelligent system — powered by LLMs and automation workflows.
Instead of manually replying, tracking leads, or juggling conversations, Aixen AI handles communication, engagement, and lead management automatically — so businesses can focus on closing, not chasing.

What Problem It Solves
Most businesses today face:
- Scattered conversations across platforms 
- Slow or inconsistent replies to leads 
- Missed opportunities due to manual handling 
- No centralized view of customer interactions 
- Time wasted on repetitive messaging 

Core Capabilities
1. AI-Powered Messaging (LLM Integration)
2. WhatsApp Automation
3. Multi-Platform Comment Automation
4. Unified Lead Management System
5. Chat Scheduling & Follow-Ups
6. Voice Understanding
7. Video Understanding
8. Document (PDF) Understanding

Key Advantage
Aixen AI is not just a chatbot — it’s a full communication operating system.`,
    tags: ["LLMs", "Voice AI", "Social Automation"],
    views: 3500, rating: 5.0, time: "8 weeks",
    image: "/portfolio-assets/aixen-ai.jpg",
    stats: { label: "CONVERSIONS", val: "3x Boost" },
    metric: "Global Comm Sync"
  },
  {
    title: "Clozr AI",
    category: "N8n Automation",
    shortDesc: "Autonomous Lead Acquisition & Conversion System across multi-channels.",
    fullDesc: `CLOZR AI — Autonomous Lead Acquisition & Conversion System

Overview
CLOZR AI is an end-to-end AI-powered lead acquisition and outreach platform designed to automate the entire outbound workflow — from discovering high-quality leads to converting them into conversations.
Instead of juggling multiple tools for scraping, messaging, and follow-ups, CLOZR centralizes everything into a single system that:
- Finds leads from Google Maps & LinkedIn 
- Enriches and organizes lead data 
- Uses AI to generate personalized outreach messages 
- Executes multi-channel campaigns (Email, WhatsApp, LinkedIn) 

Core Value Proposition
I help businesses automate lead generation and outreach so they can consistently turn cold prospects into warm conversations — without hiring SDRs or spending hours manually.

Core Actions
1. Lead Acquisition (Google Maps / LinkedIn Scraper)
2. Lead Processing & Structuring
3. AI-Powered Message Generation
4. Campaign Builder (Core Engine)
5. Multi-Channel Outreach Execution
6. Automated Follow-Ups
7. Reply Center (Inbox System)
8. Auto Closer (Conversion Layer)`,
    tags: ["Lead Gen", "n8n", "AI Scaling"],
    views: 4200, rating: 4.9, time: "10 weeks",
    image: "/portfolio-assets/clozr-ai.jpeg",
    stats: { label: "ACQUISITION", val: "Automated" },
    metric: "Multi-Channel Engine"
  },
  {
    title: "Instagram Automation Bot",
    category: "Social Automation",
    shortDesc: "Automates Instagram scraping and email capture via Android emulator.",
    fullDesc: `The Instagram Automation Bot is designed to streamline interactions on the Instagram platform while focusing on capturing and communicating with users via email. Here's a comprehensive overview of its capabilities:

Core Actions:
Automated Login:
The bot initializes by launching the Instagram application on specified Android devices. It securely logs into Instagram utilizing pre-configured credentials, ensuring seamless access without manual input.

Username Search and Email Capture:
By navigating through the Instagram interface, the bot searches for specific usernames from a predefined list. It identifies and extracts email addresses linked to these profiles, storing them systematically in a CSV file for easy reference.

Email Outreach (Hypothetical Extension):
Building upon its email capture functionality, the bot can be enhanced to send personalized emails to the captured email addresses. Using email APIs, it automates outreach efforts through customizable templates, facilitating communication with target users directly from the application.

Error Handling and Logging:
Equipped with robust error handling mechanisms, the bot logs any interaction issues for detailed review, aiding in troubleshooting and further development. In case of errors during username searching or other activities, the bot automatically attempts retries, minimizing disruptions.

By combining these functionalities, the bot effectively automates the process of collecting and reaching out to Instagram users, providing an efficient solution for data extraction and potential communication management.`,
    tags: ["Android", "Appium", "Automation"],
    views: 890, rating: 4.8, time: "4 weeks",
    image: "/portfolio-assets/ig-unfollow.png",
    videos: [
      "/portfolio-assets/ig-search-login.mp4",
      "/portfolio-assets/ig-search-action.mp4"
    ]
  },
  {
    title: "Project: Logoed Scrapper",
    category: "Request Scraping",
    shortDesc: "Automates extraction of structured project metadata from Logoed's showcase.",
    fullDesc: `Overview
The Logoed Scrapper is an automated data extraction tool designed to collect and structure content from Logoed’s project showcase pages. Using browser automation, it gathers detailed metadata and interleaved content blocks, including images, project descriptions, and video references, exporting them into a clean, developer-friendly JSON format.

Features
Structured Data Extraction Parses essential metadata such as:
- Title
- Author
- Date
- Categories and Tags
- Thumbnail image

Content Parsing Extracts rich content blocks including:
- Inline paragraphs (project descriptions, quotes)
- Images (with captions)
- Video references (e.g., MP4 links)

Formatted Output
Stores results as a deeply structured JSON file, organizing all extracted data for each project in a human-readable and programmatically usable format.

Interface and Operation
This scraper is a script-based tool, typically run via the command line. It operates on specified Logoed project URLs and saves JSON outputs to the local filesystem.

Technical Highlights
- Selenium-based automation for dynamic content parsing
- Handles both images and video references
- Interleaves paragraphs and images for accurate content representation`,
    tags: ["Selenium", "Python", "Data Parsing"],
    views: 1100, rating: 4.9, time: "2 weeks",
    image: "/portfolio-assets/logoed-scraper.jpg",
    stats: { label: "DATA_COVERAGE", val: "99.9%" },
    metric: "Global Projects Sync: Active"
  },
  {
    title: "Project: Lovely Package Scraper",
    category: "Request Scraping",
    shortDesc: "Selenium-powered tool for extracting structure packaging design articles.",
    fullDesc: `Overview
The Lovely Package Scraper is a Selenium-powered tool for extracting and structuring packaging design articles from Lovely Package. It automates the collection of article metadata, design details, and rich content blocks, outputting them as organized JSON for further analysis or display.

Features
Structured Data Extraction Parses essential metadata such as:
- Title, Author, Date, Category, Thumbnail image
- Design info (designer, country, font, etc.)

Content Parsing Extracts content blocks including:
- Inline paragraphs (project stories, design rationale)
- Images (with captions)
- Video references (if present)

Formatted Output
Exports results as a structured JSON array, with each article’s metadata and content blocks clearly organized.

Interface and Operation
Script-based, run via command line, operating on specified article URLs and saving JSON outputs locally.

Technical Highlights
- Selenium-based automation for dynamic web content
- Handles multiple articles in a single run
- Captures both images and detailed design info`,
    tags: ["Selenium", "Python", "Web Scraping"],
    views: 750, rating: 4.7, time: "2 weeks",
    image: "/portfolio-assets/lovely-package.jpg"
  },
  {
    title: "Project: Visuelle Scraper",
    category: "Request Scraping",
    shortDesc: "Selenium-driven tool for extracting podcast and design showcase entries.",
    fullDesc: `Overview
The Visuelle Scraper is a Selenium-driven tool for extracting and structuring content from Visuelle’s design and podcast showcase pages. It automates the retrieval of article metadata, images, and descriptive content, exporting them into a structured JSON format for easy reuse.

Features
Structured Data Extraction Parses essential metadata such as:
- Title, Date, Categories and Tags, Thumbnail image

Content Parsing Extracts content blocks including:
- Inline paragraphs (episode summaries, project descriptions)
- Images (with captions)
- Video references (e.g., Vimeo links)

Formatted Output
Exports results as a structured JSON array, with each entry’s metadata and content blocks clearly organized.

Interface and Operation
Script-based, run via command line, operating on specified Visuelle article or episode URLs and saving JSON outputs locally.

Technical Highlights
- Selenium-based automation for dynamic content
- Handles both podcast and design showcase entries
- Interleaves images and paragraphs for accurate content representation`,
    tags: ["Selenium", "JSON", "Python"],
    views: 920, rating: 4.8, time: "3 weeks",
    image: "/portfolio-assets/visuelle-scraper.jpg"
  },
  {
    title: "Web Scraping with Selenium: Amazon Product Data Extractor",
    category: "Selenium Scraping",
    shortDesc: "Comprehensive scraping solution to extract detailed Amazon product data.",
    fullDesc: `Description
This project demonstrates a comprehensive web scraping solution using Python and Selenium to extract detailed product information from Amazon. The script automates the extraction of various product attributes including brand name, price, images, colors available, and customer reviews along with their ratings. It is designed to navigate through different product categories, handle dynamic page loading, and manage browser sessions efficiently.

Key Features
- Automated Browser Control: The script utilizes Selenium for browser automation to load pages and interact with web elements dynamically.
- Randomized Delays: Introduces random sleep intervals between interactions to mimic human browsing behavior and avoid detection as a bot.
- Detailed Data Extraction: Extracts comprehensive product data such as ASIN, title, price, color variations, and customer reviews with ratings.
- Robust Error Handling: Implements try-except blocks to handle and log errors during element selection and data extraction.
- Efficient Data Management: Each product’s data is saved in JSON format into organized directories classified by categories and subcategories.
- Multi-layered Navigation: Navigates through main categories and subcategories, exploring each product listing page and its details page.
- Headless Mode Support: Enables headless mode for faster execution without opening a UI, suitable for large-scale data collection tasks.

Potential Use Cases
- E-commerce Analysis: Provides insights into product features, pricing trends, and consumer sentiment from reviews.
- Competitor Monitoring: Automate the process of tracking competitors’ listings and updates.
- Market Research: Gathers detailed product information to identify market gaps or opportunities.`,
    tags: ["Selenium", "E-commerce", "Python"],
    views: 1800, rating: 5.0, time: "5 weeks",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800",
    videos: [
      "/portfolio-assets/amazon-scraper-1.mp4",
      "/portfolio-assets/amazon-scraper-2.mp4"
    ]
  },
  {
    title: "Project: Are.na Editorial Scraper",
    category: "Selenium Scraping",
    shortDesc: "Data extraction tool to automate scraping articles from Are.na editorials.",
    fullDesc: `Overview
The Are.na Editorial Scraper is a data extraction tool built using Selenium and designed to automate the process of scraping articles from Are.na's editorial pages. It collects structured content — including titles, author info, reference links, images, and full article paragraphs — and exports them into a clean JSON format for further use.

Features
Structured Data Extraction Parses essential metadata such as:
- Title, Author, Date, Categories & Tags, References
Content Parsing Extracts rich content blocks including:
- Inline paragraphs, Images (with captions), External references

Formatted Output
Stores results as a deeply structured JSON file, organizing all extracted data for each editorial in a human-readable and programmatically usable format.

Technical Highlights
- Selenium-Based Automation Navigates and parses dynamic web content on Are.na using headless browser automation.
- Image & Caption Handling Collects all <img> elements with corresponding captions for inclusion in exported JSON.
- Content Block Classifier Differentiates between paragraph content and image content with caption mapping.`,
    tags: ["Selenium", "Python", "Scraping"],
    views: 650, rating: 4.6, time: "2 weeks",
    image: "/portfolio-assets/arena-scraper.jpg"
  },
  {
    title: "Project: Extraweg Portfolio Scraper",
    category: "Selenium Scraping",
    shortDesc: "Automates collecting detailed metadata and multimedia from Extraweg.",
    fullDesc: `Overview
The Extraweg Portfolio Scraper is an automated data collection tool developed using Selenium. It extracts detailed metadata, multimedia content, and structural information from project pages on the Extraweg website. The final output is stored as a structured JSON file that includes project details, image content, video references, and URLs for further use in creative archives or media catalogs.

Features
Project Metadata Extraction Captures credits and classification data for each item including:
- Client, Agency, Production Company, Art Director, Category, Tags
Content Collection Gathers all visual elements associated with a project:
- Multiple high-resolution image links, optional captions, descriptive paragraphs

Technical Highlights
- Selenium-Based Page Interaction Uses browser automation to handle lazy-loading images, media carousels, and JavaScript-rendered content.
- Flexible Content Block Parser Differentiates between textual and image content while preserving order and structure.
- High-Fidelity Media Capture Saves image links in original resolution with appropriate URLs, ideal for visual archiving or presentation layers.
- Error Tolerance Handles projects with partial or missing fields (such as absent text blocks or image captions) without breaking the structure of the final data.`,
    tags: ["Selenium", "Data Collection", "Python"],
    views: 1050, rating: 4.8, time: "3 weeks",
    image: "/portfolio-assets/extraweg-scraper.jpg"
  },
  {
    title: "Instagram Unfollow Bot Application",
    category: "Social Automation",
    shortDesc: "Automates Instagram mass-unfollowing using a PyQt graphical interface.",
    fullDesc: `Instagram Unfollow Bot Application
This application is an automated solution designed to help users efficiently manage their Instagram following list. Utilizing the power of Selenium and the PyQt framework, the bot allows users to unfollow a batch of Instagram accounts specified in a CSV file. The user-friendly interface lets you configure daily and hourly limits, ensuring compliance with Instagram's restrictions. Featuring a smart login detection mechanism, the application pauses to request user input for manual authentication when needed. The progress and activity logs provide users with real-time updates on the bot's operations, enhancing usability and transparency.

Skills Demonstrated
- PyQt GUI Development: Building a responsive and interactive graphical user interface with PyQt5.
- Multithreading in Python: Employing QThread for running tasks concurrently without blocking the main UI thread.
- Web Automation with Selenium: Automating browser actions using SeleniumBase for Instagram interactions.
- Data Management with CSV and JSON: Reading from and writing to CSV files for user data, and utilizing JSON for maintaining operational stats.
- Exception Handling and Logging: Implementing robust error handling and logging mechanisms to ensure smooth operation and debugging capabilities.`,
    tags: ["PyQt", "Selenium", "Desktop App"],
    views: 2100, rating: 4.9, time: "6 weeks",
    image: "/portfolio-assets/ig-unfollow.png",
    videos: [
      "/portfolio-assets/ig-unfollow-video.mp4"
    ]
  },
  {
    title: "AI Calling Lead Generation Agent – Workflow Overview",
    category: "N8n Automation",
    shortDesc: "Automated AI calling workflow reducing manual lead pre-qualification.",
    fullDesc: `AI Calling Lead Generation Agent – Workflow Overview.

This robust n8n-powered agent completely automates outbound AI voice conversations. It replaces standard manual pre-qualification by using a voice LLM that dials prospect numbers, conducts intelligent and highly adaptive conversations to gauge interest, and seamlessly hands off qualified leads to your CRM systems (like HubSpot or Salesforce), drastically elevating connection and conversion rates.`,
    tags: ["n8n", "Voice AI", "Lead Gen"],
    views: 1400, rating: 4.9, time: "4 weeks",
    image: "/portfolio-assets/ai-calling.png",
    stats: { label: "EFFICIENCY_GAIN", val: "85.0%" },
    metric: "1.5k+ Calls/Day"
  },
  {
    title: "Appointment Booking Voice AI Agent – Workflow Overview",
    category: "N8n Automation",
    shortDesc: "AI Voice agent integrated with calendars to book appointments 24/7.",
    fullDesc: `Appointment Booking Voice AI Agent – Workflow Overview.

This AI native voice conversational agent acts as an autonomous virtual receptionist. It is entirely integrated with calender APIs like Google Calendar or Calendly, allowing it to interpret end-user schedules over the phone, naturally negotiate meeting times, and automatically book, adjust, or cancel appointments dynamically 24 hours a day, 7 days a week.`,
    tags: ["n8n", "Voice AI", "Scheduling"],
    views: 1750, rating: 5.0, time: "5 weeks",
    image: "/portfolio-assets/appointment-booking.png",
    stats: { label: "CONVERSION_RATE", val: "92.5%" },
    metric: "0.5s Avg Response Time"
  },
  {
    title: "Blogs Automation with JTL WebApp – Workflow Overview",
    category: "N8n Automation",
    shortDesc: "Fully automated blog writing and publishing pipeline with JTL WebApp.",
    fullDesc: `Blogs Automation with JTL WebApp – Workflow Overview.

Designed to function as a fully autonomous marketing unit, this automation continually orchestrates the ideation, drafting, styling, and direct publishing of high-quality blog content at scale. It leverages robust AI text generation paired with headless browser automation, pushing formatted, SEO-optimized articles seamlessly into the CMS.`,
    tags: ["n8n", "Content Generation", "AI"],
    views: 950, rating: 4.7, time: "3 weeks",
    image: "/portfolio-assets/blog-automation.png"
  },
  {
    title: "Email Leads Automations with Advanced Personalization – Workflow Overview",
    category: "N8n Automation",
    shortDesc: "Advanced email leads automation with deep personalization capabilities.",
    fullDesc: `Email Leads Automations with Advanced Personalization – Workflow Overview.

A highly targeted, multi-agent email outreach system. It fetches leads automatically from web and database sources, then queries individual company sites and specific Linkedin profiles to draw rich data. Using that precise context, the localized LLMs generate hyper-personalized sales copy and intelligently sequence follow-ups based on the receiver's interactions.`,
    tags: ["n8n", "Email Marketing", "LLMs"],
    views: 1300, rating: 4.8, time: "4 weeks",
    image: "/portfolio-assets/email-leads.png"
  },
  {
    title: "Meme Generator Workflow – Overview",
    category: "N8n Automation",
    shortDesc: "Automated social media asset creation powered by image generation AI.",
    fullDesc: `Meme Generator Workflow – Overview.

A uniquely creative and systematic workflow that generates humorous social media content algorithmically. It monitors current industry trends via scraping APIs, passes the context to an LLM to generate relatable meme punchlines, and interfaces directly with image-generation APIs to draft, format, layer text over templates, and automatically queue the posts for social media rollout.`,
    tags: ["n8n", "Generative AI", "Social Media"],
    views: 1100, rating: 4.5, time: "2 weeks",
    image: "/portfolio-assets/meme-generator.png"
  },
  {
    title: "Reddit Content Filter & Notifier Workflow – Overview",
    category: "N8n Automation",
    shortDesc: "Reddit content filter and notifier to capture high-value leads automatically.",
    fullDesc: `Reddit Content Filter & Notifier Workflow – Overview.

Providing real-time surveillance over dynamic Reddit communities, this solution actively scans designated subreddits using the site API. It routes every discovered post through a semantic NLP filter capable of accurately discerning high-intent product questions from casual chatter. Qualified posts instantly trigger notifications to designated Slack channels and automate initial engagement replies.`,
    tags: ["n8n", "Reddit API", "Lead AI"],
    views: 1250, rating: 4.8, time: "3 weeks",
    image: "/portfolio-assets/reddit-notifier.png"
  },
  {
    title: "AI Resume & Job Application System",
    category: "N8n Automation",
    shortDesc: "Automated workflow for job analysis, resume tailoring, and application tracking.",
    fullDesc: `AI Resume & Job Application System Workflow Overview.\n\nThis comprehensive workflow automates the entire job application process. It monitors job boards, analyzes job descriptions using LLMs, matches against candidate profiles, dynamically tailors resumes and cover letters via Google Docs integration, and notifies the user via Telegram for final review and approval. Error handling and duplicate checks ensure reliable operation.`,
    tags: ["n8n", "AI Automation", "Job Search"],
    views: 850, rating: 4.8, time: "2 weeks",
    image: "/portfolio-assets/c79e242be1534d6289c57ff92f965d943482bdda2dd2497eb21e1aaf7fcd2c6e.png"
  },
  {
    title: "Multi-Agent Workflow Orchestrator",
    category: "AI Agents",
    shortDesc: "Multi-agent architecture coordinating email, task, and calendar management.",
    fullDesc: `Multi-Agent Workflow Orchestrator Overview.\n\nA sophisticated AI system featuring an orchestrator that delegates tasks to specialized sub-agents: an Email Agent, a Task Manager Agent, and a Calendar Manager Agent. The system uses a conversational LLM (Gemini) to seamlessly integrate Google Workspace APIs, allowing natural language control over your entire digital workspace.`,
    tags: ["Multi-Agent", "n8n", "Google Workspace"],
    views: 1100, rating: 4.9, time: "3 weeks",
    image: "/portfolio-assets/3124234.webp"
  },
  {
    title: "Telegram Data Extraction & AI Analysis",
    category: "N8n Automation",
    shortDesc: "Automates PDF and image data extraction from Telegram messages.",
    fullDesc: `Telegram Data Extraction & AI Analysis Overview.\n\nThis workflow intercepts files and images sent via Telegram, uses Google Gemini to semantically analyze and extract structured data from both text and visual documents, and automatically appends the processed intelligence into categorized Google Sheets for centralized tracking and reporting.`,
    tags: ["Telegram", "Gemini AI", "Data Extraction"],
    views: 920, rating: 4.7, time: "1 week",
    image: "/portfolio-assets/32.png"
  },
  {
    title: "Automated News Aggregator & AI Analysis",
    category: "N8n Automation",
    shortDesc: "Aggregates global news feeds and uses AI to curate relevant content.",
    fullDesc: `Automated News Aggregator & AI Analysis Overview.\n\nAn intelligent news aggregator that continuously monitors RSS feeds from major outlets like Washington Post, WSJ, NYT, FT, and BBC. It uses OpenAI models to analyze articles for specific relevance (e.g., AI-related news), deduplicates entries, and seamlessly writes curated summaries into a Supabase database.`,
    tags: ["n8n", "News Aggregation", "OpenAI"],
    views: 1340, rating: 4.8, time: "2 weeks",
    image: "/portfolio-assets/33.png"
  },
  {
    title: "Comprehensive AI Content Generation System",
    category: "N8n Automation",
    shortDesc: "End-to-end system for topic research, content creation, and publishing.",
    fullDesc: `Comprehensive AI Content Generation System Overview.\n\nA massive automation architecture designed to handle the entire lifecycle of content marketing. It features modules for deep Topic Research, intelligent Generate Content (tailored for LinkedIn, Facebook, X/Threads, and Short-form video scripts), a Chat Review system for collaboration, and a Publishing engine to automate distribution across all platforms.`,
    tags: ["Content Marketing", "n8n", "AI Generation"],
    views: 1850, rating: 5.0, time: "6 weeks",
    image: "/portfolio-assets/34.webp"
  },
  {
    title: "Geometry Nodes Procedural Wall Generator",
    category: "3D Procedural Design",
    shortDesc: "Advanced Blender Geometry Nodes setup for procedural wall and tile generation.",
    fullDesc: `Geometry Nodes Procedural Wall Generator Overview.\n\nA complex procedural asset generator built in Blender using Geometry Nodes. It features mathematical calculations for tile indexing, spline evaluation, and dynamic instancing, allowing for real-time, non-destructive creation and variation of intricate wall structures and architectural elements.`,
    tags: ["Blender", "Geometry Nodes", "Procedural 3D"],
    views: 1050, rating: 4.9, time: "4 weeks",
    image: "/portfolio-assets/35.png"
  },
  {
    title: "Blender Geometry Nodes Blueprint",
    category: "3D Procedural Design",
    shortDesc: "Node-based visual scripting for procedural 3D environments.",
    fullDesc: `Blender Geometry Nodes Blueprint Overview.\n\nAn intricate node setup demonstrating advanced procedural logic in Blender. This blueprint handles complex array deformations, tilt corrections, and mesh line instancing across splines, showcasing a deep understanding of mathematical node-based 3D modeling.`,
    tags: ["Blender", "Geometry Nodes", "3D Art"],
    views: 890, rating: 4.7, time: "3 weeks",
    image: "/portfolio-assets/3d-tudor-blender-blueprint-walls-and-collumns-screenshots-7.jpg"
  },
  {
    title: "Game Logic Visual Scripting",
    category: "Visual Programming",
    shortDesc: "Visual scripting workflow demonstrating complex state logic.",
    fullDesc: `Game Logic Visual Scripting Overview.\n\nA visual programming blueprint showing event-driven logic. It features state management, mathematical calculations, timers, and variable updates to control animations and system states dynamically without writing traditional code.`,
    tags: ["Visual Scripting", "Logic Design"],
    views: 750, rating: 4.6, time: "2 weeks",
    image: "/portfolio-assets/44.png"
  },
  {
    title: "AI Cold Outreach & Followup System",
    category: "N8n Automation",
    shortDesc: "Automates personalized cold outreach and intelligent follow-ups.",
    fullDesc: `AI Cold Outreach & Followup System Overview.\n\nThis workflow is designed to scale outbound sales. It automates the sending of initial cold emails or messages, listens for replies using a webhook or inbox trigger, and utilizes AI to analyze the sentiment and intent of the response to trigger the appropriate automated follow-up sequence.`,
    tags: ["Sales Automation", "Outreach", "AI"],
    views: 1200, rating: 4.8, time: "3 weeks",
    image: "/portfolio-assets/AI Cold Outreach with Followup Listener.PNG"
  },
  {
    title: "AI Confidence Coach for Women",
    category: "AI Agents",
    shortDesc: "A specialized AI agent designed for confidence coaching and empowerment.",
    fullDesc: `AI Confidence Coach for Women Overview.\n\nA conversational AI agent fine-tuned with specific coaching frameworks to provide personalized guidance, encouragement, and actionable advice. Built to simulate a real coaching experience, it features stateful memory to track user progress and adapt its mentoring style over time.`,
    tags: ["AI Coaching", "Chatbot", "Empowerment"],
    views: 1450, rating: 4.9, time: "4 weeks",
    image: "/portfolio-assets/AI Confidence coach for women.PNG"
  },
  {
    title: "AI Viral Video Generation System",
    category: "Generative AI",
    shortDesc: "Automates the creation of short-form viral video content.",
    fullDesc: `AI Viral Video Generation System Overview.\n\nAn end-to-end pipeline that takes trending topics or scripts and automatically generates high-quality short-form videos. The system orchestrates text-to-speech APIs, AI image/video generators, and dynamic captioning to produce ready-to-post content optimized for platforms like TikTok, Reels, and Shorts.`,
    tags: ["Video Generation", "AI", "Content Automation"],
    views: 2100, rating: 5.0, time: "5 weeks",
    image: "/portfolio-assets/AI Viral Video Generation.PNG"
  },
  {
    title: "Automated Twitter Posting Bot",
    category: "Social Automation",
    shortDesc: "AI-driven bot for consistent and engaging Twitter presence.",
    fullDesc: `Automated Twitter Posting Bot Overview.\n\nThis bot automates Twitter account management by generating contextually relevant tweets, scheduling them for optimal engagement times, and responding to mentions. It integrates with LLMs to ensure the tone matches the brand voice and utilizes scraping to comment intelligently on trending industry topics.`,
    tags: ["Twitter API", "Social Media", "Bot"],
    views: 950, rating: 4.7, time: "2 weeks",
    image: "/portfolio-assets/Automated twitter posting bot.PNG"
  },
  {
    title: "Email Labeling & Organization with OpenAI",
    category: "N8n Automation",
    shortDesc: "Smart inbox management using semantic AI categorization.",
    fullDesc: `Email Labeling & Organization with OpenAI Overview.\n\nA productivity automation that connects directly to your inbox. As new emails arrive, an OpenAI model analyzes the content, intent, and urgency, automatically applying the correct labels, moving spam/promotions out of the primary inbox, and flagging critical messages that require immediate attention.`,
    tags: ["Email Management", "OpenAI", "Productivity"],
    views: 1150, rating: 4.8, time: "2 weeks",
    image: "/portfolio-assets/Email Labeling with Openai.PNG"
  },
  {
    title: "Job Application Automatic AI Replier",
    category: "AI Agents",
    shortDesc: "Automates responses to job applicants or recruiters using AI.",
    fullDesc: `Job Application Automatic AI Replier Overview.\n\nDesigned for freelancers and agencies, this system listens for inbound project inquiries or job applications. It uses AI to read the requirements, checks availability, and drafts an immediate, professional, and personalized response, significantly decreasing lead response time and increasing conversion rates.`,
    tags: ["Auto-Reply", "Recruitment", "AI"],
    views: 880, rating: 4.6, time: "1 week",
    image: "/portfolio-assets/Job application automatic ai replier.PNG"
  },
  {
    title: "Telegram Bot Automation Engine",
    category: "Social Automation",
    shortDesc: "Comprehensive framework for building interactive Telegram bots.",
    fullDesc: `Telegram Bot Automation Engine Overview.\n\nA scalable backend architecture for Telegram bots. It handles dynamic user commands, inline keyboards, media processing, and complex multi-step conversation flows. The engine connects with external APIs and databases to provide real-time utility to users directly within the Telegram interface.`,
    tags: ["Telegram API", "Bot Framework", "Automation"],
    views: 1300, rating: 4.8, time: "3 weeks",
    image: "/portfolio-assets/Telegram Automation.PNG"
  },
  {
    title: "Blender Geometry Nodes ZigZag Curve",
    category: "3D Procedural Design",
    shortDesc: "Procedural generation of complex zigzag curves in Blender.",
    fullDesc: `Blender Geometry Nodes ZigZag Curve Overview.\n\nA specific Geometry Nodes asset designed to procedurally generate and control zigzag curve patterns. By manipulating modulo mathematics and index masking, the node tree cleanly separates odd and even points, allowing for precise control over the amplitude, frequency, and deformation of the resulting 3D shape.`,
    tags: ["Blender", "Geometry Nodes", "3D Modeling"],
    views: 720, rating: 4.5, time: "1 week",
    image: "/portfolio-assets/UvoWf.png"
  },
  {
    title: "Workflow Personal Assistant",
    category: "N8n Automation",
    shortDesc: "A unified AI assistant orchestrating personal tasks and data.",
    fullDesc: `Workflow Personal Assistant Overview.\n\nA central hub that connects various personal applications (calendar, notes, email, messaging) and unifies them under a single AI interface. The assistant can execute complex, multi-step actions across different platforms via simple natural language requests.`,
    tags: ["Personal Assistant", "n8n", "AI Orchestration"],
    views: 1600, rating: 4.9, time: "4 weeks",
    image: "/portfolio-assets/Workflow-Personal-Assistant-1024x527.png"
  },
  {
    title: "Business Process Automation Architecture",
    category: "N8n Automation",
    shortDesc: "Enterprise-grade automation across n8n, Make, and Zapier.",
    fullDesc: `Business Process Automation Architecture Overview.\n\nA demonstration of complex business logic implemented across top automation platforms. This showcases the ability to map intricate company processes into robust, error-tolerant digital workflows that sync data seamlessly between CRMs, ERPs, and communication channels.`,
    tags: ["Business Automation", "Zapier", "Make"],
    views: 1950, rating: 5.0, time: "5 weeks",
    image: "/portfolio-assets/create-n8n-make-zapier-for-business-automation-workflow.jpeg"
  },
  {
    title: "Geometry Nodes Procedural Asset Generation",
    category: "3D Procedural Design",
    shortDesc: "Building scalable 3D assets using node-based logic.",
    fullDesc: `Geometry Nodes Procedural Asset Generation Overview.\n\nAn exploration into non-destructive 3D asset creation. This system utilizes advanced vector math, instancing, and noise textures within Blender's Geometry Nodes to generate highly detailed, scalable, and customizable assets suitable for game environments or architectural visualization.`,
    tags: ["Blender", "Procedural 3D", "Assets"],
    views: 980, rating: 4.7, time: "3 weeks",
    image: "/portfolio-assets/reinald-vargas-geometrynodes.jpg"
  },
  {
    title: "Multi-Agent System with Memory",
    category: "AI Agents",
    shortDesc: "AI agent architecture featuring long-term memory and tool usage.",
    fullDesc: `Multi-Agent System with Memory Overview.\n\nAn advanced AI architecture leveraging Azure OpenAI. This setup implements a Tools Agent equipped with a Window Buffer Memory to maintain context over long conversations. It efficiently aggregates historical data and decides when to use specific tools to fulfill complex user requests accurately.`,
    tags: ["Multi-Agent", "Azure OpenAI", "Memory"],
    views: 1550, rating: 4.9, time: "4 weeks",
    image: "/portfolio-assets/1_2C73g_v7qkETteCQfroYEQ.png"
  }
];
