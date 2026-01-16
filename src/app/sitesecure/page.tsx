'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ShieldCheck, 
  Camera, 
  AlertTriangle, 
  Search,
  User,
  Video,
  Eye,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Users2
} from 'lucide-react'

// Mock data for SiteSecure AI cameras
const cameras = [
  {
    id: 'SS-001',
    name: 'Gate Utama Masuk',
    location: 'Main Entrance',
    zone: 'Zone Entry',
    status: 'active',
    type: 'ENTRANCE_CONTROL',
    resolution: '1080p',
    fps: 30,
    detections: 156,
    violations: 3,
    complianceRate: 98.1,
    lastUpdate: 'Live',
    recentViolations: [
      {
        id: 1,
        time: '14:32:15',
        type: 'PPE_MISSING_HELMET',
        severity: 'medium',
        description: 'Worker entered without helmet',
        confidence: 0.94,
        screenshotAvailable: true
      }
    ],
    ppeDetection: {
      helmet: { detected: 153, compliance: 98.1 },
      vest: { detected: 155, compliance: 99.4 },
      boots: { detected: 152, compliance: 97.4 }
    }
  },
  {
    id: 'SS-002',
    name: 'Gerbang B - Produksi',
    location: 'Production Zone B Entry',
    zone: 'Zone Production',
    status: 'active',
    type: 'ENTRANCE_CONTROL',
    resolution: '1080p',
    fps: 30,
    detections: 89,
    violations: 8,
    complianceRate: 91.0,
    lastUpdate: 'Live',
    recentViolations: [
      {
        id: 1,
        time: '14:28:42',
        type: 'PPE_MISSING_HELMET',
        severity: 'medium',
        description: 'Worker entered without helmet',
        confidence: 0.89,
        screenshotAvailable: true
      },
      {
        id: 2,
        time: '14:25:18',
        type: 'PPE_MISSING_VEST',
        severity: 'low',
        description: 'Worker without safety vest',
        confidence: 0.92,
        screenshotAvailable: true
      }
    ],
    ppeDetection: {
      helmet: { detected: 82, compliance: 92.1 },
      vest: { detected: 85, compliance: 95.5 },
      boots: { detected: 88, compliance: 98.9 }
    }
  },
  {
    id: 'SS-003',
    name: 'Area Loading Dock',
    location: 'Loading Dock Area',
    zone: 'Loading Dock',
    status: 'warning',
    type: 'AREA_MONITORING',
    resolution: '4K',
    fps: 25,
    detections: 245,
    violations: 15,
    complianceRate: 93.9,
    lastUpdate: 'Live',
    recentViolations: [
      {
        id: 1,
        time: '14:30:05',
        type: 'UNAUTHORIZED_ACCESS',
        severity: 'high',
        description: 'Unauthorized person detected in restricted area',
        confidence: 0.87,
        screenshotAvailable: true
      },
      {
        id: 2,
        time: '14:22:33',
        type: 'PPE_MISSING_BOOTS',
        severity: 'medium',
        description: 'Worker without safety boots',
        confidence: 0.91,
        screenshotAvailable: true
      }
    ],
    ppeDetection: {
      helmet: { detected: 230, compliance: 93.9 },
      vest: { detected: 235, compliance: 95.9 },
      boots: { detected: 228, compliance: 93.1 }
    }
  },
  {
    id: 'SS-004',
    name: 'Confined Space Entry A',
    location: 'Pipa A Entry Point',
    zone: 'Confined Space',
    status: 'active',
    type: 'ENTRANCE_CONTROL',
    resolution: '1080p',
    fps: 30,
    detections: 12,
    violations: 0,
    complianceRate: 100,
    lastUpdate: 'Live',
    recentViolations: [],
    ppeDetection: {
      helmet: { detected: 12, compliance: 100 },
      vest: { detected: 12, compliance: 100 },
      boots: { detected: 12, compliance: 100 }
    }
  },
]

const statusColors = {
  active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  offline: 'bg-slate-100 text-slate-800 border-slate-200',
}

const violationTypeLabels = {
  PPE_MISSING_HELMET: 'Missing Helmet',
  PPE_MISSING_VEST: 'Missing Vest',
  PPE_MISSING_BOOTS: 'Missing Boots',
  UNAUTHORIZED_ACCESS: 'Unauthorized Access',
  MULTIPLE_PERSONS_DETECTED: 'Multiple Persons',
}

const severityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
}

export default function SiteSecurePage() {
  const totalDetections = cameras.reduce((acc, c) => acc + c.detections, 0)
  const totalViolations = cameras.reduce((acc, c) => acc + c.violations, 0)
  const avgCompliance = (cameras.reduce((acc, c) => acc + c.complianceRate, 0) / cameras.length).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">SiteSecure Monitoring</h1>
          <p className="text-slate-600 mt-1">
            Kontrol Akses Perimeter & Kepatuhan APD berbasis AI Visi Komputer Real-time
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <ShieldCheck className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Cameras
            </CardTitle>
            <Camera className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cameras.length}</div>
            <p className="text-xs text-slate-500 mt-1">Monitoring zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Detections
            </CardTitle>
            <Eye className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDetections}</div>
            <p className="text-xs text-slate-500 mt-1">People detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              PPE Violations
            </CardTitle>
            <XCircle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalViolations}</div>
            <p className="text-xs text-slate-500 mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Compliance
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{avgCompliance}%</div>
            <p className="text-xs text-slate-500 mt-1">Overall PPE compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* PPE Compliance Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-slate-900">
                PPE Compliance Overview
              </h3>
              <p className="text-sm text-slate-600">Real-time detection compliance rates</p>
            </div>
            <Button variant="outline" className="bg-white">
              <Users2 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="bg-white border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      {Math.round(cameras.reduce((acc, c) => acc + c.ppeDetection.helmet.detected, 0) / totalDetections * 100)}%
                    </div>
                    <div className="text-sm font-medium text-slate-700">Helmet</div>
                  </div>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${Math.round(cameras.reduce((acc, c) => acc + c.ppeDetection.helmet.detected, 0) / totalDetections * 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(cameras.reduce((acc, c) => acc + c.ppeDetection.vest.detected, 0) / totalDetections * 100)}%
                    </div>
                    <div className="text-sm font-medium text-slate-700">Safety Vest</div>
                  </div>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${Math.round(cameras.reduce((acc, c) => acc + c.ppeDetection.vest.detected, 0) / totalDetections * 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="h-6 w-6 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(cameras.reduce((acc, c) => acc + c.ppeDetection.boots.detected, 0) / totalDetections * 100)}%
                    </div>
                    <div className="text-sm font-medium text-slate-700">Safety Boots</div>
                  </div>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${Math.round(cameras.reduce((acc, c) => acc + c.ppeDetection.boots.detected, 0) / totalDetections * 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
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
                placeholder="Search cameras by name or location..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Status: All
            </Button>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Zone: All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Camera Cards */}
      <div className="space-y-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Camera Info & Preview */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                        <Camera className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">
                          {camera.name}
                        </h3>
                        <p className="text-sm text-slate-500">{camera.location}</p>
                      </div>
                    </div>
                    <Badge className={statusColors[camera.status as keyof typeof statusColors]}>
                      {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Live Preview Placeholder */}
                  <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
                      <span className="text-xs text-white font-medium">LIVE</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded">
                      <span className="text-xs text-white">{camera.resolution} • {camera.fps} FPS</span>
                    </div>
                    <div className="text-center">
                      <Video className="h-16 w-16 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">AI Vision Active</p>
                      <p className="text-xs text-slate-500 mt-1">YOLOv8 Edge Inference</p>
                    </div>
                  </div>

                  {/* Camera Stats */}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-600">
                        Detections: <span className="font-semibold text-slate-900">{camera.detections}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-slate-600">
                        Violations: <span className="font-semibold text-orange-600">{camera.violations}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-slate-600">
                        Compliance: <span className="font-semibold text-emerald-600">{camera.complianceRate}%</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-600">{camera.lastUpdate}</span>
                    </div>
                  </div>

                  {/* Recent Violations */}
                  {camera.recentViolations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900 text-sm">Recent Violations</h4>
                      {camera.recentViolations.map((violation) => (
                        <div
                          key={violation.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            violation.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                            violation.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <AlertTriangle className={`h-5 w-5 ${
                            violation.severity === 'high' ? 'text-orange-600' :
                            violation.severity === 'medium' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">
                                {violationTypeLabels[violation.type as keyof typeof violationTypeLabels] || violation.type}
                              </span>
                              <Badge className={severityColors[violation.severity as keyof typeof severityColors]}>
                                {violation.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">{violation.description}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              <span>{violation.time}</span>
                              <span className="ml-auto">
                                AI Confidence: {(violation.confidence * 100).toFixed(0)}%
                              </span>
                              {violation.screenshotAvailable && (
                                <span className="text-blue-600">Screenshot Available</span>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No Violations */}
                  {camera.recentViolations.length === 0 && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div className="flex-1">
                        <span className="font-medium text-emerald-900">No Violations</span>
                        <p className="text-sm text-emerald-700">All detected workers are wearing proper PPE</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
