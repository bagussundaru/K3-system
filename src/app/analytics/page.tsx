'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  RefreshCw
} from 'lucide-react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Mock data for charts
const fatigueTrendData = [
  { time: '00:00', avg: 15, max: 25, min: 8 },
  { time: '03:00', avg: 22, max: 35, min: 12 },
  { time: '06:00', avg: 28, max: 42, min: 18 },
  { time: '09:00', avg: 35, max: 55, min: 22 },
  { time: '12:00', avg: 52, max: 78, min: 35 },
  { time: '15:00', avg: 68, max: 92, min: 48 },
  { time: '18:00', avg: 45, max: 62, min: 32 },
  { time: '21:00', avg: 28, max: 40, min: 18 },
]

const alertTrendData = [
  { date: 'Jan 09', fatigue: 12, gas: 3, ppe: 8, other: 2 },
  { date: 'Jan 10', fatigue: 15, gas: 4, ppe: 6, other: 3 },
  { date: 'Jan 11', fatigue: 18, gas: 2, ppe: 10, other: 1 },
  { date: 'Jan 12', fatigue: 22, gas: 5, ppe: 7, other: 4 },
  { date: 'Jan 13', fatigue: 16, gas: 3, ppe: 9, other: 2 },
  { date: 'Jan 14', fatigue: 20, gas: 6, ppe: 5, other: 3 },
  { date: 'Jan 15', fatigue: 14, gas: 4, ppe: 6, other: 2 },
]

const incidentSeverityData = [
  { name: 'Minor', value: 8, color: '#3b82f6' },
  { name: 'Moderate', value: 5, color: '#eab308' },
  { name: 'Major', value: 2, color: '#f97316' },
  { name: 'Fatal', value: 0, color: '#ef4444' },
]

const zoneComplianceData = [
  { zone: 'Produksi A', compliance: 98, alerts: 5 },
  { zone: 'Produksi B', compliance: 91, alerts: 12 },
  { zone: 'Gudang', compliance: 94, alerts: 8 },
  { zone: 'QC', compliance: 100, alerts: 2 },
  { zone: 'Maintenance', compliance: 96, alerts: 4 },
  { zone: 'Loading Dock', compliance: 93, alerts: 9 },
]

const deviceStatusData = [
  { type: 'SafeGuard', total: 45, online: 42, offline: 3 },
  { type: 'EnviroSense', total: 32, online: 30, offline: 2 },
  { type: 'SiteSecure', total: 12, online: 11, offline: 1 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">
            Analisis data, visualisasi tren, dan insight keselamatan kerja
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 Days
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Fatigue Score
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34%</div>
            <p className="text-xs text-emerald-600 mt-1">
              ↓ 8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Alerts
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-orange-600 mt-1">
              ↑ 12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Incidents
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-emerald-600 mt-1">
              ↓ 2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              PPE Compliance
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">95.3%</div>
            <p className="text-xs text-emerald-600 mt-1">
              ↑ 1.2% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fatigue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Fatigue Score Trend (24 Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={fatigueTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="max" stackId="1" stroke="#ef4444" fill="#ef4444" name="Max" opacity={0.2} />
                <Area type="monotone" dataKey="avg" stackId="1" stroke="#eab308" fill="#eab308" name="Average" opacity={0.4} />
                <Area type="monotone" dataKey="min" stackId="1" stroke="#22c55e" fill="#22c55e" name="Min" opacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alert Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fatigue" stackId="a" fill="#f97316" name="Fatigue" />
                <Bar dataKey="gas" stackId="a" fill="#3b82f6" name="Gas" />
                <Bar dataKey="ppe" stackId="a" fill="#a855f7" name="PPE" />
                <Bar dataKey="other" stackId="a" fill="#6b7280" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incidentSeverityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentSeverityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zone Compliance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Zone Compliance & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneComplianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="compliance" fill="#22c55e" name="Compliance %" />
                <Bar dataKey="alerts" fill="#ef4444" name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle>Device Status by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="online" fill="#22c55e" name="Online" />
                <Bar dataKey="offline" fill="#ef4444" name="Offline" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Heart Rate Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Average Heart Rate by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={zoneComplianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Avg Heart Rate (bpm)"
                  dot={{ fill: '#ef4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                AI-Powered Insights
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-red-600" />
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Risk Alert:</span> Workers in Zona Produksi B show 23% higher fatigue levels during afternoon shifts (12:00-15:00)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-yellow-600" />
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Recommendation:</span> Consider adjusting shift schedules in Loading Dock to reduce peak alert periods
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-emerald-600" />
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Positive Trend:</span> PPE compliance improved by 1.2% following implementation of SiteSecure at Gate B
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="bg-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
