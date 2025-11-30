import Link from "next/link";
import { WebRTCDemo } from "./webrtc-demo";

export default function WebRTCPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          Back to home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">WebRTC</h1>
      <p className="text-muted-foreground mb-8">
        Real-time peer-to-peer communication using WebRTC. This demo shows
        camera access and a local loopback connection.
      </p>

      <WebRTCDemo />

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="font-semibold mb-2">WebRTC Flow</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>1. Get local media with <code>getUserMedia()</code></li>
          <li>2. Create <code>RTCPeerConnection</code> with ICE servers</li>
          <li>3. Add local tracks to the connection</li>
          <li>4. Exchange offer/answer via signaling server</li>
          <li>5. Exchange ICE candidates for NAT traversal</li>
          <li>6. Connection established, media flows peer-to-peer</li>
        </ul>
      </div>

      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Production Considerations</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            - <strong>Signaling Server:</strong> Use WebSocket to exchange
            offers, answers, and ICE candidates
          </li>
          <li>
            - <strong>TURN Server:</strong> Required when direct P2P fails
            (symmetric NAT, firewalls)
          </li>
          <li>
            - <strong>Media Servers:</strong> For recording, broadcasting, or
            many-to-many calls
          </li>
          <li>
            - <strong>Permissions:</strong> Handle denied camera/mic gracefully
          </li>
        </ul>
      </div>
    </main>
  );
}

