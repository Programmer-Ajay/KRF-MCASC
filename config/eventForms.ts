export const EVENT_FORMS = {
  seminar: {
    isTeam: false,
    description: "Share your expertise and learn from industry leaders",
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
      {
        name: "synopsis",
        label: "Brief Synopsis",
        type: "textarea",
        placeholder: "Describe your film in 2-3 sentences",
        required: true,
      },
    ],
  },

  quiz: {
    isTeam: true,
    description: "Test your knowledge and compete with the brightest minds",
    fields: [],
  },

  project: {
    isTeam: true,
    description: "Showcase your innovative ideas and technical excellence",
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
    fields: [],
  },
} as const;
