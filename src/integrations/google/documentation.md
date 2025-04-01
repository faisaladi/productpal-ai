#@google/genai
Google Gen AI SDK for TypeScript and JavaScript
NPM Downloads Node Current

Documentation: https://googleapis.github.io/js-genai/

The Google Gen AI JavaScript SDK is designed for TypeScript and JavaScript developers to build applications powered by Gemini. The SDK supports both the Gemini Developer API and Vertex AI.

The Google Gen AI SDK is designed to work with Gemini 2.0 features.

Note
SDK Preview: See: Preview Launch.

Caution
API Key Security: Avoid exposing API keys in client-side code. Use server-side implementations in production environments.

Prerequisites
Node.js version 18 or later
Installation
To install the SDK, run the following command:

npm install @google/genai
Copy
Quickstart
The simplest way to get started is to using an API key from Google AI Studio:

import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
Copy
Web quickstart
The package contents are also available unzipped in the package/ directory of the bucket, so an equivalent web example is:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Using My Package</title>
  </head>
  <body>
    <script type="module">
      import {GoogleGenAI} from 'https://cdn.jsdelivr.net/npm/@google/genai@latest/+esm'

          const ai = new GoogleGenAI({apiKey:"GEMINI_API_KEY"});

          async function main() {
            const response = await ai.models.generateContent({
              model: 'gemini-2.0-flash-001',
              contents: 'Why is the sky blue?',
            });
            console.log(response.text);
          }

          main();
    </script>
  </body>
</html>
Copy
Initialization
The Google Gen AI SDK provides support for both the Google AI Studio and Vertex AI implementations of the Gemini API.

Gemini Developer API
For server-side applications, initialize using an API key, which can be acquired from Google AI Studio:

import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
Copy
Browser
Caution
API Key Security: Avoid exposing API keys in client-side code. Use server-side implementations in production environments.

In the browser the initialization code is identical:

import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
Copy
Vertex AI
Sample code for VertexAI initialization:

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'your_project',
    location: 'your_location',
});
Copy
GoogleGenAI overview
All API features are accessed through an instance of the GoogleGenAI classes. The submodules bundle together related API methods:

ai.models: Use models to query models (generateContent, generateImages, ...), or examine their metadata.
ai.caches: Create and manage caches to reduce costs when repeatedly using the same large prompt prefix.
ai.chats: Create local stateful chat objects to simplify multi turn interactions.
ai.files: Upload files to the API and reference them in your prompts. This reduces bandwidth if you use a file many times, and handles files too large to fit inline with your prompt.
ai.live: Start a live session for real time interaction, allows text + audio + video input, and text or audio output.
Samples
More samples can be found in the github samples directory.

Streaming
For quicker, more responsive API interactions use the generateContentStream method which yields chunks as they're generated:

import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: 'Write a 100-word poem.',
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
Copy
Function Calling
To let Gemini to interact with external systems, you can provide provide functionDeclaration objects as tools. To use these tools it's a 4 step

Declare the function name, description, and parameters
Call generateContent with function calling enabled
Use the returned FunctionCall parameters to call your actual function
Send the result back to the model (with history, easier in ai.chat) as a FunctionResponse
import {GoogleGenAI, FunctionCallingConfigMode, FunctionDeclaration, Type} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  const controlLightDeclaration: FunctionDeclaration = {
    name: 'controlLight',
    parameters: {
      type: Type.OBJECT,
      description: 'Set the brightness and color temperature of a room light.',
      properties: {
        brightness: {
          type: Type.NUMBER,
          description:
              'Light level from 0 to 100. Zero is off and 100 is full brightness.',
        },
        colorTemperature: {
          type: Type.STRING,
          description:
              'Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.',
        },
      },
      required: ['brightness', 'colorTemperature'],
    },
  };

  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      toolConfig: {
        functionCallingConfig: {
          // Force it to call any function
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        }
      },
      tools: [{functionDeclarations: [controlLightDeclaration]}]
    }
  });

  console.log(response.functionCalls);
}

main();
Copy
Preview Launch
The SDK is curently in a preview launch stage, per Google's launch stages this means:

At Preview, products or features are ready for testing by customers. Preview offerings are often publicly announced, but are not necessarily feature-complete, and no SLAs or technical support commitments are provided for these. Unless stated otherwise by Google, Preview offerings are intended for use in test environments only. The average Preview stage lasts about six months.

#Class GoogleGenAI
The Google GenAI SDK.

Remarks
Provides access to the GenAI features through either the Gemini API or the Vertex AI API.

The GoogleGenAIOptions.vertexai value determines which of the API services to use.

When using the Gemini API, a GoogleGenAIOptions.apiKey must also be set, when using Vertex AI GoogleGenAIOptions.project and GoogleGenAIOptions.location must also be set.

Example
Initializing the SDK for using the Gemini API:

import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
Copy
Example
Initializing the SDK for using the Vertex AI API:

import {GoogleGenAI} from '@google/genai';
const ai = new GoogleGenAI({
  vertexai: true,
  project: 'PROJECT_ID',
  location: 'PROJECT_LOCATION'
});
Copy
Defined in client.ts:116
Constructors
C
constructor
Properties
P
caches
P
chats
P
files
P
live
P
models
P
operations
P
vertexai
constructor
new GoogleGenAI(options: GoogleGenAIOptions): GoogleGenAI
Parameters
options: GoogleGenAIOptions
Returns GoogleGenAI
Defined in client.ts:128
Readonly
caches
caches: Caches
Defined in client.ts:124
Readonly
chats
chats: Chats
Defined in client.ts:123
Readonly
files
files: Files
Defined in client.ts:125
Readonly
live
live: Live
Defined in client.ts:122
Readonly
models
models: Models
Defined in client.ts:121
Readonly
operations
operations: Operations
Defined in client.ts:126
Readonly
vertexai
vertexai: boolean
Defined in client.ts:119

#Class Chats
A utility class to create a chat session.

Defined in chats.ts:110
Constructors
C
constructor
Methods
M
create
constructor
new Chats(modelsModule: Models, apiClient: ApiClient): Chats
Parameters
modelsModule: Models
apiClient: ApiClient
Returns Chats
Defined in chats.ts:114
create
create(params: CreateChatParameters): Chat
Creates a new chat session.

Parameters
params: CreateChatParameters
Parameters for creating a chat session.

Returns Chat
A new chat session.

Remarks
The config in the params will be used for all requests within the chat session unless overridden by a per-request config in

See
types.SendMessageParameters#config.

Example
const chat = ai.chats.create({
  model: 'gemini-2.0-flash'
  config: {
    temperature: 0.5,
    maxOutputTokens: 1024,
  }
});

#Class Chat
Chat session that enables sending messages to the model with previous conversation context.

Remarks
The session maintains all the turns between user and model.

Defined in chats.ts:159
Constructors
C
constructor
Methods
M
getHistory
M
sendMessage
M
sendMessageStream
constructor
new Chat(
    apiClient: ApiClient,
    modelsModule: Models,
    model: string,
    config?: GenerateContentConfig,
    history?: Content[],
): Chat
Parameters
apiClient: ApiClient
modelsModule: Models
model: string
config: GenerateContentConfig = {}
history: Content[] = []
Returns Chat
Defined in chats.ts:164
getHistory
getHistory(curated?: boolean): Content[]
Returns the chat history.

Parameters
curated: boolean = false
whether to return the curated history or the comprehensive history.

Returns Content[]
History contents alternating between user and model for the entire chat session.

Remarks
The history is a list of contents alternating between user and model.

There are two types of history:

The curated history contains only the valid turns between user and model, which will be included in the subsequent requests sent to the model.
The comprehensive history contains all turns, including invalid or empty model outputs, providing a complete record of the history.
The history is updated after receiving the response from the model, for streaming response, it means receiving the last chunk of the response.

The comprehensive history is returned by default. To get the curated history, set the curated parameter to true.

Defined in chats.ts:276
sendMessage
sendMessage(params: SendMessageParameters): Promise<GenerateContentResponse>
Sends a message to the model and returns the response.

Parameters
params: SendMessageParameters
parameters for sending messages within a chat session.

Returns Promise<GenerateContentResponse>
The model's response.

Remarks
This method will wait for the previous message to be processed before sending the next message.

See
Chat#sendMessageStream for streaming method.

Example
const chat = ai.chats.create({model: 'gemini-2.0-flash'});
const response = await chat.sendMessage({
  message: 'Why is the sky blue?'
});
console.log(response.text);
Copy
Defined in chats.ts:194
sendMessageStream
sendMessageStream(
    params: SendMessageParameters,
): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
Sends a message to the model and returns the response in chunks.

Parameters
params: SendMessageParameters
parameters for sending the message.

Returns Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
The model's response.

Remarks
This method will wait for the previous message to be processed before sending the next message.

See
Chat#sendMessage for non-streaming method.

Example
const chat = ai.chats.create({model: 'gemini-2.0-flash'});
const response = await chat.sendMessageStream({
  message: 'Why is the sky blue?'
});
for await (const chunk of response) {
  console.log(chunk.text);
}


#Class Files
Hierarchy
BaseModule
Files
Defined in files.ts:16
Constructors
C
constructor
Methods
M
delete
M
get
M
list
M
upload
constructor
new Files(apiClient: ApiClient): Files
Parameters
apiClient: ApiClient
Returns Files
Overrides BaseModule.constructor

Defined in files.ts:17
delete
delete(params: DeleteFileParameters): Promise<DeleteFileResponse>
Deletes a remotely stored file.

Parameters
params: DeleteFileParameters
The parameters for the delete request.

Returns Promise<DeleteFileResponse>
The DeleteFileResponse, the response for the delete method.

Example
The following code deletes an example file named "files/mehozpxf877d".

await ai.files.delete({name: file.name});
Copy
Defined in files.ts:265
get
get(params: GetFileParameters): Promise<File>
Retrieves the file information from the service.

Parameters
params: GetFileParameters
The parameters for the get request

Returns Promise<File>
The Promise that resolves to the types.File object requested.

Example
const config: GetFileParameters = {
  name: fileName,
};
file = await ai.files.get(config);
console.log(file.name);
Copy
Defined in files.ts:213
list
list(params?: ListFilesParameters): Promise<Pager<File>>
Lists all current project files from the service.

Parameters
params: ListFilesParameters = {}
The parameters for the list request

Returns Promise<Pager<File>>
The paginated results of the list of files

Example
The following code prints the names of all files from the service, the size of each page is 10.

const listResponse = await ai.files.list({config: {'pageSize': 10}});
for await (const file of listResponse) {
  console.log(file.name);
}
Copy
Defined in files.ts:38
upload
upload(params: UploadFileParameters): Promise<File>
Uploads a file asynchronously to the Gemini API. This method is not available in Vertex AI. Supported upload sources:

Node.js: File path (string) or Blob object.
Browser: Blob object (e.g., File).
Parameters
params: UploadFileParameters
Optional parameters specified in the common.UploadFileParameters interface.

Returns Promise<File>
A promise that resolves to a types.File object.

Remarks
The mimeType can be specified in the config parameter. If omitted:

For file path (string) inputs, the mimeType will be inferred from the file extension.
For Blob object inputs, the mimeType will be set to the Blob's type property. Somex eamples for file extension to mimeType mapping: .txt -> text/plain .json -> application/json .jpg -> image/jpeg .png -> image/png .mp3 -> audio/mpeg .mp4 -> video/mp4
This section can contain multiple paragraphs and code examples.

Throws
An error if called on a Vertex AI client.

Throws
An error if the mimeType is not provided and can not be inferred, the mimeType can be provided in the params.config parameter.

Throws
An error occurs if a suitable upload location cannot be established.

Example
The following code uploads a file to Gemini API.

const file = await ai.files.upload({file: 'file.txt', config: {
  mimeType: 'text/plain',
}});
console.log(file.name);
Copy
Defined in files.ts:90

#Class Models
Hierarchy
BaseModule
Models
Defined in models.ts:15
Constructors
C
constructor
Methods
M
computeTokens
M
countTokens
M
embedContent
M
generateContent
M
generateContentStream
M
generateImages
M
generateVideos
constructor
new Models(apiClient: ApiClient): Models
Parameters
apiClient: ApiClient
Returns Models
Overrides BaseModule.constructor

Defined in models.ts:16
computeTokens
computeTokens(params: ComputeTokensParameters): Promise<ComputeTokensResponse>
Given a list of contents, returns a corresponding TokensInfo containing the list of tokens and list of token ids.

This method is not supported by the Gemini Developer API.

Parameters
params: ComputeTokensParameters
The parameters for computing tokens.

Returns Promise<ComputeTokensResponse>
The response from the API.

Example
const response = await ai.models.computeTokens({
 model: 'gemini-2.0-flash',
 contents: 'What is your name?'
});
console.log(response);
Copy
Defined in models.ts:639
countTokens
countTokens(params: CountTokensParameters): Promise<CountTokensResponse>
Counts the number of tokens in the given contents. Multimodal input is supported for Gemini models.

Parameters
params: CountTokensParameters
The parameters for counting tokens.

Returns Promise<CountTokensResponse>
The response from the API.

Example
const response = await ai.models.countTokens({
 model: 'gemini-2.0-flash',
 contents: 'The quick brown fox jumps over the lazy dog.'
});
console.log(response);
Copy
Defined in models.ts:542
embedContent
embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse>
Calculates embeddings for the given contents. Only text is supported.

Parameters
params: EmbedContentParameters
The parameters for embedding contents.

Returns Promise<EmbedContentResponse>
The response from the API.

Example
const response = await ai.models.embedContent({
 model: 'text-embedding-004',
 contents: [
   'What is your name?',
   'What is your favorite color?',
 ],
 config: {
   outputDimensionality: 64,
 },
});
console.log(response);
Copy
Defined in models.ts:349
generateContent
generateContent(
    params: GenerateContentParameters,
): Promise<GenerateContentResponse>
Makes an API request to generate content with a given model.

For the model parameter, supported formats for Vertex AI API include:

The Gemini model ID, for example: 'gemini-2.0-flash'
The full resource name starts with 'projects/', for example: 'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'
The partial resource name with 'publishers/', for example: 'publishers/google/models/gemini-2.0-flash' or 'publishers/meta/models/llama-3.1-405b-instruct-maas'
/ separated publisher and model name, for example: 'google/gemini-2.0-flash' or 'meta/llama-3.1-405b-instruct-maas'
For the model parameter, supported formats for Gemini API include:

The Gemini model ID, for example: 'gemini-2.0-flash'
The model name starts with 'models/', for example: 'models/gemini-2.0-flash'
For tuned models, the model name starts with 'tunedModels/', for example: 'tunedModels/1234567890123456789'
Some models support multimodal input and output.

Parameters
params: GenerateContentParameters
The parameters for generating content.

Returns Promise<GenerateContentResponse>
The response from generating content.

Example
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'why is the sky blue?',
  config: {
    candidateCount: 2,
  }
});
console.log(response);
Copy
Defined in models.ts:58
generateContentStream
generateContentStream(
    params: GenerateContentParameters,
): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
Makes an API request to generate content with a given model and yields the response in chunks.

For the model parameter, supported formats for Vertex AI API include:

The Gemini model ID, for example: 'gemini-2.0-flash'
The full resource name starts with 'projects/', for example: 'projects/my-project-id/locations/us-central1/publishers/google/models/gemini-2.0-flash'
The partial resource name with 'publishers/', for example: 'publishers/google/models/gemini-2.0-flash' or 'publishers/meta/models/llama-3.1-405b-instruct-maas'
/ separated publisher and model name, for example: 'google/gemini-2.0-flash' or 'meta/llama-3.1-405b-instruct-maas'
For the model parameter, supported formats for Gemini API include:

The Gemini model ID, for example: 'gemini-2.0-flash'
The model name starts with 'models/', for example: 'models/gemini-2.0-flash'
For tuned models, the model name starts with 'tunedModels/', for example: 'tunedModels/1234567890123456789'
Some models support multimodal input and output.

Parameters
params: GenerateContentParameters
The parameters for generating content with streaming response.

Returns Promise<AsyncGenerator<GenerateContentResponse, any, unknown>>
The response from generating content.

Example
const response = await ai.models.generateContentStream({
  model: 'gemini-2.0-flash',
  contents: 'why is the sky blue?',
  config: {
    maxOutputTokens: 200,
  }
});
for await (const chunk of response) {
  console.log(chunk);
}
Copy
Defined in models.ts:105
generateImages
generateImages(
    params: GenerateImagesParameters,
): Promise<GenerateImagesResponse>
Generates an image based on a text description and configuration.

Parameters
params: GenerateImagesParameters
Returns Promise<GenerateImagesResponse>
The response from the API.

Example
const response = await client.models.generateImages({
 model: 'imagen-3.0-generate-002',
 prompt: 'Robot holding a red skateboard',
 config: {
   numberOfImages: 1,
   includeRaiReason: true,
 },
});
console.log(response?.generatedImages?.[0]?.image?.imageBytes);
Copy
Defined in models.ts:132
generateVideos
generateVideos(
    params: GenerateVideosParameters,
): Promise<GenerateVideosOperation>
Generates videos based on a text description and configuration.

Parameters
params: GenerateVideosParameters
The parameters for generating videos.

Returns Promise<GenerateVideosOperation>
A Promise which allows you to track the progress and eventually retrieve the generated videos using the operations.get method.

Example
const operation = await ai.models.generateVideos({
 model: 'veo-2.0-generate-001',
 prompt: 'A neon hologram of a cat driving at top speed',
 config: {
   numberOfVideos: 1
});

while (!operation.done) {
  await new Promise(resolve => setTimeout(resolve, 10000));
  operation = await ai.operations.get({operation: operation});
}

console.log(operation.result?.generatedVideos?.[0]?.video?.uri);
Copy
Defined in models.ts:709

#@google/genaitypesGenerationConfig
Interface GenerationConfig
Generation config.

interface GenerationConfig {
    audioTimestamp?: boolean;
    candidateCount?: number;
    frequencyPenalty?: number;
    logprobs?: number;
    maxOutputTokens?: number;
    presencePenalty?: number;
    responseLogprobs?: boolean;
    responseMimeType?: string;
    responseSchema?: Schema;
    routingConfig?: GenerationConfigRoutingConfig;
    seed?: number;
    stopSequences?: string[];
    temperature?: number;
    topK?: number;
    topP?: number;
}
Defined in types.ts:1495
Properties
P
audioTimestamp?
P
candidateCount?
P
frequencyPenalty?
P
logprobs?
P
maxOutputTokens?
P
presencePenalty?
P
responseLogprobs?
P
responseMimeType?
P
responseSchema?
P
routingConfig?
P
seed?
P
stopSequences?
P
temperature?
P
topK?
P
topP?
Optional
audioTimestamp
audioTimestamp?: boolean
Optional. If enabled, audio timestamp will be included in the request to the model.

Defined in types.ts:1497
Optional
candidateCount
candidateCount?: number
Optional. Number of candidates to generate.

Defined in types.ts:1499
Optional
frequencyPenalty
frequencyPenalty?: number
Optional. Frequency penalties.

Defined in types.ts:1501
Optional
logprobs
logprobs?: number
Optional. Logit probabilities.

Defined in types.ts:1503
Optional
maxOutputTokens
maxOutputTokens?: number
Optional. The maximum number of output tokens to generate per message.

Defined in types.ts:1505
Optional
presencePenalty
presencePenalty?: number
Optional. Positive penalties.

Defined in types.ts:1507
Optional
responseLogprobs
responseLogprobs?: boolean
Optional. If true, export the logprobs results in response.

Defined in types.ts:1509
Optional
responseMimeType
responseMimeType?: string
Optional. Output response mimetype of the generated candidate text. Supported mimetype: - text/plain: (default) Text output. - application/json: JSON response in the candidates. The model needs to be prompted to output the appropriate response type, otherwise the behavior is undefined. This is a preview feature.

Defined in types.ts:1511
Optional
responseSchema
responseSchema?: Schema
Optional. The Schema object allows the definition of input and output data types. These types can be objects, but also primitives and arrays. Represents a select subset of an OpenAPI 3.0 schema object. If set, a compatible response_mime_type must also be set. Compatible mimetypes: application/json: Schema for JSON response.

Defined in types.ts:1513
Optional
routingConfig
routingConfig?: GenerationConfigRoutingConfig
Optional. Routing configuration.

Defined in types.ts:1515
Optional
seed
seed?: number
Optional. Seed.

Defined in types.ts:1517
Optional
stopSequences
stopSequences?: string[]
Optional. Stop sequences.

Defined in types.ts:1519
Optional
temperature
temperature?: number
Optional. Controls the randomness of predictions.

Defined in types.ts:1521
Optional
topK
topK?: number
Optional. If specified, top-k sampling will be used.

Defined in types.ts:1523
Optional
topP
topP?: number
Optional. If specified, nucleus sampling will be used.