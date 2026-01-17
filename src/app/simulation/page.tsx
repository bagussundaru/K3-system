'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
    Cpu,
    Heart,
    Activity,
    Wifi,
    Battery,
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    ArrowRight,
    Zap,
    Play,
    RotateCcw,
    Bell,
    Smartphone
} from 'lucide-react'

// Types
interface SensorData {
    heartRate: number
    spo2: number
    hrv: number // RMSSD in ms
    accelX: number
    accelY: number
    accelZ: number
    totalAccel: number
}

interface MQTTMessage {
    id: number
    type: 'DATA' | 'ALERT' | 'SOS'
    timestamp: string
    payload: string
}

// Utility functions
function calculateFatigueScore(hrv: number, heartRate: number): number {
    // Fatigue Score = (100 - HRV × 1.5) + (HR > 90 ? 20 : 0)
    let score = (100 - hrv * 1.5) + (heartRate > 90 ? 20 : 0)
    return Math.max(0, Math.min(100, score))
}

function getFatigueStatus(score: number): { label: string; color: string; bgColor: string } {
    if (score < 40) return { label: 'Segar', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' }
    if (score < 60) return { label: 'Normal', color: 'text-green-400', bgColor: 'bg-green-500/20' }
    if (score < 75) return { label: 'Perlu Perhatian', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' }
    return { label: 'CRITICAL', color: 'text-red-400', bgColor: 'bg-red-500/20' }
}

function detectFall(totalAccel: number, accelZ: number): boolean {
    // Fall detection: totalAccel > 15g OR Z-axis < 5g (not upright)
    return totalAccel > 15 || accelZ < 5
}

export default function SimulationPage() {
    // State
    const [isOnline, setIsOnline] = useState(true)
    const [activityLevel, setActivityLevel] = useState(30) // 0-100
    const [sensorData, setSensorData] = useState<SensorData>({
        heartRate: 75,
        spo2: 98,
        hrv: 55,
        accelX: 0.1,
        accelY: 0.2,
        accelZ: 9.8,
        totalAccel: 9.8
    })
    const [mqttMessages, setMqttMessages] = useState<MQTTMessage[]>([])
    const [isFallDetected, setIsFallDetected] = useState(false)
    const [isEmergency, setIsEmergency] = useState(false)
    const [isVibrating, setIsVibrating] = useState(false)
    const [messageCounter, setMessageCounter] = useState(0)

    // Calculate derived values
    const fatigueScore = calculateFatigueScore(sensorData.hrv, sensorData.heartRate)
    const fatigueStatus = getFatigueStatus(fatigueScore)

    // Add MQTT message
    const addMqttMessage = useCallback((type: 'DATA' | 'ALERT' | 'SOS', payload: string) => {
        const now = new Date()
        const timestamp = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setMessageCounter(prev => prev + 1)
        setMqttMessages(prev => [{
            id: messageCounter,
            type,
            timestamp,
            payload
        }, ...prev.slice(0, 9)])
    }, [messageCounter])

    // Simulate sensor reading updates based on activity level
    useEffect(() => {
        if (!isOnline || isEmergency) return

        const interval = setInterval(() => {
            setSensorData(prev => {
                // Heart rate varies with activity (60-120 bpm)
                const baseHR = 60 + (activityLevel * 0.6)
                const hrVariation = (Math.random() - 0.5) * 10
                const newHR = Math.round(Math.max(55, Math.min(130, baseHR + hrVariation)))

                // HRV inversely related to activity/fatigue (20-80ms)
                const baseHRV = 80 - (activityLevel * 0.5)
                const hrvVariation = (Math.random() - 0.5) * 10
                const newHRV = Math.round(Math.max(15, Math.min(85, baseHRV + hrvVariation)))

                // SpO2 mostly stable (94-99%)
                const newSpO2 = Math.round(96 + (Math.random() - 0.5) * 4)

                // Accelerometer normal state (gravity ~9.8g on Z)
                const newAccelX = parseFloat((0.1 + (Math.random() - 0.5) * 0.3).toFixed(1))
                const newAccelY = parseFloat((0.2 + (Math.random() - 0.5) * 0.3).toFixed(1))
                const newAccelZ = parseFloat((9.8 + (Math.random() - 0.5) * 0.3).toFixed(1))
                const newTotalAccel = parseFloat(Math.sqrt(newAccelX ** 2 + newAccelY ** 2 + newAccelZ ** 2).toFixed(1))

                return {
                    heartRate: newHR,
                    spo2: newSpO2,
                    hrv: newHRV,
                    accelX: newAccelX,
                    accelY: newAccelY,
                    accelZ: newAccelZ,
                    totalAccel: newTotalAccel
                }
            })
        }, 2000)

        return () => clearInterval(interval)
    }, [isOnline, activityLevel, isEmergency])

    // Periodic MQTT data publish
    useEffect(() => {
        if (!isOnline) return

        const interval = setInterval(() => {
            addMqttMessage('DATA', `{"hr":${sensorData.heartRate},"hrv":${sensorData.hrv},"acc":${sensorData.totalAccel.toFixed(1)}}`)
        }, 5000)

        return () => clearInterval(interval)
    }, [isOnline, sensorData, addMqttMessage])

    // Check for fatigue alert
    useEffect(() => {
        if (fatigueScore >= 75 && !isEmergency) {
            addMqttMessage('ALERT', `FATIGUE_HIGH: Score ${Math.round(fatigueScore)}%`)
            triggerEmergency('FATIGUE')
        }
    }, [fatigueScore, isEmergency, addMqttMessage])

    // Simulate Fall
    const simulateFall = () => {
        setIsFallDetected(true)
        setSensorData(prev => ({
            ...prev,
            accelX: 12.5,
            accelY: 8.3,
            accelZ: 2.1,
            totalAccel: 15.8
        }))
        addMqttMessage('ALERT', 'FALL_DETECTED: TotalAccel=15.8g, Z=2.1g')
        triggerEmergency('FALL')
    }

    // Manual SOS
    const triggerSOS = () => {
        addMqttMessage('SOS', 'MANUAL_SOS: Tombol darurat ditekan!')
        triggerEmergency('SOS')
    }

    // Trigger emergency state
    const triggerEmergency = (reason: string) => {
        setIsEmergency(true)
        setIsVibrating(true)

        // Vibration pattern simulation
        setTimeout(() => setIsVibrating(false), 500)
        setTimeout(() => setIsVibrating(true), 600)
        setTimeout(() => setIsVibrating(false), 1100)
        setTimeout(() => setIsVibrating(true), 1200)
        setTimeout(() => setIsVibrating(false), 1700)
    }

    // Reset simulation
    const resetSimulation = () => {
        setIsEmergency(false)
        setIsFallDetected(false)
        setIsVibrating(false)
        setActivityLevel(30)
        setSensorData({
            heartRate: 75,
            spo2: 98,
            hrv: 55,
            accelX: 0.1,
            accelY: 0.2,
            accelZ: 9.8,
            totalAccel: 9.8
        })
        setMqttMessages([])
        addMqttMessage('DATA', 'SYSTEM_RESET: Simulation reset to normal')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                        <Cpu className="h-8 w-8 text-orange-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">SafeGuard Flow <span className="text-orange-500">Sim</span></h1>
                        <p className="text-sm text-slate-400">Monitoring Pekerja & Logika ESP32</p>
                    </div>
                </div>
                <Badge
                    className={`${isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} px-4 py-2`}
                >
                    <span className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    {isOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column - Worker Info & Controls */}
                <div className="space-y-6">
                    {/* Worker Info Card */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                                    <Activity className="h-8 w-8 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Pekerja #402</h3>
                                    <Badge className={`${isEmergency ? 'bg-red-500' : 'bg-emerald-500'} text-white`}>
                                        {isEmergency ? 'EMERGENCY' : 'NORMAL'}
                                    </Badge>
                                    <p className="text-sm text-slate-400 mt-1">Zone B - Warehouse</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Physical Controls */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-400 flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                KONTROL FISIK (SIMULASI)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-slate-400 flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-red-400" />
                                        Aktivitas Fisik
                                    </span>
                                    <span className="text-orange-400 font-mono">{activityLevel}%</span>
                                </div>
                                <Slider
                                    value={[activityLevel]}
                                    onValueChange={(v) => setActivityLevel(v[0])}
                                    max={100}
                                    step={5}
                                    className="w-full"
                                    disabled={isEmergency}
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-1">
                                    <span>Istirahat</span>
                                    <span>Kerja Berat</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant="destructive"
                                    className="w-full bg-red-600 hover:bg-red-700"
                                    onClick={simulateFall}
                                    disabled={isEmergency}
                                >
                                    <ArrowDown className="h-4 w-4 mr-2" />
                                    Simulate Fall
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full bg-orange-600 hover:bg-orange-700"
                                    onClick={triggerSOS}
                                    disabled={isEmergency}
                                >
                                    <Bell className="h-4 w-4 mr-2" />
                                    Manual SOS
                                </Button>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-slate-600 text-slate-300"
                                onClick={resetSimulation}
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset Simulation
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Vibration Indicator */}
                    {isVibrating && (
                        <Card className="bg-red-500/20 border-red-500 animate-pulse">
                            <CardContent className="p-4 flex items-center justify-center gap-2">
                                <Smartphone className="h-5 w-5 text-red-400 animate-bounce" />
                                <span className="text-red-400 font-medium">VIBRATION ALERT!</span>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Center Column - ESP32 Processing */}
                <div className="lg:col-span-2 space-y-6">
                    {/* ESP32 Header */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/20">
                                        <Cpu className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">ESP32-C3 Processing</h3>
                                        <p className="text-xs text-slate-500">FIRMWARE V1.2.0 • LOOP: 15ms</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-emerald-500/20 text-emerald-400">
                                        <Wifi className="h-3 w-3 mr-1" /> MQTT CONNECTED
                                    </Badge>
                                    <div className="flex items-center gap-1 text-slate-400">
                                        <Battery className="h-4 w-4" />
                                        <span className="text-sm">BAT: 3.8V</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Raw Sensor Buffer */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-400">• RAW SENSOR BUFFER</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                {/* MAX30102 Readings */}
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <p className="text-xs text-slate-500 mb-2">MAX30102_READ</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-mono text-white">{sensorData.heartRate}</span>
                                        <span className="text-orange-400">BPM</span>
                                        <Heart className="h-6 w-6 text-red-500 animate-pulse ml-auto" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-sm text-slate-400">SpO2:</span>
                                        <span className="text-emerald-400 font-mono">{sensorData.spo2}%</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-400">HRV (RMSSD):</span>
                                        <span className="text-blue-400 font-mono">{sensorData.hrv}ms</span>
                                    </div>
                                </div>

                                {/* MPU6050 Readings */}
                                <div className={`bg-slate-900/50 rounded-lg p-4 ${isFallDetected ? 'border-2 border-red-500 animate-pulse' : ''}`}>
                                    <p className="text-xs text-slate-500 mb-2">MPU6050_ACCEL</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-mono text-white">{sensorData.totalAccel}</span>
                                        <span className="text-slate-400">G</span>
                                        <div className="ml-auto flex gap-1">
                                            <div className="w-2 h-6 bg-slate-600 rounded" />
                                            <div className="w-2 h-4 bg-slate-600 rounded" />
                                            <div className="w-2 h-8 bg-emerald-500 rounded" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                                        <div>
                                            <span className="text-slate-500">X:</span>
                                            <span className="text-blue-400 font-mono ml-1">{sensorData.accelX}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Y:</span>
                                            <span className="text-green-400 font-mono ml-1">{sensorData.accelY}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Z:</span>
                                            <span className={`font-mono ml-1 ${sensorData.accelZ < 5 ? 'text-red-400' : 'text-purple-400'}`}>
                                                {sensorData.accelZ}
                                            </span>
                                        </div>
                                    </div>
                                    {isFallDetected && (
                                        <Badge className="bg-red-500 text-white mt-2">
                                            <AlertTriangle className="h-3 w-3 mr-1" /> FALL DETECTED!
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Processing Flow */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                                        <Play className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <span className="text-xs text-slate-500 mt-1">READ</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600" />
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                                        <span className="text-lg text-slate-400">Σ</span>
                                    </div>
                                    <span className="text-xs text-slate-500 mt-1">CALC</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600" />
                                <div className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isEmergency ? 'bg-red-500' : 'bg-slate-700'}`}>
                                        <span className="text-lg text-white">=</span>
                                    </div>
                                    <span className="text-xs text-slate-500 mt-1">CHECK</span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-600" />
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center">
                                        <ArrowUp className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="text-xs text-slate-500 mt-1">MQTT</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analysis Results */}
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-400">• ANALYSIS RESULTS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-6">
                                {/* Fatigue Score */}
                                <div className="text-center">
                                    <div className={`text-6xl font-bold ${fatigueStatus.color}`}>
                                        {Math.round(fatigueScore)}%
                                    </div>
                                    <p className="text-slate-400 mt-1">Fatigue Score</p>
                                    <Badge className={`${fatigueStatus.bgColor} ${fatigueStatus.color} mt-2`}>
                                        {fatigueStatus.label}
                                    </Badge>
                                </div>

                                {/* Fall Detection Status */}
                                <div className="text-center">
                                    <div className={`text-6xl font-bold ${isFallDetected ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {isFallDetected ? 'YES' : 'NO'}
                                    </div>
                                    <p className="text-slate-400 mt-1">Fall Detected</p>
                                    <Badge className={`${isFallDetected ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'} mt-2`}>
                                        {isFallDetected ? 'EMERGENCY' : 'STABLE'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Detection Formula */}
                            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
                                <p className="text-xs text-slate-500 mb-2">DETECTION FORMULAS:</p>
                                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                    <div className="text-slate-400">
                                        Fatigue = (100 - HRV×1.5) + (HR&gt;90 ? 20 : 0)
                                    </div>
                                    <div className="text-slate-400">
                                        Fall = TotalAccel &gt; 15g OR Z-axis &lt; 5g
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - MQTT Feed */}
                <div className="space-y-6">
                    {/* MQTT Feed */}
                    <Card className="bg-slate-800/50 border-slate-700 h-full">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm text-slate-400">• MQTT FEED</CardTitle>
                                <Badge className="bg-slate-700 text-slate-400 font-mono text-xs">
                                    TOPIC: SG/V1/#
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                {mqttMessages.length === 0 ? (
                                    <p className="text-slate-500 text-sm text-center py-4">Waiting for messages...</p>
                                ) : (
                                    mqttMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`p-2 rounded text-xs font-mono ${msg.type === 'SOS' ? 'bg-red-500/20 text-red-400' :
                                                    msg.type === 'ALERT' ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-slate-700/50 text-slate-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">{msg.timestamp}</span>
                                                <Badge className={`text-[10px] px-1 py-0 ${msg.type === 'SOS' ? 'bg-red-500' :
                                                        msg.type === 'ALERT' ? 'bg-orange-500' :
                                                            'bg-slate-600'
                                                    }`}>
                                                    {msg.type}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 break-all">{msg.payload}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Emergency Overlay */}
            {isEmergency && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <Card className="bg-red-600 border-red-500 animate-pulse">
                        <CardContent className="p-4 flex items-center gap-4">
                            <AlertTriangle className="h-8 w-8 text-white" />
                            <div>
                                <h3 className="text-lg font-bold text-white">EMERGENCY STATE ACTIVE</h3>
                                <p className="text-sm text-red-200">Alert sent to Control Room • Vibration ON</p>
                            </div>
                            <Button
                                variant="outline"
                                className="border-white text-white hover:bg-red-700"
                                onClick={resetSimulation}
                            >
                                Acknowledge
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
