import { useState, useEffect, useCallback, useRef } from 'react';

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Initialize recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          // Get the first word only (in case multiple words are spoken)
          const words = result[0].transcript.trim().split(/\s+/);
          final = words[0] || '';
        } else {
          interim = result[0].transcript;
        }
      }

      if (final) {
        setTranscript(final);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interim);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      switch (event.error) {
        case 'not-allowed':
          setError('Microphone access denied. Please allow microphone access.');
          break;
        case 'no-speech':
          setError('No speech detected. Please try again.');
          break;
        case 'audio-capture':
          setError('No microphone found. Please connect a microphone.');
          break;
        case 'network':
          setError('Network error. Please check your connection.');
          break;
        case 'aborted':
          // User cancelled, no error message needed
          break;
        default:
          setError(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;

    setTranscript('');
    setInterimTranscript('');
    setError(null);

    try {
      recognitionRef.current.start();
    } catch (err) {
      // Recognition might already be running
      console.error('Start listening error:', err);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;

    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.error('Stop listening error:', err);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    clearError,
    // Combined display text
    displayText: transcript || interimTranscript,
  };
}
