# Kimi CLI 🤖

<div align="center">

![Kimi CLI Banner](./src/assets/banner.png)

*A beautiful command-line interface for Kimi AI with rich visuals and interactive features*

[![Version](https://img.shields.io/npm/v/kimi-cli?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/kimi-cli)
[![License](https://img.shields.io/npm/l/kimi-cli?style=for-the-badge)](./LICENSE)
[![Downloads](https://img.shields.io/npm/dt/kimi-cli?style=for-the-badge)](https://www.npmjs.com/package/kimi-cli)
[![GitHub Stars](https://img.shields.io/github/stars/MoAftaab/kimi-cli?style=for-the-badge&logo=github)](https://github.com/MoAftaab/kimi-cli)

[🚀 Quick Start](#-quick-start) • 
[📖 Usage Examples](#-usage-examples) • 
[💬 Interactive Demo](#-interactive-chat-demo) • 
[🎯 Models](#-available-models) • 
[⚙️ Configuration](#️-configuration)

</div>

---

## ✨ Features

- 🎨 **Beautiful Terminal UI** - Rich colors, gradients, and ASCII art
- 💬 **Interactive Chat** - Real-time conversations with Kimi AI
- ❓ **Quick Questions** - Ask single questions instantly
- 📚 **Chat History** - Save and manage conversation sessions
- ⚙️ **Easy Configuration** - Simple setup and customization
- 🎯 **Multiple Models** - Support for various Kimi AI models
- 🚀 **Cross-Platform** - Works on Windows, macOS, and Linux
- 📦 **Multiple Install Options** - NPM, standalone executables, or source

![Features Overview](./src/assets/features-demo.gif)

## 🚀 Quick Start

### Installation Options

#### Option 1: NPM (Recommended)
```bash
# Install globally
npm install -g kimi-cli

# Verify installation
kimi --version
```

#### Option 2: Direct from GitHub
```bash
npm install -g git+https://github.com/MoAftaab/kimi-cli.git
```

#### Option 3: Standalone Executable
Download the latest release for your platform:
- [Windows (x64)](https://github.com/MoAftaab/kimi-cli/releases/latest/download/kimi-cli-win.exe)
- [macOS (x64)](https://github.com/MoAftaab/kimi-cli/releases/latest/download/kimi-cli-macos)
- [Linux (x64)](https://github.com/MoAftaab/kimi-cli/releases/latest/download/kimi-cli-linux)

### Initial Setup

1. **Get your API key** from [OpenRouter](https://openrouter.ai/keys)
2. **Configure the CLI**:
   ```bash
   kimi config set-key
   # Enter your API key when prompted
   ```
3. **Start using**:
   ```bash
   kimi ask "Hello, how are you?"
   ```

![Setup Process](./src/assets/setup-demo.png)

## 📖 Usage Examples

### 💬 Interactive Chat Demo

Start a full conversation with Kimi AI:

```bash
kimi chat
```

![Interactive Chat Demo](./src/assets/chat-demo.gif)

**Interactive Features:**
- 🔄 Real-time responses with beautiful formatting
- 💾 Auto-save conversations
- 🎨 Rich terminal colors and animations
- ⚡ Special commands for enhanced control

**Special Commands During Chat:**
- `exit` or `quit` - End the session
- `clear` - Clear current chat history  
- `save` - Save conversation with custom name
- `/model <name>` - Switch AI model mid-conversation
- `/temp <0-2>` - Adjust response creativity

**Example Conversation:**
```
💭 You: What is machine learning?

┌─ 🤖 Kimi AI ─────────────────────────────────────────┐
│                                                      │
│ Machine learning is a subset of artificial          │
│ intelligence that enables computers to learn and     │
│ improve from experience without being explicitly     │
│ programmed. It uses algorithms to analyze data,      │
│ identify patterns, and make predictions or           │
│ decisions.                                           │
│                                                      │
│ Key types include:                                   │
│ • Supervised Learning - learns from labeled data    │
│ • Unsupervised Learning - finds patterns in data    │
│ • Reinforcement Learning - learns through trial     │
│                                                      │
└──────────────────────────────────────────────────────┘
📊 Tokens: 156 (prompt: 32, completion: 124)

💭 You: Can you give me a practical example?

┌─ 🤖 Kimi AI ─────────────────────────────────────────┐
│                                                      │
│ Sure! Here's a simple example:                      │
│                                                      │
│ 🔍 Email Spam Detection:                            │
│ • Training: Feed the system thousands of emails     │
│   labeled as "spam" or "not spam"                   │
│ • Learning: It identifies patterns like suspicious  │
│   keywords, sender addresses, or subject lines      │
│ • Prediction: When new emails arrive, it can        │
│   automatically classify them based on learned      │
│   patterns                                           │
│                                                      │
│ The system gets better over time as it processes    │
│ more emails and receives feedback on its decisions. │
│                                                      │
└──────────────────────────────────────────────────────┘
📊 Tokens: 201 (prompt: 178, completion: 87)
```

### ❓ Quick Questions

Ask single questions without starting a full chat session:

```bash
# Basic question
kimi ask "What is the capital of France?"

# With specific model
kimi ask "Explain quantum computing" --model moonshotai/moonshot-v1-32k

# With custom parameters  
kimi ask "Write a haiku about programming" --temperature 1.5 --max-tokens 100
```

![Ask Command Demo](./src/assets/ask-demo.png)

**Real Example Output:**
```
┌────────────── 🤖 Kimi AI Response ──────────────╮
│                                                 │
│   Question: What is the capital of France?      │
│                                                 │
│   Answer: The capital of France is Paris. 🇫🇷    │
│   Located in the north-central part of the      │
│   country, Paris is not only the political      │
│   capital but also the cultural and economic    │
│   center of France.                             │
│                                                 │
╰─────────────────────────────────────────────────╯
📊 Tokens: 52 | Model: moonshotai/kimi-k2:free ⚡ 1.2s
```

### 🎯 Available Models

View and understand all supported Kimi AI models:

```bash
kimi models
```

![Models List](./src/assets/models-demo.png)

## 🎯 Available Models

| Model | Context | Type | Best For | Cost |
|-------|---------|------|----------|------|
| `moonshotai/kimi-k2:free` | 8K tokens | Free | Quick questions, testing | Free |
| `moonshotai/moonshot-v1-8k` | 8K tokens | Paid | Standard conversations | $0.001/1K |
| `moonshotai/moonshot-v1-32k` | 32K tokens | Paid | Long documents, analysis | $0.003/1K |
| `moonshotai/moonshot-v1-128k` | 128K tokens | Paid | Complex tasks, large files | $0.01/1K |

**Model Selection Examples:**
```bash
# Use free model (default) - great for testing
kimi ask "Hello" --model moonshotai/kimi-k2:free

# Extended context for long conversations
kimi chat --model moonshotai/moonshot-v1-32k

# Maximum context for complex analysis
kimi ask "Analyze this entire codebase..." --model moonshotai/moonshot-v1-128k

# Set default model in config
kimi config set defaultModel moonshotai/moonshot-v1-32k
```

## ⚙️ Configuration

### View Current Settings

```bash
kimi config show
```

![Configuration Display](./src/assets/config-demo.png)

### Configuration Management

```bash
# API Key Management
kimi config set-key                         # Interactive setup
kimi config set-key sk-or-v1-your-key...   # Direct setup

# Model & Response Settings
kimi config set defaultModel moonshotai/moonshot-v1-32k
kimi config set maxTokens 2000              # Limit response length
kimi config set temperature 0.8             # Adjust creativity (0-2)

# View individual settings
kimi config get defaultModel
kimi config get temperature

# Reset everything to defaults
kimi config reset
```

**Configuration Options:**
- `apiKey` - Your OpenRouter API key (required)
- `defaultModel` - Default model for all conversations
- `maxTokens` - Maximum response length (1-4000)  
- `temperature` - Response creativity: 0 (focused) to 2 (creative)
- `theme` - Terminal color theme (coming soon)

## 📚 Chat History Management

### Save and Manage Conversations

```bash
# List all saved chat sessions
kimi history list

# View specific conversation
kimi history show session_abc123

# Delete unwanted sessions
kimi history delete session_abc123

# Clear all history
kimi history clear
```

![Chat History](./src/assets/history-demo.png)

**Example History Output:**
```
📚 Chat History:
────────────────────────────────────────────────────────────────────────────────
1. Machine Learning Explained (session_1753736332_ml)
   📅 7/29/2025 2:30:15 PM | 💬 8 messages | 🎯 moonshotai/kimi-k2:free

2. Python Debugging Help (session_1753735210_debug)  
   📅 7/29/2025 1:45:22 PM | 💬 12 messages | 🎯 moonshotai/moonshot-v1-32k

3. Creative Writing Session (session_1753734100_story)
   📅 7/29/2025 1:20:45 PM | 💬 6 messages | 🎯 moonshotai/moonshot-v1-8k
```

## � Advanced Usage Examples

### 1. Code Analysis & Review
```bash
# Analyze code with extended context
kimi ask "Review this Python function for bugs and improvements:

def calculate_average(numbers):
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)" --model moonshotai/moonshot-v1-32k
```

### 2. Creative Writing
```bash
# High creativity for creative tasks
kimi chat --temperature 1.5 --model moonshotai/moonshot-v1-8k
# Then: "Write a short sci-fi story about AI"
```

### 3. Technical Documentation
```bash
# Precise, factual responses
kimi ask "Explain Docker containers" --temperature 0.2 --max-tokens 500
```

### 4. Language Translation
```bash
kimi ask "Translate 'Hello, how are you?' to French, Spanish, German, and Japanese with pronunciation guides"
```

### 5. Data Analysis Help
```bash
kimi chat --model moonshotai/moonshot-v1-128k --system "You are a data science expert"
# Then discuss complex datasets and analysis approaches
```

## 📋 Complete Command Reference

### Core Commands
```bash
kimi --help                    # Show all commands
kimi --version                 # Show version info  
kimi --debug <command>         # Enable debug mode
```

### Chat & Questions
```bash
kimi chat                      # Start interactive session
kimi chat --model <name>       # Use specific model
kimi chat --temperature <0-2>  # Set creativity level
kimi chat --system "prompt"    # Set system context

kimi ask "question"            # Single question
kimi ask "question" -m <model> # With specific model
kimi ask "question" -t 1.2     # With temperature
kimi ask "question" --max-tokens 200  # Limit response
```

### Configuration
```bash
kimi config show              # Display all settings
kimi config set-key           # Set API key interactively  
kimi config set <key> <value> # Set specific option
kimi config get <key>         # Get specific value
kimi config reset             # Reset to defaults
```

### History Management  
```bash
kimi history list             # Show all sessions
kimi history show <id>        # View session details
kimi history delete <id>      # Delete specific session
kimi history clear            # Delete all sessions
```

### Information
```bash
kimi models                   # List available models
kimi welcome                  # Show welcome screen
```

## 🛠️ Development & Building

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/MoAftaab/kimi-cli.git
cd kimi-cli

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Test the CLI
npm link
kimi --help
```

### Building Standalone Executables
```bash
# Build standalone executables for all platforms
npm run build:standalone

# Find executables in ./builds/
ls builds/
```

## 📦 Deployment

### NPM Package
```bash
# Build and publish
npm run build
npm publish
```

### Standalone Distribution
```bash
# Create executables
npm run build:standalone

# Distribute files from ./builds/ folder
```

## 🎨 Screenshots

```
 ██╗  ██╗██╗███╗   ███╗██╗     ██████╗██╗     ██╗
 ██║ ██╔╝██║████╗ ████║██║    ██╔════╝██║     ██║
 █████╔╝ ██║██╔████╔██║██║    ██║     ██║     ██║
 ██╔═██╗ ██║██║╚██╔╝██║██║    ██║     ██║     ██║
 ██║  ██╗██║██║ ╚═╝ ██║██║    ╚██████╗███████╗██║
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚═╝     ╚═════╝╚══════╝╚═╝

🤖 The Beautiful CLI for Kimi AI
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

- 🐛 [Report Issues](https://github.com/MoAftaab/kimi-cli/issues)
- 💬 [Discussions](https://github.com/MoAftaab/kimi-cli/discussions)
- 📧 Email: support@kimi-cli.dev

## 🙏 Acknowledgments

- [Kimi AI](https://kimi.moonshot.cn/) for the amazing AI capabilities
- [OpenRouter](https://openrouter.ai/) for the API access
- The open-source community for the amazing tools and libraries

---

<div align="center">

**Made with ❤️ by [MOHD AFTAAB](https://github.com/MoAftaab)**

*Building the future of AI interaction, one command at a time.*

📧 Contact: [moaftaab786@gmail.com](mailto:moaftaab786@gmail.com)  
🐙 GitHub: [https://github.com/MoAftaab](https://github.com/MoAftaab)  
🌐 Portfolio: [https://github.com/MoAftaab](https://github.com/MoAftaab)

[![GitHub stars](https://img.shields.io/github/stars/MoAftaab/kimi-cli.svg?style=social&label=Star)](https://github.com/MoAftaab/kimi-cli)
[![GitHub forks](https://img.shields.io/github/forks/MoAftaab/kimi-cli.svg?style=social&label=Fork)](https://github.com/MoAftaab/kimi-cli/fork)
[![GitHub followers](https://img.shields.io/github/followers/MoAftaab.svg?style=social&label=Follow)](https://github.com/MoAftaab)

</div>
