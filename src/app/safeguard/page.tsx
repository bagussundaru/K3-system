'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  Search,
  Battery,
  Signal,
  Zap,
  User
} from 'lucide-react'

// Mock data for SafeGuard wearable devices
const workers = [
  {
    id: 'SG-001',
    name: 'Budi Santoso',
    employeeId: 'EMP-001',
    department: 'Produksi',
    zone: 'Zona Produksi A',
    status: 'active',
    heartRate: 78,
    spo2: 98,
    rmssd: 28,
    fatigueScore: 25,
    activity: 'moderate',
    battery: 85,
    lastUpdate: '2 min ago',
    alerts: []
  },
  {
    id: 'SG-002',
    name: 'Ahmad Fikri',
    employeeId: 'EMP-002',
    department: 'Logistik',
    zone: 'Zona Gudang',
    status: 'warning',
    heartRate: 92,
    spo2: 95,
    rmssd: 15,
    fatigueScore: 78,
    activity: 'high',
    battery: 62,
    lastUpdate: '1 min ago',
    alerts: [
      { type: 'FATIGUE_HIGH', severity: 'high', message: 'High fatigue detected' }
    ]
  },
  {
    id: 'SG-003',
    name: 'Siti Rahayu',
    employeeId: 'EMP-003',
    department: 'Quality Control',
    zone: 'Zona QC',
    status: 'active',
    heartRate: 72,
    spo2: 99,
    rmssd: 35,
    fatigueScore: 12,
    activity: 'low',
    battery: 91,
    lastUpdate: '3 min ago',
    alerts: []
  },
  {
    id: 'SG-004',
    name: 'Dewi Lestari',
    employeeId: 'EMP-004',
    department: 'Produksi',
    zone: 'Zona Produksi B',
    status: 'critical',
    heartRate: 115,
    spo2: 88,
    rmssd: 12,
    fatigueScore: 92,
    activity: 'high',
    battery: 45,
    lastUpdate: '30 sec ago',
    alerts: [
      { type: 'FATIGUE_HIGH', severity: 'critical', message: 'Critical fatigue level' },
      { type: 'HEART_RATE_HIGH', severity: 'high', message: 'Heart rate elevated' },
      { type: 'SPO2_LOW', severity: 'medium', message: 'SpO2 below normal' }
    ]
  },
  {
    id: 'SG-005',
    name: 'Eko Prasetyo',
    employeeId: 'EMP-005',
    department: 'Maintenance',
    zone: 'Zona Maintenance',
    status: 'active',
    heartRate: 75,
    spo2: 98,
    rmssd: 32,
    fatigueScore: 18,
    activity: 'moderate',
    battery: 78,
    lastUpdate: '4 min ago',
    alerts: []
  },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  offline: 'bg-slate-100 text-slate-800 border-slate-200',
}

const getFatigueColor = (score: number) => {
  if (score < 30) return 'text-emerald-600 bg-emerald-100'
  if (score < 60) return 'text-yellow-600 bg-yellow-100'
  if (score < 80) return 'text-orange-600 bg-orange-100'
  return 'text-red-600 bg-red-100'
}

const getFatigueLabel = (score: number) => {
  if (score < 30) return 'Normal'
  if (score < 60) return 'Mild'
  if (score < 80) return 'Moderate'
  return 'High'
}

export default function SafeGuardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">SafeGuard Monitoring</h1>
          <p className="text-slate-600 mt-1">
            Pelacak Keselamatan Wearable - Monitoring kelelahan dan kondisi pekerja real-time
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Wearables
            </CardTitle>
            <Activity className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workers.length}</div>
            <p className="text-xs text-slate-500 mt-1">Online devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Critical Alerts
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {workers.filter(w => w.status === 'critical').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              High Fatigue
            </CardTitle>
            <Zap className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {workers.filter(w => w.fatigueScore >= 60).length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Workers at risk</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Heart Rate
            </CardTitle>
            <Heart className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(workers.reduce((acc, w) => acc + w.heartRate, 0) / workers.length)}
              <span className="text-sm font-normal text-slate-500 ml-1">bpm</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Normal range: 60-100</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by name or employee ID..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Status: All
            </Button>
            <Button variant="outline">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Fatigue Level: All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Worker List */}
      <div className="space-y-4">
        {workers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Worker Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">
                        {worker.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {worker.employeeId} • {worker.department}
                      </p>
                    </div>
                    <Badge className={statusColors[worker.status as keyof typeof statusColors]}>
                      {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-slate-600">{worker.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-600">
                        Battery: {worker.battery}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-slate-600">
                        Last update: {worker.lastUpdate}
                      </span>
                    </div>
                  </div>

                  {/* Alerts */}
                  {worker.alerts.length > 0 && (
                    <div className="space-y-2">
                      {worker.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded-lg ${
                            alert.severity === 'critical' ? 'bg-red-50' :
                            alert.severity === 'high' ? 'bg-orange-50' :
                            'bg-yellow-50'
                          }`}
                        >
                          <AlertTriangle className={`h-4 w-4 ${
                            alert.severity === 'critical' ? 'text-red-600' :
                            alert.severity === 'high' ? 'text-orange-600' :
                            'text-yellow-600'
                          }`} />
                          <span className="text-sm font-medium">
                            {alert.message}
                          </span>
                          <Badge variant="outline" className="ml-auto">
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vital Signs */}
                <div className="grid grid-cols-4 gap-4 min-w-[400px]">
                  {/* Heart Rate */}
                  <Card className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        Heart Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${
                        worker.heartRate > 100 ? 'text-red-600' :
                        worker.heartRate < 60 ? 'text-orange-600' :
                        'text-emerald-600'
                      }`}>
                        {worker.heartRate}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">bpm</p>
                    </CardContent>
                  </Card>

                  {/* SpO2 */}
                  <Card className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium text-slate-600">
                        SpO2
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${
                        worker.spo2 < 95 ? 'text-red-600' :
                        worker.spo2 < 97 ? 'text-yellow-600' :
                        'text-emerald-600'
                      }`}>
                        {worker.spo2}%
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Normal: ≥95%</p>
                    </CardContent>
                  </Card>

                  {/* RMSSD (HRV) */}
                  <Card className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium text-slate-600">
                        RMSSD
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${
                        worker.rmssd < 20 ? 'text-red-600' :
                        worker.rmssd < 30 ? 'text-yellow-600' :
                        'text-emerald-600'
                      }`}>
                        {worker.rmssd}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">ms (HRV)</p>
                    </CardContent>
                  </Card>

                  {/* Fatigue Score */}
                  <Card className="border-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
                        <Zap className="h-3 w-3 text-orange-500" />
                        Fatigue Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold px-2 py-1 rounded-lg ${getFatigueColor(worker.fatigueScore)}`}>
                        {worker.fatigueScore}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {getFatigueLabel(worker.fatigueScore)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
