import AVFAudio

@objc public class Microphone: NSObject {
    private var recordingSession: AVAudioSession!
    private var audioRecorder: AVAudioRecorder!
    private var audioFilePath: URL!
    
    private let settings = [
        AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
        AVSampleRateKey: 44100,
        AVNumberOfChannelsKey: 1,
        AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
    ]
    
    private func getDirectoryToSaveAudioFile() -> URL {
        return URL(fileURLWithPath: NSTemporaryDirectory(), isDirectory: true)
    }
    
     func startRecording() -> Bool {
        do {
            recordingSession = AVAudioSession.sharedInstance()
            try recordingSession.setCategory(AVAudioSession.Category.record)
            try recordingSession.setActive(true)
            audioFilePath = getDirectoryToSaveAudioFile().appendingPathComponent("\(UUID().uuidString).m4a")
            audioRecorder = try AVAudioRecorder(url: audioFilePath, settings: settings)
            audioRecorder.record()
            return true
        } catch {
            return false
        }
    }
    
     func stopRecording() {
        do {
            audioRecorder.stop()
            try recordingSession.setActive(false)
            audioRecorder = nil
            recordingSession = nil
        } catch {}
    }
    
    func getOutputFile() -> URL {
        return audioFilePath
    }
    
    @objc public func echo(_ value: String) -> String {
        return value
    }
}
