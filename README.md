# AI Generated Project

All done using GPT 4o and 4o-mini.

## Install 

How to [install Aider](https://aider.chat/docs/install.html) on Mac:

```
python3 -m pip install aider-install

python3 -m pip show aider-install

~/Library/Python/3.9/bin/aider-install

aider --model gpt-4o --openai-api-key YOUR_OPENAI_API_KEY
```
## Run using a Local Ollama based model

First, run an [Ollama based model](https://ollama.com/search) locally:

```bash
ollama run incept5/llama3.1-claude
ollama serve
```

Then in a separate terminal run aider:

```bash
export OLLAMA_API_BASE=http://127.0.0.1:11434
aider --model ollama_chat/incept5/llama3.1-claude
```

The initial output should be:

```bash
Aider v0.69.1
Model: ollama_chat/incept5/llama3.1-claude with whole edit format
```

## Run

Using GPT-4o

```bash
aider --model gpt-4o --openai-api-key YOUR_OPENAI_API_KEY --cache-prompts
```

Using Claude 3.5 Sonnet

```bash
aider --model openrouter/anthropic/claude-3.5-sonnet --cache-prompts
```

Using GPT ol Preview as the Architect and Claude 3.5 Sonnet as the Editor

```bash
aider --model openrouter/openai/ol-preview --architect --editor-model openrouter/anthropic/claude-3.5-sonnet
```