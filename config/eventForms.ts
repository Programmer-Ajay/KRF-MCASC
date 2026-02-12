export const EVENT_FORMS = {
  seminar: {
    isTeam: false,
    description: "Share your expertise and learn from industry leaders",
    rules: [
      // "Reporting Time: 10:30 AM.",
      "Presentation Time: 10 Mins (8 Minutes for Presentation + 2 minutes for Q&A).",
      "One Student One Seminar (Groups not allowed).",
      "Students can use PowerPoint presentation.",
      "Topics must be selected from the predefined list.",
      "College I-Card is compulsory for event",
      "Judges Decision will be final."

    ],

    fields: [
      {
        name: "topic",
        label: "Topic for seminar",
        type: "select",
        // placeholder: "e.g., Artificial Intelligence, Web Development",
        options:[
          "Gig Economy",
         "Robotics Process Automation (RPA)",
        "Blockchain Technology",
        "Cloud / Edge / IoT Computing",
        "Cyber Security and Cryptography",
        "Future of Generative AI",
        "Deep Fake and Identity Security",
        "Applications of Machine Learning",
        ],
        required: true,
      },
    ]
    },

  debate: {
    isTeam: true,
    description: "Engage in intellectual discourse and win exciting prizes",
    rules: [
     "Each team has  exact four members(Team leader + 3 members).",
  "Each team gets 10 minutes to present their argument. A warning bell will be given before time ends.",
  "Each team must present their points clearly. The opposing team must counter the arguments logically. Personal attacks or offensive language are not allowed.",
  "Teams will be judged on clarity, logic, evidence, and presentation.",
  "All participants must follow the rules, respect opponents, and maintain discipline.",
  "Judges will announce the winners based on overall performance.",
  // --- ADDED TOPICS HERE ---
      "--- DEBATE TOPICS ---",
      " Are Robots and AI a Threat to Human Jobs?",
      " Should artificial intelligence be used to combat cybercrime?",
      " Can Artificial Intelligence Replace Human Intelligence?",
      " AI Tools (e.g. ChatGPT, Google Gemini, Claude, Notion AI, Grammarly, Canva AI, Zapier, and ElevenLabs)",
      " Should organ donation become mandatory?",
      " Can AI truly be creative, or is it just mimicking art?",
      " Are governments allowed to use AI to analyse citizens’ social media for national security? (Sanchar Bharti)"
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
      "solo Participation is allowed",
      "Programming Language: C/Java/Python.",
      "Operating System: Windows / Linux.",
      "Participants must code in the provided environment.",
      "College I-card is complusory for events",
      "Judge's decision will be final"
    ],
    fields: [
      {
        name: "language",
        label: "Primary Programming Language",
        type: "select",
        options: ["C","JAVA","PYTHON"],
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
      "Video Resolution 1920 X 1080",
      "Type: Live action Fiction, Animation or Documentary.",
      "Video file format: .MP4.",
      "Must not contain any offensive,sensitive,or inapprropriate content: violation of this rule wll lead to disqualification",
    ],
    fields: [
      {
        name: "filmLink",
        label: "Film Link (YouTube/Vimeo)",
        type: "url",
        placeholder: "https://youtube.com/watch?v=...",
        required: true,
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

  technoQuiz: {
    isTeam: true,
    description: "Test your knowledge and compete with the brightest minds",
    rules: [
    //  "Reporting time is 10:30 AM.",
  "Each team must consist of exactly four students.",
  "College I-Card is compulsory for the event.",
  "The coordinators’ decision will be final.",
  "The quiz will be conducted in multiple rounds(e.g audio-visual,rapid fire,MCQ's etc).",
  "Any form of external assistance or unfair practice during the competition will be treated as misconduct and will result in immediate disqualification.",
  "If the required team members are not present at the time of the event, the organizing committee reserves the right to decide the team’s eligibility or allot a new team entry.",
  "A time limit will be applied for each round.",
  "Participants must report at the venue at least 30 minutes before the start time. Latecomers will be disqualified."

    ],
    fields: [],
  },

  project: {
    isTeam: true,
    description: "Showcase your innovative ideas and technical excellence",
    rules: [
      "Minimum team size should be 1",
       "Maximum team size is 3 members(team leader + 2 members).",
  "Participants must carry their own laptop with the project installed on it.",
  "The project must be original and developed by the participants.",
  "The project should demonstrate innovative solutions or applications in the field of Computer Science (e.g., Artificial Intelligence, Data Science, Cybersecurity, IoT, etc.).",
  "Plagiarism or copied work is strictly prohibited. Any instance will result in disqualification.",
  "Participants must ensure that their hardware and software are fully functional during the assessment.",
  "Teams should verify compatibility and system requirements beforehand.",
  "Software projects must be properly tested on the participant’s device.",
  "Hardware-based projects must be brought by participants and ensured to be in proper working condition.",
  "College I-Card is compulsory for the event.",
  "The judges’ decision will be final."

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
        placeholder: "optional",
        required: false,
      },
    ],
  },
  poster: {
    isTeam: false,
    description: "Express yourself in the form of Arts-skill" ,
    rules: [
      "Number of Participant should be 1",
      "The poster must be strictly based on the computer Science field and emerging trends in computer science and must not contain any offensive, sensitive, or inappropriate content. Violation of this rule will lead to disqualification.",
  "The poster must be completely hand-drawn by the participant.",
  "Use of digital tools or mixed media is permitted only for design support.",
  "Fully or partially printed posters will not be accepted under any circumstances.",
  "Size of the poster paper should A2",
  "The poster must be submitted by 21st February 2026 before 10:00 AM.",
  "College I-Card is compulsory for the event.",
  "The judges’ decision will be final."
    ],
    fields: [],
  },
} as const;
