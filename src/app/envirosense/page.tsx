'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  Zap,
  Activity,
  Signal,
  Battery,
  Search,
  Flame,
  Gauge
} from 'lucide-react'

// Mock data for EnviroSense environmental sensors
const sensors = [
  {
    id: 'ES-001',
    name: 'Sensor Produksi A-1',
    zone: 'Zona Produksi A',
    type: 'PRODUCTION',
    status: 'active',
    nh3: 15, // PPM
    co: 12, // PPM
    lpg: 0, // PPM
    temperature: 28, // °C
    humidity: 65, // %
    aqi: 45,
    battery: 92,
    lastUpdate: '1 min ago',
    alerts: [],
    thresholds: {
      nh3: 25,
      co: 25,
      temperature: 35,
      humidity: 80
    }
  },
  {
    id: 'ES-002',
    name: 'Sensor Produksi B-1',
    zone: 'Zona Produksi B',
    type: 'PRODUCTION',
    status: 'warning',
    nh3: 22,
    co: 18,
    lpg: 0,
    temperature: 33,
    humidity: 72,
    aqi: 78,
    battery: 88,
    lastUpdate: '2 min ago',
    alerts: [
      { type: 'TEMPERATURE_HIGH', severity: 'warning', message: 'Temperature approaching threshold' }
    ],
    thresholds: {
      nh3: 25,
      co: 25,
      temperature: 35,
      humidity: 80
    }
  },
  {
    id: 'ES-003',
    name: 'Sensor Gudang Utama',
    zone: 'Zona Gudang',
    type: 'WAREHOUSE',
    status: 'critical',
    nh3: 8,
    co: 35, // Above threshold (25)
    lpg: 0,
    temperature: 31,
    humidity: 68,
    aqi: 112, // Unhealthy for sensitive groups
    battery: 75,
    lastUpdate: '30 sec ago',
    alerts: [
      { type: 'GAS_CO_HIGH', severity: 'critical', message: 'CO level exceeds threshold (35/25 PPM)' },
      { type: 'AIR_QUALITY_POOR', severity: 'warning', message: 'Air quality degraded' }
    ],
    thresholds: {
      nh3: 25,
      co: 25,
      temperature: 35,
      humidity: 80
    }
  },
  {
    id: 'ES-004',
    name: 'Sensor Confined Space 1',
    zone: 'Confined Space - Pipa A',
    type: 'CONFINED_SPACE',
    status: 'active',
    nh3: 5,
    co: 8,
    lpg: 0,
    temperature: 24,
    humidity: 78,
    aqi: 32,
    battery: 95,
    lastUpdate: '3 min ago',
    alerts: [],
    thresholds: {
      nh3: 25,
      co: 25,
      temperature: 35,
      humidity: 80
    }
  },
  {
    id: 'ES-005',
    name: 'Sensor Loading Dock',
    zone: 'Loading Dock - Utara',
    type: 'LOADING_DOCK',
    status: 'active',
    nh3: 12,
    co: 15,
    lpg: 5,
    temperature: 30,
    humidity: 70,
    aqi: 55,
    battery: 82,
    lastUpdate: '1 min ago',
    alerts: [],
    thresholds: {
      nh3: 25,
      co: 25,
      temperature: 35,
      humidity: 80
    }
  },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  offline: 'bg-slate-100 text-slate-800 border-slate-200',
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return 'text-emerald-600 bg-emerald-100'
  if (aqi <= 100) return 'text-yellow-600 bg-yellow-100'
  if (aqi <= 150) return 'text-orange-600 bg-orange-100'
  if (aqi <= 200) return 'text-red-600 bg-red-100'
  return 'text-purple-600 bg-purple-100'
}

const getAQILabel = (aqi: number) => {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy (Sensitive)'
  if (aqi <= 200) return 'Unhealthy'
  return 'Very Unhealthy'
}

const getValueStatus = (value: number, threshold: number) => {
  const percentage = (value / threshold) * 100
  if (percentage >= 100) return { color: 'text-red-600', status: 'critical' }
  if (percentage >= 80) return { color: 'text-orange-600', status: 'warning' }
  if (percentage >= 60) return { color: 'text-yellow-600', status: 'caution' }
  return { color: 'text-emerald-600', status: 'normal' }
}

export default function EnviroSensePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">EnviroSense Monitoring</h1>
          <p className="text-slate-600 mt-1">
            Sensor Lingkungan Cerdas - Pemantauan gas berbahaya dan kualitas udara real-time
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Wind className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Sensors
            </CardTitle>
            <Activity className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sensors.length}</div>
            <p className="text-xs text-slate-500 mt-1">Monitoring zones</p>
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
              {sensors.filter(s => s.status === 'critical').length}
            </div>
            <p className="text-xs text-slate-500 mt-1">Immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg NH₃ Level
            </CardTitle>
            <Zap className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(sensors.reduce((acc, s) => acc + s.nh3, 0) / sensors.length)}
              <span className="text-sm font-normal text-slate-500 ml-1">PPM</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Threshold: 25 PPM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Temperature
            </CardTitle>
            <Thermometer className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(sensors.reduce((acc, s) => acc + s.temperature, 0) / sensors.length)}°C
            </div>
            <p className="text-xs text-slate-500 mt-1">Range: 23-27°C</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg AQI
            </CardTitle>
            <Wind className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(sensors.reduce((acc, s) => acc + s.aqi, 0) / sensors.length)}
            </div>
            <p className="text-xs text-slate-500 mt-1">Air Quality Index</p>
          </CardContent>
        </Card>
      </div>

      {/* Permenaker 5/2018 Compliance Banner */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                Kepatuhan Permenaker No. 5/2018
              </h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-slate-600">Kualitas Udara</div>
                  <div className="text-xl font-bold text-emerald-600">92%</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Suhu Kerja</div>
                  <div className="text-xl font-bold text-emerald-600">95%</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Kelembaban</div>
                  <div className="text-xl font-bold text-yellow-600">88%</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Sirkulasi Udara</div>
                  <div className="text-xl font-bold text-emerald-600">97%</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="bg-white">
              <Gauge className="h-4 w-4 mr-2" />
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search sensors by name or zone..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Status: All
            </Button>
            <Button variant="outline">
              <Wind className="h-4 w-4 mr-2" />
              Zone Type: All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sensors.map((sensor) => (
          <Card key={sensor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex items-start justify-between pb-3">
              <div>
                <CardTitle className="text-lg">{sensor.name}</CardTitle>
                <p className="text-sm text-slate-500 mt-1">{sensor.zone}</p>
              </div>
              <Badge className={statusColors[sensor.status as keyof typeof statusColors]}>
                {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent>
              {/* Device Status */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-600">Battery: {sensor.battery}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4 text-green-500" />
                  <span className="text-slate-600">{sensor.lastUpdate}</span>
                </div>
              </div>

              {/* Gas Readings */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Ammonia (NH3) */}
                <Card className="border-2 bg-yellow-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-slate-600">
                      Ammonia (NH₃)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getValueStatus(sensor.nh3, sensor.thresholds.nh3).color}`}>
                      {sensor.nh3}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">PPM (max: {sensor.thresholds.nh3})</p>
                  </CardContent>
                </Card>

                {/* Carbon Monoxide (CO) */}
                <Card className="border-2 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-slate-600">
                      Carbon Monoxide (CO)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getValueStatus(sensor.co, sensor.thresholds.co).color}`}>
                      {sensor.co}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">PPM (max: {sensor.thresholds.co})</p>
                  </CardContent>
                </Card>

                {/* LPG */}
                <Card className="border-2 bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      LPG
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getValueStatus(sensor.lpg, 10).color}`}>
                      {sensor.lpg}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">PPM (max: 10)</p>
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Readings */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Temperature */}
                <Card className="border-2 bg-orange-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Thermometer className="h-3 w-3 text-orange-500" />
                      Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getValueStatus(sensor.temperature, sensor.thresholds.temperature).color}`}>
                      {sensor.temperature}°C
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Range: 23-27°C</p>
                  </CardContent>
                </Card>

                {/* Humidity */}
                <Card className="border-2 bg-blue-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Droplets className="h-3 w-3 text-blue-500" />
                      Humidity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${getValueStatus(sensor.humidity, sensor.thresholds.humidity).color}`}>
                      {sensor.humidity}%
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Max: 80%</p>
                  </CardContent>
                </Card>

                {/* Air Quality Index */}
                <Card className="border-2 bg-emerald-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Wind className="h-3 w-3 text-blue-500" />
                      AQI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold px-2 py-1 rounded-lg ${getAQIColor(sensor.aqi)}`}>
                      {sensor.aqi}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{getAQILabel(sensor.aqi)}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts */}
              {sensor.alerts.length > 0 && (
                <div className="space-y-2">
                  {sensor.alerts.map((alert, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        alert.severity === 'critical' ? 'bg-red-50' :
                        alert.severity === 'warning' ? 'bg-yellow-50' :
                        'bg-orange-50'
                      }`}
                    >
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'warning' ? 'text-yellow-600' :
                        'text-orange-600'
                      }`} />
                      <span className="text-sm font-medium flex-1">
                        {alert.message}
                      </span>
                      <Badge variant="outline" className={
                        alert.severity === 'critical' ? 'border-red-300 text-red-700' :
                        alert.severity === 'warning' ? 'border-yellow-300 text-yellow-700' :
                        'border-orange-300 text-orange-700'
                      }>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
