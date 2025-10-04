# Product Requirements Document: Server-Sent Events for Real-Time Chat Feedback

## Document Information
- **Version**: 1.0
- **Date**: October 2, 2025
- **Status**: Implementation in Progress
- **Author**: Imperial Development Team

---

## 1. Executive Summary

### 1.1 Purpose
Implement Server-Sent Events (SSE) to provide real-time feedback during chat message processing, improving user experience by showing progress updates instead of a blank loading state.

### 1.2 Problem Statement
Currently, users experience a 5-15 second wait time with only "Imperial Intelligence is thinking..." message. This creates uncertainty about:
- Whether the system is working
- How long the wait will be
- What step is currently executing
- If the request is stuck or failed

### 1.3 Solution Overview
Implement SSE streaming to push real-time progress updates from the backend LangGraph workflow to the frontend, showing users exactly what's happening at each stage.

---

## 2. Goals and Objectives

### 2.1 Primary Goals
1. **Improve Perceived Performance**: Make the system feel 40-50% faster through transparency
2. **Increase User Confidence**: Show system is actively working
3. **Better Error Communication**: Identify which step failed
4. **Enhanced Debugging**: Log and display workflow progress

### 2.2 Success Metrics
- **User Satisfaction**: 80%+ positive feedback on new experience
- **Perceived Speed**: User surveys report "faster" feeling
- **Error Clarity**: Users can identify where failures occur
- **Abandonment Rate**: 30% reduction in users closing during wait

### 2.3 Non-Goals
- Actual performance improvements (workflow speed remains same)
- WebSocket implementation (SSE is sufficient for one-way communication)
- Support for IE11 or browsers without EventSource API

---

## 3. Technical Architecture

### 3.1 Backend Architecture

#### 3.1.1 New SSE Endpoint
```
POST /chat/stream
- Headers: text/event-stream, no-cache
- Authentication: JWT via cookie (not query param for security)
- Body: { userMessage: string, chatId?: string }
```

#### 3.1.2 Event Types
```typescript
type SSEEvent = 
  | { type: 'started', data: { chatId: string } }
  | { type: 'intent_detected', data: { intent: 'CREATE' | 'EDIT', reasoning: string } }
  | { type: 'searching_examples', data: { query: string } }
  | { type: 'examples_found', data: { count: number } }
  | { type: 'generating_component', data: { mode: 'CREATE' | 'EDIT' } }
  | { type: 'component_ready', data: { progress: number } }
  | { type: 'complete', data: { component: string, name: string, message: string, chatId: string } }
  | { type: 'error', data: { message: string, step: string } }
  | { type: 'heartbeat', data: { timestamp: number } }
```

#### 3.1.3 LangGraph Streaming
- Use `ai.stream()` instead of `ai.invoke()`
- Emit events at each node transition
- Stream node outputs as they complete

#### 3.1.4 Connection Management
- Send heartbeat every 20 seconds
- Close connection after completion or error
- Handle client disconnection gracefully
- Timeout after 60 seconds of inactivity

### 3.2 Frontend Architecture

#### 3.2.1 New Hook: `useChatStream`
```typescript
interface ChatStreamState {
  status: 'idle' | 'connecting' | 'streaming' | 'complete' | 'error';
  currentStep: string;
  progress: number;
  result: ChatResponse | null;
  error: string | null;
}

useChatStream() => {
  sendMessage: (message: string, chatId?: string) => void;
  state: ChatStreamState;
  cancel: () => void;
}
```

#### 3.2.2 Progress Display Component
- Show current step with icon
- Progress bar or spinner
- Estimated time remaining
- Cancel button (optional v2 feature)

#### 3.2.3 EventSource Management
- Create connection on message send
- Parse SSE events
- Update UI progressively
- Clean up on unmount or completion

### 3.3 Data Flow

```
User sends message
     ↓
Frontend creates EventSource connection
     ↓
Backend receives POST /chat/stream
     ↓
Backend emits: started → intent_detected → searching_examples → 
              examples_found → generating_component → complete
     ↓
Frontend receives each event and updates UI
     ↓
Connection closes after complete/error
```

---

## 4. Functional Requirements

### 4.1 Backend Requirements

#### FR-B1: SSE Endpoint Creation
- **Priority**: P0 (Must Have)
- **Description**: Create `/chat/stream` endpoint with SSE response headers
- **Acceptance Criteria**:
  - Returns `Content-Type: text/event-stream`
  - Sends `Cache-Control: no-cache`
  - Includes `Connection: keep-alive`
  - Supports JWT authentication via cookies

#### FR-B2: Workflow Event Emission
- **Priority**: P0 (Must Have)
- **Description**: Emit events at each LangGraph node
- **Acceptance Criteria**:
  - `started` event when processing begins
  - `intent_detected` after intent detection node
  - `searching_examples` during vector search
  - `examples_found` after search completes
  - `generating_component` when AI generation starts
  - `complete` with final result
  - `error` if any step fails

#### FR-B3: Heartbeat Implementation
- **Priority**: P1 (Should Have)
- **Description**: Send periodic heartbeats to prevent timeout
- **Acceptance Criteria**:
  - Heartbeat every 20 seconds
  - Contains timestamp
  - Doesn't interrupt other events

#### FR-B4: Error Handling
- **Priority**: P0 (Must Have)
- **Description**: Handle and communicate errors gracefully
- **Acceptance Criteria**:
  - Catches all errors in workflow
  - Emits error event with details
  - Closes connection cleanly
  - Logs errors for debugging

### 4.2 Frontend Requirements

#### FR-F1: SSE Connection Hook
- **Priority**: P0 (Must Have)
- **Description**: Create React hook for SSE connection management
- **Acceptance Criteria**:
  - Establishes EventSource connection
  - Parses incoming events
  - Updates state progressively
  - Cleans up on unmount
  - Handles reconnection on failure

#### FR-F2: Progress Display
- **Priority**: P0 (Must Have)
- **Description**: Show current workflow step to user
- **Acceptance Criteria**:
  - Displays step name and icon
  - Shows progress indicator
  - Updates in real-time
  - Graceful transitions between steps

#### FR-F3: Error Display
- **Priority**: P0 (Must Have)
- **Description**: Show clear error messages
- **Acceptance Criteria**:
  - Identifies which step failed
  - Shows user-friendly error message
  - Provides retry option
  - Logs technical details to console

#### FR-F4: Backward Compatibility
- **Priority**: P1 (Should Have)
- **Description**: Fallback to regular POST if SSE fails
- **Acceptance Criteria**:
  - Detects SSE support
  - Falls back to existing `/chat` endpoint
  - Maintains functionality without streaming
  - Logs fallback usage

---

## 5. Technical Requirements

### 5.1 Backend Technical Specs

#### TR-B1: Express SSE Implementation
- Use native Express response methods
- No external SSE libraries required
- Format: `event: {type}\ndata: {json}\n\n`

#### TR-B2: LangGraph Streaming API
- Use `.stream()` method on compiled graph
- Handle async iteration of events
- Emit events without blocking workflow

#### TR-B3: Connection Timeout
- 60-second timeout for inactive connections
- Clean up resources on timeout
- Log timeout events

### 5.2 Frontend Technical Specs

#### TR-F1: EventSource API
- Use native EventSource for SSE
- Add custom event listeners for each type
- Handle `onopen`, `onmessage`, `onerror`

#### TR-F2: State Management
- Use React hooks (useState, useEffect)
- Store connection reference for cleanup
- Update state immutably

#### TR-F3: Browser Support
- Target: Chrome 95+, Firefox 90+, Safari 14+, Edge 95+
- EventSource API is widely supported
- Graceful degradation for unsupported browsers

---

## 6. User Experience

### 6.1 User Flow

#### Before (Current):
1. User types message and clicks send
2. Input disabled, shows "Imperial Intelligence is thinking..."
3. User waits 5-15 seconds with no feedback
4. Result appears suddenly

#### After (With SSE):
1. User types message and clicks send
2. Input disabled, progress indicator appears
3. User sees: "🔍 Analyzing your request..."
4. User sees: "📦 Finding similar components..."
5. User sees: "🎨 Creating your component..."
6. User sees: "✅ Complete!"
7. Result appears with smooth transition

### 6.2 Visual Design

#### Progress Indicator Options:
1. **Toast Notifications** (Recommended): Non-blocking, corner of screen
2. **Inline Status**: Below input field
3. **Modal Overlay**: Full attention on progress

#### Progress Steps Display:
```
🔍 Analyzing your request       ✓
📦 Finding similar components   ✓
🎨 Creating your component      ⏳ (current)
✅ Finalizing                    ⋯
```

---

## 7. Implementation Plan

### 7.1 Phase 1: Backend SSE Infrastructure (Week 1)
- [ ] Create `/chat/stream` endpoint
- [ ] Implement SSE response headers
- [ ] Add event emission utilities
- [ ] Test with mock events

### 7.2 Phase 2: LangGraph Integration (Week 1-2)
- [ ] Modify chat.service to use streaming
- [ ] Add event emission to each node
- [ ] Implement heartbeat mechanism
- [ ] Add error event handling

### 7.3 Phase 3: Frontend Hook (Week 2)
- [ ] Create `useChatStream` hook
- [ ] Implement EventSource connection
- [ ] Add event parsing and state management
- [ ] Test with backend integration

### 7.4 Phase 4: UI Components (Week 2-3)
- [ ] Design progress indicator component
- [ ] Implement step-by-step display
- [ ] Add animations and transitions
- [ ] Integrate with CreateView

### 7.5 Phase 5: Testing & Polish (Week 3)
- [ ] Integration testing
- [ ] Error scenario testing
- [ ] Performance testing
- [ ] Browser compatibility testing
- [ ] User acceptance testing

### 7.6 Phase 6: Deployment & Monitoring (Week 4)
- [ ] Deploy to staging
- [ ] Monitor SSE connection metrics
- [ ] A/B test user experience
- [ ] Production rollout

---

## 8. Risks and Mitigations

### 8.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| SSE connection drops | High | Medium | Implement auto-reconnection |
| Authentication issues | High | Low | Use cookie-based auth |
| Browser incompatibility | Medium | Low | Fallback to regular POST |
| Rate limit during streaming | High | Medium | Existing fallback models handle this |
| Memory leaks from connections | Medium | Medium | Proper cleanup and timeout |

### 8.2 UX Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Progress updates feel slow | Medium | Low | Optimize messaging, add animations |
| Too many notifications | Low | Medium | Consolidate similar events |
| Confusing technical terms | Medium | High | Use user-friendly language |

---

## 9. Success Criteria

### 9.1 Technical Success
- ✅ SSE endpoint responds correctly
- ✅ All workflow events are emitted
- ✅ No memory leaks or connection issues
- ✅ Error handling covers all scenarios
- ✅ 99.9% uptime for SSE connections

### 9.2 User Success
- ✅ Users see progress updates within 200ms
- ✅ Clear indication of current step
- ✅ Smooth transitions between steps
- ✅ Error messages are actionable
- ✅ No perceived performance degradation

### 9.3 Business Success
- ✅ Reduced support tickets about "frozen" chat
- ✅ Increased chat usage (5%+ growth)
- ✅ Positive user feedback
- ✅ Lower abandonment rate during processing

---

## 10. Future Enhancements (V2)

### 10.1 Cancellation Support
- Allow users to cancel long-running requests
- Backend cleans up resources on cancellation
- Refund API credits if applicable

### 10.2 Progress Percentage
- Estimate total time based on history
- Show progress bar with percentage
- ETA display

### 10.3 Detailed Logs
- Expand each step to show sub-tasks
- Show API calls and responses
- Developer mode for debugging

### 10.4 WebSocket Upgrade
- Bidirectional communication
- Real-time collaboration features
- Chat room support

---

## 11. Appendices

### 11.1 SSE Event Format Example
```
event: intent_detected
data: {"intent":"CREATE","reasoning":"User requested new component"}

event: searching_examples
data: {"query":"pricing card"}

event: complete
data: {"component":"<div>...</div>","name":"PricingCard","message":"Here's your component","chatId":"abc123"}
```

### 11.2 References
- [MDN: Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [LangGraph Streaming Documentation](https://langchain-ai.github.io/langgraph/how-tos/stream-values/)
- [EventSource API Specification](https://html.spec.whatwg.org/multipage/server-sent-events.html)

---

## 12. Approval and Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | - | - | - |
| Tech Lead | - | - | - |
| UX Designer | - | - | - |
| QA Lead | - | - | - |

---

**END OF DOCUMENT**


