'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Bell, 
  AlertTriangle, 
  Activity, 
  Wind, 
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data for alerts from all systems
const alerts = [
  {
    id: 'ALT-001',
    type: 'GAS_CO_HIGH',
    category: 'ENVIRO_SENSE',
    severity: 'critical',
    title: 'Carbon Monoxide Level Critical',
    description: 'CO level at 35 PPM exceeds threshold of 25 PPM',
    source: 'ES-003 (Zona Gudang)',
    value: 35,
    threshold: 25,
    status: 'open',
    createdAt: '2025-01-15T14:28:30',
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 'ALT-002',
    type: 'FATIGUE_HIGH',
    category: 'SAFE_GUARD',
    severity: 'critical',
    title: 'Critical Fatigue Detected',
    description: 'Worker fatigue score at 92% - Immediate rest required',
    source: 'SG-004 (Dewi Lestari - Zona Produksi B)',
    value: 92,
    threshold: 80,
    status: 'open',
    createdAt: '2025-01-15T14:22:15',
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 'ALT-003',
    type: 'UNAUTHORIZED_ACCESS',
    category: 'SITE_SECURE',
    severity: 'high',
    title: 'Unauthorized Person Detected',
    description: 'Person without proper access badge in restricted Loading Dock area',
    source: 'SS-003 (Area Loading Dock)',
    value: null,
    threshold: null,
    status: 'acknowledged',
    createdAt: '2025-01-15T14:15:42',
    acknowledgedAt: '2025-01-15T14:16:30',
    acknowledgedBy: 'Security Admin'
  },
  {
    id: 'ALT-004',
    type: 'TEMPERATURE_HIGH',
    category: 'ENVIRO_SENSE',
    severity: 'warning',
    title: 'High Temperature Warning',
    description: 'Temperature at 33°C approaching threshold of 35°C',
    source: 'ES-002 (Zona Produksi B)',
    value: 33,
    threshold: 35,
    status: 'open',
    createdAt: '2025-01-15T14:10:20',
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 'ALT-005',
    type: 'PPE_MISSING_HELMET',
    category: 'SITE_SECURE',
    severity: 'medium',
    title: 'PPE Violation - Missing Helmet',
    description: 'Worker entered production zone without wearing helmet',
    source: 'SS-002 (Gerbang B - Produksi)',
    value: null,
    threshold: null,
    status: 'resolved',
    createdAt: '2025-01-15T14:05:15',
    acknowledgedAt: '2025-01-15T14:06:45',
    acknowledgedBy: 'HSE Officer'
  },
  {
    id: 'ALT-006',
    type: 'FATIGUE_HIGH',
    category: 'SAFE_GUARD',
    severity: 'high',
    title: 'High Fatigue Level',
    description: 'Worker fatigue score at 78% - Recommend break',
    source: 'SG-002 (Ahmad Fikri - Zona Gudang)',
    value: 78,
    threshold: 60,
    status: 'acknowledged',
    createdAt: '2025-01-15T13:58:30',
    acknowledgedAt: '2025-01-15T14:00:15',
    acknowledgedBy: 'Supervisor'
  },
  {
    id: 'ALT-007',
    type: 'FALL_DETECTED',
    category: 'SAFE_GUARD',
    severity: 'high',
    title: 'Fall Detected',
    description: 'Sudden acceleration pattern detected - Possible fall',
    source: 'SG-001 (Budi Santoso - Zona Produksi A)',
    value: null,
    threshold: null,
    status: 'resolved',
    createdAt: '2025-01-15T13:45:20',
    acknowledgedAt: '2025-01-15T13:46:10',
    acknowledgedBy: 'HSE Team'
  },
  {
    id: 'ALT-008',
    type: 'GAS_AMMONIA_HIGH',
    category: 'ENVIRO_SENSE',
    severity: 'warning',
    title: 'Ammonia Level Elevated',
    description: 'NH3 level at 22 PPM - Approaching threshold of 25 PPM',
    source: 'ES-002 (Zona Produksi B)',
    value: 22,
    threshold: 25,
    status: 'open',
    createdAt: '2025-01-15T13:35:45',
    acknowledgedAt: null,
    acknowledgedBy: null
  },
]

const severityColors = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
}

const statusColors = {
  open: 'bg-red-100 text-red-800',
  acknowledged: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  dismissed: 'bg-slate-100 text-slate-800',
}

const categoryIcons = {
  SAFE_GUARD: Activity,
  ENVIRO_SENSE: Wind,
  SITE_SECURE: ShieldCheck,
}

const categoryColors = {
  SAFE_GUARD: 'text-emerald-600 bg-emerald-50',
  ENVIRO_SENSE: 'text-blue-600 bg-blue-50',
  SITE_SECURE: 'text-purple-600 bg-purple-50',
}

export default function AlertsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredAlerts = alerts.filter(alert => {
    if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) return false
    if (selectedStatus !== 'all' && alert.status !== selectedStatus) return false
    if (selectedCategory !== 'all' && alert.category !== selectedCategory) return false
    return true
  })

  const alertCounts = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
  }

  const statusCounts = {
    open: alerts.filter(a => a.status === 'open').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`
    }
    return `${minutes}m ago`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Alerts</h1>
          <p className="text-slate-600 mt-1">
            Real-time alerts and notifications from all K3 monitoring systems
          </p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Bell className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Alerts
            </CardTitle>
            <Bell className="h-5 w-5 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertCounts.total}</div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Open
            </CardTitle>
            <XCircle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCounts.open}</div>
            <p className="text-xs text-slate-500 mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Acknowledged
            </CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.acknowledged}</div>
            <p className="text-xs text-slate-500 mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Critical
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alertCounts.critical}</div>
            <p className="text-xs text-slate-500 mt-1">Urgent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Resolved
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{statusCounts.resolved}</div>
            <p className="text-xs text-slate-500 mt-1">Closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search alerts..."
                className="pl-10"
              />
            </div>
            <Button 
              variant={selectedSeverity === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedSeverity('all')}
            >
              All Severity
            </Button>
            <Button 
              variant={selectedSeverity === 'critical' ? 'default' : 'outline'}
              className={selectedSeverity === 'critical' ? 'bg-red-600 hover:bg-red-700' : ''}
              onClick={() => setSelectedSeverity('critical')}
            >
              Critical
            </Button>
            <Button 
              variant={selectedSeverity === 'high' ? 'default' : 'outline'}
              className={selectedSeverity === 'high' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              onClick={() => setSelectedSeverity('high')}
            >
              High
            </Button>
            <Button 
              variant={selectedSeverity === 'medium' ? 'default' : 'outline'}
              className={selectedSeverity === 'medium' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              onClick={() => setSelectedSeverity('medium')}
            >
              Medium
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status & Category Filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700">Status:</span>
        {(['all', 'open', 'acknowledged', 'resolved'] as const).map((status) => (
          <Badge
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            className={`cursor-pointer ${
              selectedStatus === status ? statusColors[status] : ''
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        ))}
        <span className="text-sm font-medium text-slate-700 ml-4">Category:</span>
        {(['all', 'SAFE_GUARD', 'ENVIRO_SENSE', 'SITE_SECURE'] as const).map((category) => {
          if (category === 'all') {
            return (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                All
              </Badge>
            )
          }
          const Icon = categoryIcons[category]
          return (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`cursor-pointer ${
                selectedCategory === category ? categoryColors[category] : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {category.replace('_', ' ')}
            </Badge>
          )
        })}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">No Alerts Found</h3>
              <p className="text-sm text-slate-600 mt-1">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const CategoryIcon = categoryIcons[alert.category as keyof typeof categoryIcons]
            return (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Category Icon */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      categoryColors[alert.category as keyof typeof categoryColors]
                    }`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg text-slate-900">
                            {alert.title}
                          </h3>
                          <Badge className={severityColors[alert.severity as keyof typeof severityColors]}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className={statusColors[alert.status as keyof typeof statusColors]}>
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Acknowledge
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              Dismiss
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-slate-600 mb-3">{alert.description}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Source:</span>
                          <span className="font-medium text-slate-900">{alert.source}</span>
                        </div>
                        {alert.value !== null && (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Value:</span>
                            <span className="font-medium text-slate-900">
                              {alert.value}
                              {alert.threshold && ` / ${alert.threshold}`}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-slate-600">{formatTime(alert.createdAt)}</span>
                        </div>
                      </div>

                      {alert.acknowledgedAt && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-yellow-600" />
                          <span className="text-slate-600">
                            Acknowledged by <span className="font-medium">{alert.acknowledgedBy}</span> • {formatTime(alert.acknowledgedAt)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {alert.status === 'open' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Acknowledge
                          </Button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <Button variant="outline" size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
