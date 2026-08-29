# 🩺 MediAssist — AI Medical Chatbot

MediAssist is an AI-powered medical chatbot built using **Retrieval-Augmented Generation (RAG)**.

The application combines a Large Language Model (LLM) with a custom medical knowledge base stored in a Pinecone vector database. When a user asks a question, the system retrieves relevant information from the knowledge base and provides it as context to the LLM before generating the response.

> ⚠️ **Disclaimer:** MediAssist is an educational project and should not be used as a substitute for professional medical diagnosis, treatment, or emergency medical care.

---

## ✨ Features

* 🤖 AI-powered medical question answering
* 📚 Custom medical knowledge base
* 🔎 Retrieval-Augmented Generation (RAG)
* 🧠 Hugging Face sentence embeddings
* 🗄️ Pinecone vector database
* 🔝 Top-K similarity-based document retrieval
* 🦙 LLM integration through Groq
* 🌐 Flask backend
* 💻 Interactive web interface
* 🌙 Light and dark mode
* 📋 Copy AI responses
* 👍 Like / 👎 Dislike response buttons

---

## 🧠 How MediAssist Works

MediAssist follows a **Retrieval-Augmented Generation (RAG)** architecture.

Instead of depending only on the knowledge stored inside an LLM, the system retrieves relevant information from a custom medical knowledge base.

### Knowledge Base Creation

The medical reference document is processed once to create the vector database.

```text
Medical PDF
     │
     ▼
Text Extraction
     │
     ▼
Document Chunking
     │
     ▼
Hugging Face Embedding Model
     │
     ▼
Vector Embeddings
     │
     ▼
Pinecone Vector Database
```

### Question Answering

When a user asks a question:

```text
User Question
      │
      ▼
Question Embedding
      │
      ▼
Pinecone Similarity Search
      │
      ▼
Top-K Relevant Chunks
      │
      ▼
Retrieved Medical Context
      │
      ▼
Context + User Question
      │
      ▼
Groq LLM
      │
      ▼
Generated Response
      │
      ▼
Flask Web Application
```

The current application retrieves the **top 3 relevant chunks** from Pinecone before generating the response.

---

## 📚 Knowledge Base

The project uses a medical reference document as its custom knowledge source.

The document is:

1. Loaded and parsed.
2. Split into smaller chunks.
3. Converted into vector embeddings.
4. Stored in Pinecone.
5. Retrieved when a user submits a question.

The original medical reference document is **not included in the public GitHub repository**.

---

## 🛠️ Technology Stack

| Category             | Technology                           |
| -------------------- | ------------------------------------ |
| Programming Language | Python                               |
| LLM                  | Qwen via Groq                        |
| RAG Framework        | LangChain                            |
| Embeddings           | Hugging Face / Sentence Transformers |
| Vector Database      | Pinecone                             |
| Backend              | Flask                                |
| Frontend             | HTML, CSS, JavaScript                |
| Environment          | Conda                                |
| Version Control      | Git & GitHub                         |
| Development          | VS Code                              |

---

## 📂 Project Structure

```text
MediAssist/
│
├── Data/
│   └── Medical PDF
│
├── research/
│   └── trials.ipynb
│
├── src/
│   ├── __init__.py
│   ├── helper.py
│   └── prompt.py
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── app.py
├── store_index.py
├── setup.py
├── requirements.txt
├── template.sh
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd MediAssist
```

### 2. Create the Conda environment

```bash
conda create -n medibot python=3.10 -y
```

Activate the environment:

```bash
conda activate medibot
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PINECONE_API_KEY=your_pinecone_api_key
GROQ_API_KEY=your_groq_api_key
```

**Never commit `.env` to GitHub.**

The `.env` file is included in `.gitignore`.

---

## ▶️ Running the Application

Activate the environment:

```bash
conda activate medibot
```

Run the Flask application:

```bash
python app.py
```

The application will be available at:

```text
http://127.0.0.1:8080
```

Open the URL in your browser and start asking questions.

---

## 🧪 Example

### User

```text
What is diabetes?
```

### MediAssist

The system retrieves relevant information from the medical knowledge base and generates a response using the LLM.

---

## 🔄 Current Development Status

### Completed

* ✅ Project setup
* ✅ Medical document processing
* ✅ Document chunking
* ✅ Hugging Face embeddings
* ✅ Pinecone vector database
* ✅ RAG pipeline
* ✅ Groq LLM integration
* ✅ Flask backend
* ✅ Web interface
* ✅ Light / Dark mode
* ✅ Local application testing

### In Progress

* 🚧 Docker containerization
* 🚧 AWS deployment
* 🚧 Amazon ECR
* 🚧 Amazon EC2
* 🚧 GitHub Actions CI/CD pipeline

---

## 🚀 Future Improvements

Possible future enhancements include:

* 💬 Persistent chat history
* 🎤 Voice-based interaction
* 📄 Medical report/file upload
* 🖼️ Image-based medical information
* 🧠 Conversation memory
* 🔐 Improved security
* 🐳 Docker deployment
* ☁️ AWS deployment
* 🔄 Automated CI/CD pipeline
* 🩺 Improved medical response safety mechanisms

---

## ⚠️ Medical Disclaimer

MediAssist is developed for **educational and demonstration purposes only**.

The responses generated by this application should not be considered professional medical advice, diagnosis, or treatment.

Always consult a qualified healthcare professional for medical concerns. In an emergency, contact appropriate emergency services.

---

## 👩‍💻 Author

**Umme Habeeba**

Computer Science Engineering

GitHub: [@UmmeHabeeba43](https://github.com/UmmeHabeeba43)
