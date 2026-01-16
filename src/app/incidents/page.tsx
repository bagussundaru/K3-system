'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  AlertTriangle, 
  Search,
  Filter,
  Plus,
  Clock,
  MapPin,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data for incidents
const incidents = [
  {
    id: 'INC-2025-001',
    workerId: 'EMP-004',
    workerName: 'Dewi Lestari',
    zone: 'Zona Produksi B',
    type: 'INJURY',
    severity: 'MODERATE',
    title: 'Minor Injury from Slip',
    description: 'Worker slipped on wet floor, slight abrasion on arm. No medical treatment required beyond first aid.',
    cause: 'Wet floor without proper signage',
    status: 'CLOSED',
    medicalAttention: true,
    medicalNotes: 'First aid applied, abrasion cleaned and dressed',
    reportedBy: 'Supervisor Produksi',
    reportedAt: '2025-01-10T08:30:00',
    resolvedAt: '2025-01-10T10:15:00',
    resolvedBy: 'HSE Officer',
    actionTaken: 'Cleaned floor, placed warning signs, reviewed cleaning procedures',
    preventionAction: 'Implement more frequent floor checks, improve wet floor signage'
  },
  {
    id: 'INC-2025-002',
    workerId: 'EMP-015',
    workerName: 'Agus Setiawan',
    zone: 'Zona Gudang',
    type: 'NEAR_MISS',
    severity: 'MINOR',
    title: 'Near Miss - Falling Object',
    description: 'Box nearly fell from upper shelf while worker was stocking items',
    cause: 'Improper stacking, shelf not fully secured',
    status: 'UNDER_INVESTIGATION',
    medicalAttention: false,
    reportedBy: 'Agus Setiawan',
    reportedAt: '2025-01-12T14:20:00',
    resolvedAt: null,
    resolvedBy: null,
    actionTaken: null,
    preventionAction: null
  },
  {
    id: 'INC-2025-003',
    workerId: null,
    workerName: 'Unknown',
    zone: 'Zona Produksi A',
    type: 'FIRE',
    severity: 'MAJOR',
    title: 'Small Fire in Machinery',
    description: 'Fire extinguished quickly by emergency response team. Equipment damage, no injuries',
    cause: 'Electrical short circuit in motor',
    status: 'RESOLVED',
    medicalAttention: false,
    witnesses: ['Budi Santoso', 'Siti Rahayu'],
    reportedBy: 'Emergency Team',
    reportedAt: '2025-01-13T16:45:00',
    resolvedAt: '2025-01-13T17:30:00',
    resolvedBy: 'HSE Manager',
    actionTaken: 'Fire extinguished, area evacuated, equipment shut down',
    preventionAction: 'Schedule electrical maintenance, install additional fire detection'
  },
  {
    id: 'INC-2025-004',
    workerId: 'EMP-028',
    workerName: 'Rahmat Hidayat',
    zone: 'Confined Space - Pipa B',
    type: 'CHEMICAL_EXPOSURE',
    severity: 'MODERATE',
    title: 'Chemical Exposure During Maintenance',
    description: 'Worker exposed to cleaning chemical fumes. Wore mask but slight irritation',
    cause: 'Insufficient ventilation in confined space',
    status: 'UNDER_INVESTIGATION',
    medicalAttention: true,
    medicalNotes: 'Minor eye irritation, treated. No long-term effects expected',
    reportedBy: 'Supervisor Maintenance',
    reportedAt: '2025-01-14T09:15:00',
    resolvedAt: null,
    resolvedBy: null,
    actionTaken: 'Worker removed from area, medical check performed',
    preventionAction: null
  },
  {
    id: 'INC-2025-005',
    workerId: 'EMP-009',
    workerName: 'Eko Prasetyo',
    zone: 'Zona Loading Dock',
    type: 'EQUIPMENT_FAILURE',
    severity: 'MINOR',
    title: 'Forklift Malfunction',
    description: 'Forklift hydraulic system failure during operation',
    cause: 'Worn hydraulic seals due to deferred maintenance',
    status: 'REPORTED',
    medicalAttention: false,
    reportedBy: 'Eko Prasetyo',
    reportedAt: '2025-01-15T11:30:00',
    resolvedAt: null,
    resolvedBy: null,
    actionTaken: null,
    preventionAction: null
  },
]

const severityColors = {
  MINOR: 'bg-blue-100 text-blue-800 border-blue-200',
  MODERATE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  MAJOR: 'bg-orange-100 text-orange-800 border-orange-200',
  FATAL: 'bg-red-100 text-red-800 border-red-200',
}

const statusColors = {
  REPORTED: 'bg-blue-100 text-blue-800',
  UNDER_INVESTIGATION: 'bg-yellow-100 text-yellow-800',
  RESOLVED: 'bg-emerald-100 text-emerald-800',
  CLOSED: 'bg-slate-100 text-slate-800',
}

const typeLabels = {
  ACCIDENT: 'Accident',
  INJURY: 'Injury',
  NEAR_MISS: 'Near Miss',
  ILLNESS: 'Illness',
  FIRE: 'Fire',
  GAS_LEAK: 'Gas Leak',
  EQUIPMENT_FAILURE: 'Equipment Failure',
  FALL: 'Fall',
  ELECTRIC_SHOCK: 'Electric Shock',
  CHEMICAL_EXPOSURE: 'Chemical Exposure',
  HEAT_STRESS: 'Heat Stress',
  OTHER: 'Other',
}

export default function IncidentsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredIncidents = incidents.filter(incident => {
    if (selectedSeverity !== 'all' && incident.severity !== selectedSeverity) return false
    if (selectedStatus !== 'all' && incident.status !== selectedStatus) return false
    if (selectedType !== 'all' && incident.type !== selectedType) return false
    return true
  })

  const incidentCounts = {
    total: incidents.length,
    open: incidents.filter(i => i.status === 'REPORTED' || i.status === 'UNDER_INVESTIGATION').length,
    resolved: incidents.filter(i => i.status === 'RESOLVED').length,
    closed: incidents.filter(i => i.status === 'CLOSED').length,
  }

  const severityCounts = {
    FATAL: incidents.filter(i => i.severity === 'FATAL').length,
    MAJOR: incidents.filter(i => i.severity === 'MAJOR').length,
    MODERATE: incidents.filter(i => i.severity === 'MODERATE').length,
    MINOR: incidents.filter(i => i.severity === 'MINOR').length,
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Incidents</h1>
          <p className="text-slate-600 mt-1">
            Manajemen insiden, kecelakaan kerja, dan investigasi
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Incidents
            </CardTitle>
            <FileText className="h-5 w-5 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentCounts.total}</div>
            <p className="text-xs text-slate-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Open
            </CardTitle>
            <XCircle className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{incidentCounts.open}</div>
            <p className="text-xs text-slate-500 mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Major/Fatal
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {severityCounts.MAJOR + severityCounts.FATAL}
            </div>
            <p className="text-xs text-slate-500 mt-1">High severity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Resolved/Closed
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {incidentCounts.resolved + incidentCounts.closed}
            </div>
            <p className="text-xs text-slate-500 mt-1">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search incidents..."
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
              variant={selectedSeverity === 'MAJOR' ? 'default' : 'outline'}
              className={selectedSeverity === 'MAJOR' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              onClick={() => setSelectedSeverity('MAJOR')}
            >
              Major
            </Button>
            <Button 
              variant={selectedSeverity === 'MODERATE' ? 'default' : 'outline'}
              className={selectedSeverity === 'MODERATE' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              onClick={() => setSelectedSeverity('MODERATE')}
            >
              Moderate
            </Button>
            <Button 
              variant={selectedSeverity === 'MINOR' ? 'default' : 'outline'}
              className={selectedSeverity === 'MINOR' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              onClick={() => setSelectedSeverity('MINOR')}
            >
              Minor
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status & Type Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-slate-700">Status:</span>
        {(['all', 'REPORTED', 'UNDER_INVESTIGATION', 'RESOLVED', 'CLOSED'] as const).map((status) => (
          <Badge
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            className={`cursor-pointer ${
              selectedStatus === status ? statusColors[status] : ''
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            {status.replace('_', ' ')}
          </Badge>
        ))}
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">No Incidents Found</h3>
              <p className="text-sm text-slate-600 mt-1">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Incident Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-700 flex-shrink-0">
                    <AlertTriangle className="h-6 w-6" />
                  </div>

                  {/* Incident Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-lg text-slate-900">
                          {incident.title}
                        </h3>
                        <span className="text-sm text-slate-500">{incident.id}</span>
                        <Badge className={severityColors[incident.severity]}>
                          {incident.severity}
                        </Badge>
                        <Badge className={statusColors[incident.status]}>
                          {incident.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {typeLabels[incident.type]}
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
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Generate Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-slate-600 mb-4">{incident.description}</p>

                    {/* Incident Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-500">Worker:</span>
                          <span className="ml-1 font-medium text-slate-900">{incident.workerName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-500">Zone:</span>
                          <span className="ml-1 font-medium text-slate-900">{incident.zone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-500">Reported:</span>
                          <span className="ml-1 font-medium text-slate-900">{formatDate(incident.reportedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <div>
                          <span className="text-slate-500">By:</span>
                          <span className="ml-1 font-medium text-slate-900">{incident.reportedBy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cause */}
                    {incident.cause && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-slate-700">Cause:</span>
                        <p className="text-sm text-slate-600 mt-1">{incident.cause}</p>
                      </div>
                    )}

                    {/* Medical Attention */}
                    {incident.medicalAttention && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-blue-900">Medical Attention Required</span>
                            {incident.medicalNotes && (
                              <p className="text-sm text-blue-700 mt-1">{incident.medicalNotes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Resolution */}
                    {incident.status === 'RESOLVED' || incident.status === 'CLOSED' ? (
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <span className="font-medium text-emerald-900">Action Taken:</span>
                          <p className="text-sm text-emerald-700 mt-1">{incident.actionTaken || 'N/A'}</p>
                        </div>
                        {incident.preventionAction && (
                          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <span className="font-medium text-emerald-900">Prevention Action:</span>
                            <p className="text-sm text-emerald-700 mt-1">{incident.preventionAction}</p>
                          </div>
                        )}
                        <div className="text-sm text-slate-600">
                          <span>Resolved by </span>
                          <span className="font-medium">{incident.resolvedBy}</span>
                          <span> on </span>
                          <span className="font-medium">{incident.resolvedAt && formatDate(incident.resolvedAt)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
