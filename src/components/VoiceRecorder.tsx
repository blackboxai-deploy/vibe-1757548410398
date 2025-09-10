"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  onVoiceMessage: (audioBlob: Blob) => void;
}

export default function VoiceRecorder({ onTranscript, onVoiceMessage }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
   const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Check browser support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
      console.log('Voice recording not supported in this browser');
    }

    return () => {
      stopRecording();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      // Audio level monitoring
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      analyser.fftSize = 512;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (isRecording) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average);
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      // Start MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setIsProcessing(true);
        
        // Send audio for transcription (simulation)
        try {
          const transcript = await transcribeAudio(audioBlob);
          onTranscript(transcript);
          onVoiceMessage(audioBlob);
        } catch (error) {
          console.error('Transcription failed:', error);
          onTranscript("Voice message received (transcription unavailable)");
          onVoiceMessage(audioBlob);
        }
        
        setIsProcessing(false);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      updateAudioLevel();
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Microphone access denied or not available. Please check browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      setAudioLevel(0);
    }
  };

   // Simulate audio transcription (in production, use speech-to-text API)
  const transcribeAudio = async (_audioBlob: Blob): Promise<string> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock transcription responses for demo
    const mockTranscripts = [
      "Business setup karne ke liye kya process hai?",
      "Golden visa ke requirements kya hain?", 
      "VAT registration kaise kare?",
      "Employment visa kitne din mein mil jata hai?",
      "Company setup ki cost kitni hai?",
      "Bank account opening ke liye documents kya chahiye?",
      "Ejari registration ka process kya hai?"
    ];
    
    return mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSupported) {
    return (
      <div className="text-blue-300 text-xs text-center">
        Voice recording not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Voice Recording Button */}
      <Button
        size="sm"
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        disabled={isProcessing}
        className={`relative ${
          isRecording 
            ? "bg-red-600 hover:bg-red-700 animate-pulse" 
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center space-x-1">
            <div className="animate-spin w-3 h-3 border border-white border-t-transparent rounded-full"></div>
            <span className="text-xs">Processing...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <span className="text-lg">🎤</span>
            <span className="text-xs">
              {isRecording ? "Recording..." : "Hold to Record"}
            </span>
          </div>
        )}
      </Button>

      {/* Recording Indicator */}
      {isRecording && (
        <Card className="bg-red-600 text-white p-2 animate-pulse">
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white rounded-full transition-all duration-100"
                  style={{
                    height: `${Math.min(audioLevel / 10 + 8, 20)}px`,
                    opacity: audioLevel > (i * 40) ? 1 : 0.3
                  }}
                />
              ))}
            </div>
            <span>{formatTime(recordingTime)}</span>
          </div>
        </Card>
      )}

      {/* Voice Instructions */}
      {!isRecording && !isProcessing && (
        <div className="text-blue-300 text-xs">
          🎤 Hold mic button for voice message
        </div>
      )}
    </div>
  );
}