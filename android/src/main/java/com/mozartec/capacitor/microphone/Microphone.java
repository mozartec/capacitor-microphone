package com.mozartec.capacitor.microphone;

import android.content.Context;
import android.media.MediaRecorder;

import java.io.File;
import java.io.IOException;

public class Microphone {

    private Context context;
    private MediaRecorder mediaRecorder;
    private File outputFile;

    public Microphone(Context context) throws IOException {
        this.context = context;
    }

    public void startRecording() throws IOException {
        File outputDir = context.getCacheDir();
        outputFile = File.createTempFile(java.util.UUID.randomUUID().toString(), ".m4a", outputDir);
        mediaRecorder = new MediaRecorder();
        mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
        mediaRecorder.setAudioChannels(1);
        mediaRecorder.setAudioSamplingRate(44100);
        mediaRecorder.setAudioEncodingBitRate(96000);
        mediaRecorder.setOutputFile(outputFile.getAbsolutePath());
        mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
        mediaRecorder.prepare();
        mediaRecorder.start();
    }

    public void stopRecording() {
        mediaRecorder.stop();
        mediaRecorder.release();
    }

    public File getOutputFile() {
        return outputFile;
    }
}
