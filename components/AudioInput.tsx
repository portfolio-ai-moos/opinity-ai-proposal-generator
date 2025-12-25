import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { transcribeAudio } from '../services/geminiService';
import { Language, UI_TEXT } from '../types';

interface AudioInputProps {
  onTranscription: (text: string) => void;
  language: Language;
}

const AudioInput: React.FC<AudioInputProps> = ({ onTranscription, language }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const text = UI_TEXT[language];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' }); // or audio/webm
        await handleAudioProcess(audioBlob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert(text.audio.error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const handleAudioProcess = async (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      try {
        const transcription = await transcribeAudio(base64Audio, language);
        if (transcription) {
            onTranscription(transcription);
        }
      } catch (error) {
        console.error("Transcription error:", error);
      } finally {
        setIsProcessing(false);
      }
    };
  };

  return (
    <div className="inline-flex items-center">
      {isProcessing ? (
        <div className="flex items-center gap-2 text-[#00a4e8] animate-pulse px-3 py-1.5 border border-[#00a4e8]/50 rounded-md bg-[#00a4e8]/10 text-xs">
          <Loader2 className="w-4 h-4 animate-spin" />
          {text.audio.processing}
        </div>
      ) : !isRecording ? (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-2 text-red-500 hover:text-red-400 hover:bg-red-900/20 px-3 py-1.5 border border-red-500/50 rounded-md transition-all text-xs"
        >
          <Mic className="w-4 h-4" />
          {text.audio.record}
        </button>
      ) : (
        <button
          type="button"
          onClick={stopRecording}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-all animate-pulse text-xs shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        >
          <Square className="w-4 h-4 fill-current" />
          {text.audio.stop}
        </button>
      )}
    </div>
  );
};

export default AudioInput;