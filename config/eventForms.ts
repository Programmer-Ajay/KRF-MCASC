export const EVENT_FORMS = {
  seminar: {
    isTeam: false,
    description: "Share your expertise and learn from industry leaders",
    rules: [
      // "Reporting Time: 09:30 AM.",
      "Presentation Time: 10 Mins (8 Minutes for Presentation + 2 minutes for Q&A).",
      "One Student One Seminar (Groups not allowed).",
      "Students can use PowerPoint presentation.",
      "Topics must be selected from the predefined list."
    ],

    fields: [
      {
        name: "topic",
        label: "Topic of Interest",
        type: "text",
        placeholder: "e.g., Artificial Intelligence, Web Development",
        required: true,
      },
    ]
    },

  debate: {
    isTeam: true,
    description: "Engage in intellectual discourse and win exciting prizes",
    rules: [
      "Number of Participants: Exactly 4 per team.",
      "Duration: 10 mins.",
      "Use of any electronic gadget is prohibited.",
      // "Debate topic must be selected during registration."
    ],
    fields: [
      // {
      //   name: "topic",
      //   label: "Preferred Debate Topic",
      //   type: "select",
      //   options: [
      //     "Artificial Intelligence Impact on Society",
      //     "Climate Change Solutions",
      //     "Future of Education",
      //     "Technology vs. Humanity",
      //     "Other",
      //   ],
      //   required: true,
      // },
      // {
      //   name: "standpoint",
      //   label: "Your Standpoint",
      //   type: "select",
      //   options: ["For", "Against",],
      //   required: true,
      // },
    ],
  },

  programming: {
    isTeam: false,
    description: "Showcase your coding skills and problem-solving abilities",
    rules: [
      // "Reporting Time: 10:00 AM.",
      "Programming Language: C.",
      "Operating System: Windows / Linux.",
      "Participants must code in the provided environment."
    ],
    fields: [
      {
        name: "language",
        label: "Primary Programming Language",
        type: "select",
        options: ["C"],
        required: true,
      },
   
    ],
  },

  shortfilm: {
    isTeam: true,
    description: "Tell your story through the power of cinema",
    rules: [
      // "Reporting Time: 09:00 AM.",
      // "Screening Date: Friday, 21st February, 10:00 AM.",
      "Participation criteria: Solo entry or Group entry (Maximum 5).",
      "Duration of the film: Minimum 1 minute to Maximum 10 minutes.",
      "Subject: Any subject with moral content.",
      "Type: Live action Fiction, Animation or Documentary.",
      "Video file format: .MP4."
    ],
    fields: [
      {
        name: "filmLink",
        label: "Film Link (YouTube/Vimeo)",
        type: "url",
        placeholder: "https://youtube.com/watch?v=...",
        required: false,
      },
      {
        name: "duration",
        label: "Duration (in minutes)",
        type: "number",
        placeholder: "e.g., 5",
        required: true,
      },
      {
        name: "genre",
        label: "Film Genre",
        type: "select",
        options: [
          "Drama",
          "Comedy",
          "Thriller",
          "Documentary",
          "Animation",
          "Other",
        ],
        required: true,
      },
      // {
      //   name: "synopsis",
      //   label: "Brief Synopsis",
      //   type: "textarea",
      //   placeholder: "Describe your film in 2-3 sentences",
      //   required: true,
      // },
    ],
  },

  quiz: {
    isTeam: true,
    description: "Test your knowledge and compete with the brightest minds",
    rules: [
      // "Reporting Time: 10:00 AM.",
      // "Date of Quiz: Saturday, 22nd February 2025, 10:30 AM.",
      "Number of participants: Exactly 4 per Team."
    ],
    fields: [],
  },

  project: {
    isTeam: true,
    description: "Showcase your innovative ideas and technical excellence",
    rules: [
      // "Reporting Time: 20th February 2025, 10:30 AM.",
      "Team Size: Maximum 3.",
      "Participants should carry their own Laptop with project installed.",
      "Project must be original (CS Field: AI, Data Science, IoT, etc). No plagiarism.",
      "Hardware/Software must be ready and tested before presentation.",
      "Bring your own internet/devices if required."
    ],
    fields: [
      {
        name: "projectTitle",
        label: "Project Title",
        type: "text",
        placeholder: "e.g., AI-Powered Chat Application",
        required: true,
      },
      {
        name: "projectDescription",
        label: "Project Description",
        type: "textarea",
        placeholder: "Briefly describe your project and its key features",
        required: false,
      },
      {
        name: "technology",
        label: "Tech Stack",
        placeholder:"Comma separated value (eg. react ,nodejs , css)",
        type: "text",
        
        required: true,
      },
      {
        name: "githubLink",
        label: "GitHub Repository Link",
        type: "url",
        placeholder: "https://github.com/username/project",
        required: false,
      },
      {
        name: "demoLink",
        label: "Live Demo Link",
        type: "url",
        placeholder: "https://your-project-demo.com",
        required: false,
      },
    ],
  },
  poster: {
    isTeam: false,
    description: "Express yourself in the form of Arts-skill" ,
    rules: [
      "Poster size: A3 standard.",
      "All materials must be brought by participants.",
      "Theme will be announced on the spot.",
      "Time limit: 2 hours."
    ],
    fields: [],
  },
} as const;
