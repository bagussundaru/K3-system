'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Activity, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp,
  Heart,
  Thermometer,
  Droplets
} from 'lucide-react'

// Mock data untuk demonstrasi
const stats = [
  {
    title: 'Total Workers',
    value: '245',
    change: '+12',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Active Devices',
    value: '89',
    change: '+5',
    icon: Activity,
    color: 'green',
  },
  {
    title: 'Active Alerts',
    value: '7',
    change: '-3',
    icon: AlertTriangle,
    color: 'red',
  },
  {
    title: 'PPE Compliance',
    value: '96%',
    change: '+2%',
    icon: ShieldCheck,
    color: 'emerald',
  },
]

const colorMap = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  emerald: 'bg-emerald-500',
}

const recentAlerts = [
  {
    id: 1,
    type: 'FATIGUE_HIGH',
    worker: 'Budi Santoso',
    device: 'SG-001',
    severity: 'high',
    time: '2 min ago',
    description: 'High fatigue detected (RMSSD: 15ms)',
  },
  {
    id: 2,
    type: 'GAS_CO_HIGH',
    zone: 'Zona Produksi A',
    device: 'ES-005',
    severity: 'critical',
    time: '5 min ago',
    description: 'CO level: 35 PPM (Threshold: 25 PPM)',
  },
  {
    id: 3,
    type: 'PPE_MISSING_HELMET',
    worker: 'Ahmad Fikri',
    device: 'SS-002',
    severity: 'medium',
    time: '8 min ago',
    description: 'Worker entered without helmet at Gate B',
  },
  {
    id: 4,
    type: 'TEMPERATURE_HIGH',
    zone: 'Zona Gudang',
    device: 'ES-008',
    severity: 'medium',
    time: '12 min ago',
    description: 'Temperature: 38°C (Threshold: 35°C)',
  },
]

const severityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview sistem K3 dan monitoring real-time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${colorMap[stat.color as keyof typeof colorMap]}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className={`h-4 w-4 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last hour
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Alerts</CardTitle>
              <Badge variant="outline">View All</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-slate-50 transition-colors"
                  >
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900">
                          {alert.worker || alert.zone}
                        </span>
                        <Badge className={severityColors[alert.severity as keyof typeof severityColors]}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{alert.description}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Device: {alert.device} • {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Status */}
        <div className="space-y-6">
          {/* SafeGuard Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                SafeGuard Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Wearables</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Fatigue Alerts</span>
                <span className="font-semibold text-orange-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg Heart Rate</span>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-semibold">78 bpm</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg SpO2</span>
                <span className="font-semibold text-emerald-600">98%</span>
              </div>
            </CardContent>
          </Card>

          {/* EnviroSense Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-600" />
                EnviroSense Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Sensors</span>
                <span className="font-semibold">32</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Gas Alerts</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg Temperature</span>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold">32°C</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg Humidity</span>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold">65%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SiteSecure Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
                SiteSecure Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Cameras</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">PPE Violations</span>
                <span className="font-semibold text-yellow-600">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Compliance Rate</span>
                <span className="font-semibold text-emerald-600">96%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compliance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Kepatuhan Permenaker 5/2018</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">94%</div>
              <div className="text-sm text-slate-600 mt-1">Kualitas Udara</div>
              <div className="text-xs text-slate-400">Target: &ge;90%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">96%</div>
              <div className="text-sm text-slate-600 mt-1">Suhu Kerja</div>
              <div className="text-xs text-slate-400">Target: 23-27°C</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">88%</div>
              <div className="text-sm text-slate-600 mt-1">Penggunaan APD</div>
              <div className="text-xs text-slate-400">Target: &ge;95%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">97%</div>
              <div className="text-sm text-slate-600 mt-1">Sirkulasi Udara</div>
              <div className="text-xs text-slate-400">Target: &ge;0.3 m/s</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
