// src/components/Blog.jsx
// Blog / Tutorial section with static content for SEO and trust-building
import { useState } from 'react'

const POSTS = [
  {
    id: 1,
    title: 'How to Build an Automated Railway Crossing with Arduino',
    category: 'Arduino',
    date: 'Apr 28, 2026',
    readTime: '5 min read',
    excerpt: 'Learn the complete step-by-step process of building an automated railway level crossing system using IR sensors, servo motors, and an Arduino Uno. We cover the state machine logic, pin wiring, and common pitfalls.',
    content: `An automated railway level crossing is one of the most impressive embedded systems projects you can build for your engineering coursework. Here's a high-level breakdown of how we approach this build at JS Systems:

**Hardware You'll Need:**
• 1x Arduino Uno
• 2x IR Obstacle Sensors (Entry & Exit)
• 2x SG90 Servo Motors (as crossing gates)
• Breadboard + jumper wires for power distribution

**The Core Logic — State Machine:**
The system operates as a simple two-state machine:
1. **IDLE State** — Gates are open, monitoring the Entry IR sensor.
2. **ACTIVE State** — A train is detected; gates close, and the system monitors the Exit IR sensor.

When the Entry IR reads LOW (object detected), both servos rotate to the closed position. The system then watches the Exit IR sensor. Once the train tail clears (Exit IR reads HIGH), the gates re-open.

**Pro Tips:**
• Always use a breadboard to distribute 5V power — pulling too much current from the Arduino's 5V pin can cause brownouts.
• Use non-blocking delays with millis() instead of delay() to keep the system responsive.
• Add a small debounce window (50–100ms) on sensor readings to prevent false triggers from noise.

This project demonstrates real-time sensor processing, actuator control, and embedded state machines — all concepts that score well in viva examinations.`,
    tags: ['Arduino', 'Servo', 'IR Sensor', 'Embedded'],
  },
  {
    id: 2,
    title: 'Getting Started with ESP32: WiFi-Enabled IoT Projects',
    category: 'IoT',
    date: 'Apr 25, 2026',
    readTime: '4 min read',
    excerpt: 'The ESP32 is the go-to microcontroller for IoT projects. This guide covers everything from setting up the Arduino IDE for ESP32, connecting to WiFi, and sending sensor data to the cloud.',
    content: `The ESP32 has become the backbone of modern IoT projects in engineering colleges. With built-in WiFi and Bluetooth, it eliminates the need for separate communication modules.

**Setting Up:**
1. Install the ESP32 board package in Arduino IDE via Board Manager.
2. Select "ESP32 Dev Module" as your board.
3. Use a micro-USB cable for programming.

**Your First WiFi Connection:**
The WiFi.h library makes connectivity trivial:
• Call WiFi.begin(ssid, password) in setup()
• Wait for WiFi.status() == WL_CONNECTED
• You're online in under 5 seconds

**Sending Data to the Cloud:**
For student projects, we recommend ThingSpeak or Firebase:
• ThingSpeak — Free, simple HTTP API, great for sensor dashboards
• Firebase — Real-time database, perfect for mobile app integration

**Common Mistakes:**
• Not adding a delay between sensor reads — flooding the cloud API will get you rate-limited
• Using the wrong GPIO pins — some ESP32 pins are input-only during boot
• Forgetting to add a pull-down resistor on analog inputs

At JS Systems, we've built 10+ ESP32 projects including weather stations, smart home controllers, and health monitoring systems.`,
    tags: ['ESP32', 'WiFi', 'IoT', 'Cloud'],
  },
  {
    id: 3,
    title: 'Face Recognition with Python & OpenCV: A Complete Guide',
    category: 'Software',
    date: 'Apr 20, 2026',
    readTime: '6 min read',
    excerpt: 'Build a real-time face recognition system using Python, OpenCV, and the face_recognition library. Perfect for attendance systems, security projects, and final year submissions.',
    content: `Face recognition is one of the most requested software projects we build at JS Systems. Here's how we approach it:

**Tech Stack:**
• Python 3.10+
• OpenCV (cv2) for video capture and image processing
• face_recognition library (built on dlib's deep learning model)
• NumPy for array operations

**How It Works:**
1. **Capture** — OpenCV grabs frames from your webcam at 30fps
2. **Detect** — face_recognition.face_locations() finds all faces in the frame
3. **Encode** — Each face is converted to a 128-dimensional feature vector
4. **Compare** — The feature vector is compared against known face encodings using Euclidean distance
5. **Label** — If the distance is below 0.6 (the threshold), it's a match

**Performance Tips:**
• Process every other frame to double your speed
• Resize frames to 1/4 resolution for detection, then scale coordinates back up
• Use the "hog" model instead of "cnn" if you don't have a GPU

**Real-World Applications:**
• Automated attendance systems
• Door access control
• Exam proctoring

The entire system can run on a laptop with no GPU and still achieve 15+ FPS — more than enough for real-time use.`,
    tags: ['Python', 'OpenCV', 'AI', 'Face Recognition'],
  },
  {
    id: 4,
    title: '5 Tips to Score Maximum Marks on Your Engineering Project',
    category: 'Tips',
    date: 'Apr 15, 2026',
    readTime: '3 min read',
    excerpt: 'Your engineering project is worth a significant chunk of your grade. Here are 5 proven strategies to impress your panel and secure top marks during your viva and demonstration.',
    content: `After delivering 30+ projects to engineering students across multiple colleges, here's what consistently separates high-scoring projects from average ones:

**1. Documentation is 40% of Your Grade**
Most students underestimate this. A well-structured report with block diagrams, flowcharts, and circuit schematics shows depth of understanding. Use tools like Draw.io or Fritzing for professional diagrams.

**2. Live Demo > Slideshow**
Panels are far more impressed by a working demonstration than a PowerPoint presentation. Make sure your project works reliably — test it 10 times before the viva day. Carry backup batteries and cables.

**3. Know Your Code Inside Out**
Even if someone else helped build it, you MUST understand every line. Common viva questions:
• "Why did you use this library?"
• "What happens if this sensor fails?"
• "Explain this algorithm step by step."

**4. Add One "Wow" Feature**
Go beyond the basic requirements. If your project is a weather station, add a web dashboard. If it's face recognition, add email alerts. That one extra feature is what makes panels say "excellent."

**5. Present the Problem First**
Start your presentation with the real-world problem your project solves. Panels want to see that you understand WHY you built it, not just HOW.

At JS Systems, every project we deliver comes with complete documentation, code comments, and a viva preparation guide.`,
    tags: ['Tips', 'College', 'Viva', 'Grades'],
  },
]

const CATEGORIES = ['All', ...new Set(POSTS.map(p => p.category))]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedPost, setExpandedPost] = useState(null)

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory)

  return (
    <section id="blog" className="bg-zinc-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Learn & Explore</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Blog & Tutorials</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Tips, guides, and behind-the-scenes looks at the engineering projects we build.</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-red-600 border-red-600 text-white shadow-md'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(post => (
            <article
              key={post.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-lg overflow-hidden hover:border-red-900/50 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-0.5 bg-red-950/60 border border-red-900/40 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                    {post.category}
                  </span>
                  <span className="text-zinc-600 text-xs">{post.date}</span>
                  <span className="text-zinc-600 text-xs">·</span>
                  <span className="text-zinc-600 text-xs">{post.readTime}</span>
                </div>

                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-red-400 transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Expanded content */}
                {expandedPost === post.id && (
                  <div className="text-zinc-300 text-sm leading-relaxed mb-4 whitespace-pre-line border-t border-zinc-800 pt-4 mt-2">
                    {post.content}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-500 text-[10px] font-medium rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="text-red-500 hover:text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1 shrink-0 ml-3"
                  >
                    {expandedPost === post.id ? 'Show Less' : 'Read More'}
                    <svg className={`w-3 h-3 transition-transform duration-200 ${expandedPost === post.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
