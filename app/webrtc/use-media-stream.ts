"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// Custom hook for managing media streams
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream

export type MediaStreamState = {
  stream: MediaStream | null;
  error: string | null;
  isActive: boolean;
};

export function useMediaStream() {
  const [state, setState] = useState<MediaStreamState>({
    stream: null,
    error: null,
    isActive: false,
  });
  const streamRef = useRef<MediaStream | null>(null);

  const start = useCallback(
    async (constraints: MediaStreamConstraints = { video: true, audio: true }) => {
      try {
        // Stop any existing stream first
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        setState({ stream, error: null, isActive: true });
        return stream;
      } catch (err) {
        const error =
          err instanceof Error ? err.message : "Failed to access media devices";
        setState({ stream: null, error, isActive: false });
        return null;
      }
    },
    []
  );

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setState({ stream: null, error: null, isActive: false });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { ...state, start, stop };
}

