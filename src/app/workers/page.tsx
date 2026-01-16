'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search,
  Plus,
  Filter,
  User,
  MapPin,
  Activity,
  AlertTriangle,
  ShieldCheck,
  MoreHorizontal,
  Calendar,
  Phone
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data for workers
const workers = [
  {
    id: 'WKR-001',
    employeeId: 'EMP-001',
    name: 'Budi Santoso',
    department: 'Produksi',
    position: 'Operator Mesin',
    shift: 'Pagi',
    zone: 'Zona Produksi A',
    status: 'active',
    deviceId: 'SG-001',
    deviceStatus: 'online',
    fatigueScore: 25,
    heartRate: 78,
    spo2: 98,
    todayAlerts: 0,
    email: 'budi.santoso@company.com',
    phone: '081234567890',
    bloodType: 'A',
    dateOfBirth: '1985-05-15',
    joinedAt: '2020-03-01'
  },
  {
    id: 'WKR-002',
    employeeId: 'EMP-002',
    name: 'Ahmad Fikri',
    department: 'Logistik',
    position: 'Forklift Operator',
    shift: 'Siang',
    zone: 'Zona Gudang',
    status: 'warning',
    deviceId: 'SG-002',
    deviceStatus: 'online',
    fatigueScore: 78,
    heartRate: 92,
    spo2: 95,
    todayAlerts: 2,
    email: 'ahmad.fikri@company.com',
    phone: '081234567891',
    bloodType: 'O',
    dateOfBirth: '1990-08-22',
    joinedAt: '2021-01-15'
  },
  {
    id: 'WKR-003',
    employeeId: 'EMP-003',
    name: 'Siti Rahayu',
    department: 'Quality Control',
    position: 'QC Inspector',
    shift: 'Pagi',
    zone: 'Zona QC',
    status: 'active',
    deviceId: 'SG-003',
    deviceStatus: 'online',
    fatigueScore: 12,
    heartRate: 72,
    spo2: 99,
    todayAlerts: 0,
    email: 'siti.rahayu@company.com',
    phone: '081234567892',
    bloodType: 'B',
    dateOfBirth: '1988-11-30',
    joinedAt: '2019-06-10'
  },
  {
    id: 'WKR-004',
    employeeId: 'EMP-004',
    name: 'Dewi Lestari',
    department: 'Produksi',
    position: 'Packaging Operator',
    shift: 'Siang',
    zone: 'Zona Produksi B',
    status: 'critical',
    deviceId: 'SG-004',
    deviceStatus: 'online',
    fatigueScore: 92,
    heartRate: 115,
    spo2: 88,
    todayAlerts: 5,
    email: 'dewi.lestari@company.com',
    phone: '081234567893',
    bloodType: 'AB',
    dateOfBirth: '1992-03-18',
    joinedAt: '2022-02-20'
  },
  {
    id: 'WKR-005',
    employeeId: 'EMP-005',
    name: 'Eko Prasetyo',
    department: 'Maintenance',
    position: 'Teknisi',
    shift: 'Malam',
    zone: 'Zona Maintenance',
    status: 'active',
    deviceId: 'SG-005',
    deviceStatus: 'online',
    fatigueScore: 18,
    heartRate: 75,
    spo2: 98,
    todayAlerts: 0,
    email: 'eko.prasetyo@company.com',
    phone: '081234567894',
    bloodType: 'O',
    dateOfBirth: '1987-09-25',
    joinedAt: '2018-08-01'
  },
  {
    id: 'WKR-006',
    employeeId: 'EMP-006',
    name: 'Rina Wati',
    department: 'Administrasi',
    position: 'Admin K3',
    shift: 'Pagi',
    zone: 'Kantor',
    status: 'active',
    deviceId: null,
    deviceStatus: 'unassigned',
    fatigueScore: null,
    heartRate: null,
    spo2: null,
    todayAlerts: 0,
    email: 'rina.wati@company.com',
    phone: '081234567895',
    bloodType: 'A',
    dateOfBirth: '1993-07-12',
    joinedAt: '2021-04-05'
  },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  offline: 'bg-slate-100 text-slate-800 border-slate-200',
}

const deviceStatusColors = {
  online: 'bg-emerald-100 text-emerald-800',
  offline: 'bg-red-100 text-red-800',
  unassigned: 'bg-slate-100 text-slate-800',
}

const getFatigueColor = (score: number | null) => {
  if (score === null) return 'text-slate-600'
  if (score < 30) return 'text-emerald-600 bg-emerald-100'
  if (score < 60) return 'text-yellow-600 bg-yellow-100'
  if (score < 80) return 'text-orange-600 bg-orange-100'
  return 'text-red-600 bg-red-100'
}

export default function WorkersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredWorkers = workers.filter(worker => {
    if (selectedDepartment !== 'all' && worker.department !== selectedDepartment) return false
    if (selectedStatus !== 'all' && worker.status !== selectedStatus) return false
    if (searchQuery && !worker.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !worker.employeeId.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const workerCounts = {
    total: workers.length,
    active: workers.filter(w => w.status === 'active').length,
    warning: workers.filter(w => w.status === 'warning').length,
    critical: workers.filter(w => w.status === 'critical').length,
    assigned: workers.filter(w => w.deviceId).length,
  }

  const departments = [...new Set(workers.map(w => w.department))]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Workers</h1>
          <p className="text-slate-600 mt-1">
            Manajemen data pekerja dan monitoring kondisi keselamatan
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Worker
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Workers
            </CardTitle>
            <Users className="h-5 w-5 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workerCounts.total}</div>
            <p className="text-xs text-slate-500 mt-1">Registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active
            </CardTitle>
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{workerCounts.active}</div>
            <p className="text-xs text-slate-500 mt-1">Normal condition</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Warning
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{workerCounts.warning}</div>
            <p className="text-xs text-slate-500 mt-1">Need attention</p>
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
            <div className="text-2xl font-bold text-red-600">{workerCounts.critical}</div>
            <p className="text-xs text-slate-500 mt-1">Immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              With Device
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{workerCounts.assigned}</div>
            <p className="text-xs text-slate-500 mt-1">Wearables assigned</p>
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
                placeholder="Search by name or employee ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant={selectedDepartment === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedDepartment('all')}
            >
              All Departments
            </Button>
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? 'default' : 'outline'}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Button>
            ))}
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Worker Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {worker.name}
                    </h3>
                    <p className="text-sm text-slate-500">{worker.employeeId}</p>
                  </div>
                </div>
                <Badge className={statusColors[worker.status as keyof typeof statusColors]}>
                  {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                </Badge>
              </div>

              {/* Worker Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{worker.position}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{worker.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Shift: {worker.shift}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">{worker.zone}</span>
                </div>
              </div>

              {/* Device & Vitals */}
              {worker.deviceId ? (
                <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Device</span>
                    <Badge className={deviceStatusColors[worker.deviceStatus as keyof typeof deviceStatusColors]}>
                      {worker.deviceId} • {worker.deviceStatus}
                    </Badge>
                  </div>
                  
                  {worker.fatigueScore !== null && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Fatigue</span>
                      <span className={`font-bold px-2 py-1 rounded text-sm ${getFatigueColor(worker.fatigueScore)}`}>
                        {worker.fatigueScore}%
                      </span>
                    </div>
                  )}

                  {worker.heartRate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Heart Rate</span>
                      <span className={`font-semibold ${
                        worker.heartRate > 100 ? 'text-red-600' :
                        worker.heartRate < 60 ? 'text-orange-600' :
                        'text-emerald-600'
                      }`}>
                        {worker.heartRate} bpm
                      </span>
                    </div>
                  )}

                  {worker.spo2 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">SpO2</span>
                      <span className={`font-semibold ${
                        worker.spo2 < 95 ? 'text-red-600' :
                        worker.spo2 < 97 ? 'text-yellow-600' :
                        'text-emerald-600'
                      }`}>
                        {worker.spo2}%
                      </span>
                    </div>
                  )}

                  {worker.todayAlerts > 0 && (
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-slate-600">Alerts Today</span>
                      <span className="font-bold text-orange-600">{worker.todayAlerts}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-4 mb-4 text-center">
                  <span className="text-sm text-slate-500">No device assigned</span>
                </div>
              )}

              {/* Contact Info */}
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1 text-slate-600">
                  <Phone className="h-3 w-3" />
                  <span className="text-xs">{worker.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <span className="text-xs">Gol. Darah: {worker.bloodType}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Activity className="h-4 w-4 mr-2" />
                  Monitor
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign Device</DropdownMenuItem>
                    <DropdownMenuItem>View History</DropdownMenuItem>
                    <DropdownMenuItem>Medical Records</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
