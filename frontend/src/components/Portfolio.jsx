// src/components/Portfolio.jsx
import { useState } from 'react';

const CATEGORIES = ['All', 'Best Projects', 'Arduino', 'ESP Series', 'Software'];

const PROJECTS = [
  {
    title: 'Automated Railway Level Crossing System',
    desc: 'Automated railway crossing with IR sensors, servos, and a state machine for fast-moving toy trains.',
    tags: ['Arduino', 'IR Sensor', 'Servo', 'State Machine'],
    color: 'from-blue-900 to-indigo-800',
    icon: '🚂',
    image: '/projects/railway.png',
    categories: ['Arduino', 'Best Projects'],
    longDesc: 'An automated railway level crossing system designed for high-speed toy trains. It uses a state machine to manage two IR sensors (Entry and Exit) and two Servo motors acting as gates. The system instantly closes the gates when an incoming train is detected and employs a non-blocking while loop trap to keep the gates closed until the exact millisecond the tail of the train clears the crossing, ensuring perfect timing without relying on delay().',
    hardware: ['Arduino Uno', '1x Entry IR Sensor', '1x Exit IR Sensor', '2x Servo Motors', 'Breadboard Power Distribution'],
    software: ['C++ (Arduino IDE)'],
    features: ['Non-blocking while loop sensor polling', 'Instantaneous gate actuation', 'Servo noise-cancellation delays', 'State machine logic']
  },
  { 
    title: 'Real-Time Face Recognition', 
    desc: 'Live webcam attendance system with face encoding, liveness detection, and CSV export. Runs on Raspberry Pi 4.', 
    tags: ['Python', 'OpenCV', 'DeepFace', 'RPi'], 
    color: 'from-red-900 to-red-700', 
    icon: '👁', 
    image: '/projects/face.png',
    categories: ['Best Projects', 'Software'],
    longDesc: 'A comprehensive attendance and security system that utilizes deep learning to identify individuals in real-time. The system captures live video feeds, extracts facial encodings, and compares them against a known database using the DeepFace library. It includes an anti-spoofing liveness detection module to prevent bypasses using photos. Attendance logs are automatically generated and exported as CSV files for easy integration into existing HR systems.',
    hardware: ['Raspberry Pi 4 Model B (4GB RAM)', '1080p USB Web Camera', 'Active Cooling Fan', '5V/3A Power Supply'],
    software: ['Python 3.9', 'OpenCV', 'DeepFace', 'NumPy', 'Pandas'],
    features: ['Real-time 30fps face detection', 'Liveness detection to prevent photo-spoofing', 'Automated CSV logging', 'Headless operation capability']
  },
  { 
    title: 'Smart Energy Monitor', 
    desc: 'Non-invasive clamp sensor streams household current data via MQTT to a React dashboard with cost estimation.', 
    tags: ['ESP32', 'MQTT', 'React', 'Node.js'], 
    color: 'from-zinc-800 to-zinc-600', 
    icon: '⚡', 
    image: '/projects/energy.png',
    categories: ['ESP Series'],
    longDesc: 'An IoT solution designed to track household electricity consumption without modifying existing wiring. A non-invasive CT (Current Transformer) clamp measures the current drawn from the main breaker panel. This data is processed by an ESP32 microcontroller, which calculates power usage and streams the readings via MQTT protocol to a backend server. A React-based frontend dashboard visualizes the data in real-time, providing historical usage graphs and estimating monthly electricity costs based on configurable utility rates.',
    hardware: ['ESP32 Development Board', 'SCT-013 Non-invasive CT Sensor', 'Burden Resistor Circuit', '5V Power Adapter'],
    software: ['C++ (Arduino IDE)', 'MQTT (Mosquitto)', 'Node.js/Express', 'React', 'Chart.js', 'Tailwind CSS'],
    features: ['Non-invasive, safe installation', 'Real-time telemetry streaming over WiFi', 'Dynamic cost estimation', 'Historical data visualization']
  },
  { 
    title: 'Digital Logic Simulator', 
    desc: 'Browser-based drag-and-drop logic gate simulator with truth table generation for combinational and sequential circuits.', 
    tags: ['React', 'TypeScript', 'Canvas API'], 
    color: 'from-red-800 to-rose-700', 
    icon: '🔲', 
    image: '/projects/logic.png',
    categories: ['Software'],
    longDesc: 'A powerful educational tool built entirely in the browser to help students and engineers design and simulate digital circuits. Users can drag and drop basic logic gates (AND, OR, NOT, XOR), flip-flops, and input/output nodes onto an infinite canvas. Wires can be drawn to connect nodes, and the simulation engine evaluates the circuit state dynamically. It supports both combinational and sequential logic, and can automatically generate truth tables for designed circuits.',
    hardware: ['N/A (Web-based Software)'],
    software: ['React', 'TypeScript', 'HTML5 Canvas API', 'Vite'],
    features: ['Interactive drag-and-drop circuit building', 'Real-time logic simulation engine', 'Automated truth table generation', 'Save and load circuit designs']
  },
  { 
    title: 'RTOS Task Scheduler', 
    desc: 'FreeRTOS on STM32 demonstrating preemptive multitasking, semaphores, and inter-task communication via queues.', 
    tags: ['FreeRTOS', 'STM32', 'C', 'Keil'], 
    color: 'from-zinc-700 to-zinc-500', 
    icon: '🔧', 
    image: '/projects/rtos.png',
    categories: ['Software'],
    longDesc: 'A bare-metal embedded systems project showcasing the power of real-time operating systems. Deployed on an STM32 ARM Cortex-M4 microcontroller, this project configures FreeRTOS to manage multiple concurrent tasks. It demonstrates critical RTOS concepts such as preemptive multitasking, priority inversion handling, hardware interrupt management, and safe inter-task communication using queues and binary semaphores to coordinate sensor reading and data processing tasks.',
    hardware: ['STM32F4-Discovery Board (ARM Cortex-M4)', 'ST-LINK/V2 Debugger', 'Logic Analyzer (for timing verification)'],
    software: ['C Language', 'FreeRTOS', 'Keil uVision IDE', 'STM32 HAL Libraries'],
    features: ['Preemptive multitasking with priority scheduling', 'Queue-based inter-task data passing', 'Semaphore synchronization', 'Interrupt Service Routine (ISR) integration']
  },
  {
    title: 'Multimodal Medical AI (MediScan)',
    desc: 'A comprehensive diagnostic tool featuring Chest, Eye, and Skin analysis modules with real-time webcam integration.',
    tags: ['Python', 'Streamlit', 'ML', 'WebRTC'],
    color: 'from-red-900 to-red-600',
    icon: '🩺',
    image: '/projects/mediscan.png',
    categories: ['Best Projects', 'Software'],
    longDesc: 'MediScan is an advanced multimodal AI diagnostic platform built with Streamlit. It integrates multiple specialized machine learning models to analyze medical imagery. It includes a chest X-ray classifier, a retinal scan analyzer for eye diseases, and a real-time skin lesion analysis module. The skin module leverages the browser\'s MediaDevices API to capture live webcam feeds, allowing users to scan lesions directly without uploading files.',
    hardware: ['Standard PC/Laptop', 'High-Definition Webcam'],
    software: ['Python 3', 'Streamlit', 'TensorFlow/PyTorch', 'OpenCV', 'JavaScript (WebRTC)'],
    features: ['Multi-disease diagnostic models', 'Live webcam image capture', 'Interactive web-based UI', 'Secure local processing']
  },
  {
    title: 'Real-Time ECG Monitor',
    desc: 'Web-based ECG monitoring module utilizing the Web Serial API to interface with a MAX30102 sensor.',
    tags: ['HTML5', 'JS', 'Web Serial', 'MAX30102'],
    color: 'from-zinc-800 to-zinc-600',
    icon: '🫀',
    image: '/projects/ecg.png',
    categories: ['Arduino'],
    longDesc: 'This project bridges the gap between web applications and embedded medical hardware. By leveraging the experimental Web Serial API, this standalone module connects directly to an Arduino-powered MAX30102 pulse oximeter and heart-rate sensor over USB. It reads the serial data stream, parses the PPG signals, and renders a live, smooth ECG heartbeat graph on an HTML5 Canvas, all without a backend server.',
    hardware: ['MAX30102 Pulse Oximeter Sensor', 'Arduino Uno/Nano', 'USB Serial Cable'],
    software: ['Vanilla JavaScript', 'HTML5 Canvas', 'Web Serial API', 'C++ (Arduino Firmware)'],
    features: ['Direct browser-to-hardware communication', 'Live PPG signal plotting', 'Zero-latency frontend rendering', 'Zero-backend architecture']
  },
  {
    title: 'V2V Communication System',
    desc: 'A robust Vehicle-to-Vehicle networking framework written in C++ and built with CMake.',
    tags: ['C++', 'CMake', 'Networking', 'V2V'],
    color: 'from-red-800 to-zinc-700',
    icon: '🚗',
    image: '/projects/v2v.png',
    categories: ['Software'],
    longDesc: 'A low-latency, high-reliability Vehicle-to-Vehicle (V2V) communication simulation framework. Built in modern C++, this system models how autonomous vehicles exchange telemetry data (speed, heading, braking status) over ad-hoc networks to prevent collisions and optimize traffic flow. The project uses CMake for robust cross-platform building and dependency management, simulating packet loss and varying network conditions.',
    hardware: ['x86/ARM Compute Nodes', 'Ad-hoc WiFi transceivers (simulated)'],
    software: ['C++17', 'CMake', 'POSIX Sockets', 'Google Test'],
    features: ['UDP-based low latency messaging', 'Simulated network degradation', 'Cross-platform CMake build', 'Real-time telemetry exchange']
  },
  {
    title: 'Autonomous Drone Simulator',
    desc: 'Web-based 3D simulation of drone delivery swarms operating in a smart city environment.',
    tags: ['Three.js', 'WebGL', 'React', 'Node.js'],
    color: 'from-orange-900 to-red-800',
    icon: '🚁',
    image: '/projects/drone.png',
    categories: ['Best Projects', 'Software'],
    longDesc: 'A high-performance 3D visualization and simulation tool built entirely in the browser. Using Three.js and WebGL, this platform simulates the physics and pathfinding of a fleet of autonomous delivery drones navigating through a dynamically generated 3D cityscape. The backend Node.js server coordinates the swarm using A* search algorithms to avoid collisions and optimize delivery routes in real-time.',
    hardware: ['Nvidia GPU (for simulation)', 'Cloud Compute Node'],
    software: ['Three.js', 'React', 'Node.js', 'WebSocket'],
    features: ['Real-time 3D rendering', 'Swarm intelligence pathfinding', 'Live WebSocket telemetry', 'Physics-based collision avoidance']
  },
  {
    title: 'AI-Powered Code Reviewer',
    desc: 'A VS Code extension leveraging local LLMs to perform static analysis and security vulnerability scanning.',
    tags: ['TypeScript', 'LLM', 'VS Code', 'Python'],
    color: 'from-red-950 to-zinc-800',
    icon: '🤖',
    image: '/projects/ai_code.png',
    categories: ['Software'],
    longDesc: 'An enterprise-grade developer tool designed to shift security left. This project is a Visual Studio Code extension that acts as an AI pair programmer and security auditor. Instead of sending proprietary code to the cloud, it interfaces with a locally hosted Large Language Model (LLM) via a Python backend. It highlights potential memory leaks, SQL injection vulnerabilities, and suggests optimized refactoring directly within the editor interface.',
    hardware: ['Local Machine with minimum 16GB RAM', 'Optional GPU for LLM inference'],
    software: ['TypeScript (Extension API)', 'Python (FastAPI)', 'HuggingFace Transformers', 'Ollama'],
    features: ['Offline, secure AI code analysis', 'Inline IDE vulnerability highlighting', 'Automated PR review generation', 'Custom fine-tuned rule sets']
  },
  {
    title: 'Decentralized Voting DApp',
    desc: 'A secure, transparent, and tamper-proof voting application built on the Ethereum blockchain.',
    tags: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    color: 'from-zinc-800 to-red-900',
    icon: '⛓️',
    image: '/projects/voting.png',
    categories: ['Software'],
    longDesc: 'A Web3 application tackling the problem of secure digital elections. This DApp utilizes Ethereum smart contracts written in Solidity to manage the entire lifecycle of an election—from candidate registration to vote tallying. Because the logic and state are stored immutably on the blockchain, the voting process is completely transparent and tamper-proof. The React frontend interacts with the blockchain via Web3.js and MetaMask for secure user authentication.',
    hardware: ['Ethereum Node (Infura/Alchemy)', 'Standard PC/Mobile'],
    software: ['Solidity', 'Hardhat', 'React', 'Ethers.js / Web3.js'],
    features: ['Immutable smart contract logic', 'MetaMask wallet integration', 'Cryptographic vote verification', 'Real-time decentralized tallying']
  },
  {
    title: 'Smart Plant Monitoring System',
    desc: 'Automated soil moisture tracking with real-time buzzer and LED alerts for optimal plant care.',
    tags: ['Arduino', 'IoT', 'Sensors'],
    color: 'from-green-900 to-green-700',
    icon: '🌱',
    image: '/projects/smart_plant.png',
    categories: ['Arduino'],
    longDesc: 'A comprehensive plant care system that ensures your greenery never goes thirsty. By embedding an analog soil moisture sensor into the dirt, the Arduino microcontroller continuously reads the hydration levels. When the moisture drops below a predefined threshold, it triggers a visual LED alert and an audible buzzer, notifying the user that it is time to water the plant. It\'s a perfect blend of biology and embedded systems.',
    hardware: ['Arduino Uno', 'Soil Moisture Sensor (YL-69)', 'LEDs & Piezo Buzzer'],
    software: ['C++ (Arduino IDE)'],
    features: ['Real-time moisture tracking', 'Configurable dryness thresholds', 'Audio-visual alerts']
  },
  {
    title: 'Ultrasonic Distance Meter',
    desc: 'A digital ruler using an HC-SR04 ultrasonic sensor and an LCD display to measure distances accurately.',
    tags: ['Arduino', 'HC-SR04', 'LCD'],
    color: 'from-blue-900 to-blue-700',
    icon: '📏',
    image: '/projects/ultrasonic_meter.png',
    categories: ['Arduino'],
    longDesc: 'A high-tech replacement for a standard tape measure. This device utilizes an HC-SR04 ultrasonic sensor to emit high-frequency sound waves and calculate the time it takes for the echo to return. The Arduino processes this timing data into accurate distance measurements (in centimeters and inches) and displays the results in real-time on a backlit 16x2 I2C LCD screen.',
    hardware: ['Arduino Nano', 'HC-SR04 Ultrasonic Sensor', '16x2 I2C LCD Display'],
    software: ['C++ (Arduino IDE)', 'Wire Library', 'LiquidCrystal_I2C'],
    features: ['High-precision distance calculation', 'Real-time LCD rendering', 'Compact digital ruler design']
  },
  {
    title: 'Automatic Room Light Controller',
    desc: 'Smart home automation using PIR motion sensors to automatically toggle room lighting via relays.',
    tags: ['Arduino', 'PIR', 'Relay', 'Smart Home'],
    color: 'from-yellow-900 to-orange-800',
    icon: '💡',
    image: '/projects/auto_light.png',
    categories: ['Arduino', 'Best Projects'],
    longDesc: 'An energy-saving smart home module that completely automates room lighting. A passive infrared (PIR) sensor monitors the room for human motion. When a presence is detected, the microcontroller signals a 5V relay module to close the high-voltage circuit, turning the lights on instantly. The system includes a configurable timeout feature that automatically turns the lights off after a period of inactivity, drastically reducing electricity waste.',
    hardware: ['Arduino Uno', 'PIR Motion Sensor (HC-SR501)', '5V Relay Module', 'AC Light Bulb'],
    software: ['C++ (Arduino IDE)'],
    features: ['Automated motion detection', 'High-voltage relay control', 'Configurable timeout logic']
  },
  {
    title: 'RFID-Based Attendance System',
    desc: 'Secure access and attendance logging system utilizing an MFRC522 RFID scanner and smart cards.',
    tags: ['ESP8266', 'RFID', 'Database', 'Security'],
    color: 'from-indigo-900 to-purple-800',
    icon: '🪪',
    image: '/projects/rfid_attendance.png',
    categories: ['ESP Series', 'Software'],
    longDesc: 'A robust digital attendance and access control system. Users tap their unique 13.56MHz RFID tags or cards against an MFRC522 reader. The ESP8266 NodeMCU processes the UID, verifies it against a permitted list, and logs the precise entry time to a cloud database (or local SD card). This project acts as a fundamental building block for corporate security and school attendance tracking.',
    hardware: ['ESP8266 NodeMCU', 'MFRC522 RFID Module', 'RFID Tags/Cards', 'Active Buzzer'],
    software: ['C++ (Arduino IDE)', 'SPI Library', 'MFRC522 Library', 'Firebase/MySQL'],
    features: ['Unique ID scanning and verification', 'Real-time database logging', 'Access granted/denied feedback']
  },
  {
    title: 'Weather Station with IoT',
    desc: 'Cloud-connected environmental monitor logging temperature and humidity data to ThingSpeak.',
    tags: ['ESP32', 'DHT11', 'IoT', 'ThingSpeak'],
    color: 'from-cyan-900 to-blue-800',
    icon: '🌤️',
    image: '/projects/weather_station.png',
    categories: ['ESP Series', 'Best Projects'],
    longDesc: 'A complete end-to-end Internet of Things (IoT) weather station. The ESP32 reads ambient temperature and humidity data from a DHT11 sensor every few minutes. It then connects to the local Wi-Fi network and publishes this telemetry data to the ThingSpeak cloud platform via HTTP/MQTT. Users can view beautiful, real-time historical graphs of their local climate from anywhere in the world on a web or mobile dashboard.',
    hardware: ['ESP32 Development Board', 'DHT11 Temp/Humidity Sensor', 'OLED Display (Optional)'],
    software: ['C++ (Arduino IDE)', 'DHT Sensor Library', 'ThingSpeak API / Blynk'],
    features: ['Live cloud telemetry streaming', 'Wi-Fi connectivity', 'Historical weather data visualization']
  },
  {
    title: 'Bluetooth Controlled RC Car',
    desc: 'A custom-built robotic car steered remotely via a smartphone app and an HC-05 Bluetooth module.',
    tags: ['Arduino', 'Bluetooth', 'Robotics', 'L298N'],
    color: 'from-red-900 to-red-800',
    icon: '🏎️',
    image: '/projects/rc_car.png',
    categories: ['Arduino', 'Best Projects'],
    longDesc: 'A dynamic robotics project bridging hardware and mobile software. This mobile robot uses an L298N motor driver to control two powerful DC motors. An HC-05 Bluetooth module acts as the wireless communication bridge, receiving steering commands (forward, backward, left, right) from a custom Android smartphone application. The Arduino parses these serial commands and adjusts motor speeds and directions accordingly.',
    hardware: ['Arduino Uno', 'HC-05 Bluetooth Module', 'L298N Motor Driver', '2WD Robot Chassis'],
    software: ['C++ (Arduino IDE)', 'SoftwareSerial', 'MIT App Inventor (Android App)'],
    features: ['Wireless Bluetooth control', 'Differential drive steering', 'Custom smartphone interface']
  },
  {
    title: 'Handheld Resistor Calculator',
    desc: 'A portable digital ohmmeter and color-code calculator powered by an Arduino Nano and an OLED screen.',
    tags: ['Arduino', 'OLED', 'Electronics'],
    color: 'from-zinc-800 to-zinc-700',
    icon: '🧮',
    image: '/projects/resistor_calc.png',
    categories: ['Arduino'],
    longDesc: 'A highly practical tool for electronics hobbyists. This pocket-sized device serves a dual purpose: users can either input a resistor\'s color bands via pushbuttons to calculate its theoretical value on the crisp OLED display, or they can insert the resistor directly into the built-in voltage divider circuit to measure its actual resistance (acting as a digital Ohmmeter).',
    hardware: ['Arduino Nano', '0.96" I2C OLED Display', 'Pushbuttons', 'Precision Resistors'],
    software: ['C++ (Arduino IDE)', 'Adafruit SSD1306', 'Adafruit GFX'],
    features: ['Digital Ohmmeter functionality', 'Interactive color-code calculator', 'Portable, battery-powered design']
  },
  {
    title: 'Self-Balancing Solar Tracker',
    desc: 'An automated solar panel mount that follows the sun using Light Dependent Resistors and servos.',
    tags: ['Arduino', 'Servo', 'LDR', 'Green Tech'],
    color: 'from-yellow-900 to-yellow-600',
    icon: '☀️',
    image: '/projects/energy.png',
    categories: ['Arduino', 'Best Projects'],
    longDesc: 'An advanced green engineering project designed to maximize solar energy harvesting. The system uses a pair of Light Dependent Resistors (LDRs) separated by a shadow-casting divider. When the sun moves, one LDR receives more light than the other. The Arduino reads this differential and commands a servo motor to tilt the solar panel towards the brightest light source, ensuring optimal perpendicular alignment throughout the day.',
    hardware: ['Arduino Uno', '2x LDRs', 'Standard Servo Motor', 'Miniature Solar Panel'],
    software: ['C++ (Arduino IDE)', 'Servo Library'],
    features: ['Dynamic light tracking algorithm', 'Increased solar efficiency', 'Automated servo positioning']
  },
  {
    title: 'Gesture-Controlled Robotic Arm',
    desc: 'A robotic arm that mimics human hand movements using an MPU6050 accelerometer and flex sensors.',
    tags: ['ESP32', 'Robotics', 'MPU6050', 'Servos'],
    color: 'from-red-950 to-red-800',
    icon: '🦾',
    image: '/projects/rc_car.png',
    categories: ['ESP Series', 'Best Projects'],
    longDesc: 'A highly interactive robotics project translating human gestures into mechanical motion. The user wears a sensory glove equipped with an MPU6050 accelerometer/gyroscope and flex sensors. As the user tilts their hand or bends their fingers, the ESP32 wirelessly transmits these spatial coordinates to a receiver module. The receiver then maps this data to multiple servo motors, making the 3D-printed robotic arm mimic the exact gestures in real-time.',
    hardware: ['2x ESP32 Boards', 'MPU6050 IMU', 'Flex Sensors', '4x Servo Motors', '3D Printed Arm'],
    software: ['C++ (Arduino IDE)', 'ESP-NOW Protocol', 'Wire Library'],
    features: ['Wireless ESP-NOW communication', '6-DoF gesture tracking', 'Real-time animatronic mapping']
  },
  {
    title: 'Smart Energy Meter (ACS712)',
    desc: 'Real-time power consumption monitor using an ACS712 current sensor and a web dashboard.',
    tags: ['ESP8266', 'ACS712', 'IoT', 'Energy'],
    color: 'from-zinc-900 to-zinc-700',
    icon: '🔌',
    image: '/projects/energy.png',
    categories: ['ESP Series'],
    longDesc: 'An inline energy monitoring solution that tracks the power usage of specific appliances. By splicing an ACS712 Hall-effect current sensor into an extension cord, the ESP8266 microcontroller can accurately measure AC current draw. It calculates the instantaneous power (Watts) and total energy consumed (kWh), uploading this data to a custom web dashboard that estimates the financial cost of operating the appliance.',
    hardware: ['ESP8266 NodeMCU', 'ACS712 Current Sensor (20A)', 'OLED Display (Optional)'],
    software: ['C++ (Arduino IDE)', 'WebSockets', 'Chart.js (Dashboard)'],
    features: ['Inline AC current measurement', 'Real-time Wattage and kWh calculation', 'Financial cost estimation dashboard']
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('Best Projects');

  const filteredProjects = activeTab === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.categories.includes(activeTab));

  return (
    <section id="portfolio" className="bg-zinc-950 py-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Past Builds</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Project Showcase</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-8">A selection of completed projects across embedded systems, IoT, and high-performance software. Every build is custom.</p>
          
          {/* Tab Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === category 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' 
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <div 
              key={p.title} 
              onClick={() => setSelectedProject(p)}
              className="group bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-red-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30 cursor-pointer"
            >
              <div className="h-44 relative overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors duration-200">{p.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-red-950/40 border border-red-900/40 text-red-400 text-xs rounded font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center text-zinc-500 py-12 font-mono">No projects found in this category.</div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div 
            className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-red-900 text-white rounded-full p-2 transition-colors z-10"
              onClick={() => setSelectedProject(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-red-950/80 border border-red-900/40 text-red-400 text-xs rounded font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h4 className="text-red-500 font-bold uppercase tracking-wider text-sm mb-3">Project Overview</h4>
                <p className="text-zinc-300 leading-relaxed">{selectedProject.longDesc}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <span className="text-red-500">⚙️</span> Hardware Specs
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.hardware.map((item, idx) => (
                      <li key={idx} className="text-zinc-400 text-sm flex items-start gap-2">
                        <span className="text-red-800 mt-1">▹</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <span className="text-red-500">💻</span> Software Stack
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.software.map((item, idx) => (
                      <li key={idx} className="text-zinc-400 text-sm flex items-start gap-2">
                        <span className="text-red-800 mt-1">▹</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-3">Key Features</h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="bg-zinc-800/50 p-3 rounded border border-zinc-800/50 text-zinc-300 text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
