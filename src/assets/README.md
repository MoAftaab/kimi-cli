# Assets Directory

This folder contains images and visual assets for documentation and README.

## Required Screenshots

To complete the README documentation, please add these screenshots:

### Core Screenshots:
- `banner.png` - Main banner with ASCII art
- `logo.png` - Kimi CLI logo (optional)
- `help-demo.png` - Help command output
- `models-demo.png` - Models list output

### Feature Demonstrations:
- `chat-demo.gif` - Interactive chat session (animated GIF)
- `ask-demo.png` - Single question example
- `config-demo.png` - Configuration management
- `history-demo.png` - Chat history display

### Setup & Installation:
- `setup-demo.png` - Initial setup process
- `install-demo.png` - Installation process

## How to Capture Screenshots:

1. **Banner Screenshot:**
   ```bash
   node dist/index.js --help
   # Capture the ASCII art banner
   ```

2. **Chat Demo (GIF):**
   ```bash
   node dist/index.js chat
   # Record a short conversation
   ```

3. **Ask Command:**
   ```bash
   node dist/index.js ask "What is the capital of France?"
   # Capture the formatted response
   ```

4. **Models List:**
   ```bash
   node dist/index.js models
   # Capture the models table
   ```

5. **Configuration:**
   ```bash
   node dist/index.js config show
   # Capture the config display
   ```

## Image Specifications:
- Format: PNG for static images, GIF for animations
- Max width: 800px for optimal GitHub display
- Use high contrast terminal themes for better visibility
- Crop to remove unnecessary terminal chrome

## Tools for Screenshots:
- **Windows:** Snipping Tool, PowerToys Screen Ruler
- **macOS:** Screenshot (Cmd+Shift+4)
- **Linux:** GNOME Screenshot, Flameshot
- **GIF Recording:** TerminalGif, Asciinema + gif conversion
