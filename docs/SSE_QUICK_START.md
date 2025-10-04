# SSE Quick Start Guide

## 🚀 Quick Start - Testing Your Implementation

### Prerequisites
- Backend server running on `http://localhost:YOUR_PORT`
- Frontend server running on `http://localhost:5173` (or your Vite port)
- Valid authentication token

---

## 1️⃣ Start the Servers

### Backend
```bash
cd backend
yarn dev
```

### Frontend
```bash
cd shell
pnpm dev
```

---

## 2️⃣ Test SSE Endpoint (Optional - CLI Testing)

### Using curl (Terminal)
```bash
curl -N -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"userMessage":"create a blue button"}' \
     http://localhost:YOUR_PORT/chat/stream
```

You should see output like:
```
: SSE connection established

event: started
data: {"chatId":"abc123"}

event: intent_detected
data: {"intent":"CREATE","reasoning":"User wants new component"}

event: searching_examples
data: {"query":"create a blue button","mode":"CREATE"}

event: examples_found
data: {"count":10,"cached":false}

event: generating_component
data: {"mode":"CREATE"}

event: complete
data: {"component":"<button>...</button>","name":"BlueButton","message":"Here's your button","chatId":"abc123"}
```

---

## 3️⃣ Test in Browser (Recommended)

### Step 1: Open Browser
Navigate to your frontend URL (usually `http://localhost:5173`)

### Step 2: Login
Login with valid credentials to get authenticated

### Step 3: Send a Message
1. Type a message in the chat: "create a pricing card"
2. Press Send

### Step 4: Watch Progress
You should see progress updates appear below the input:
- 🚀 Starting chat processing...
- 🔍 Understanding your request... (CREATE mode)
- 📦 Finding similar components...
- ✅ Examples found... (10 examples)
- 🎨 Creating your component...
- ✨ Complete!

### Step 5: Verify Result
- Component should render in the preview area
- AI response should appear in chat messages

---

## 4️⃣ Test Fallback Mechanism

### Simulate SSE Failure
1. Stop your backend server
2. Try sending a message
3. Frontend should automatically fall back to regular POST
4. Restart backend and try again

OR

### Force Fallback Mode
In `CreateView.tsx`, change line 29:
```typescript
const [useSSE, setUseSSE] = useState(false); // Set to false
```

Now it will always use regular POST endpoint.

---

## 5️⃣ Test Different Scenarios

### Test CREATE Mode
```
"create a login form"
"make a dashboard card"
"build a pricing table"
```

### Test EDIT Mode
1. Create a component first: "create a red button"
2. Then edit it: "make it blue"
3. Edit again: "add a shadow"

You should see `intent_detected` event with `"intent":"EDIT"`

---

## 🔍 Debugging Tips

### Backend Logs
Watch terminal for console logs:
```
--- 🔍 DETECTING USER INTENT ---
--- Intent Detected: CREATE ---
--- 🔍 FETCHING SIMILAR COMPONENTS ---
--- Found 10 similar components ---
--- 🎨 CREATE MODE: Generating new component ---
```

### Frontend Console
Open browser DevTools (F12) → Console tab:
```javascript
SSE Event: started {chatId: "abc123"}
SSE Event: intent_detected {intent: "CREATE", ...}
SSE Event: searching_examples {query: "...", mode: "CREATE"}
...
```

### Network Tab
1. Open DevTools → Network tab
2. Send a message
3. Look for `/chat/stream` request
4. Type should be `text/event-stream`
5. Click on it to see SSE events

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Authentication token not found"
**Solution**: Make sure you're logged in. Token is stored in axios instance.

### Issue 2: SSE connection fails immediately
**Solution**: 
- Check if backend is running
- Verify `/chat/stream` route is registered
- Check CORS settings if frontend/backend on different ports

### Issue 3: No progress updates showing
**Solution**:
- Check browser console for errors
- Verify `ProgressIndicator` component is imported
- Make sure `streamState.status` is 'streaming' or 'connecting'

### Issue 4: Events not parsing
**Solution**:
- Verify SSE format: `event: TYPE\ndata: {json}\n\n`
- Check backend is using `sendSSEEvent` function correctly
- Look for JSON parsing errors in console

### Issue 5: Connection timeout
**Solution**:
- Default timeout is 60 seconds
- If workflow takes longer, increase timeout in `sse.utils.ts`
- Check if heartbeat is working (every 20 seconds)

---

## 📊 Expected Timeline

Typical workflow takes **5-15 seconds**:

| Step | Time | % |
|------|------|---|
| Started | 0s | 10% |
| Intent Detection | 1-2s | 25% |
| Vector Search | 2-3s | 40% |
| Examples Found | 3-4s | 50% |
| Component Generation | 4-14s | 60-90% |
| Complete | 5-15s | 100% |

---

## ✅ Success Criteria

Your implementation is working correctly if:
- ✅ SSE connection establishes without errors
- ✅ Progress updates appear in real-time
- ✅ Each event type is received in order
- ✅ Progress bar animates smoothly
- ✅ Final component renders correctly
- ✅ Fallback to POST works if SSE fails
- ✅ No memory leaks (check in DevTools)
- ✅ Heartbeat events received every 20 seconds

---

## 🎯 Next Steps

After verifying basic functionality:

1. **Test Edge Cases**
   - Very long messages
   - Special characters in messages
   - Rapid successive messages
   - Network interruption mid-stream

2. **Performance Testing**
   - Multiple concurrent users
   - Long-running workflows (>30 seconds)
   - Memory usage over time

3. **Browser Compatibility**
   - Chrome (recommended)
   - Firefox
   - Safari
   - Edge

4. **Mobile Testing**
   - iOS Safari
   - Android Chrome

---

## 📞 Need Help?

If you encounter issues:

1. Check console logs (both frontend and backend)
2. Review network tab in DevTools
3. Verify authentication is working
4. Check if regular `/chat` endpoint works
5. Review `SSE_IMPLEMENTATION_SUMMARY.md` for details

---

**Happy Testing! 🎉**


