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

For more information check [the docs](https://aider.chat/docs/llms/ollama.html).

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

## Run using a Local Deepseek V3 model

TODO!

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

## Aider Conf

Make use of the [aider.conf.yml](./aider.conf.yml) file in your project to set defaults. Some useful settings are:

- `openai-api-key`: set your openai API key 
- `model`: set the defualt model to use when aider boots up
- `file`: set the file(s) you want aider to automatically add to the context
- `read`: set the READ ONLY file(s) you want aider to automatically add to the context.
- `suggest-shell-commands`: set to `false` so that aider does not suggest commands to run
- `auto_commits`: set to `false` to prevent aider from automatically committing after each code change. This allows you to have more control over what changes are added and how the commit message will be formated.
- `test-cmd`: add the cmd to run tests for your project so that aider can run them
- `auto-test`: set to `true` so that aider will automatically run tests (using the command specified in `test-cmd`), after each code change.
- `voice-*`: to enable and confiure voice support in aider
 
# Prompt IDKs - Information Dense Keywords

Prompts are made up of individual keywords. Some keywords contain more meaning than others. Here are a list of useful IDKs:

CREATE 
UPDATE 
DELETE

ADD
REMOVE
MOVE
REPLACE
SAVE
MIRROR

VAR
FUNCTION
CLASS
TYPE
FILE
DEFAULT

**NOTE**: it is important to structure promots with the IDKs including: **location**, **action** and **detail**. See [Example 8](#example-8-add-an-output-flag-to-support-json-markdown-or-text) for an example of this.

# Prompt Examples

## Example 1: Simple Hello World

Starting point is an empty `main.py` file in a basic Python `uv` project.

Requirement is to print the string "hello ai coding world" to the terminal.

```
/add main.py
print hello ai coding world
/run python3 main.py
```

## Example 2: Simple Hello World to print 10 times and refactor

Starting point is from the previous example.
Requirement is to print the message 10 times and refactor the code into a function call.

```
/add main.py
Update to print 10 times
store string in variable and pass into print
move the print into a function and pass that in as a variable
move the for loop in the function itself
```

## Example 3: Count word frequencey in a text file, sorted by count and only where > 3

Starting point is an empty `main.py` file in a basic Python `uv` project with a `transcript.txt` file in the root that contains transcript from a YouTube video.
Requirement is to read the contents of the `transcript.txt` into a variable and output the count of the frequency of each word to the terminal.

```
/add main.py
read ./transcript.txt and set to var
count the frequency of each word using a dict to store counts
display the word frequencies by printing # for each count
sort by count
only show words with count > 3 use a variable. after word before # show the total.
```

## Example 4: Add CLI args support

Starting point is the `main.py` from previous example except that its moved to `src/transcript_analytics/main.py`
Requirement update main so that the transcript file name and the min count threshold can be passed by the user as a cli arg. We will also refactor the code so that the arg parsing logic is in a separate file.

```
/add src/transcript_analytics/main.py
update main to accept a cli arg transcript_file
move cli arg parsing into a file next to main.py called arg_parse.py
move min_count_threshold into parse_arguments default 3
```

## Example 5: Exclue noise words from the list and refactor.

Starting point is state at the end of the previous example.
Requirement is to add a constants file that contains a set of noise words to exclued from the output list. We will also refactor to remove trailing punction from words.

```
/add src/transcript_analytics/main.py src/transcript_analytics/arg_parse.py
create constants.py next to main, add a word_blacklist var based off transcript. txt with wor ds like 'to', 'and', 'the', etc. Then filter out words in main.
update main remove trailing punctuation from the word 
```

## Example 6: Add sentiment analysis using an OpenAI API call

Starting point is state at the end of the previous example as well as `openai` and `pydantic` dependencies installed using `uv` and updated in the `pyproject.toml` file.
Requirement is to send the word list to OpenAI and ask it to provide a sentiment analysis. We will help aider by providing it [this example](https://github.com/openai/openai-python/blob/main/examples/parsing.py). We copy and paste this exact example in the Aider AI promots shown below:

```
/add src
/add pyproject.toml
create data_types.py next to main. use pydantic, add TranscriptAnalysis(BaseModel) {quick_summary: str, bullet_point_ highlights: str[], sentiment_analaysis:str}
create llm.py next to main. create def analyze_transcript(transcript) -> `TranscriptAnalysis`. Use this code as an example: 
    from typing import List

    import rich
    from pydantic import BaseModel

    from openai import OpenAI


    class Step(BaseModel):
        explanation: str
        output: str


    class MathResponse(BaseModel):
        steps: List[Step]
        final_answer: str


    client = OpenAI()

    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "You are a helpful math tutor."},
            {"role": "user", "content": "solve 8x + 31 = 2"},
        ],
        response_format=MathResponse,
    )

    message = completion.choices[0].message
    if message.parsed:
        rich.print(message.parsed.steps)

        print("answer: ", message.parsed.final_answer)
    else:
        print(message.refusal)
```

## Example 7: Run sentiment analysis in main and include the word count

Starting point is state at the end of the previous example.
Requirement is to run and output the results of the sentiment analysis call and include the word count in the analysis.

```
/add src
/add pyproject.toml
add `analyze_transcript` to main. run and print after keywords.
add keywords: str[] to `TranscriptAnalysis`. update `main` pass in and use `word_count` to `analyze_transcript` to include in the llm call. update main.py: print keywords.
```

## Example 8: Add an output flag to support json, markdown or text

Starting point is state at the end of the previous example.
Requirement is to be able to save the output to a specific external file. Supported types are json, markdown or text. Add to the cli arguments list.

**NOTE** in these examples now how the prompt is structed with the IDKs including: **location**, **action** and **detail**.

```
/add src/transcript_analytics/main.py src/transcript_analytics/data_types.py src/transcript_analytics/arg_parse.py 

CREATE output_format.py: 
    CREATE def format_as_str(transcript: 'TranscriptAnalysis') > str, 
        format_as_json(...), 
        format_as_markdown (...). 
    UPDATE main.py: 
        ADD a cli arg for file output format DEFAULT text, save output to file with proper extension. 
```

## Example 9: Generate a chart for the word list.

Starting point is state at the end of the previous example with new dependencies installed via `uv` for `matplotlib`.
Requirements is the application should now also generate a bar chart.

```
/add pyproject.toml src/transcript_analytics/main.py 
CREATE chart.py: 
        CREATE def word_cound_bar_chart(threshold_word_count: dict): show horizontal barchart sort decending. 
    UPDATE main.py: 
        REPLACE word count print using word_count_bar_chart.
        MOVE threshold logic AFTER our for word loop.
```

## Example 10: Add support for yaml output.

Starting point is state at the end of the previous example with new dependencies installed via `uv` for `pyyaml`.
Requirements is the application should now also support yaml output format.

```
/add src/transcript_analytics/main.py src/transcript_analytics/output_format.py src/transcript_analytics/arg_parse.py pyproject.toml 
UPDATE main.py, output_format.py, arg_parse.py. ADD format_as_yaml() MIRROR format_as_json()
```