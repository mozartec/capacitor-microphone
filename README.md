# @mozartec/capacitor-microphone

This Microphone API provides the ability to interact with the microphone and record Audio

## Platform support
|              | IOS                  | Android            | Web                |
| ------------ |--------------------- | ------------------ | ------------------ |
| Availability | :heavy_check_mark:   | :heavy_check_mark: | :x:                |
| Encoding     | kAudioFormatMPEG4AAC | MPEG_4 / AAC       | :x:                |
| Extension    | .m4a                 | .m4a               | :x:                |


## Installation

## Install

```bash
npm install @mozartec/capacitor-microphone
npx cap sync
```

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`startRecording()`](#startrecording)
* [`stopRecording()`](#stoprecording)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Checks microphone permission

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Requests microphone permission

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

--------------------


### startRecording()

```typescript
startRecording() => Promise<void>
```

Starts recoding session if no session is in progress

--------------------


### stopRecording()

```typescript
stopRecording() => Promise<AudioRecording>
```

Stops recoding session if one is in progress

**Returns:** <code>Promise&lt;<a href="#audiorecording">AudioRecording</a>&gt;</code>

--------------------


### Interfaces


#### PermissionStatus

| Prop             | Type                                                                            |
| ---------------- | ------------------------------------------------------------------------------- |
| **`microphone`** | <code><a href="#microphonepermissionstate">MicrophonePermissionState</a></code> |


#### AudioRecording

| Prop               | Type                | Description                                                                                                     |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| **`base64String`** | <code>string</code> | The base64 encoded string representation of the audio file.                                                     |
| **`dataUrl`**      | <code>string</code> | The url starting with 'data:audio/aac;base64,' and the base64 encoded string representation of the audio file.  |
| **`path`**         | <code>string</code> | platform-specific file URL that can be read later using the Filesystem API.                                     |
| **`webPath`**      | <code>string</code> | webPath returns a path that can be used to set the src attribute of an audio element can be useful for testing. |
| **`duration`**     | <code>number</code> | recoding duration in milliseconds                                                                               |
| **`format`**       | <code>string</code> | file extension (only .m4a supported on this version)                                                            |
| **`mimeType`**     | <code>string</code> | file encoding (kAudioFormatMPEG4AAC for IOS) and (MPEG_4 / AAC for android) both return "audio/aac"             |


### Type Aliases


#### MicrophonePermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
