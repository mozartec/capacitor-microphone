# @mozartec/capacitor-microphone

This Microphone API provides the ability to interact with the microphone and record Audio

## Platform support
| IOS                | Android            | Web                |
| ------------------ | ------------------ | ------------------ |
| :heavy_check_mark: | :heavy_check_mark: | :x:                |


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

**Returns:** <code>any</code>

--------------------


### requestPermissions()

```typescript
requestPermissions() => any
```

**Returns:** <code>any</code>

--------------------


### startRecording()

```typescript
startRecording() => any
```

**Returns:** <code>any</code>

--------------------


### stopRecording()

```typescript
stopRecording() => any
```

**Returns:** <code>any</code>

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
