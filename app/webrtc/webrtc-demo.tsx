"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaStream } from "./use-media-stream";
import { usePeerConnection } from "./use-peer-connection";

// Video element that displays a MediaStream
function VideoStream({
  stream,
  muted = false,
  label,
}: {
  stream: MediaStream | null;
  muted?: boolean;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full aspect-video bg-muted rounded-lg object-cover"
      />
    </div>
  );
}

export function WebRTCDemo() {
  const localMedia = useMediaStream();
  const localPeer = usePeerConnection();
  const remotePeer = usePeerConnection();
  const [isConnected, setIsConnected] = useState(false);

  // Start camera and create a local loopback connection
  // In a real app, signaling would happen over a WebSocket server
  async function startCall() {
    // Get local media
    const stream = await localMedia.start({ video: true, audio: true });
    if (!stream) return;

    // Create both peer connections
    localPeer.createConnection();
    remotePeer.createConnection();

    // Exchange ICE candidates between peers (normally done via signaling server)
    localPeer.onIceCandidate((candidate) => {
      remotePeer.addIceCandidate(candidate.toJSON());
    });
    remotePeer.onIceCandidate((candidate) => {
      localPeer.addIceCandidate(candidate.toJSON());
    });

    // Add local stream to first peer
    localPeer.addLocalStream(stream);

    // Create offer from peer 1
    const offer = await localPeer.createOffer();
    if (!offer) return;

    // Peer 2 receives offer and creates answer
    const answer = await remotePeer.createAnswer(offer);
    if (!answer) return;

    // Peer 1 receives answer
    await localPeer.setRemoteAnswer(answer);

    setIsConnected(true);
  }

  function endCall() {
    localMedia.stop();
    localPeer.close();
    remotePeer.close();
    setIsConnected(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Local Loopback Demo</CardTitle>
          <CardDescription>
            Creates two peer connections locally. In production, signaling would
            happen over WebSocket between different browsers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={startCall} disabled={isConnected}>
              Start Call
            </Button>
            <Button variant="outline" onClick={endCall} disabled={!isConnected}>
              End Call
            </Button>
          </div>

          {localMedia.error && (
            <p className="text-sm text-destructive">{localMedia.error}</p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <VideoStream
              stream={localMedia.stream}
              muted
              label="Local (your camera)"
            />
            <VideoStream
              stream={remotePeer.remoteStream}
              label="Remote (loopback)"
            />
          </div>

          {isConnected && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Local ICE:{" "}
                <code>{localPeer.iceConnectionState || "n/a"}</code>
              </p>
              <p>
                Remote ICE:{" "}
                <code>{remotePeer.iceConnectionState || "n/a"}</code>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Camera Only</CardTitle>
          <CardDescription>
            Simple camera access without peer connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => localMedia.start({ video: true, audio: false })}
              disabled={localMedia.isActive}
            >
              Start Camera
            </Button>
            <Button
              variant="outline"
              onClick={localMedia.stop}
              disabled={!localMedia.isActive}
            >
              Stop Camera
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

