import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Resume from "../components/Resume";
import { useNavigate } from "react-router";

const GenerateResume = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Please login or sign up to access the AI Resume Maker.");
      navigate("/login");
    }
  }, [navigate]);
  const [data, setData] = useState({
    personalInformation: {
      fullName: "Durgesh Kumar Tiwari",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({
    control,
    name: "certifications",
  });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  //handle form submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setData({ ...data });

    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);
  };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getFallbackResume = (input) => ({
    personalInformation: {
      fullName: "AI Generated Resume",
      email: "example@example.com",
      phoneNumber: "+1 555 555 5555",
      location: "City, Country",
      linkedIn: "https://linkedin.com/in/username",
      gitHub: "https://github.com/username",
      portfolio: "https://portfolio.example.com",
    },
    summary: input
      ? `Generated resume based on: ${input}`
      : "Resume generated from your profile description.",
    skills: [
      { title: "Problem Solving", level: "Advanced" },
      { title: "JavaScript", level: "Advanced" },
      { title: "React", level: "Advanced" },
      { title: "Java", level: "Intermediate" },
    ],
    experience: [
      {
        jobTitle: "Software Engineering Intern",
        company: "Tech Startup",
        location: "Remote",
        duration: "Jun 2024 - Aug 2024",
        responsibility:
          "Developed user-facing features using React and collaborated with the backend team.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        university: "Reputed University",
        location: "City, Country",
        graduationYear: "2025",
      },
    ],
    certifications: [
      {
        title: "Full Stack Web Development",
        issuingOrganization: "Online Academy",
        year: "2024",
      },
    ],
    projects: [
      {
        title: "AI Resume Builder",
        description:
          "Built an AI-powered resume builder with React frontend and Spring Boot backend.",
        technologiesUsed: "React, Spring Boot, TailwindCSS",
        githubLink: "https://github.com/username/ai-resume-maker",
      },
    ],
    languages: [{ name: "English" }],
    interests: [{ name: "Web Development" }],
  });

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a resume description before generating.");
      return;
    }

    try {
      setLoading(true);
      const responseData = await generateResume(description);
      console.log("Resume API response:", responseData);

      if (!responseData || !responseData.data) {
        throw new Error("Invalid response from server.");
      }

      setData(responseData.data);
      reset(responseData.data);

      toast.success("Resume Generated Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setShowFormUI(false);
      setShowPromptInput(false);
      setShowResumeUI(true);
      setDescription("");
    } catch (error) {
      console.error("Generate error:", error);

      const timedOut =
        error?.code === "ECONNABORTED" ||
        error?.message?.toLowerCase().includes("timeout");

      if (timedOut) {
        const fallbackData = getFallbackResume(description);
        setData(fallbackData);
        reset(fallbackData);
        toast.success(
          "Backend timeout occurred. Showing a generated demo resume instead.",
          {
            duration: 4000,
            position: "top-center",
          }
        );
        setShowFormUI(false);
        setShowPromptInput(false);
        setShowResumeUI(true);
      } else {
        const errorMessage =
          error?.response?.data?.message || error?.message ||
          "Unable to generate resume.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDescription("");
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text text-slate-300 font-medium">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-xl text-white transition-all"
      />
    </div>
  );
  const renderFieldArray = (fields, label, name, keys) => {
    return (
      <div className="form-control w-full mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-lg mb-4 bg-base-100">
            {keys.map((key) => (
              <div key={key}>
                {console.log(`${name}`)}
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-error btn-sm mt-2"
            >
              <FaTrash className="w-5 h-5 text-base-content" /> Remove {label}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(
              keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
            )
          }
          className="btn btn-secondary btn-sm mt-2 flex items-center"
        >
          <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add{" "}
          {label}
        </button>
      </div>
    );
  };

  function showFormFunction() {
    return (
      <div className="w-full p-10">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
          <BiBook className="text-blue-600" /> Resume Form
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 space-y-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl text-slate-200 border border-blue-500/20 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput(
                "personalInformation.phoneNumber",
                "Phone Number",
                "tel"
              )}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            <h3 className="text-xl font-semibold">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
            ></textarea>

            {renderFieldArray(skillsFields, "Skills", "skills", [
              "title",
              "level",
            ])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(
              certificationsFields,
              "Certifications",
              "certifications",
              ["title", "issuingOrganization", "year"]
            )}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}

            <div className="flex gap-3 mt-16  p-4 rounded-xl ">
              <div className="flex-1">
                {renderFieldArray(languagesFields, "Languages", "languages", [
                  "name",
                ])}
              </div>
              <div className="flex-1">
                {renderFieldArray(interestsFields, "Interests", "interests", [
                  "name",
                ])}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  function ShowInputField() {
    return (
      <div className="bg-slate-900/50 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center border border-blue-500/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full"></div>
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2 text-white relative z-10">
          <FaBrain className="text-blue-400" /> AI Resume Intelligence
        </h1>
        <p className="mb-8 text-lg text-slate-400 relative z-10">
          Describe your career history, skills, and goals. Our AI will craft a high-performance resume tailored for you.
        </p>
        <textarea
          disabled={loading}
          className="w-full h-56 p-6 mb-8 bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none rounded-2xl text-white transition-all placeholder:text-slate-600 resize-none relative z-10"
          placeholder="e.g., I am a Senior Software Engineer with 8 years of experience in React, Node.js, and Cloud Architecture. I have led teams of 10+ and delivered..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-center gap-4">
          <button
            disabled={loading}
            onClick={handleGenerate}
            className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700 flex items-center gap-2 transition-all"
          >
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane />
            Generate Resume
          </button>
          <button
            onClick={handleClear}
            className="btn bg-gray-400 hover:bg-gray-500 text-white border-none flex items-center gap-2 transition-all"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    );
  }
  function showResume() {
    return (
      <div>
        <Resume data={data} />

        <div className="flex mt-5 justify-center gap-2">
          <div
            onClick={() => {
              setShowPromptInput(true);
              setShowFormUI(false);
              setShowResumeUI(false);
            }}
            className="btn bg-gradient-to-r from-purple-500 to-pink-600 text-white border-none hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            Generate Another
          </div>
          <div
            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(true);
              setShowResumeUI(false);
            }}
            className="btn bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Edit
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-10 flex flex-col gap-3 items-center justify-center font-sans">
      {showFormUI && showFormFunction()}
      {showPromptInput && ShowInputField()}
      {showResumeUI && showResume()}
      {!showFormUI && !showPromptInput && !showResumeUI && (
        <div className="text-center py-8 text-gray-500">
          <p>No content to display. Click "Get Started" to begin.</p>
        </div>
      )}
    </div>
  );
};

export default GenerateResume;
