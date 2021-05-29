export interface MicrophonePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
