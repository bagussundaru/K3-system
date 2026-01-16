'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileCheck, 
  Download, 
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Filter,
  FileText
} from 'lucide-react'

// Mock data for compliance records
const complianceRecords = [
  {
    id: 'CMP-001',
    type: 'AIR_QUALITY',
    period: '2025-01',
    standard: 'Permenaker 5/2018',
    parameter: 'Kualitas Udara - CO',
    threshold: 25,
    measuredValue: 18.5,
    unit: 'PPM',
    isCompliant: true,
    notes: 'All zones within safe limits',
    generatedBy: 'System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-002',
    type: 'TEMPERATURE',
    period: '2025-01',
    standard: 'Permenaker 5/2018',
    parameter: 'Suhu Kerja',
    threshold: 35,
    measuredValue: 32.4,
    unit: '°C',
    isCompliant: true,
    notes: 'Zone Gudang slightly above optimal but within limit',
    generatedBy: 'System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-003',
    type: 'HUMIDITY',
    period: '2025-01',
    standard: 'Permenaker 5/2018',
    parameter: 'Kelembaban Udara',
    threshold: 80,
    measuredValue: 68.2,
    unit: '%',
    isCompliant: true,
    notes: 'All zones within comfortable range',
    generatedBy: 'System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-004',
    type: 'VENTILATION',
    period: '2025-01',
    standard: 'Permenaker 5/2018',
    parameter: 'Sirkulasi Udara',
    threshold: 0.3,
    measuredValue: 0.42,
    unit: 'm/s',
    isCompliant: true,
    notes: 'Exceeds minimum requirement',
    generatedBy: 'System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-005',
    type: 'PPE_COMPLIANCE',
    period: '2025-01',
    standard: 'ISO 45001',
    parameter: 'Kepatuhan Penggunaan APD',
    threshold: 95,
    measuredValue: 93.8,
    unit: '%',
    isCompliant: false,
    notes: 'Zona Produksi B below target (91.0%)',
    generatedBy: 'System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-006',
    type: 'CHEMICAL_EXPOSURE',
    period: '2025-01',
    standard: 'Permenaker 5/2018',
    parameter: 'Paparan Kimia - Amonia (NH₃)',
    threshold: 25,
    measuredValue: 14.2,
    unit: 'PPM',
    isCompliant: true,
    notes: 'All zones compliant',
    generatedBy: 'System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-007',
    type: 'WORKING_HOURS',
    period: '2025-01',
    standard: 'UU Ketenagakerjaan',
    parameter: 'Jam Kerja',
    threshold: 40,
    measuredValue: 40,
    unit: 'jam/minggu',
    isCompliant: true,
    notes: 'Compliant with labor regulations',
    generatedBy: 'HR System',
    generatedAt: '2025-01-15'
  },
  {
    id: 'CMP-008',
    type: 'MEDICAL_CHECKUP',
    period: 'Q4-2024',
    standard: 'Permenaker 5/2018',
    parameter: 'Pemeriksaan Kesehatan Berkala',
    threshold: 100,
    measuredValue: 92,
    unit: '%',
    isCompliant: false,
    notes: '8% workers overdue for medical checkup',
    generatedBy: 'HR System',
    generatedAt: '2025-01-10'
  },
]

// Overall compliance summary
const overallCompliance = {
  permenaker: {
    compliant: 5,
    total: 5,
    percentage: 100
  },
  iso45001: {
    compliant: 1,
    total: 2,
    percentage: 50
  },
  other: {
    compliant: 1,
    total: 1,
    percentage: 100
  }
}

const typeLabels = {
  AIR_QUALITY: 'Kualitas Udara',
  TEMPERATURE: 'Suhu Kerja',
  HUMIDITY: 'Kelembaban',
  LIGHTING: 'Pencahayaan',
  NOISE_LEVEL: 'Tingkat Kebisingan',
  VENTILATION: 'Sirkulasi Udara',
  CHEMICAL_EXPOSURE: 'Paparan Kimia',
  PPE_COMPLIANCE: 'Penggunaan APD',
  WORKING_HOURS: 'Jam Kerja',
  MEDICAL_CHECKUP: 'Pemeriksaan Kesehatan',
  SAFETY_TRAINING: 'Pelatihan Keselamatan',
}

export default function CompliancePage() {
  const totalRecords = complianceRecords.length
  const compliantRecords = complianceRecords.filter(r => r.isCompliant).length
  const overallPercentage = Math.round((compliantRecords / totalRecords) * 100)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Compliance Reports</h1>
          <p className="text-slate-600 mt-1">
            Laporan kepatuhan Permenaker 5/2018, ISO 45001, dan standar keselamatan kerja lainnya
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Generate Report PDF
        </Button>
      </div>

      {/* Overall Compliance Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-4">
                Kepatuhan Keseluruhan - Januari 2025
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <Card className="bg-white border-2">
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-2">Permenaker 5/2018</div>
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {overallCompliance.permenaker.percentage}%
                    </div>
                    <div className="text-xs text-slate-500">
                      {overallCompliance.permenaker.compliant}/{overallCompliance.permenaker.total} compliant
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-2">
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-2">ISO 45001</div>
                    <div className={`text-3xl font-bold mb-1 ${
                      overallCompliance.iso45001.percentage >= 90 ? 'text-emerald-600' :
                      overallCompliance.iso45001.percentage >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {overallCompliance.iso45001.percentage}%
                    </div>
                    <div className="text-xs text-slate-500">
                      {overallCompliance.iso45001.compliant}/{overallCompliance.iso45001.total} compliant
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white border-2">
                  <CardContent className="p-4">
                    <div className="text-sm text-slate-600 mb-2">Standar Lain</div>
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {overallCompliance.other.percentage}%
                    </div>
                    <div className="text-xs text-slate-500">
                      {overallCompliance.other.compliant}/{overallCompliance.other.total} compliant
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="text-center min-w-[200px]">
              <div className="text-sm text-slate-600 mb-2">Overall</div>
              <div className={`text-6xl font-bold ${
                overallPercentage >= 90 ? 'text-emerald-600' :
                overallPercentage >= 70 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {overallPercentage}%
              </div>
              <div className="text-sm text-slate-500 mt-2">
                {compliantRecords}/{totalRecords} records
              </div>
              <Button variant="outline" className="mt-4 bg-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permenaker 5/2018 Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Kualitas Udara
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Compliant</div>
            <p className="text-xs text-slate-500 mt-1">All zones meet NAB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Suhu Kerja
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Compliant</div>
            <p className="text-xs text-slate-500 mt-1">Range: 23-35°C</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Sirkulasi Udara
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">Compliant</div>
            <p className="text-xs text-slate-500 mt-1">≥0.3 m/s achieved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Penggunaan APD
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Needs Attention</div>
            <p className="text-xs text-slate-500 mt-1">93.8% (Target: 95%)</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Period: January 2025
            </Button>
            <Button variant="outline">
              <FileCheck className="h-4 w-4 mr-2" />
              Standard: All
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Status: All
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Compare Periods
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceRecords.map((record) => (
              <div
                key={record.id}
                className={`p-4 rounded-lg border-2 ${
                  record.isCompliant 
                    ? 'bg-emerald-50 border-emerald-200' 
                    : 'bg-red-50 border-red-200'
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-slate-900">
                        {record.parameter}
                      </h4>
                      <Badge className={
                        record.isCompliant
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }>
                        {record.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                      </Badge>
                      <Badge variant="outline">{record.standard}</Badge>
                      <Badge variant="outline">{record.period}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Nilai Terukur:</span>
                        <span className={`ml-2 font-semibold ${
                          record.isCompliant ? 'text-emerald-700' : 'text-red-700'
                        }`}>
                          {record.measuredValue} {record.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Ambang Batas:</span>
                        <span className="ml-2 font-medium text-slate-900">
                          {record.threshold} {record.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Generated:</span>
                        <span className="ml-2 text-slate-900">{formatDate(record.generatedAt)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">By:</span>
                        <span className="ml-2 text-slate-900">{record.generatedBy}</span>
                      </div>
                    </div>

                    {record.notes && (
                      <p className="text-sm text-slate-600 mt-2">{record.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {record.isCompliant ? (
                      <CheckCircle2 className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
                    )}
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Readiness */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                Audit Readiness Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Permenaker 5/2018: Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-slate-700">ISO 45001: Needs Improvement</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">TKDN Documentation: Complete</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="bg-white">
              <FileCheck className="h-4 w-4 mr-2" />
              View Audit Checklist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
