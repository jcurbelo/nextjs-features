"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// Custom hook for WebRTC peer connections
// https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection

// Free STUN servers for NAT traversal
const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export type PeerConnectionState = {
  connectionState: RTCPeerConnectionState | null;
  iceConnectionState: RTCIceConnectionState | null;
  remoteStream: MediaStream | null;
};

export function usePeerConnection() {
  const [state, setState] = useState<PeerConnectionState>({
    connectionState: null,
    iceConnectionState: null,
    remoteStream: null,
  });

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  // Lazy initialize MediaStream (not available during SSR)
  const getRemoteStream = useCallback(() => {
    if (!remoteStreamRef.current && typeof MediaStream !== "undefined") {
      remoteStreamRef.current = new MediaStream();
    }
    return remoteStreamRef.current;
  }, []);

  const createConnection = useCallback(() => {
    // Close existing connection
    if (pcRef.current) {
      pcRef.current.close();
    }

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    pcRef.current = pc;

    // Track connection state changes
    pc.onconnectionstatechange = () => {
      setState((prev) => ({ ...prev, connectionState: pc.connectionState }));
    };

    pc.oniceconnectionstatechange = () => {
      setState((prev) => ({ ...prev, iceConnectionState: pc.iceConnectionState }));
    };

    // Handle incoming tracks
    pc.ontrack = (event) => {
      const remoteStream = getRemoteStream();
      event.streams[0]?.getTracks().forEach((track) => {
        remoteStream?.addTrack(track);
      });
      setState((prev) => ({ ...prev, remoteStream }));
    };

    return pc;
  }, [getRemoteStream]);

  const addLocalStream = useCallback((stream: MediaStream) => {
    if (!pcRef.current) return;
    stream.getTracks().forEach((track) => {
      pcRef.current?.addTrack(track, stream);
    });
  }, []);

  const createOffer = useCallback(async (): Promise<RTCSessionDescriptionInit | null> => {
    if (!pcRef.current) return null;
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    return offer;
  }, []);

  const createAnswer = useCallback(
    async (offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | null> => {
      if (!pcRef.current) return null;
      await pcRef.current.setRemoteDescription(offer);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      return answer;
    },
    []
  );

  const setRemoteAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    if (!pcRef.current) return;
    await pcRef.current.setRemoteDescription(answer);
  }, []);

  const addIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    if (!pcRef.current) return;
    await pcRef.current.addIceCandidate(candidate);
  }, []);

  const onIceCandidate = useCallback((callback: (candidate: RTCIceCandidate) => void) => {
    if (!pcRef.current) return;
    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        callback(event.candidate);
      }
    };
  }, []);

  const close = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    remoteStreamRef.current = null;
    setState({
      connectionState: null,
      iceConnectionState: null,
      remoteStream: null,
    });
  }, []);

  useEffect(() => {
    return () => {
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return {
    ...state,
    createConnection,
    addLocalStream,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    addIceCandidate,
    onIceCandidate,
    close,
  };
}

