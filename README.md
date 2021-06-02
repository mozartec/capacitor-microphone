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

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => any
```

Checks microphone permission

**Returns:** <code>any</code>

**Since:** 0.0.3

--------------------


### requestPermissions()

```typescript
requestPermissions() => any
```

Requests microphone permission

**Returns:** <code>any</code>

**Since:** 0.0.3

--------------------


### startRecording()

```typescript
startRecording() => any
```

Starts recoding session if no session is in progress

**Returns:** <code>any</code>

**Since:** 0.0.3

--------------------


### stopRecording()

```typescript
stopRecording() => any
```

Stops recoding session if one is in progress

**Returns:** <code>any</code>

**Since:** 0.0.3

--------------------


### Interfaces


#### PermissionStatus

| Prop             | Type                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- |
| **`microphone`** | <code>"prompt" \| "prompt-with-rationale" \| "granted" \| "denied" \| "limited"</code> |


#### AudioRecording

| Prop               | Type                |
| ------------------ | ------------------- |
| **`base64String`** | <code>string</code> |
| **`dataUrl`**      | <code>string</code> |
| **`path`**         | <code>string</code> |
| **`webPath`**      | <code>string</code> |
| **`duration`**     | <code>number</code> |
| **`format`**       | <code>string</code> |
| **`mimeType`**     | <code>string</code> |

</docgen-api>
